import { Processor } from 'windicss/lib'
import { CompletionItemKind } from 'vscode-html-languageservice'
import type { HTMLPlugin } from '../types'
import { isCursorInHTMLAttribute } from '../utils'
import { generateCompletions } from './utils/completions'

const processor = new Processor()
const _completions = generateCompletions(processor, null, false)

export const windicssHTMLPlugin: HTMLPlugin = {
  completions({ document, html, position }) {
    if (!isCursorInHTMLAttribute({ document, html, position }))
      return []

    return [
      // Static
      ..._completions.static.map(x => ({
        label: x,
        kind: CompletionItemKind.Color,
      })),

      // Colors
      ..._completions.color.map(color => ({
        label: color.label,
        detail: color.doc,
        kind: CompletionItemKind.Color,
      })),
    ]
  },
}
