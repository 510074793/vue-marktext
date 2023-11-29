import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router"
import "@/router/permission"
import store from "@/store"

import VueMarktext from './components'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 右键菜单
import Vue3Menus from 'vue3-menus';

//import VueMarktext from '../lib/vue-marktext.umd'

app.use(Vue3Menus)

app.use(VueMarktext)
app.use(ElementPlus)

app.use(store)
app.use(router);

app.mount('#app')
