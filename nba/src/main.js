import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import './custom.scss'
import nbaPlayers from './players.js'
import nbaTeams from './teams.js'

Vue.config.productionTip = false
// Vue.prototype.$http = axios
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

let data = {
   players: nbaPlayers,
   teams: nbaTeams,
}

new Vue({
   router,
   data,
   render: h => h(App)
}).$mount('#app')
