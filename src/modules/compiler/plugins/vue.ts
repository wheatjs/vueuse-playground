import * as defaultCompiler from '@vue/compiler-sfc'
import type { BindingMetadata, SFCDescriptor } from '@vue/compiler-sfc'

export const COMP_IDENTIFIER = '__sfc__'

export interface CompiledOutput {
  css?: string
  js?: string
  ssr?: string
  dts?: string
  uno?: string
}

export interface CompileFileReturn {
  compiled: CompiledOutput
  errors?: any[]
}

export interface CompileFileOptions {
  compiler?: typeof defaultCompiler
}

export async function compileVueFile(filename: string, file: string, options: CompileFileOptions = {}): Promise<CompileFileReturn> {
  const errors: any[] = []
  const { compiler = defaultCompiler } = options

  let js = ''
  let css = ''
  let uno = ''

  const id = await hashId(filename)
  const { descriptor, errors: compileErrors } = compiler.parse(file.toString(), { filename: file, sourceMap: true })

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

  return {
    compiled: { js, css, uno }, errors,
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

      return [code, compiledScript.bindings]
    }
    catch (e) {
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
