// ReplProxy and srcdoc implementation from Svelte REPL
// MIT License https://github.com/sveltejs/svelte-repl/blob/master/LICENSE

let uid = 1

export interface PreviewProxyHandlers {
  onError: (args: any) => void
  onFetchProgress: (args: any) => void
  onConsole: (args: any) => void
  onConsoleGroup: (args: any) => void
  onConsoleGroupCollapsed: (args: any) => void
  onConsoleGroupEnd: (args: any) => void
  onUnhandledRejection: (args: any) => void
}

export class PreviewProxy {
  iframe: HTMLIFrameElement
  handlers: PreviewProxyHandlers
  pending_cmds: Map<
  number,
  { resolve: (value: unknown) => void; reject: (reason?: any) => void }
  >

  handle_event: (e: any) => void

  constructor(iframe: HTMLIFrameElement, handlers: PreviewProxyHandlers) {
    this.iframe = iframe
    this.handlers = handlers

    this.pending_cmds = new Map()

    this.handle_event = e => this.handle_repl_message(e)
    window.addEventListener('message', this.handle_event, false)
  }

  destroy() {
    window.removeEventListener('message', this.handle_event)
  }

  iframe_command(action: string, args: any) {
    return new Promise((resolve, reject) => {
      const cmd_id = uid++

      this.pending_cmds.set(cmd_id, { resolve, reject })

      if (this.iframe.contentWindow)
        this.iframe.contentWindow!.postMessage({ action, cmd_id, args }, '*')
    })
  }

  handle_command_message(cmd_data: any) {
    const action = cmd_data.action
    const id = cmd_data.cmd_id
    const handler = this.pending_cmds.get(id)

    if (handler) {
      this.pending_cmds.delete(id)
      if (action === 'cmd_error') {
        const { message, stack } = cmd_data
        const e = new Error(message)
        e.stack = stack
        handler.reject(e)
      }

      if (action === 'cmd_ok')
        handler.resolve(cmd_data.args)
    }
    else {
      console.error('command not found', id, cmd_data, [
        ...this.pending_cmds.keys(),
      ])
    }
  }

  handle_repl_message(event: any) {
    if (event.source !== this.iframe.contentWindow)
      return

    const { action, args } = event.data

    switch (action) {
      case 'cmd_error':
      case 'cmd_ok':
        return this.handle_command_message(event.data)
      case 'fetch_progress':
        return this.handlers.onFetchProgress(args.remaining)
      case 'error':
        return this.handlers.onError(event.data)
      case 'unhandledrejection':
        return this.handlers.onUnhandledRejection(event.data)
      case 'console':
        return this.handlers.onConsole(event.data)
      case 'console_group':
        return this.handlers.onConsoleGroup(event.data)
      case 'console_group_collapsed':
        return this.handlers.onConsoleGroupCollapsed(event.data)
      case 'console_group_end':
        return this.handlers.onConsoleGroupEnd(event.data)
    }
  }

  eval(script: string | string[]) {
    return this.iframe_command('eval', { script })
  }

  handle_links() {
    return this.iframe_command('catch_clicks', {})
  }
}
