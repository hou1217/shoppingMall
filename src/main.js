import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; 
import App from './App'
import router from './router'
import Global from './config/Global'//引用文件
import axios from 'axios';

Vue.prototype.GLOBAL = Global//挂载到Vue实例上面
Vue.prototype.$axios = axios;
Vue.use(ElementUI, { size: 'small' });


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
