import { createApp } from 'vue'
import App from './demo.vue'// EXTRA_IMPORTS

import '@unocss/reset/tailwind.css'
import './main.css'

export const app = createApp(App) // EXTRA_APP_MODIFICATIONS
app.mount('#app')
