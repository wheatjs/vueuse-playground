import { definePreset } from '../types'
import mainScript from './templates/main.ts?raw'
import mainStyle from './templates/main.css?raw'

export default definePreset({
  name: 'Default',
  featured: true,
  icon: 'i-logos-vueuse',
  description: 'A template with just Vue and VueUse installed.',
  defaultFile: 'App.vue',
  files: [
    {
      filename: 'main.ts',
      isProtected: true,
      hide: true,
      script: mainScript.replace('// EXTRA_IMPORTS', '').replace('// EXTRA_APP_MODIFICATIONS', ''),
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
    },
  ],
  packages: {
    'vue': 'latest',
    '@vueuse/core': 'latest',
  },
})
