// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'

Vue.prototype.$http = axios;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
// router.beforeEach((to, from, next) => {
//   if (to.path === '/index' || to.path === '/') {
//     next()
//   } else if (to.path === '/login') {
//     if (!sessionStorage.getItem('isLogin') === true) {
//       next()
//     } else {
//       next({path: '/self'})
//     }
//   } else {
//     if (!sessionStorage.getItem('isLogin') === true) {
//       next({path: '/login'})
//     } else {
//       next()
//     }
//   }
// })
router.beforeEach((to, from, next) => {
  if (to.path === '/create' || to.path === '/message') {
    if (!sessionStorage.getItem('isLogin') === true) { // 未登录
      next({path: '/login'})
    } else {
      next()
    }
  } else if (to.path === '/login') {
    if (!sessionStorage.getItem('isLogin') === true) {
      next()
    } else {
      next({path: '/self'})
    }
  } else {
    next()
  }
})
Vue.filter('filterTime', function (str) {
  if (!str) return ''
  var date = new Date(str)
  var time = new Date().getTime() - date.getTime() // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  if (time < 0) {
    return ''
  } else if ((time / 1000 < 30)) {
    return '刚刚'
  } else if (time / 1000 < 60) {
    return parseInt((time / 1000)) + '秒前'
  } else if ((time / 60000) < 60) {
    return parseInt((time / 60000)) + '分钟前'
  } else if ((time / 3600000) < 24) {
    return parseInt(time / 3600000) + '小时前'
  } else if ((time / 86400000) < 31) {
    return parseInt(time / 86400000) + '天前'
  } else if ((time / 2592000000) < 12) {
    return parseInt(time / 2592000000) + '月前'
  } else {
    return parseInt(time / 31536000000) + '年前'
  }
})
