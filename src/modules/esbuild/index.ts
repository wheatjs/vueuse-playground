import type { BuildResult } from 'esbuild-wasm'
import type { PackageJson } from 'type-fest'
import { build as esbuild, initialize } from 'esbuild-wasm'
import { createSingletonPromise } from '@vueuse/core'
import { cssPlugin, npmPlugin, scriptPlugin, unocssPlugin, vuePlugin } from './plugins'
import type { BaseFile, Package } from '~/modules/project'
import { makeCDNUrl } from '~/modules/shared'
import { TerminalCommandType, sendTerminalCommand } from '~/modules/terminal'

let instance: BuildResult | undefined

export const init = createSingletonPromise(async () => await initialize({ wasmURL: '/esbuild.wasm' }))

export function disposeEsbuild() {
  instance = undefined
}

export const EXTERNAL_PACKAGES = ['vue']

export async function buildPackage(pkg: PackageJson) {
  await init()

  if (!pkg.main && !pkg.module)
    return undefined

  sendTerminalCommand({
    payload: `[App] Compiling package "${pkg.name}" for browser `,
    type: TerminalCommandType.INFO,
  })

  const content = await fetch(makeCDNUrl(`${pkg.name}@${pkg.version}`)).then(res => res.text())

  const result = await esbuild({
    resolveExtensions: ['.js', '.vue', '.css', '.ts', '.json'],
    entryPoints: ['/index.ts'],
    format: 'esm',
    outdir: '/node_modules/',
    bundle: true,
    write: false,

    external: EXTERNAL_PACKAGES,

    plugins: [
      npmPlugin({
        entry: content,
      }),
    ],
  })

  if (result.outputFiles.length > 0)
    return result.outputFiles[0].text

  return undefined
}

export async function build(files: Record<string, BaseFile>, packages: Package[]) {
  await init()

  if (instance) {
    const result = await instance.rebuild!()
    return result!
  }
  else {
    instance = await esbuild({
      resolveExtensions: ['.js', '.vue', '.css', '.ts', '.json'],
      entryPoints: ['/main.ts'],
      outdir: '/dist',
      format: 'esm',
      write: false,
      bundle: true,
      incremental: true,

      external: [
        ...EXTERNAL_PACKAGES,
        ...packages.filter(pkg => pkg.supportsEsm).map(pkg => pkg.name),
      ],

      plugins: [
        unocssPlugin({ files }),
        cssPlugin({ files }),
        vuePlugin({ files }),
        scriptPlugin({ files, packages: packages.filter(pkg => !pkg.supportsEsm) }),
      ],
    })

    return instance!
  }
}
