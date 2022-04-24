import type { Ref } from 'vue'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import config from '@playground/config'
import { options, red } from 'kolorist'

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
  const terminal = new Terminal({
    theme: config.terminal.theme.dark,
    fontFamily: config.terminal.fontFamily,
    fontWeight: config.terminal.fontWeight,
    fontSize: config.terminal.fontSize,
    allowTransparency: true,
  })

  const fitAddon = new FitAddon()
  terminal.loadAddon(fitAddon)

  onTerminalCommand(({ type, payload }) => {
    if (type === TerminalCommandType.ERROR)
      terminal.writeln(red(payload.toString()))

    // Handle Terminal Command
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
