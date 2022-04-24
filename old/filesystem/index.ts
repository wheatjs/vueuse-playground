// import type { BaseFile } from './files'

// export const useFilesystemStore = defineStore('filesystem', () => {
//   const files = shallowRef<Record<string, BaseFile>>({})

//   const onFileCreatedHook = createEventHook<string>()
//   const onFileDeletedHook = createEventHook<string>()
//   const onFilesCompiledHook = createEventHook<void>()

//   const createFile = (file: BaseFile) => {
//     files.value[file.filename] = file
//   }

//   const deleteFile = (filename: string) => {
//     delete files.value[filename]
//   }

//   return {
//     files,

//     // Methods
//     createFile,
//     deleteFile,

//     // Event Hooks
//     onFileCreated: onFileCreatedHook.on,
//     onFileDeleted: onFileDeletedHook.on,
//     onFilesCompiled: onFilesCompiledHook.on,
//   }
// })

// import { createEventHook } from '@vueuse/core'
// import mainJsTemplate from './templates/main?raw'
// import maincssTemplate from './templates/main.css?raw'
// import { CssFile, JsonFile, SFCFile, ScriptFile } from './files'
// import type { BaseFile } from './files'

// export interface ExportedFile {
//   filename: string
//   type: string
//   hide: boolean
//   isProtected: boolean
//   documents: Record<string, Blob | string>
// }

// export interface FSFile {
//   filename: string
//   isProtected: boolean
//   hide: boolean
//   content: string
//   compiled: any
// }
// export const SUPPORTED_EXTENSIONS = ['vue', 'css', 'json', 'js', 'ts']

// const shouldUpdatePreviewHook = createEventHook<void>()
// const onFileCreatedHook = createEventHook<string>()
// const onFileDeletedHook = createEventHook<string>()

// interface FS {
//   files: FSFile[]
//   currentFilename: string
//   compilerErrors: (Error | string)[]
//   errors: (Error | string)[]
//   runtimeErrors: (Error | string)[]
//   filenames: string[]
// }

// /**
//  * Although we can't use reactivity directly on our virtual filesystem,
//  * we can "proxy" our reactive object to make some things a little easier
//  */
// export const fs = reactive<FS>({
//   files: [],
//   currentFilename: '',
//   compilerErrors: [],
//   errors: [],
//   runtimeErrors: [],
//   filenames: [],
// })

// /**
//  * Represents a filesystem where we can create, update, and delete files.
//  * This is more complicated than just having normal files as we would like to track
//  * changes using automerge and edit our files via monaco.
//  *
//  * When trying to use Vue's reactivity system with this is caused some major problems with
//  * circular references, so we can't use that here.
//  *
//  * We would like to support different types of files. Each "file" can contain multiple documents,
//  * each document having an automerge instance and a monaco model.
//  */
// class Filesystem {
//   public files: Record<string, BaseFile> = {
//     // 'main.ts': new ScriptFile({
//     //   filename: 'main.ts',
//     //   isProtected: true,
//     //   hide: true,
//     //   onUpdate: filename => this.onUpdate(filename),
//     //   initialScriptContent: mainJsTemplate,
//     // }),
//     // 'main.css': new CssFile({
//     //   filename: 'main.css',
//     //   isProtected: true,
//     //   hide: true,
//     //   onUpdate: filename => this.onUpdate(filename),
//     //   initialCssContent: maincssTemplate,
//     // }),
//     // 'App.vue': new SFCFile({
//     //   filename: 'App.vue',
//     //   isProtected: true,
//     //   onUpdate: filename => this.onUpdate(filename),
//     // }),
//   }

//   private currentFilename = 'App.vue'

//   constructor() {
//     this.compileAllFiles()
//     this.currentFile = 'App.vue'
//   }

//   public async compileAllFiles() {
//     const { compileFile } = await import('~/modules/compiler')

//     for (const file of Object.values(this.files)) {
//       if (file instanceof SFCFile || file instanceof CssFile || file instanceof ScriptFile) {
//         const { compiled } = await compileFile(file)
//         file.compiled = { ...file.compiled, ...compiled }
//       }
//     }

//     this.updateFileMetadata()
//   }

//   private async onUpdate(filename?: string) {
//     const { compileFile } = await import('~/modules/compiler')

//     fs.compilerErrors = []

//     if (filename) {
//       const file = this.files[filename]

