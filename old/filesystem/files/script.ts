import { Document } from './document'
import type { FileOptions } from './base'
import { BaseFile } from './base'

export interface ScriptFileOptions extends FileOptions {
  initialScriptContent?: string
}

export class ScriptFile extends BaseFile {
  public script: Document
  public type = 'script'

  constructor(options: ScriptFileOptions) {
    super(options)

    this.script = new Document(`${this.filename}:script`, {
      onUpdate: () => this.onUpdate(),
      language: 'typescript',
      initialContent: options.initialScriptContent,
    })
  }

  public compiled = {
    js: '',
    css: '',
  }

  public override get documents() {
    return [this.script]
  }

  public override exportDocuments(asPlainText = false) {
    return { script: asPlainText ? this.script.text : this.script.export() }
  }

  public override importDocuments(imports: any) {
    this.script.import(imports.script)
  }

  public override toString() {
    return this.script.text
  }

  public async compile() {
    const { compileFile } = await import('~/modules/compiler')
    const { compiled } = await compileFile(this)
    this.compiled = { ...this.compiled, ...compiled }
  }
}
