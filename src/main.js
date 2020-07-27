// 兼容 IE
// https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpolyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import { Toast } from 'vant';
import { Dialog } from 'vant';
import moment from 'moment'//导入文件

import vueSignature from "vue-signature"

// 设置 js中可以访问 $cdn
import { $cdn } from '@/config'
Vue.prototype.$cdn = $cdn
Vue.prototype.$moment = moment;//赋值使用
moment.locale('zh-cn');//需要汉化

import 'vant/lib/index.css';
// 全局引入按需引入UI库 vant
//import '@/plugins/vant'
// 引入全局样式
import '@/assets/css/index.scss'
// 移动端适配
import 'lib-flexible/flexible.js'

Vue.use(Vant);

Vue.use(Toast);
Vue.use(Dialog);

Vue.use(vueSignature);

// filters
import './filters'
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
