import type { TerminalConfig } from '~/modules/terminal'
import type { EditorConfig } from '~/modules/editor'
import type { PacakgesConfig } from '~/modules/packages'

export interface VueUsePlaygroundConfig {

  terminal: TerminalConfig
  editor: EditorConfig
  packages: PacakgesConfig

}

export function defineConfig(config: VueUsePlaygroundConfig) {
  return config
}
