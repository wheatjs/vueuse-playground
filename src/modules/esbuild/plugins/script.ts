import type { Plugin } from 'esbuild-wasm'
import { EXTERNAL_PACKAGES } from '~/modules/esbuild'
import type { BaseFile, Package, ScriptFile } from '~/modules/project'

export interface ScriptPluginOptions {
  files: Record<string, BaseFile>
  packages: Package[]
}

export function scriptPlugin(options: ScriptPluginOptions): Plugin {
  return {
    name: 'script',
    setup(build) {
      build.onResolve({ filter: /.*/ }, (args) => {
        const resolveExtension = (rawPath: string) => {
          const extensions = ['.js', '.ts']

          for (const ext of extensions) {
            if (options.files[`${rawPath}${ext}`])
              return `${rawPath}${ext}`
          }
        }

        if (args.path.startsWith('/')) {
          return {
            path: args.path,
          }
        }

        if (args.path.startsWith('.')) {
          const resolvedPath = resolveExtension(args.path.substring(2))

          if (!resolvedPath)
            throw new Error(`File ${args.path} not found`)

          return {
            path: `/${resolvedPath}`,
          }
        }

        const isPackage = options.packages.some(pkg => pkg.name === args.path)

        if (isPackage) {
          if (!EXTERNAL_PACKAGES.includes(args.path)) {
            return {
              path: args.path,
              namespace: 'PACKAGE',
            }
          }
        }
      })

      build.onLoad({ filter: /\.(js|ts)$/ }, (args) => {
        const filename = args.path.substring(1)
        const file = options.files[filename] as ScriptFile

        return {
          contents: file.toString(),
          loader: filename.endsWith('ts') ? 'ts' : 'js',
        }
      })

      build.onLoad({ filter: /.*/, namespace: 'PACKAGE' }, (args) => {
        const pkg = options.packages.find(pkg => pkg.name === args.path)

        if (pkg) {
          return {
            contents: pkg.content || undefined,
            loader: 'ts',
          }
        }
      })
    },
  }
}
