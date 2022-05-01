import { definePreset } from '../types'
import mainTemplate from './templates/main.ts?raw'
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
      initialScriptContent: mainTemplate,
    },
    {
      filename: 'main.css',
      isProtected: true,
      hide: true,
      initialStyleContent: mainStyle,
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
