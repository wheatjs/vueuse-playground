import type { Plugin } from 'esbuild-wasm'
import { createGenerator, presetAttributify, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'
import { transformDirectives } from '@unocss/transformer-directives'
import MagicString from 'magic-string'
import type { BaseFile, CssFile } from '~/modules/project'

const uno = createGenerator({
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  presets: [presetUno(), presetAttributify()],
})

export interface UnoCssPluginOptions {
  files: Record<string, BaseFile>
}

export function unocssPlugin({ files }: UnoCssPluginOptions): Plugin {
  return {
    name: 'unocss',
    setup(build) {
      build.onResolve({ filter: /uno.css$/ }, (args) => {
        return {
          namespace: 'UNOCSS',
          path: args.path,
        }
      })

      build.onLoad({ filter: /uno.css$/, namespace: 'UNOCSS' }, async () => {
        return {
          contents: '',
          loader: 'css',
        }
      })

      /**
       * Run unocss on script files and css files then inject into the css
       */
      build.onEnd(async (result) => {
        if (!result.outputFiles)
          return

        // Find the file that contains the unocss file
        const unofile = result.outputFiles?.findIndex(file => file.text.includes('/* UNOCSS:uno.css */'))

        if (unofile === -1)
          return

        let output = ''

        for (const file of Object.values(files))
          output += (await uno.generate(file.toString())).css

        for (const file in result.outputFiles) {
          if (result.outputFiles[file].path.match(/\.(css)$/)) {
            const input = new MagicString(result.outputFiles[file].text)
            await transformDirectives(input, uno, {})

            result.outputFiles[file] = {
              ...result.outputFiles[file],
              text: input.toString(),
            }
          }
        }

        (files['uno.css'] as CssFile).css.model?.setValue(output)

        result.outputFiles[unofile] = {
          ...result.outputFiles[unofile],
          text: result.outputFiles[unofile].text.replace('/* UNOCSS:uno.css */', output),
        }
      })
    },
  }
}
