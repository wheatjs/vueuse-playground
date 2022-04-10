import type { FontWeight, ITheme } from 'xterm'

export interface TerminalConfig {

  fontFamily?: string
  fontSize?: number
  fontWeight?: FontWeight
  lineHeight?: number
  letterSpacing?: number

  theme: {
    dark: ITheme
    light: ITheme
  }

}
