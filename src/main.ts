import 'animate.css'
import { createApp } from 'vue'
import App from './App.vue'
import './index.scss'
import dark from '@varlet/ui/es/themes/dark'
import { StyleProvider } from '@varlet/ui'
StyleProvider(dark)
const app = createApp(App)
app.mount('#app')
