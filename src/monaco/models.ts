import type { editor as Editor } from 'monaco-editor'

export const models = shallowRef<Record<string, Editor.ITextModel>>({})
