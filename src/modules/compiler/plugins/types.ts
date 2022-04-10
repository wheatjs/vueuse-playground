export interface CSSProcessorOptions {
  html?: string
  css?: string
}

export interface CompilerPlugins {
  cssProcessors?: ((options: CSSProcessorOptions) => Promise<string>)[]
}

export function defineCSSProcessorPlugin(plugin: (options: CSSProcessorOptions) => Promise<string>) {
  return plugin
}
