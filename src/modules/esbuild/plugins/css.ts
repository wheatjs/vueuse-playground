import type { Plugin } from 'esbuild-wasm'
import config from '@playground/config'
import type { BaseFile, CssFile } from '~/modules/project'

export interface CssPluginOptions {
  files: Record<string, BaseFile>
}

const remoteCssCache = new Map<string, string>()

export function cssPlugin(options: CssPluginOptions): Plugin {
  return {
    name: 'css',
    setup(build) {
      build.onResolve({ filter: /\.(css)$/ }, (args) => {
        if (args.path.startsWith('.')) {
          return {
            path: args.path.substring(1),
          }
        }

        return {
          path: args.path,
          namespace: 'HTTP-CSS',
        }
      })

      build.onLoad({ filter: /\.(css)$/, namespace: 'HTTP-CSS' }, async (args) => {
        if (!remoteCssCache.has(args.path)) {
          const content = await fetch(`${config.project.packages.cdn}${args.path}`).then(res => res.text())
          remoteCssCache.set(args.path, content)
        }

        return {
          contents: remoteCssCache.get(args.path)!,
          loader: 'css',
        }
      })

      build.onLoad({ filter: /\.(css)$/ }, (args) => {
        const filename = args.path.substring(1)
        const file = options.files[filename] as CssFile

        if (!file)
          return

        return {
          contents: file.toString(),
          loader: 'css',
        }
      })
    },
  }
}
