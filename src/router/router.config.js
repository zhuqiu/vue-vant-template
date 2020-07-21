/*
 * @Date: 2020-07-10 09:43:26
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-07-21 15:14:35
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
        component: () => import('@/views/commonPage/home'),
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: '/enterprise',
        name: 'Enterprise',
        component: () => import('@/views/commonPage/enterprise'),
        meta: { title: '企业', keepAlive: false }
      },
      {
        path: '/management',
        name: 'Management',
        component: () => import('@/views/commonPage/management'),
        meta: { title: '批次', keepAlive: false }
      },
      {
        path: '/notification',
        name: 'Notification',
        component: () => import('@/views/commonPage/notification'),
        meta: { title: '通知', keepAlive: false }
      },
      {
        path: '/allTodo',
        name: 'AllTodo',
        component: () => import('@/views/event/allTodo'),
        meta: { title: '巡查记录', keepAlive: false }
      },
      {
        path: '/waitTodo',
        name: 'WaitTodo',
        component: () => import('@/views/event/waitTodo'),
        meta: { title: '代办事件', keepAlive: false }
      },
    ]
  }
]
