import type { CompilerPlugins } from './types'
import { unocssPlugin } from './unocss'

export const plugins: CompilerPlugins = {
  cssProcessors: [
    unocssPlugin,
  ],
}
