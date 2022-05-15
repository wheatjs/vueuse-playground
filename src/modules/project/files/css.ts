import { Document } from './document'
import type { FileOptions } from './base'
import { BaseFile } from './base'

export interface CssFileOptions extends FileOptions {
  style?: string
}

export class CssFile extends BaseFile {
  public css: Document
  public type = 'css'

  public compiled = {
    css: '',
    js: '',
  }

  constructor(options: CssFileOptions) {
    super(options)

    this.css = new Document(`${this.filename}:css`, {
      onUpdate: () => this.onUpdate(),
      language: 'css',
      initialContent: options.style,
    })
  }

  public override get documents() {
    return [this.css]
  }

  public override exportDocuments() {
    return { style: this.css.toString() }
  }

  public override importDocuments(imports: any) {
    this.css.import(imports.css)
  }

  public override toString() {
    return this.css.toString()
  }
}
