import { definePreset } from '../types'
import mainStyle from '../default/templates/main.css?raw'
import mainTemplate from './templates/main.ts?raw'
import { CssFile, SFCFile, ScriptFile } from '~/modules/project/filesystem/files'

export default definePreset({
  name: 'vue-router',
  description: 'Default template with vue-router installed.',
  defaultFile: 'App.vue',
  files: [
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
    '@vueuse/core': 'latest',
    'vue-router': 'latest',
  },
})
