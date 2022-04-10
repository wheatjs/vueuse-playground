import { currentEditorColumn, currentEditorLine, editorTabSize } from './state'
import { StatusbarAlignment, createStatusbarSelectItem, createStatusbarTextItem } from '~/modules/statusbar'

export * from './types'
export * from './state'
export * from './useEditor'

/**
 * Setup statusbar items
 */

const subscriptions = [
  createStatusbarTextItem({
    alignment: StatusbarAlignment.Right,
    priority: 1,
    text: computed(() => `Ln ${currentEditorLine.value}, Col ${currentEditorColumn.value}`),
  }),

  createStatusbarSelectItem({
    alignment: StatusbarAlignment.Right,
    priority: 1,
    options: ['1', '2', '3', '4', '5', '6', '7', '8'].reverse().map(value => ({ label: value, value })),
    value: editorTabSize,
    label: computed(() => `Spaces: ${editorTabSize.value}`),
  }),
]

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    subscriptions.forEach(dispose => dispose())
  })
}
