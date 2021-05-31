import type { HTMLPlugin } from './types'
import { windicssHTMLPlugin } from './windicss'

export const htmlCompletionPlugins: HTMLPlugin[] = [
  windicssHTMLPlugin,
]
