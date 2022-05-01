import { definePreset } from '../types'
import mainStyle from '../default/templates/main.css?raw'
import mainTemplate from './templates/main.ts?raw'

import appTemplate from './templates/App_Template.html?raw'
import homeTemplate from './templates/Home_Template.html?raw'
import aboutTemplate from './templates/About_Template.html?raw'

export default definePreset({
  name: 'Vue Router',
  featured: true,
  icon: 'i-logos-vue',
  description: 'A template with Vue Router pre-installed.',
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
      initialTemplateContent: appTemplate,
    },
    {
      filename: 'Home.vue',
      isProtected: true,
      initialTemplateContent: homeTemplate,
    },
    {
      filename: 'About.vue',
      isProtected: true,
      initialTemplateContent: aboutTemplate,
    },
  ],
  packages: {
    'vue': 'latest',
    '@vueuse/core': 'latest',
    'vue-router': 'latest',
  },
})
