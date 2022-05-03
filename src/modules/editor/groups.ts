import { defineEditorGroups } from './types'
import type { CssFile, JsonFile, SFCFile, ScriptFile } from '~/modules/project'

export const groups = defineEditorGroups([
  {
    pinned: true,
    iconOnly: true,
    name: 'Entry',
    icon: 'i-carbon-application',
    match: file => file.filename === 'main.ts',
    editors: [
      {
        name: 'main.ts',
        file: (file, files) => files['main.ts'] as ScriptFile,
        model: (file, files) => (files['main.ts'] as ScriptFile).script.model!,
      },
    ],
  },
  {
    pinned: true,
    iconOnly: true,
    name: 'Styles',
    icon: 'i-carbon-color-palette',
    match: file => file.filename === 'main.css',
    editors: [
      {
        name: 'main.css',
        file: (file, files) => files['main.css'] as CssFile,
        model: (file, files) => (files['main.css'] as CssFile).css.model!,
      },
    ],
  },
  {
    pinned: true,
    iconOnly: true,
    name: 'Unocss',
    icon: 'i-logos-unocss dark:filter-invert',
    match: file => file.filename === 'uno.css' || file.filename === 'unocss.config.ts',
    editors: [
      {
        name: 'unocss.config.ts',
        file: (file, files) => files['unocss.config.ts'] as ScriptFile,
        model: (file, files) => (files['unocss.config.ts'] as ScriptFile).script.model!,
      },
      {
        name: 'Compiled CSS',
        file: (file, files) => files['uno.css'] as CssFile,
        model: (file, files) => (files['uno.css'] as CssFile).css.model!,
      },
    ],
  },
  {
    icon: 'i-vscode-icons-file-type-vue',
    name: file => file.filename,
    match: file => file.filename.endsWith('.vue'),
    editors: [
      {
        name: 'Script Setup',
        file: file => file as SFCFile,
        model: file => (file as SFCFile).script.model!,
      },
      {
        name: 'Template',
        file: file => file as SFCFile,
        model: file => (file as SFCFile).template.model!,
      },
    ],
  },
  {
    icon: file => file.filename.endsWith('.ts') ? 'i-vscode-icons-file-type-typescript' : 'i-vscode-icons-file-type-js',
    name: file => file.filename,
    match: file => (file.filename.endsWith('.ts') || file.filename.endsWith('.js')) && !['main.ts', 'main.js'].includes(file.filename),
    editors: [
      {
        name: 'Script',
        file: file => file as ScriptFile,
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
        file: file => file as JsonFile,
        model: file => (file as JsonFile).json.model!,
      },
    ],
  },
  {
    icon: 'i-vscode-icons-file-type-css',
    name: file => file.filename,
    match: file => file.filename.endsWith('.css') && !['main.css'].includes(file.filename),
    editors: [
      {
        name: 'CSS',
        file: file => file as CssFile,
        model: file => (file as CssFile).css.model!,
      },
    ],
  },
])
