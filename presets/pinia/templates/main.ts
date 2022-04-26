import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import './main.css'

export const app = createApp(App)
app
  .use(createPinia())
  .mount('#app')
