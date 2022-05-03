import { definePreset } from '../types'
import mainScript from './templates/main.ts?raw'
import mainStyle from './templates/main.css?raw'
import unoConfig from './templates/unocss.config?raw'

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
      isPinned: true,
      script: mainScript.replace('// EXTRA_IMPORTS', '').replace('// EXTRA_APP_MODIFICATIONS', ''),
    },
    {
      filename: 'main.css',
      isProtected: true,
      isPinned: true,
      style: mainStyle,
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
      script: unoConfig,
    },
    {
      filename: 'App.vue',
      isProtected: true,
    },
  ],
  packages: {
    'vue': 'latest',
    '@vueuse/core': 'latest',
    '@unocss/reset': 'latest',
  },
})
