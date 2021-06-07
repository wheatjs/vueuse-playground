import type { HTMLPlugin } from '../types'
import { NodeTypes } from '@vue/compiler-dom'

export const vueHTMLPlugin: HTMLPlugin = {
  completions({ document, position }) {

    console.log('Do Vue Stuff')

    return []
  },
}
