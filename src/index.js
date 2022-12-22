import VueMarktext from './components/VueMarktext.vue'


export const install = (app) => {
  app.component("VueMarktext", VueMarktext)
}

export default {
  VueMarktext,
  install
}