//       if (file instanceof SFCFile || file instanceof CssFile || file instanceof ScriptFile) {
//         const { compiled } = await compileFile(file)
//         file.compiled = { ...file.compiled, ...compiled }
//       }
//     }
//     else {
//       await this.compileAllFiles()
//     }

//     setTimeout(() => shouldUpdatePreviewHook.trigger(), 0)

//     fs.currentFilename = this.currentFilename
//     this.updateFileMetadata()
//   }

//   private updateFileMetadata() {
//     fs.files = Object.values(this.files).map(file => ({
//       filename: file.filename,
//       content: file.toString(),
//       hide: file.hide,
//       isProtected: file.isProtected,
//       compiled: 'compiled' in file ? file.compiled : null,
//     }))
//   }

//   public createFile(file: BaseFile, ignore?: boolean) {
//     file.onUpdate = () => this.onUpdate(file.filename)
//     this.files[file.filename] = file
//     this.onUpdate(file.filename)
//     fs.filenames = Object.keys(this.files)

//     if (!ignore)
//       onFileCreatedHook.trigger(file.filename)

//     return this.files[file.filename]
//   }

//   public deleteFile(filename: string, ignore?: boolean) {
//     /**
//      * Only change selected file if the current file being deleted is the selected file
//      */
//     if (this.currentFilename === filename) {
//       const newIndex = fs.filenames.findIndex(x => x === filename) - 1 || fs.filenames.findIndex(x => x === 'App.vue')
//       this.currentFile = this.files[fs.filenames[newIndex]]?.hide ? 'App.vue' : this.files[fs.filenames[newIndex]].filename
//       fs.currentFilename = this.currentFile.filename
//     }

//     delete this.files[filename]

//     this.updateFileMetadata()
//     this.onUpdate()

//     if (!ignore)
//       onFileDeletedHook.trigger(filename)
//   }

//   /**
//    * Since each file can contain multiple documents, this methed will
//    * return all the documents in each file type.
//    */
//   public get documents() {
//     return Object.values(this.files).map(file => file.documents).flat()
//   }

//   // @ts-expect-error Because
//   public get currentFile(): BaseFile {
//     return this.files[this.currentFilename]
//   }

//   public set currentFile(filename: string) {
//     this.currentFilename = filename
//     this.onUpdate()
//   }

//   public exportFile(file: BaseFile, asPlainText = false) {
//     return {
//       filename: file.filename,
//       type: file.type,
//       hide: file.hide,
//       isProtected: file.isProtected,
//       documents: file.exportDocuments(asPlainText),
//     }
//   }

//   public importFile(file: ExportedFile) {
//     if (file.filename in this.files) {
//       this.files[file.filename].importDocuments(file.documents)
//       setTimeout(() => this.onUpdate(file.filename), 0)
//       return
//     }

//     if (file.type === 'sfc') {
//       this.createFile(new SFCFile({
//         filename: file.filename,
//         hide: file.hide,
//         isProtected: file.isProtected,
//       }), true)
//     }
//     else if (file.type === 'script') {
//       this.createFile(new ScriptFile({
//         filename: file.filename,
//         hide: file.hide,
//         isProtected: file.isProtected,
//       }), true)
//     }
//     else if (file.type === 'css') {
//       this.createFile(new CssFile({
//         filename: file.filename,
//         hide: file.hide,
//         isProtected: file.isProtected,
//       }), true)
//     }
//     else if (file.type === 'json') {
//       this.createFile(new JsonFile({
//         filename: file.filename,
//         hide: file.hide,
//         isProtected: file.isProtected,
//       }), true)
//     }

//     this.files[file.filename].importDocuments(file.documents)
//     setTimeout(() => this.onUpdate(file.filename), 100)
//   }

//   public exportFiles(asPlainText = false): ExportedFile[] {
//     return Object.values(this.files).map(file => this.exportFile(file, asPlainText))
//   }

//   public importFiles(files: ExportedFile[]) {
//     files.forEach((file) => {
//       this.importFile(file)
//     })
//   }
// }

// export const filesystem = new Filesystem()
// export const shouldUpdatePreview = shouldUpdatePreviewHook.on
// export const forceUpdatePreview = shouldUpdatePreviewHook.trigger

// export const onFileCreated = onFileCreatedHook.on
// export const onFileDeleted = onFileDeletedHook.on

// filesystem.createFile(new ScriptFile({
//   filename: 'main.ts',
//   isProtected: true,
//   hide: true,
//   initialScriptContent: mainJsTemplate,
// }))
