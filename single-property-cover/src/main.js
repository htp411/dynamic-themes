import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;
document.title = '获取单个属性';

new Vue({
  render: (h) => h(App),
}).$mount('#app');
