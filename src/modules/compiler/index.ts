export * from './file'
export * from './module'

const defaultVueUrl = import.meta.env.PROD
  ? `${location.origin}/vue.runtime.esm-browser.js` // to be copied on build
  : `${location.origin}/src/vue-dev-proxy`

export const vueRuntimeUrl = ref(defaultVueUrl)

export async function setVersion(version: string) {
  const compilerUrl = `https://unpkg.com/@vue/compiler-sfc@${version}/dist/compiler-sfc.esm-browser.js`
  const runtimeUrl = `https://unpkg.com/@vue/runtime-dom@${version}/dist/runtime-dom.esm-browser.js`
  const [compiler] = await Promise.all([
    import(/* @vite-ignore */ compilerUrl),
    import(/* @vite-ignore */ runtimeUrl),
  ])
  SFCCompiler = compiler
  vueRuntimeUrl.value = runtimeUrl
  // eslint-disable-next-line no-console
  console.info(`Now using Vue version: ${version}`)
}

export function resetVersion() {
  SFCCompiler = defaultCompiler
  vueRuntimeUrl.value = defaultVueUrl
}
