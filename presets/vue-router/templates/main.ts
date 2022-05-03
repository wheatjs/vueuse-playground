import { createApp } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'

import App from './App.vue'
import Home from './Home.vue'
import About from './About.vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import './main.css'

export const app = createApp(App)

app
  .use(createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: Home },
      { path: '/about', component: About },
    ],
  }))
  .mount('#app')
