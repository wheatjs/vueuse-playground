import type { Plugin } from 'esbuild-wasm'
import { createGenerator } from 'unocss'
import { transformDirectives } from '@unocss/transformer-directives'
import * as __unocss from 'unocss'
import MagicString from 'magic-string'
import type { BaseFile, CssFile } from '~/modules/project'

const CDN_BASE = 'https://cdn.skypack.dev/'
const uno = createGenerator()

export interface UnoCssPluginOptions {
  files: Record<string, BaseFile>
  configFilename: string
}

let configCache = ''
const modulesCache = new Map<string, Promise<unknown> | unknown>()
modulesCache.set('unocss', __unocss)

export function clearModuleCache() {
  modulesCache.clear()
  modulesCache.set('unocss', __unocss)
}

const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor

async function evaluateUserConfig(configStr: string) {
  const code = configStr
    .replace(/import\s*(.*?)\s*from\s*(['"])unocss\2/g, 'const $1 = await __import("unocss");')
    .replace(/import\s*(\{.*?\})\s*from\s*(['"])([\w-@/]+)\2/g, `const $1 = await __import("${CDN_BASE}$3");`)
    .replace(/import\s*(.*?)\s*from\s*(['"])([\w-@/]+)\2/g, `const $1 = (await __import("${CDN_BASE}/$3")).default;`)
    .replace(/export default /, 'return ')

  const __import = (name: string): any => {
    if (!modulesCache.has(name))
      modulesCache.set(name, import(/* @vite-ignore */ name))
    return modulesCache.get(name)
  }

  // eslint-disable-next-line no-new-func
  const fn = new AsyncFunction('__import', code)
  const result = await fn(__import)

  if (result)
    return result
}

export function unocssPlugin({ files, configFilename = 'unocss.config.ts' }: UnoCssPluginOptions): Plugin {
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

        const currentConfig = files[configFilename]?.toString()

        if (currentConfig !== configCache) {
          configCache = currentConfig
          uno.setConfig(await evaluateUserConfig(currentConfig))
        }

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
