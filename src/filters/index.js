/*
 * @Date: 2020-07-10 09:43:26
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-07-21 16:31:29
 * @FilePath: \project\src\filters\index.js
 */ 
import Vue from 'vue'
import * as filter from './filter'

Object.keys(filter).forEach(k => Vue.filter(k, filter[k]))

Vue.prototype.$formatDate = Vue.filter('formatDate')
Vue.prototype.$hidePhone = Vue.filter('hidePhone')
Vue.prototype.$getStatus = Vue.filter('getStatus')