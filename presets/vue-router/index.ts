import { definePreset } from '../types'
import mainStyle from '../default/templates/main.css?raw'
import mainTemplate from './templates/main.ts?raw'

import appTemplate from './templates/App_Template.html?raw'
import homeTemplate from './templates/Home_Template.html?raw'
import aboutTemplate from './templates/About_Template.html?raw'

import { CssFile, SFCFile, ScriptFile } from '~/modules/project/files'

export default definePreset({
  name: 'Vue Router',
  description: 'Default template with vue-router installed.',
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
      initialTemplateContent: appTemplate,
    }),
    new SFCFile({
      filename: 'Home.vue',
      isProtected: true,
      initialTemplateContent: homeTemplate,
    }),
    new SFCFile({
      filename: 'About.vue',
      isProtected: true,
      initialTemplateContent: aboutTemplate,
    }),
  ],
  packages: {
    '@vueuse/core': 'latest',
    'vue-router': 'latest',
  },
})
