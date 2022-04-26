import { not } from '@vueuse/core'
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

    disableAutomaticTypeAcquisition,
    isAcquiringTypeDefinitions,
  } = storeToRefs(editor)

  createAppSettings('Editor', [
    {
      name: 'Disable automatic type acquisition',
      description: 'Disable automatic type acquisition (may improve performance)',
      type: 'boolean',
      value: disableAutomaticTypeAcquisition,
    },
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
    alignment: StatusbarAlignment.Left,
    priority: 0,
    isHidden: not(isAcquiringTypeDefinitions),
    isLoading: isAcquiringTypeDefinitions,
    text: computed(() => isAcquiringTypeDefinitions.value ? 'Acquiring type definitions...' : ''),
  })

  createStatusbarTextItem({
    alignment: StatusbarAlignment.Right,
    priority: 1,
    isLoading: false,
    text: computed(() => `Ln ${currentEditorLine.value}, Col ${currentEditorColumn.value}`),
  })
}
