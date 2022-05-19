interface DocumentOptions {
  onUpdate?: () => void
  language?: string
  initialContent?: string
}

export class Document {
  public name: string
  public language: string
  private onUpdate: any
  private text: string
  private documentDisposedHook = createEventHook<string>()
  private documentChangedHook = createEventHook<string>()
  public onDocumentDisposed = this.documentDisposedHook.on
  public onDidChangeContent = this.documentChangedHook.on

  constructor(name: string, options: DocumentOptions) {
    this.name = name
    this.onUpdate = options.onUpdate
    this.text = options.initialContent || ''
    this.import = this.import.bind(this)
    this.language = options.language || ''
  }

  private publishUpdates() {
    if (this.onUpdate)
      this.onUpdate()
  }

  public setValue(value: string, source = 'unknown') {
    this.text = value
    this.publishUpdates()
    this.documentChangedHook.trigger(source)
  }

  public toString() {
    return this.text
  }

  public export() {
    return this.text
  }

  public async import(data: string) {
    this.setValue(data)
  }

  public destroy() {
    this.documentDisposedHook.trigger(this.name)
    // this.model?.dispose()
  }
}
