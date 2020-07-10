/*
 * @Date: 2020-07-10 09:43:26
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-07-10 14:03:52
 * @FilePath: \project\src\plugins\vant.js
 */ 
// 按需全局引入 vant组件
import Vue from 'vue'
import { Button, List, Cell, Tabbar, TabbarItem, Swipe, SwipeItem, Grid, GridItem, Search, Icon } from 'vant'
Vue.use(Button)
Vue.use(Cell)
Vue.use(List)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Search)
Vue.use(Icon)
Vue.use(Tabbar).use(TabbarItem)
