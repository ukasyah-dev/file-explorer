import './assets/styles.css'

import { createApp } from 'vue'
import axios from 'axios'

import App from './App.vue'

axios.defaults.baseURL = import.meta.env.VITE_API_URL

const app = createApp(App)

app.mount('#app')
