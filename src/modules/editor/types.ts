import type { editor as Editor } from 'monaco-editor'
import type { BaseFile } from '~/modules/filesystem/files'

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

export const enum EditorGroupType {
  PREDEFINED,
  AUTOMATIC,
}

export interface EditorPane {
  name: string
  model: (file: BaseFile, files: Record<string, BaseFile>) => Editor.ITextModel
}

export interface EditorGroup {
  type: EditorGroupType
  hideName?: boolean
  file?: BaseFile
  icon: string | ((file: BaseFile) => string)
  name: string | ((file: BaseFile) => string)
  match?: string | ((file: BaseFile) => boolean)
  isActive: (file: BaseFile, currentFilename: string) => boolean
  exclude?: string[]
  editors: EditorPane[]
}

export function defineEditorGroups(groups: EditorGroup[]) {
  return groups
}
