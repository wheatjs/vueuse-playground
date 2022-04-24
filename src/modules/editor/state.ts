import type { editor as Editor } from 'monaco-editor'
import config from '@playground/config'

export const editorTabSize = useLocalStorage('editor:TabSize', 2)
export const editorInsertSpaces = useLocalStorage('editor:InsertSpaces', true)
export const editorWordWrap = useLocalStorage<'off' | 'on' | 'wordWrapColumn' | 'bounded'>('editor:wordWrap', 'off')
export const editorMinimap = useLocalStorage('editor:minimap', config.editor.minimap)
export const editorFontFamily = useLocalStorage('editor:fontFamily', config.editor.fontFamily || '')
export const editorFontSize = useLocalStorage('editor:fontSize', config.editor.fontSize || 14)
export const editorFontLigatures = useLocalStorage('editor:fontLigatures', config.editor.fontLigatures || true)
export const editorAutoClosingBrackets = useLocalStorage<Editor.EditorAutoClosingStrategy>('editor:autoClosingBrackets', config.editor.autoClosingQuotes || 'always')
export const editorAutoClosingQuotes = useLocalStorage<Editor.EditorAutoClosingStrategy>('editor:autoClosingQuotes', config.editor.autoClosingQuotes || 'always')

export const currentEditorLine = ref(1)
export const currentEditorColumn = ref(1)
