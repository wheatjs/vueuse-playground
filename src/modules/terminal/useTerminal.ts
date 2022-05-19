export const enum TerminalCommandType {
  LOG,
  WARN,
  ERROR,
  INFO,
  DEBUG,
  CLEAR,
}

const consoleCommand = createEventHook<any>()

export const onConsoleCommand = consoleCommand.on
export const sendConsoleCommand = consoleCommand.trigger

const terminalCommand = createEventHook<{ type: TerminalCommandType; payload: any }>()

/**
 * Called when a comamnd is sent to the terminal
 */
export const onTerminalCommand = terminalCommand.on

/**
 * Send command to terminal
 */
export const sendTerminalCommand = terminalCommand.trigger
