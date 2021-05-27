import { reactive, watchEffect, watch } from 'vue'
import { compileFile, MAIN_FILE } from './sfcCompiler'

const welcomeCode = `
<script setup>
</script>
<template>
</template>
`.trim()

export class File {
  filename: string
  code: string
  compiled = {
    js: '',
    css: '',
    ssr: ''
  }
  constructor(filename: string, code = '') {
    this.filename = filename
    this.code = code
  }
}

interface Store {
  files: Record<string, File>
  scriptContent: string,
  templateContent: string,
  activeFilename: string
  readonly activeFile: File
  readonly importMap: string | undefined
  errors: (string | Error)[]
}

const files: any = {
  [MAIN_FILE]: new File(MAIN_FILE, welcomeCode)
}

export const store: Store = reactive({
  files,
  scriptContent: '',
  templateContent: '',
  activeFilename: MAIN_FILE,
  errors: [],
  get activeFile() {
    return store.files[MAIN_FILE]
  },
  get importMap() {
    return `
      {
        "imports": {
          "@vueuse/core": "https://unpkg.com/@vueuse/core/dist/index.esm.js",
          "@vueuse/shared": "https://unpkg.com/@vueuse/shared/dist/index.esm.js",
          "vue-demi": "https://unpkg.com/vue-demi/lib/index.esm.js"
        }
      }
    `
  }
})

watch(() => [store.scriptContent, store.templateContent], () => {
  store.activeFile.code = `
    <script setup>
      ${store.scriptContent}
    </script>
    <template>
      ${store.templateContent}
    </template>
    <style>
      html,
      body {
        color: white;
      }
    </style>
  `
}, {})

watchEffect(() => compileFile(store.activeFile))

// import { reactive, watchEffect } from 'vue'
// import { compileFile, MAIN_FILE } from './sfcCompiler'

// const welcomeCode = `
// <script setup>
// import { useMouse } from '@vueuse/core'

// const { x, y } = useMouse()
// </script>
// <template>
//   X: {{ x }}
//   Y: {{ y }}
// </template>
// `.trim()



// interface Store {
//   files: Record<string, File>
//   activeFilename: string
//   readonly activeFile: File
//   readonly importMap: string | undefined
//   errors: (string | Error)[]
// }

// let files: Store['files'] = {}

// const savedFiles = location.hash.slice(1)
// if (savedFiles) {
//   const saved = JSON.parse(atob(savedFiles))
//   for (const filename in saved) {
//     files[filename] = new File(filename, saved[filename])
//   }
// } else {
//   files = {
//     'App.vue': new File('MAIN_FILE', welcomeCode)
//   }
// }

// export const store: Store = reactive({
//   files,
//   activeFilename: MAIN_FILE,
//   get activeFile() {
//     return store.files[store.activeFilename]
//   },
//   get importMap() {
//     const file = store.files['import-map.json']
//     return file && file.code
//   },
//   errors: []
// })

// watchEffect(() => compileFile(store.activeFile))

// for (const file in store.files) {
//   if (file !== MAIN_FILE) {
//     compileFile(store.files[file])
//   }
// }

// watchEffect(() => {
//   history.replaceState({}, '', '#' + btoa(JSON.stringify(exportFiles())))
// })

// export function exportFiles() {
//   const exported: Record<string, string> = {}
//   for (const filename in store.files) {
//     exported[filename] = store.files[filename].code
//   }
//   return exported
// }

// export function setActive(filename: string) {
//   store.activeFilename = filename
// }

// export function addFile(filename: string) {
//   const file = (store.files[filename] = new File(filename))

//   if (filename === 'import-map.json') {
//     file.code = `
// {
//   "imports": {
//     "@vueuse/core": "https://unpkg.com/@vueuse/core/dist/index.esm.js",
//     "@vueuse/shared": "https://unpkg.com/@vueuse/shared/dist/index.esm.js",
//     "vue-demi": "https://unpkg.com/vue-demi/lib/index.esm.js"
//   }
// }`.trim()
//   }

//   setActive(filename)
// }
