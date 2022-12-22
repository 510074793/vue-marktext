import { createApp } from 'vue'
import App from './App.vue'
//import VueMarktext from '../src'

import VueMarktext from '../lib/vue-marktext.umd'
//import '../lib/vue-marktext.css'

createApp(App).use(VueMarktext).mount('#app')
