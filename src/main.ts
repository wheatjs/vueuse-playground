import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Routes from 'virtual:generated-pages'
import { createPinia } from 'pinia'
import App from './App.vue'

import 'splitpanes/dist/splitpanes.css'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import './styles/main.css'

createApp(App)
  .use(createRouter({
    history: createWebHistory(),
    routes: Routes,
  }))
  .use(createPinia())
  .mount('#app')

Object.values(import.meta.glob('./modules/*/index.ts'))
  .forEach((module) => {
    module()
      .then((mod) => {
        if (mod.default)
          mod.default()
      })
  })
