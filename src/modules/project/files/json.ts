import { Document } from './document'
import type { FileOptions } from './base'
import { BaseFile } from './base'

export interface JsonFileOptions extends FileOptions {
  json?: string
}

export class JsonFile extends BaseFile {
  public json: Document
  public type = 'json'

  constructor(options: JsonFileOptions) {
    super(options)

    this.json = new Document(`${this.filename}:json`, {
      onUpdate: () => this.onUpdate(),
      language: 'json',
      initialContent: options.json,
    })
  }

  public override get documents() {
    return [this.json]
  }

  public override exportDocuments(asPlainText = false) {
    return { json: asPlainText ? this.json.text : this.json.export() }
  }

  public override importDocuments(imports: any) {
    this.json.import(imports.json)
  }

  public override toString() {
    return this.json.text
  }

  public get compiled() {
    return {
      json: this.json.text,
      js: `export default ${JSON.parse(JSON.stringify(this.json.text))}`,
    }
  }
}
