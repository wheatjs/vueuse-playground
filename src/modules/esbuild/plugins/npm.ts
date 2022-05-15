import type { Loader, PartialMessage, Plugin } from 'esbuild-wasm'
import { formatMessages } from 'esbuild-wasm'
import { legacy, resolve } from 'resolve.exports'
import { parse as parsePackageName } from 'parse-package-name'
import { extname, makeCDNUrl, urlJoin } from '~/modules/shared'

const URL_RE = /^https?:\/\//

export const builtinModules = [
  'assert',
  'async_hooks',
  'buffer',
  'child_process',
  'cluster',
  'console',
  'constants',
  'crypto',
  'dgram',
  'dns',
  'domain',
  'events',
  'fs',
  'http',
  'http2',
  'https',
  'inspector',
  'module',
  'net',
  'os',
  'path',
  'perf_hooks',
  'process',
  'punycode',
  'querystring',
  'readline',
  'repl',
  'stream',
  'string_decoder',
  'timers',
  'tls',
  'trace_events',
  'tty',
  'url',
  'util',
  'v8',
  'vm',
  'wasi',
  'worker_threads',
  'zlib',
]

class Logger {
  lines: Set<string>

  constructor() {
    this.lines = reactive(new Set())
  }

  log(message: string) {
    this.lines.add(message)
  }

  clear() {
    this.lines.clear()
  }
}

export const logger = new Logger()
const RESOLVE_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js', '.css', '.json']
export const PROJECT_ROOT = '/project/'

export interface NpmPluginOptions {
  entry: string
}

export function npmPlugin(options: NpmPluginOptions): Plugin {
  return {
    name: 'resolve',
    setup(build) {
      // External modules
      const external = [
        ...(build.initialOptions.external || []),
        ...builtinModules,
      ]

      const isExternal = (id: string) => {
        function match(it: string): boolean {
          if (it === id)
            return true // import 'foo' & external: ['foo']
          if (id.startsWith(`${it}/`))
            return true // import 'foo/bar.js' & external: ['foo']
          return false
        }
        return external.find(match)
      }

      build.onStart(() => {
        logger.clear()
      })

      build.onEnd(() => {
        logger.clear()
      })

      // Intercept import paths starting with "http:" and "https:" so
      // esbuild doesn't attempt to map them to a file system location.
      // Tag them with the "http-url" namespace to associate them with
      // this plugin.
      build.onResolve({ filter: URL_RE }, args => ({
        path: args.path,
        namespace: 'http-url',
      }))

      // We also want to intercept all import paths inside downloaded
      // files and resolve them against the original URL. All of these
      // files will be in the "http-url" namespace. Make sure to keep
      // the newly resolved URL in the "http-url" namespace so imports
      // inside it will also be resolved as URLs recursively.
      build.onResolve({ filter: /.*/, namespace: 'http-url' }, (args) => {
        if (isExternal(args.path))
          return { external: true, path: args.path }

        if (!args.path.startsWith('.')) {
          return {
            path: makeCDNUrl(args.path),
            namespace: 'http-url',
          }
        }
        return {
          path: urlJoin(args.pluginData.url, '../', args.path),
          namespace: 'http-url',
        }
      })

      build.onResolve({ filter: /.*/ }, async (args) => {
        if (args.path === '/index.ts') {
          return {
            path: args.path,
          }
        }

        if (isExternal(args.path))
          return { external: true, path: args.path }

        const parsed = parsePackageName(args.path)
        let subpath = parsed.path
        if (!subpath) {
          const pkg = await fetch(makeCDNUrl(`${parsed.name}@${parsed.version}/package.json`)).then(res => res.json())
          const p = resolve(pkg, '.', { require: args.kind === 'require-call' || args.kind === 'require-resolve' }) || legacy(pkg)
          if (typeof p === 'string')
            subpath = p.replace(/^\.?\/?/, '/')
        }

        if (subpath && subpath[0] !== '/')
          subpath = `/${subpath}`

        return {
          path: makeCDNUrl(`${parsed.name}@${parsed.version}${subpath}`),
          namespace: 'http-url',
        }
      })

      // Local files
      build.onLoad({ filter: /.*/ }, (args) => {
        const file = options.entry
        if (file) {
          return {
            contents: file,
            loader: inferLoader(args.path),
          }
        }
      })

      build.onLoad({ filter: /.*/, namespace: 'http-url' }, async (args) => {
        logger.log(`Fetching ${args.path}`)
        const res = await fetch(args.path)
        if (!res.ok)
          throw new Error(`failed to load ${res.url}: ${res.status}`)
        const loader = inferLoader(res.url)
        return {
          contents: new Uint8Array(await res.arrayBuffer()),
          loader: loader as Loader,
          pluginData: {
            url: res.url,
          },
        }
      })
    },
  }
}

function inferLoader(p: string): Loader {
  const ext = extname(p)
  if (RESOLVE_EXTENSIONS.includes(ext))
    return ext.slice(1) as Loader

  if (ext === '.mjs' || ext === '.cjs')
    return 'js'

  return 'text'
}

export function formatBuildErrors(errors: PartialMessage[]) {
  return formatMessages(errors, { kind: 'error' }).then(res =>
    res.join('\n\n'),
  )
}
