import Vue from 'vue';
import App from './App.vue';
import { debounce } from 'lodash';

Vue.config.productionTip = false;

const lodash = {
  debounce: debounce
};

Vue.prototype.$_ = lodash;

new Vue({
  render: h => h(App)
}).$mount('#app');
