import type { editor as Editor } from 'monaco-editor'
import type { BaseFile, Document } from '~/modules/project'

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
  extraTypes?: string[]
  ambientModules?: string[]
}

export interface EditorPane {
  name: string
  file: (file: BaseFile, files: Record<string, BaseFile>) => BaseFile
  document: (file: BaseFile, files: Record<string, BaseFile>) => Document
}

export interface EditorGroup {
  pinned?: boolean
  iconOnly?: boolean
  name: string | ((file: BaseFile) => string)
  icon: string | ((file: BaseFile) => string)
  match: (file: BaseFile) => boolean
  editors: EditorPane[]
}

export function defineEditorGroups(groups: EditorGroup[]) {
  return groups
}
