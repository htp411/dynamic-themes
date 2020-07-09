import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

document.title = 'Element 插入style';

new Vue({
  render: (h) => h(App),
}).$mount('#app');
