import 'animate.css'
import { createApp } from 'vue'
import App from './App.vue'
import './index.scss'
import '@varlet/ui/es/radio-group/style/index.js'
import '@varlet/ui/es/radio/style/index.js'
import '@varlet/ui/es/button/style/index.js'
import dark from '@varlet/ui/es/themes/dark'
import { StyleProvider } from '@varlet/ui'

StyleProvider(dark)
const app = createApp(App)
app.mount('#app')
