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
      hide: true,
      script: mainTemplate,
    },
    {
      filename: 'main.css',
      isProtected: true,
      hide: true,
      style: mainStyle,
    },
    {
      filename: 'App.vue',
      isProtected: true,
      script: mainAppScript,
      template: mainAppTemplate,
    },
    {
      filename: 'store.ts',
      script: mainStore,
    },
  ],
  packages: {
    'vue': 'latest',
    '@vueuse/core': 'latest',
    'pinia': 'latest',
  },
})
