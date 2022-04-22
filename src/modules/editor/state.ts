import config from '@playground/config'

export const editorTabSize = useLocalStorage('editor:TabSize', 2)
export const editorInsertSpaces = useLocalStorage('editor:InsertSpaces', true)
export const editorWordWrap = useLocalStorage('editor:wordWrap', 'off')
export const editorMinimap = useLocalStorage('editor:minimap', config.editor.minimap)
export const editorFontFamily = useLocalStorage('editor:fontFamily', config.editor.fontFamily || '')
export const editorFontSize = useLocalStorage('editor:fontSize', config.editor.fontSize || 14)
export const editorFontLigatures = useLocalStorage('editor:fontLigatures', config.editor.fontLigatures || true)
export const editorAutoClosingBrackets = useLocalStorage('editor:autoClosingBrackets', config.editor.autoClosingQuotes || true)
export const editorAutoClosingQuotes = useLocalStorage('editor:autoClosingQuotes', config.editor.autoClosingQuotes || true)

export const currentEditorLine = ref(1)
export const currentEditorColumn = ref(1)
