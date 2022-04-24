import type { Document } from './document'

export interface FileOptions {
  filename: string
  hide?: boolean
  isProtected?: boolean
  onUpdate?: (filename: string) => void
}

export class BaseFile {
  public filename: string
  public isProtected: boolean
  public hide: boolean
  public type = 'base'

  _onUpdate: ((filename: string) => void) | undefined

  constructor(options: FileOptions) {
    this.filename = options.filename
    this.isProtected = options.isProtected || false
    this._onUpdate = options.onUpdate
    this.hide = options.hide || false
  }

  public get documents(): Document[] {
    return []
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public exportDocuments(asPlainText = false): Record<string, Blob | string> {
    return {}
  }

  // esling-disable-next-line @typescript-eslint/no-unused-vars
  public importDocuments(imports: any) {
  }

  public get content() {
    return this.toString()
  }

  public onUpdate() {
    if (this._onUpdate)
      this._onUpdate(this.filename)
  }
}
