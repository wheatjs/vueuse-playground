import { currentEditorColumn, currentEditorLine, editorAutoClosingBrackets, editorAutoClosingQuotes, editorFontFamily, editorFontLigatures, editorFontSize, editorInsertSpaces, editorTabSize, editorWordWrap } from './state'
import { createAppSettings } from '~/modules/app'
import { StatusbarAlignment, createStatusbarTextItem } from '~/modules/statusbar'

export * from './types'
export * from './state'
export * from './groups'
export * from './store'
export * from './useEditor'

/**
 * App Settings
 */

createAppSettings('Editor', [
  {
    name: 'Tab Size',
    description: 'The number of spaces a tab is equal to.',
    type: 'number',
    value: editorTabSize,
  },
  {
    name: 'Insert Spaces',
    description: 'Controls weather the minimap is shown.',
    type: 'boolean',
    value: editorInsertSpaces,
  },
  {
    name: 'Word Wrap',
    description: 'Controls how lines should wrap.',
    type: 'string',
    enum: ['off', 'on', 'wordWrapColumn', 'bounded'],
    value: editorWordWrap,
  },
  {
    name: 'Font Family',
    description: 'Controls weather the minimap is shown.',
    type: 'string',
    value: editorFontFamily,
  },
  {
    name: 'Font Size',
    description: 'Controls weather the minimap is shown.',
    type: 'number',
    value: editorFontSize,
  },
  {
    name: 'Font Ligatures',
    description: 'Controls weather the minimap is shown.',
    type: 'boolean',
    value: editorFontLigatures,
  },
  {
    name: 'Auto Closing Brackets',
    description: 'Controls weather the minimap is shown.',
    type: 'string',
    enum: ['always', 'beforeWhitespace', 'languageDefined', 'never'],
    value: editorAutoClosingBrackets,
  },
  {
    name: 'Auto Closing Quotes',
    description: 'Controls weather the minimap is shown.',
    type: 'string',
    enum: ['always', 'beforeWhitespace', 'languageDefined', 'never'],
    value: editorAutoClosingQuotes,
  },

])

/**
 * Setup statusbar items
 */

const subscriptions = [
  createStatusbarTextItem({
    alignment: StatusbarAlignment.Right,
    priority: 1,
    text: computed(() => `Ln ${currentEditorLine.value}, Col ${currentEditorColumn.value}`),
  }),
]

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    subscriptions.forEach(dispose => dispose())
  })
}
