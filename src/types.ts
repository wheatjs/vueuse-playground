import type { TerminalConfig } from '~/modules/terminal'
import type { EditorConfig } from '~/modules/editor'
import type { PacakgesConfig } from '~/modules/packages'
import type { PlagroundFirebaseOptions } from '~/modules/firebase'

export interface VueUsePlaygroundConfig {
  terminal: TerminalConfig
  editor: EditorConfig
  packages: PacakgesConfig
  firebase: PlagroundFirebaseOptions
}

export function defineConfig(config: VueUsePlaygroundConfig) {
  return config
}
