import type { editor as Editor } from 'monaco-editor'

export const editors = shallowRef<Record<string, Editor.ICodeEditor>>({})
