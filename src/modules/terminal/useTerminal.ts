import type { Ref } from 'vue'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import config from '@playground/config'

export const enum TerminalCommandType {
  LOG,
  WARN,
  ERROR,
  INFO,
  DEBUG,
  CLEAR,
}

const terminalCommand = createEventHook<{ type: TerminalCommandType; payload: string[] }>()

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
    fontFamily: config.terminal.fontFamily,
    fontWeight: config.terminal.fontWeight,
    fontSize: config.terminal.fontSize,
    lineHeight: config.terminal.lineHeight,
    letterSpacing: config.terminal.letterSpacing,
  })

  const fitAddon = new FitAddon()
  terminal.loadAddon(fitAddon)

  onTerminalCommand(() => {
    // Handle Terminal Command
  })

  watch(target, () => {
    const el = unref(target)

    if (el)
      terminal.open(el)
  })

  return {
    terminal,
    fit: fitAddon.fit,
  }
}
