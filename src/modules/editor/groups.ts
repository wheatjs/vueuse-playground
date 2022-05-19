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
        document: (file, files) => (files['main.ts'] as ScriptFile).script,
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
        document: (file, files) => (files['main.css'] as CssFile).css,
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
        document: (file, files) => (files['unocss.config.ts'] as ScriptFile).script,
      },
      {
        name: 'Compiled CSS',
        file: (file, files) => files['uno.css'] as CssFile,
        document: (file, files) => (files['uno.css'] as CssFile).css,
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
        document: file => (file as SFCFile).script,
      },
      {
        name: 'Template',
        file: file => file as SFCFile,
        document: file => (file as SFCFile).template,
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
        document: file => (file as ScriptFile).script,
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
        document: file => (file as JsonFile).json,
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
        document: file => (file as CssFile).css,
      },
    ],
  },
])
