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
      template: appTemplate,
      dir: 'src/',
    },
    {
      filename: 'Home.vue',
      isProtected: true,
      template: homeTemplate,
      dir: 'src/',
    },
    {
      filename: 'About.vue',
      isProtected: true,
      template: aboutTemplate,
      dir: 'src/',
    },
  ],
  packages: {
    'vue': 'latest',
    '@vueuse/core': 'latest',
    'vue-router': 'latest',
    '@unocss/reset': 'latest',
  },
})
