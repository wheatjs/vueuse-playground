import type { editor as Editor } from 'monaco-editor'

export interface EditorConfig {
  fontFamily?: string
  fontSize?: number
  fontLigatures?: boolean
  minimap?: Editor.IEditorMinimapOptions
  autoClosingBrackets?: 'always' | 'languageDefined' | 'never'
  autoClosingQuotes?: 'always' | 'languageDefined' | 'never'
  insertSpaces?: boolean
  folding?: boolean
  theme: {
    light: any
    dark: any
  }
}
