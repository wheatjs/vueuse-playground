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
  'App.vue': new File('App.vue', welcomeCode)
}

export const store: Store = reactive({
  files,
  scriptContent: '',
  templateContent: '',
  activeFilename: 'App.vue',
  errors: [],
  get activeFile() {
    return store.files['App.vue']
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
