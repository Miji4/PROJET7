import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)


import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'

import { BFormFile } from 'bootstrap-vue'
Vue.component('b-form-file', BFormFile)

import { AvatarPlugin } from 'bootstrap-vue'
Vue.use(AvatarPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueCompositionAPI)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
