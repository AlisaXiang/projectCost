import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './routes/router.js'
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import components from './components'
import * as filters from './filter'
import qs from 'qs'
Vue.use(ElementUI)
Vue.prototype.$ajax = axios
Vue.prototype.$qs = qs
Vue.prototype.$help = new Vue();//用来组件之间进行通信
components.map(component => {
    Vue.component(component.name, component)
});
Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key])
});
// //删选器
// Vue.filter('notNull',function(value){
//   if(value==null){
//     return 0
//   }else{
//     return value;
//   }
// })
new Vue({
  router,
  el: '#app',
  render: h => h(App),
  components: {App}
})
