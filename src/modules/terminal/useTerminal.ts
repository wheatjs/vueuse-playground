import type { Ref } from 'vue'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import config from '@playground/config'
import { options, red, yellow } from 'kolorist'
import { useAppStore } from '~/modules/app'

options.enabled = true
options.supportLevel = 1

export const enum TerminalCommandType {
  LOG,
  WARN,
  ERROR,
  INFO,
  DEBUG,
  CLEAR,
}

const terminalCommand = createEventHook<{ type: TerminalCommandType; payload: any }>()

/**
 * Called when a comamnd is sent to the terminal
 */
export const onTerminalCommand = terminalCommand.on

/**
 * Send command to terminal
 */
export const sendTerminalCommand = terminalCommand.trigger

/**
 * Creates an instance of the global terminal bus.
 * @param target Target element to attach the terminal to.
 */
export function useTerminal(target: Ref<HTMLElement | undefined>) {
  const app = useAppStore()

  const terminal = new Terminal({
    theme: app.isDark ? config.terminal.theme.dark : config.terminal.theme.light,
    fontFamily: config.terminal.fontFamily,
    fontWeight: config.terminal.fontWeight,
    fontSize: config.terminal.fontSize,
    allowTransparency: true,
  })

  watch(() => app.isDark, () => {
    terminal.options.theme = app.isDark ? config.terminal.theme.dark : config.terminal.theme.light
  })

  const fitAddon = new FitAddon()
  terminal.loadAddon(fitAddon)

  onTerminalCommand(({ type, payload }) => {
    if (type === TerminalCommandType.ERROR)
      terminal.writeln(red(payload.toString()))

    if (type === TerminalCommandType.WARN)
      terminal.writeln(yellow(payload.toString()))
  })

  const fit = () => {
    fitAddon.fit()
  }

  watch(target, () => {
    const el = unref(target)

    if (el)
      terminal.open(el)
  }, { immediate: true })

  return {
    terminal,
    fit,
  }
}
