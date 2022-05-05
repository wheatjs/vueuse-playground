import type { Document } from './document'

export interface FileOptions {
  onUpdate?: (filename: string) => void

  isPinned?: boolean

  /**
   * The name of the file including the extension
   */
  filename: string

  /**
   * Indicates if the file can be deleted by the user in the user interface.
   */
  isProtected?: boolean

  /**
   * Indicate if the file is readonly. If the file is readonly it will
   * skip being compiled to prevent infinite loops when writing to.
   */
  readOnly?: boolean

  /**
   * If true, the file will be treated as a module that can be imported
   * via `import {} from 'filename'` rather than `import {} from './filename'`
  */
  asModule?: boolean

  /**
   * When exporting the file, if this field is set the file will be placed in the specified directory.
   */
  dir?: string
}

export class BaseFile {
  public filename: string
  public isProtected: boolean
  public isPinned: boolean
  public type = 'base'
  public readOnly: boolean
  public asModule: boolean
  public dir: string

  protected _onUpdate: ((filename: string) => void) | undefined

  public compiled = {}

  constructor(options: FileOptions) {
    this.filename = options.filename
    this.isProtected = options.isProtected || false
    this._onUpdate = options.onUpdate
    this.isPinned = options.isPinned || false
    this.readOnly = options.readOnly || false
    this.asModule = options.asModule || false
    this.dir = options.dir || ''
  }

  public get documents(): Document[] {
    return []
  }

  public exportDocuments(): Record<string, Blob | string> {
    return {}
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public importDocuments(imports: any) {}

  public async compile() {

  }

  public onUpdate() {
    if (this._onUpdate)
      this._onUpdate(this.filename)
  }

  public destroy() {
    this.documents.forEach(doc => doc.destroy())
  }

  public toString() {
    return ''
  }
}
