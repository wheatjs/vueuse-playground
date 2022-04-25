import type { ProjectConfig } from './modules/project'
import type { TerminalConfig } from '~/modules/terminal'
import type { EditorConfig } from '~/modules/editor'
import type { PreviewConfig } from '~/modules/preview'
import type { PlagroundFirebaseOptions } from '~/modules/firebase'

export interface VueUsePlaygroundConfig {
  terminal: TerminalConfig
  editor: EditorConfig
  project: ProjectConfig
  firebase: PlagroundFirebaseOptions
  preview: PreviewConfig
}

export function defineConfig(config: VueUsePlaygroundConfig) {
  return config
}
