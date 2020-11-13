import Vue from 'vue'
import App from './App.vue'
import router from './router';
import less from 'less'
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Loading from './components/loading';
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.use(Loading)
Vue.use(less)
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
