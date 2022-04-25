import { useEditorStore } from './store'
import { createAppSettings } from '~/modules/app'
import { StatusbarAlignment, createStatusbarTextItem } from '~/modules/statusbar'

export * from './types'
export * from './groups'
export * from './store'
export * from './useEditor'
export * from './monaco'

export default function init() {
  const editor = useEditorStore()
  const {
    editorTabSize,
    editorInsertSpaces,
    editorWordWrap,
    editorFontFamily,
    editorFontSize,
    editorFontLigatures,
    editorAutoClosingBrackets,
    editorAutoClosingQuotes,

    currentEditorColumn,
    currentEditorLine,
  } = storeToRefs(editor)

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

  createStatusbarTextItem({
    alignment: StatusbarAlignment.Right,
    priority: 1,
    text: computed(() => `Ln ${currentEditorLine.value}, Col ${currentEditorColumn.value}`),
  })
}
