// import { reactive, watchEffect, watch } from 'vue'
// import * as defaultCompiler from '@vue/compiler-sfc'
// import { compileFile } from './logic/compiler/sfcCompiler'

// const demos = import.meta.glob('../demos/**/*.vue')

// export class File {
//   filename: string
//   scriptContent: string
//   templateContent: string
//   compiled = {
//     js: '',
//     css: '',
//     ssr: '',
//   }

//   constructor(filename: string, scriptContent: string, templateContent: string) {
//     this.filename = filename
//     this.scriptContent = scriptContent
//     this.templateContent = templateContent
//   }

//   get code() {
//     return `
//       <script setup>${this.scriptContent}</script>
//       <template>${this.templateContent}</template>
//     `
//   }
// }

// interface Package {
//   name: string
//   description: string
//   url: string
// }

// interface Store {
//   packages: Package[]
//   files: Record<string, File>
//   scriptContent: string
//   templateContent: string
//   activeFilename: string
//   readonly activeFile: File
//   readonly importMap: string | undefined
//   errors: (string | Error)[]
// }

// const files: any = {
//   'App.vue': new File('App.vue', '', ''),
// }

// let savedState = {}

// if (location.hash.slice(1))
//   savedState = JSON.parse(atob(location.hash.slice(1)))

// export const store: Store = reactive({
//   packages: [
//     {
//       name: 'vue-demi',
//       description: 'Vue Demi (half in French) is a developing utility allows you to write Universal Vue Libraries for Vue 2 & 3',
//       url: 'https://unpkg.com/vue-demi/lib/index.esm.js',
//     },
//     {
//       name: '@vueuse/shared',
//       description: 'Shared VueUse utilities.',
//       url: 'https://unpkg.com/@vueuse/shared/dist/index.esm.js',
//     },
//     {
//       name: '@vueuse/core',
//       description: 'Collection of essential Vue Composition Utilities',
//       url: 'https://unpkg.com/@vueuse/core/dist/index.esm.js',
//     },
//   ],
//   files,
//   scriptContent: '',
//   templateContent: '',
//   activeFilename: 'App.vue',
//   errors: [],
//   get activeFile() {
//     return store.files['App.vue']
//   },
//   get importMap() {
//     const imports = store.packages.map(({ name, url }) => `"${name}": "${url}"`)

//     return `
//       {
//         "imports": {
//           ${imports.join(',\n')}
//         }
//       }
//     `
//   },
//   ...savedState,
// })

// // watch(() => [store.scriptContent, store.templateContent], () => {
// //   store.activeFile.templateContent = 
// //   store.activeFile.code = `
// //     <script setup>
// //       ${store.scriptContent}
// //     </script>
// //     <template>
// //       ${store.templateContent}
// //     </template>
// //   `
// // }, { immediate: true })

// export function exportState() {
//   return btoa(JSON.stringify({
//     packages: store.packages,
//     scriptContent: store.scriptContent,
//     templateContent: store.templateContent,
//   }))
// }

// watchEffect(() => compileFile(store.activeFile))

// // console.log(demos)

// export async function loadDemo(demo: string) {
//   const modules = (await Promise.all(Object.entries(demos)
//     .filter(([path]) => path.split('demos/')[1].split('/')[0] === demo)
//     .map(async([path]) => ([path, (await import(/* @vite-ignore */ `${path}?raw`)).default]))))
//     .map(([path, content]) => {
//       const { descriptor: { template, scriptSetup } } = defaultCompiler.parse(content)
//       return {
//         filename: path.split(`${demo}/`)[1],
//         scriptContent: scriptSetup?.content,
//         templateContent: template?.content,
//       }
//     })

//   console.log(modules)
// }

// loadDemo('default')
