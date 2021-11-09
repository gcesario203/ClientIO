import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify.js'
import router from './router'
import Notify from 'vue2-notify'
 
// Use Notify
Vue.use(Notify, {
  itemClass: 'notification',
  position:'top-right'
})
const types = {
  info: { itemClass: 'is-info', },
  error: { itemClass: 'is-danger' },
  warning: { itemClass: 'is-warning' },
  success: { itemClass: 'is-success' }
}
 
Vue.$notify.setTypes(types);

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
