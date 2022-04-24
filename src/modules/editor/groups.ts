import { defineEditorGroups } from './types'
import type { CssFile, JsonFile, SFCFile, ScriptFile } from '~/modules/project'

export const groups = defineEditorGroups([
  {
    pinned: true,
    iconOnly: true,
    name: 'Entry',
    icon: 'carbon-application',
    match: file => file.filename === 'main.ts',
    editors: [
      {
        name: 'Script',
        model: (file, files) => (files['main.ts'] as ScriptFile).script.model!,
      },
    ],
  },
  {
    pinned: true,
    iconOnly: true,
    name: 'Styles',
    icon: 'carbon-color-palette',
    match: file => file.filename === 'main.css',
    editors: [
      {
        name: 'CSS',
        model: (file, files) => (files['main.css'] as CssFile).css.model!,
      },
    ],
  },
  {
    icon: 'vscode-icons-file-type-vue',
    name: file => file.filename,
    match: file => file.filename.endsWith('.vue'),
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
    icon: file => file.filename.endsWith('.ts') ? 'vscode-icons-file-type-typescript' : 'vscode-icons-file-type-js',
    name: file => file.filename,
    match: file => (file.filename.endsWith('.ts') || file.filename.endsWith('.js')) && !['main.ts', 'main.js'].includes(file.filename),
    editors: [
      {
        name: 'Script',
        model: file => (file as ScriptFile).script.model!,
      },
    ],
  },
  {
    icon: 'vscode-icons-file-type-json',
    name: file => file.filename,
    match: file => file.filename.endsWith('.json'),
    editors: [
      {
        name: 'JSON',
        model: file => (file as JsonFile).json.model!,
      },
    ],
  },
  {
    icon: 'vscode-icons-file-type-css',
    name: file => file.filename,
    match: file => file.filename.endsWith('.css') && !['main.css'].includes(file.filename),
    editors: [
      {
        name: 'CSS',
        model: file => (file as CssFile).css.model!,
      },
    ],
  },
])
