import { Document } from './document'
import type { FileOptions } from './base'
import { BaseFile } from './base'

export interface CssFileOptions extends FileOptions {
  initialCssContent?: string
}

export class CssFile extends BaseFile {
  public css: Document
  public type = 'css'

  constructor(options: CssFileOptions) {
    super(options)

    this.css = new Document(`${this.filename}:css`, {
      onUpdate: () => this.onUpdate(),
      language: 'css',
      initialContent: options.initialCssContent,
    })
  }

  public override get documents() {
    return [this.css]
  }

  public override exportDocuments(asPlainText = false) {
    return { css: asPlainText ? this.css.text : this.css.export() }
  }

  public override importDocuments(imports: any) {
    this.css.import(imports.css)
  }

  public override toString() {
    return this.css.text
  }

  public compiled = {
    css: '',
    js: '',
  }

  // public get compiled() {
  //   return {
  //     css: this.css.text,
  //     js: '',
  //   }
  // }
}
