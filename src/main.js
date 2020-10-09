/*
 * @Author: 崔佳俊
 * @Date: 2020-10-07 14:15:58
 * @LastEditors: cuijiajun
 * @LastEditTime: 2020-10-09 14:38:32
 * @FilePath: /sr2/src/main.js
 */
import Vue from 'vue';

import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import App from './App.vue';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI, { locale });
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
