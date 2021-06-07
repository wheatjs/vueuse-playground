import type { HTMLPlugin } from '../types'

export const vueHTMLPlugin: HTMLPlugin = {
  completions({ document, position }) {
    const text = document.getText({
      start: { line: 0, character: 0 },
      end: position,
    })

    if (text.match(/(<\w+\s*)[^>]*$/) !== null) {
      if (!text.match(/\S+(?=\s*=\s*["']?[^"']*$)/) || text.match(/<\w+\s+$/)) {
        // console.log('Should do suggestion')
        // TODO: Add Vue Suggestions
      }
    }

    return []
  },
}
