import { reactive, watchEffect, watch } from 'vue'
import { compileFile, MAIN_FILE } from './logic/compiler/sfcCompiler'

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

interface Package {
  name: string
  description: string
  url: string
}

interface Store {
  packages: Package[],
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

let savedState = {}

if (location.hash.slice(1)) {
  savedState = JSON.parse(atob(location.hash.slice(1)))
}


export const store: Store = reactive({
  packages: [
    {
      name: 'vue-demi',
      description: 'Vue Demi (half in French) is a developing utility allows you to write Universal Vue Libraries for Vue 2 & 3',
      url: 'https://unpkg.com/vue-demi/lib/index.esm.js',
    },
    {
      name: '@vueuse/shared',
      description: 'Shared VueUse utilities.',
      url: 'https://unpkg.com/@vueuse/shared/dist/index.esm.js'
    },
    {
      name: '@vueuse/core',
      description: 'Collection of essential Vue Composition Utilities',
      url: 'https://unpkg.com/@vueuse/core/dist/index.esm.js',
    }
  ],
  files,
  scriptContent: '',
  templateContent: '',
  activeFilename: 'App.vue',
  errors: [],
  get activeFile() {
    return store.files['App.vue']
  },
  get importMap() {
    const imports = store.packages.map(({ name, url }) => `"${name}": "${url}"`)

    return `
      {
        "imports": {
          ${imports.join(',\n')}
        }
      }
    `
  },
  ...savedState
})
let count = 0
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
}, { immediate: true })

export function exportState() {
  return btoa(JSON.stringify({
    packages: store.packages,
    scriptContent: store.scriptContent,
    templateContent: store.templateContent,
  }))
}

// watch(() => [store.scriptContent, store.templateContent, store.packages], 
//   )
watchEffect(() => compileFile(store.activeFile))
