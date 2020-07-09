import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;
document.title = '一次插入多条属性';

new Vue({
  render: (h) => h(App),
}).$mount('#app');
