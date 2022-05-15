import type { Plugin } from 'esbuild-wasm'
import * as compiler from '@vue/compiler-sfc'
import type { CompilerOptions } from '@vue/compiler-sfc'
import type { BaseFile } from '~/modules/project'

const removeQuery = (p: string) => p.replace(/\?.+$/, '')
const genId = (filepath: string) => filepath

export interface VuePluginOptions {
  files: Record<string, BaseFile>
}

/**
 * This plugin is a fork of Egoist's esbuild-plugin-vue.
 * https://github.com/egoist/esbuild-plugin-vue
 */
export function vuePlugin({ files }: VuePluginOptions): Plugin {
  return {
    name: 'vue',

    setup(build) {
      const useSourceMap = !!build.initialOptions.sourcemap

      build.initialOptions.define = build.initialOptions.define || {}
      Object.assign(build.initialOptions.define, {
        __VUE_OPTIONS_API__:
          build.initialOptions.define?.__VUE_OPTIONS_API__ ?? true,
        __VUE_PROD_DEVTOOLS__:
          build.initialOptions.define?.__VUE_PROD_DEVTOOLS__ ?? false,
      })

      build.onResolve({ filter: /\.vue$/ }, (args) => {
        return {
          path: args.path,
          namespace: 'vue',
          pluginData: { resolveDir: args.resolveDir },
        }
      })

      build.onResolve({ filter: /\?vue&type=template/ }, (args) => {
        return {
          path: args.path,
          namespace: 'vue',
          pluginData: { resolveDir: args.resolveDir },
        }
      })

      build.onResolve({ filter: /\?vue&type=script/ }, (args) => {
        return {
          path: args.path,
          namespace: 'vue',
          pluginData: { resolveDir: args.resolveDir },
        }
      })

      build.onResolve({ filter: /\?vue&type=style/ }, (args) => {
        return {
          path: args.path,
          namespace: 'vue',
          pluginData: { resolveDir: args.resolveDir },
        }
      })

      /**
       * Resolve Vue SFC
       */
      build.onLoad({ filter: /\.vue$/, namespace: 'vue' }, async (args) => {
        const { resolveDir } = args.pluginData
        const filepath = args.path.substring(2)
        const content = files[filepath].toString()
        const sfc = compiler.parse(content)

        let contents = ''

        const inlineTemplate
          = !!sfc.descriptor.scriptSetup && !sfc.descriptor.template?.src
        const isTS
          = sfc.descriptor.scriptSetup?.lang === 'ts'
          || sfc.descriptor.script?.lang === 'ts'
        const hasScoped = sfc.descriptor.styles.some(s => s.scoped)

        if (sfc.descriptor.script || sfc.descriptor.scriptSetup) {
          const scriptResult = compiler.compileScript(sfc.descriptor, {
            id: genId(args.path),
            inlineTemplate,
            sourceMap: useSourceMap,
          })
          contents += compiler.rewriteDefault(
            scriptResult.content,
            '__sfc_main',
          )
        }
        else {
          contents += 'let __sfc_main = {}'
        }

        if (sfc.descriptor.styles.length > 0) {
          contents += `
          import "${args.path}?vue&type=style"
          `
        }

        if (sfc.descriptor.template && !inlineTemplate) {
          contents += `
          import { render } from "${args.path}?vue&type=template"
          __sfc_main.render = render
          `
        }

        if (hasScoped)
          contents += `__sfc_main.__scopeId = "data-v-${genId(args.path)}"\n`

        contents += '\nexport default __sfc_main'
        return {
          contents,
          resolveDir,
          loader: isTS ? 'ts' : 'js',
          watchFiles: [filepath],
        }
      })

      /**
       * Resolve Vue SFC template
       */
      build.onLoad({ filter: /\?vue&type=template/, namespace: 'vue' }, async (args) => {
        const { resolveDir } = args.pluginData
        const relativePath = removeQuery(args.path)
        const filepath = relativePath.substring(2)

        const source = files[filepath].toString()
        const { descriptor } = compiler.parse(source)
        if (descriptor.template) {
          const hasScoped = descriptor.styles.some(s => s.scoped)
          const id = genId(relativePath)
          // if using TS, support TS syntax in template expressions
          const expressionPlugins: CompilerOptions['expressionPlugins'] = []
          const lang = descriptor.scriptSetup?.lang || descriptor.script?.lang
          if (
            lang
            && /tsx?$/.test(lang)
            && !expressionPlugins.includes('typescript')
          )
            expressionPlugins.push('typescript')

          const compiled = compiler.compileTemplate({
            source: descriptor.template.content,
            filename: filepath,
            id,
            scoped: hasScoped,
            isProd: false,
            slotted: descriptor.slotted,
            preprocessLang: descriptor.template.lang,
            compilerOptions: {
              scopeId: hasScoped ? `data-v-${id}` : undefined,
              sourceMap: useSourceMap,
              expressionPlugins,
            },
          })
          return {
            resolveDir,
            contents: compiled.code,
          }
        }
      })

      /**
       * Resolve Vue SFC script
       */
      build.onLoad({ filter: /\?vue&type=script/, namespace: 'vue' }, async (args) => {
        const { resolveDir } = args.pluginData
        const relativePath = removeQuery(args.path)
        const filepath = relativePath.substring(2)
        const source = files[filepath].toString()

        const { descriptor } = compiler.parse(source, { filename: filepath })
        if (descriptor.script) {
          const compiled = compiler.compileScript(descriptor, {
            id: genId(relativePath),
          })
          return {
            resolveDir,
            contents: compiled.content,
            loader: compiled.lang === 'ts' ? 'ts' : 'js',
          }
        }
      })

      /**
       * Resolve Vue SFC styles
       */
      build.onLoad({ filter: /\?vue&type=style/, namespace: 'vue' }, async (args) => {
        const { resolveDir } = args.pluginData
        const relativePath = removeQuery(args.path)
        const filepath = relativePath.substring(2)
        const source = files[filepath].toString()
        const { descriptor } = compiler.parse(source)
        if (descriptor.styles.length > 0) {
          const id = genId(relativePath)
          let content = ''
          for (const style of descriptor.styles) {
            const compiled = await compiler.compileStyleAsync({
              source: style.content,
              filename: filepath,
              id,
              scoped: style.scoped,
              preprocessLang: style.lang as any,
              modules: !!style.module,
            })

            if (compiled.errors.length > 0)
              throw compiled.errors[0]

            content += compiled.code
          }
          return {
            resolveDir,
            contents: content,
            loader: 'css',
          }
        }
      })

      // build.onEnd((result) => {
      //   const collectCssFile: (file: string) => void = build.collectCssFile
      // })
    },
  }
}
