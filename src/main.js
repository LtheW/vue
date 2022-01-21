import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/scss/reset.scss' //全局样式
import Axios from 'axios';//后台交互
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.prototype.$http=Axios
//defaults 设置全局默认路径
Axios.defaults.baseURL="/"

Vue.use(ElementUI,Antd);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
