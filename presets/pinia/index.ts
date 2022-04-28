import { definePreset } from '../types'
import mainTemplate from './templates/main.ts?raw'
import mainStyle from './templates/main.css?raw'
import mainAppScript from './templates/App_script?raw'
import mainAppTemplate from './templates/App_template.html?raw'
import mainStore from './templates/store?raw'
import { CssFile, SFCFile, ScriptFile } from '~/modules/project/files'

export default definePreset({
  name: 'Pinia',
  description: 'The default project with pinia.',
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
      initialScriptContent: mainAppScript,
      initialTemplateContent: mainAppTemplate,
    }),
    new ScriptFile({
      filename: 'store.ts',
      initialScriptContent: mainStore,
    }),
  ],
  packages: {
    'vue': 'latest',
    '@vueuse/core': 'latest',
    'pinia': 'latest',
  },
})
