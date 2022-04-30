import { definePreset } from '../types'
import mainTemplate from './templates/main.ts?raw'
import mainStyle from './templates/main.css?raw'
import { CssFile, SFCFile, ScriptFile } from '~/modules/project/files'

export default definePreset({
  name: 'Default',
  featured: true,
  icon: 'i-logos-vueuse',
  description: 'A template with just Vue and VueUse installed.',
  defaultFile: 'App.vue',
  files: () => [
    new ScriptFile({
      filename: 'main.ts',
      isProtected: true,
      hide: true,
      initialScriptContent: mainTemplate,
    }),
    new CssFile({
      filename: 'main.css',
      isProtected: true,
      hide: true,
      initialCssContent: mainStyle,
    }),
    new SFCFile({
      filename: 'App.vue',
      isProtected: true,
    }),
  ],
  packages: {
    'vue': 'latest',
    '@vueuse/core': 'latest',
  },
})
