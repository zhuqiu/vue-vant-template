/*
 * @Date: 2020-11-11 14:06:59
 * @LastEditors: zhuqiu
 */
// 兼容 IE
// https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpolyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import { Toast } from 'vant'
import { Dialog } from 'vant'
// 设置 js中可以访问 $cdn
import { $cdn } from '@/config'
Vue.prototype.$cdn = $cdn

import 'vant/lib/index.css'
// // 引入全局样式
// import '@/assets/css/index.scss'
// 移动端适配
import 'lib-flexible/flexible.js'

Vue.use(Vant)

Vue.use(Toast)
Vue.use(Dialog)

// filters
import './filters'
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
