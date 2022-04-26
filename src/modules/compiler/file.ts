import { customAlphabet } from 'nanoid'
import * as defaultCompiler from '@vue/compiler-sfc'
import type { BindingMetadata, SFCDescriptor } from '@vue/compiler-sfc'
import type { CSSProcessorOptions } from './plugins/types'
import { plugins } from './plugins'
import type { BaseFile } from '~/modules/project'
import { CssFile, SFCFile, ScriptFile } from '~/modules/project'

export const COMP_IDENTIFIER = '__sfc__'

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 8)
export interface CompiledOutput {
  css?: string
  js?: string
  ssr?: string
  dts?: string
}

export interface CompileFileReturn {
  compiled: CompiledOutput
  errors?: any[]
}

export interface CompileFileOptions {
  compiler?: typeof defaultCompiler
  cssProcessors?: ((options: CSSProcessorOptions) => string)[]
}

async function transformTypescript(src: string) {
  const { createMonacoInstance } = await import('~/modules/editor')
  const { tsCompiler } = await import('~/modules/editor/monaco/typescript')
  const { monaco } = await createMonacoInstance()

  const uri = monaco.Uri.file(`${nanoid()}.ts`)
  const model = monaco.editor.createModel(src, 'typescript', uri)
  const compiler = tsCompiler(monaco, model)
  const output = await compiler.compile()

  return output
}

export async function compileFile(file: BaseFile, options: CompileFileOptions = {}): Promise<CompileFileReturn> {
  const errors: any[] = []
  const { compiler = defaultCompiler, cssProcessors = plugins.cssProcessors } = options

  if (file instanceof CssFile) {
    let css = file.toString()

    if (cssProcessors) {
      for (const processor of cssProcessors)
        css = await processor({ css })
    }

    return { compiled: { css }, errors }
  }

  if (file instanceof ScriptFile) {
    if (file.filename.endsWith('.ts')) {
      const js = await transformTypescript(file.toString())
      return { compiled: { js: js.js, dts: js.dts }, errors }
    }
    else {
      return { compiled: { js: file.toString() }, errors }
    }
  }

  if (file instanceof SFCFile) {
    let js = ''
    let css = ''

    const id = await hashId(file.filename)
    const { descriptor, errors: compileErrors } = compiler.parse(file.toString(), { filename: file.filename, sourceMap: true })
    const hasScoped = descriptor.styles.some(s => s.scoped)

    errors.push(...compileErrors)

    /**
     * Compile <script setup>
     */
    const clientScriptResult = await compileScript(descriptor, id, false, compiler)

    if (!clientScriptResult)
      return { errors, compiled: {} }

    const [clientScript, bindings] = clientScriptResult
    js += clientScript

    /**
     * Compile <template>
     */
    if (descriptor.template && !descriptor.scriptSetup) {
      const clientTemplateResult = await compileTemplate(descriptor, id, bindings, false, compiler)

      if (!clientTemplateResult)
        return { errors, compiled: {} }

      js += clientTemplateResult
    }

    if (hasScoped)
      js += `\n${COMP_IDENTIFIER}.__scopeId = ${JSON.stringify(`data-v-${id}`)}`

    if (js)
      js += `\n${COMP_IDENTIFIER}.__file = ${JSON.stringify(file.filename)}` + `\nexport default ${COMP_IDENTIFIER}`

    js = js.trimStart()

    /**
     * Compile <style>
     */

    if (cssProcessors) {
      for (const processor of cssProcessors)
        css = await processor({ css, html: descriptor.template?.content })
    }

    for (const style of descriptor.styles) {
      if (style.module) {
        errors.push('<style module> is not supported in the playground.')
        return { errors, compiled: {} }
      }

      const styleResult = await compiler.compileStyleAsync({
        source: style.content,
        filename: file.filename,
        id,
        scoped: style.scoped,
        modules: !!style.module,
      })

      if (styleResult.errors.length) {
        // postcss uses pathToFileURL which isn't polyfilled in the browser
        // ignore these errors for now
        if (!styleResult.errors[0].message.includes('pathToFileURL'))
          errors.push(...styleResult.errors)

        // proceed even if css compile errors
      }
      else {
        css += `${styleResult.code}\n`
      }
    }

    if (css)
      css = css.trim()
    else
      css = '/* No <style> tags present */'

    return {
      compiled: { js, css }, errors,
    }
  }

  return {
    compiled: {},
    errors,
  }
}

async function compileScript(
  descriptor: SFCDescriptor,
  id: string,
  ssr: boolean,
  compiler: typeof defaultCompiler,
): Promise<[string, BindingMetadata | undefined] | undefined> {
  if (descriptor.script || descriptor.scriptSetup) {
    try {
      const compiledScript = compiler.compileScript(descriptor, {
        id,
        refTransform: true,
        inlineTemplate: true,
        templateOptions: {
          ssr,
          ssrCssVars: descriptor.cssVars,
        },
      })

      // console.log('Compiled Script', descriptor.scriptSetup, compiledScript)
      let code = ''
      if (compiledScript.bindings) {
        code += `\n/* Analyzed bindings: ${JSON.stringify(
          compiledScript.bindings,
          null,
          2,
        )} */`
      }
      code
        += `\n${compiler.rewriteDefault(compiledScript.content, COMP_IDENTIFIER)}`

      if ((descriptor.script || descriptor.scriptSetup)!.lang === 'ts')
        code = (await transformTypescript(code)).js

      return [code, compiledScript.bindings]
    }
    catch (e) {
      // if (e instanceof Error && e.stack)
      //   fs.errors = [e.stack.split('\n').slice(0, 12).join('\n')]
    }
  }
  else {
    return [`\nconst ${COMP_IDENTIFIER} = {}`, undefined]
  }
}

function compileTemplate(
  descriptor: SFCDescriptor,
  id: string,
  bindingMetadata: BindingMetadata | undefined,
  ssr: boolean,
  compiler: typeof defaultCompiler,
) {
  const templateResult = compiler.compileTemplate({
    source: descriptor.template!.content,
    filename: descriptor.filename,
    id,
    scoped: descriptor.styles.some(s => s.scoped),
    slotted: descriptor.slotted,
    ssr,
    ssrCssVars: descriptor.cssVars,
    isProd: false,
    compilerOptions: {
      bindingMetadata,
    },
  })
  if (templateResult.errors.length) {
    // store.errors = templateResult.errors
    return
  }

  const fnName = ssr ? 'ssrRender' : 'render'

  return (
    `\n${templateResult.code.replace(
      /\nexport (function|const) (render|ssrRender)/,
      `$1 ${fnName}`,
    )}` + `\n${COMP_IDENTIFIER}.${fnName} = ${fnName}`
  )
}

async function hashId(filename: string) {
  const msgUint8 = new TextEncoder().encode(filename) // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8) // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)) // convert buffer to byte array
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('') // convert bytes to hex string
  return hashHex.slice(0, 8)
}
