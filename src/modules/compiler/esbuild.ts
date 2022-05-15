import * as esbuild from 'esbuild-wasm'
import type { Plugin } from 'esbuild-wasm'
import type { BaseFile, SFCFile, CssFile } from '~/modules/project'
import { compileVueFile } from './plugins/vue'

let initialized = false

export function resolvePlugin({ cdn = 'https://unpkg.com', files }: { cdn?: string; files: Record<string, BaseFile> }): Plugin {
  return {
    name: 'resolve',
    setup(build) {

      build.onResolve(({ filter: /^vue$/ }), (args) => {
        return {
          path: args.path,
          namespace: 'globalExternal'
        }
      })

      build.onResolve(({ filter: /.*/ }), async (args) => {

        if (args.path[0] === '.') {
          return {
            path: args.path.substring(1),
          }
        }

        return {
          path: args.path
        }
      })

      build.onLoad({ filter: /.*/, namespace: 'globalExternal' }, (args) => {
        console.log(args)

        return {
          contents: `module.exports = globalThis.Vue`,
          loader: 'js'
        }
      })

      /**
       * Handle compiling Vue files
       */
      build.onLoad({ filter: /^[^.]+.css$/ }, async (args) => {
        const filename = args.path.substring(1)
        const file = files[filename] as CssFile

        return {
          contents: file.toString(),
          loader: 'css',
        }
      })

      /**
       * Handle compiling Vue files
       */
      build.onLoad({ filter: /^[^.]+.vue$/ }, async (args) => {
        const filename = args.path.substring(1)
        const file = files[filename] as SFCFile
        const contents = await compileVueFile(filename, file.toString())

        return {
          contents: contents.compiled.js
        }
      })

      build.onLoad({ filter: /.*/ }, (args) => {
        const filename = args.path.substring(1)
        const file = files[filename]

        return {
          contents: file ? file.toString() : '',
        }
      })


    }
  }
}

export async function build(files: Record<string, BaseFile>) {
  if (!initialized)
    await esbuild.initialize({ wasmURL: '/esbuild.wasm' })

  initialized = true

  const result = await esbuild.build({
    resolveExtensions: ['.js', '.vue', '.css', '.ts', '.json'],
    entryPoints: ['/main.ts'],
    outdir: '/dist',
    format: 'esm',
    write: false,

    bundle: true,
    plugins: [resolvePlugin({ files })]
  })

  console.log(result)
}
