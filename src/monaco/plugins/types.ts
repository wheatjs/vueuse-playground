import type { editor as Editor } from 'monaco-editor'

export interface EditorPlugin {
  language: string
  init?: (editor: Editor.IStandaloneCodeEditor) => void
  onContentChanged?: (editor: Editor.IStandaloneCodeEditor) => void
  action?: Editor.IActionDescriptor
  [key: string]: any
}
