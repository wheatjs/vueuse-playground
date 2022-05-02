import type { editor as Editor } from 'monaco-editor'
import { createEventHook } from '@vueuse/core'
import { createWorkers } from '~/modules/editor/monaco/setup'

interface DocumentOptions {
  onUpdate?: () => void
  language?: string
  initialContent?: string
}

export class Document {
  public name: string
  public model: Editor.ITextModel | null = null
  public doc: any
  private onUpdate: any
  private onDocumentChangeHook = createEventHook<{ name: string; changes: Blob }>()
  private hasModelLoaded = ref(false)

  public onDocumentChange = this.onDocumentChangeHook.on

  constructor(name: string, options: DocumentOptions) {
    this.name = name
    this.onUpdate = options.onUpdate
    this.onDocumentChange = this.onDocumentChange.bind(this)
    this.import = this.import.bind(this)

    import('monaco-editor')
      .then((monaco) => {
        if (!monaco)
          return

        createWorkers()
          .then(() => {
            if (monaco.editor.getModel(monaco.Uri.file(this.name))) {
              this.model = monaco.editor.getModel(monaco.Uri.file(this.name))

              if (options.initialContent)
                this.model?.setValue(options.initialContent)
            }
            else { this.model = monaco.editor.createModel(options.initialContent || '', options.language, monaco.Uri.file(this.name)) }
            this.hasModelLoaded.value = true
            this.bindModel()
          })
      })
  }

  public bindModel() {
    this.model?.onDidChangeContent(() => {
      this.publishUpdates()
    })
  }

  private publishUpdates() {
    if (this.onUpdate)
      this.onUpdate()
  }

  public toString() {
    if (this.model)
      return this.model.getValue().toString()

    return ''
  }

  public export() {
    return this.model?.getValue()
  }

  public async import(data: string) {
    // this.doc = automerge.from({ text: new automerge.Text(data) })
    this.model?.setValue(data)
  }

  public destroy() {
    this.model?.dispose()
  }
}
