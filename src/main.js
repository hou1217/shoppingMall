import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
import Global from './config/Global'//引用文件
import axios from 'axios';
Vue.use(MintUI)
Vue.prototype.$global = Global//挂载到Vue实例上面
Vue.prototype.$axios = axios;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
