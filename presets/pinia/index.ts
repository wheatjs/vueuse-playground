import { definePreset } from '../types'
import mainTemplate from './templates/main.ts?raw'
import mainStyle from './templates/main.css?raw'
import mainAppScript from './templates/App_script?raw'
import mainAppTemplate from './templates/App_template.html?raw'
import mainStore from './templates/store?raw'

export default definePreset({
  name: 'Pinia',
  featured: true,
  icon: 'i-custom-pinia',
  description: 'Template with Pinia pre-installed.',
  defaultFile: 'App.vue',
  files: [
    {
      filename: 'main.ts',
      isProtected: true,
      isPinned: true,
      script: mainTemplate,
      dir: 'src/',
    },
    {
      filename: 'main.css',
      isProtected: true,
      isPinned: true,
      style: mainStyle,
      dir: 'src/',
    },
    {
      filename: 'uno.css',
      isProtected: true,
      isPinned: true,
      readOnly: true,
      asModule: true,
    },
    {
      filename: 'unocss.config.ts',
      isProtected: true,
      isPinned: true,
    },
    {
      filename: 'App.vue',
      isProtected: true,
      script: mainAppScript,
      template: mainAppTemplate,
      dir: 'src/',
    },
    {
      filename: 'store.ts',
      script: mainStore,
      dir: 'src/',
    },
  ],
  packages: {
    'vue': 'latest',
    '@vueuse/core': 'latest',
    'pinia': 'latest',
    '@unocss/reset': 'latest',
  },
})
