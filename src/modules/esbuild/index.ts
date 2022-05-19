import type { BuildResult } from 'esbuild-wasm'
import type { PackageJson } from 'type-fest'
import { build as esbuild, formatMessages, initialize } from 'esbuild-wasm'
import { createSingletonPromise } from '@vueuse/core'
import { cssPlugin, npmPlugin, scriptPlugin, unocssPlugin, vuePlugin } from './plugins'
import type { BaseFile, Package } from '~/modules/project'
import { makeCDNUrl } from '~/modules/shared'
import { sendConsoleCommand } from '~/modules/terminal'

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

  sendConsoleCommand(['info', `[App] Compiling package "${pkg.name}" for browser`])

  const content = await fetch(makeCDNUrl(`${pkg.name}@${pkg.version}`)).then(res => res.text())

  try {
    const result = await esbuild({
      resolveExtensions: ['.js', '.vue', '.css', '.ts', '.json'],
      entryPoints: ['/index.ts'],
      format: 'esm',
      outdir: '/node_modules/',
      bundle: true,
      write: false,
      logLevel: 'error',

      external: EXTERNAL_PACKAGES,

      plugins: [
        npmPlugin({
          entry: content,
        }),
      ],
    })

    if (result.outputFiles.length > 0) {
      sendConsoleCommand(['info', `[App] Successfully compiled "${pkg.name}" for browser`])
      return result.outputFiles[0].text
    }

    sendConsoleCommand(['error', `[App] Failed to compile "${pkg.name}" for browser`])
    return undefined
  }
  catch (error) {
    sendConsoleCommand(['error', `[App] Failed to compile "${pkg.name}" for browser`])
    return undefined
  }
}

export async function build(files: Record<string, BaseFile>, packages: Package[]) {
  await init()

  const handleErrors = async (result: BuildResult) => {
    console.log(result)
    if (result.errors.length > 0) {
      const errors = await formatMessages(result.errors, { kind: 'error' })
      sendConsoleCommand(['error', errors])
    }
  }

  if (instance) {
    try {
      const result = await instance.rebuild!()
      handleErrors(result)
      return result!
    }
    catch (error) {
      // sendConsoleCommand(['error', error])
      // console.log('should handle eorr', error)
    }
  }
  else {
    try {
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

      handleErrors(instance!)
    }
    catch (error) {
    }

    return instance!
  }
}
