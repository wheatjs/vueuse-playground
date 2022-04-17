import { filesystem } from '../filesystem'
import { EditorGroupType, defineEditorGroups } from './types'
import type { CssFile, JsonFile, SFCFile, ScriptFile } from '~/modules/filesystem/files'

export const groups = defineEditorGroups([
  {
    type: EditorGroupType.PREDEFINED,
    hideName: true,
    name: 'Entry',
    file: filesystem.files['main.ts'],
    icon: 'carbon-application',
    match: file => file.filename === 'main.ts',
    isActive: (file, currentFilename) => currentFilename === 'main.ts',
    editors: [
      {
        name: 'Script',
        model: (file, files) => (files['main.ts'] as ScriptFile).script.model!,
      },
      {
        name: 'Settings',
        model: (file, files) => (files['settings.json'] as JsonFile).json.model!,
      },
    ],
  },
  {
    type: EditorGroupType.PREDEFINED,
    name: 'Styles',
    file: filesystem.files['main.css'],
    hideName: true,
    icon: 'carbon-color-palette',
    match: file => file.filename === 'main.css',
    isActive: (file, currentFilename) => currentFilename === 'main.css',
    editors: [
      {
        name: 'CSS',
        model: (file, files) => (files['main.css'] as CssFile).css.model!,
      },
    ],
  },
  {
    type: EditorGroupType.AUTOMATIC,
    icon: 'vscode-icons-file-type-vue',
    name: file => file.filename,
    match: file => file.filename.endsWith('.vue'),
    isActive: (file, currentFilename) => file.filename === currentFilename,
    editors: [
      {
        name: 'Script Setup',
        model: file => (file as SFCFile).script.model!,
      },
      {
        name: 'Template',
        model: file => (file as SFCFile).template.model!,
      },
    ],
  },
  {
    type: EditorGroupType.AUTOMATIC,
    icon: file => file.filename.endsWith('.ts') ? 'vscode-icons-file-type-typescript' : 'vscode-icons-file-type-js',
    name: file => file.filename,
    match: file => file.filename.endsWith('.ts') || file.filename.endsWith('.js'),
    isActive: (file, currentFilename) => file.filename === currentFilename,
    exclude: ['main.ts'],
    editors: [
      {
        name: 'Script',
        model: file => (file as ScriptFile).script.model!,
      },
    ],
  },
  {
    type: EditorGroupType.AUTOMATIC,
    icon: 'vscode-icons-file-type-json',
    name: file => file.filename,
    match: file => file.filename.endsWith('.json'),
    isActive: (file, currentFilename) => file.filename === currentFilename,
    exclude: ['settings.json'],
    editors: [
      {
        name: 'JSON',
        model: file => (file as JsonFile).json.model!,
      },
    ],
  },
  {
    type: EditorGroupType.AUTOMATIC,
    icon: 'vscode-icons-file-type-css',
    name: file => file.filename,
    match: file => file.filename.endsWith('.css'),
    isActive: (file, currentFilename) => file.filename === currentFilename,
    exclude: ['main.css'],
    editors: [
      {
        name: 'CSS',
        model: file => (file as CssFile).css.model!,
      },
    ],
  },
])
