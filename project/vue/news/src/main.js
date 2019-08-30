// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'//导入vue核心包
import App from './App'//导入App.vue的vue对象
import router from './router'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({//利用vue对象进行解析渲染，实例化
  el: '#app',
  router,
  components: {App},
  template: '<App/>',
  render: c => c(App)

});
