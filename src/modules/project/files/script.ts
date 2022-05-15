import { Document } from './document'
import type { FileOptions } from './base'
import { BaseFile } from './base'

export interface ScriptFileOptions extends FileOptions {
  script?: string
}

export class ScriptFile extends BaseFile {
  public script: Document
  public type = 'script'

  public compiled = {
    js: '',
    css: '',
    dts: '',
    uno: '',
  }

  constructor(options: ScriptFileOptions) {
    super(options)

    this.script = new Document(`${this.filename}`, {
      onUpdate: () => this.onUpdate(),
      language: 'typescript',
      initialContent: options.script,
    })
  }

  public override get documents() {
    return [this.script]
  }

  public override exportDocuments() {
    return { script: this.script.toString() }
  }

  public override importDocuments(imports: any) {
    this.script.import(imports.script)
  }

  public override toString() {
    return this.script.toString()
  }
}
