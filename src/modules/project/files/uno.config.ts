import * as __unocss from 'unocss'
import type { ScriptFileOptions } from './script'
import { ScriptFile } from './script'

const AsyncFunction = Object.getPrototypeOf(async() => {}).constructor

const CDN_BASE = 'https://cdn.skypack.dev/'
const modulesCache = new Map<string, Promise<unknown> | unknown>()
modulesCache.set('unocss', __unocss)

export function clearModuleCache() {
  modulesCache.clear()
  modulesCache.set('unocss', __unocss)
}

export class UnoConfigFile extends ScriptFile {
  public compiled = { js: '', css: '', dts: '', uno: '', config: '' }

  constructor(options: ScriptFileOptions) {
    super(options)
  }

  private async evaluateUserConfig(configStr: string) {
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

  public async compile() {
    const config = await this.evaluateUserConfig(this.toString())
    this.compiled = {
      ...this.compiled,
      config,
    }
  }
}
