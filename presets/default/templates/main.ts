import { createApp } from 'vue'
import App from './App.vue'// EXTRA_IMPORTS

import './main.css'

export const app = createApp(App) // EXTRA_APP_MODIFICATIONS
app.mount('#app')
