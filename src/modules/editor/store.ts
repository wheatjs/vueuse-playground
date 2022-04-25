import type { editor as Editor } from 'monaco-editor'
import config from '@playground/config'

export const useEditorStore = defineStore('editor', () => {
  const currentFilename = ref('')
  const shouldShowAddFile = ref(false)

  const editorTabSize = useLocalStorage('editor:TabSize', 2)
  const editorInsertSpaces = useLocalStorage('editor:InsertSpaces', true)
  const editorWordWrap = useLocalStorage<'off' | 'on' | 'wordWrapColumn' | 'bounded'>('editor:wordWrap', 'off')
  const editorMinimap = useLocalStorage('editor:minimap', config.editor.minimap)
  const editorFontFamily = useLocalStorage('editor:fontFamily', config.editor.fontFamily || '')
  const editorFontSize = useLocalStorage('editor:fontSize', config.editor.fontSize || 14)
  const editorFontLigatures = useLocalStorage('editor:fontLigatures', config.editor.fontLigatures || true)
  const editorAutoClosingBrackets = useLocalStorage<Editor.EditorAutoClosingStrategy>('editor:autoClosingBrackets', config.editor.autoClosingQuotes || 'always')
  const editorAutoClosingQuotes = useLocalStorage<Editor.EditorAutoClosingStrategy>('editor:autoClosingQuotes', config.editor.autoClosingQuotes || 'always')

  const currentEditorLine = ref(1)
  const currentEditorColumn = ref(1)

  return {
    currentFilename,
    shouldShowAddFile,

    editorTabSize,
    editorInsertSpaces,
    editorWordWrap,
    editorMinimap,
    editorFontFamily,
    editorFontSize,
    editorFontLigatures,
    editorAutoClosingBrackets,
    editorAutoClosingQuotes,

    currentEditorColumn,
    currentEditorLine,
  }
})
