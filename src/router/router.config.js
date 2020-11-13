/*
 * @Date: 2020-07-10 09:43:26
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-11-11 14:19:14
 * @FilePath: \project\src\router\router.config.js
 */ 
/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: '/myInfo',
        name: 'MyInfo',
        component: () => import('@/views/myInfo/index'),
        meta: { title: '首页', keepAlive: false }
      },
    ]
  }
]
