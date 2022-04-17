import { BaseFile, CssFile, JsonFile, ScriptFile, SFCFile } from "~/modules/filesystem/files"
import type { editor as Editor } from 'monaco-editor'

enum EditorGroupType {
  PREDEFINED,
  AUTOMATIC
}

export interface EditorPane {
  name: string
  model: (file: BaseFile, files: Record<string, BaseFile>) => Editor.ITextModel
}

export interface EditorGroup {
  type: EditorGroupType
  hideName?: boolean
  icon: string | ((file: BaseFile) => string)
  name: string | ((file: BaseFile) => string)
  match?: string | ((file: BaseFile) => boolean)
  exclude?: string[] | ((file: BaseFile) => boolean)
  editors: EditorPane[]
}

export function defineEditorGroups(groups: EditorGroup[]) {
  return groups
}

export const groups = defineEditorGroups([
  {
    type: EditorGroupType.PREDEFINED,
    hideName: true,
    name: 'Entry',
    icon: 'carbon-application',
    editors: [
      {
        name: 'Script',
        model: (file, files) => (files['main.ts'] as ScriptFile).script.model!,
      },
      {
        name: 'Settings',
        model: (file, files) => (files['settings.json'] as JsonFile).json.model!,
      },
    ]
  },
  {
    type: EditorGroupType.PREDEFINED,
    name: 'Styles',
    hideName: true,
    icon: 'i-carbon-color-palette',
    editors: [
      {
        name: 'CSS',
        model: (file, files) => (files['main.css'] as CssFile).css.model!,
      }
    ]
  },
  {
    type: EditorGroupType.AUTOMATIC,
    icon: 'i-vscode-icons-file-type-vue',
    name: (file) => file.filename,
    match: (file) => file instanceof SFCFile,
    editors: [
      {
        name: 'Script Setup',
        model: (file) => (file as SFCFile).script.model!,
      },
      {
        name: 'Template',
        model: (file) => (file as SFCFile).template.model!,
      },
    ],
  },
  {
    type: EditorGroupType.AUTOMATIC,
    icon: (file) => file.filename.endsWith('.ts') ? 'i-vscode-icons:file-type-typescript' : 'i-vscode-icons:file-type-js',
    name: (file) => file.filename,
    match: (file) => file instanceof ScriptFile,
    exclude: ['main.ts'],
    editors: [
      {
        name: 'Script',
        model: (file) => (file as ScriptFile).script.model!,
      }
    ],
  },
  {
    type: EditorGroupType.AUTOMATIC,
    icon: 'i-vscode-icons-file-type-json',
    name: (file) => file.filename,
    match: (file) => file instanceof JsonFile,
    editors: [
      {
        name: 'JSON',
        model: (file) => (file as JsonFile).json.model!,
      }
    ]
  },
  {
    type: EditorGroupType.AUTOMATIC,
    icon: 'i-vscode-icons-file-type-css',
    name: (file) => file.filename,
    match: (file) => file instanceof CssFile,
    exclude: ['main.css'],
    editors: [
      {
        name: 'CSS',
        model: (file) => (file as CssFile).css.model!,
      }
    ]
  },
])