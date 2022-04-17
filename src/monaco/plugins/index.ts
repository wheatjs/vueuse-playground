import type { EditorPlugin } from './types'
import { PackageInstallerPlugin } from './package-installer'

export const Plugins: EditorPlugin[] = [
  PackageInstallerPlugin,
]
