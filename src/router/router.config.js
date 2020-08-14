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
    redirect: '/wxLogin',
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: '/wxLogin',
        name: 'WxLogin',
        component: () => import('@/views/commonPage/wxLogin'),
        meta: { title: '登录页', keepAlive: false }
      },
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
        path: '/batchList',
        name: 'BatchList',
        component: () => import('@/views/batch/list'),
        meta: { title: '批次列表', keepAlive: false }
      },
      {
        path: '/batchDetail',
        name: 'BatchDetail',
        component: () => import('@/views/batch/detail'),
        meta: { title: '批次详情', keepAlive: false }
      },
      {
        path: '/notification',
        name: 'Notification',
        component: () => import('@/views/commonPage/notification'),
        meta: { title: '通知', keepAlive: false }
      },
      {
        path: '/event',
        name: 'Event',
        component: () => import('@/views/event/event'),
        meta: { title: '添加巡查记录', keepAlive: false }
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
      {
        path: '/eventDetail',
        name: 'EventDetail',
        component: () => import('@/views/event/eventDetail'),
        meta: { title: '记录详情', keepAlive: false }
      },
      {
        path: '/workRecordList',
        name: 'WorkRecordList',
        component: () => import('@/views/workRecord/list'),
        meta: { title: '驻场登记列表', keepAlive: false }
      },
      {
        path: '/workRecordDetail',
        name: 'WorkRecordetail',
        component: () => import('@/views/workRecord/detail'),
        meta: { title: '驻场登记详情', keepAlive: false }
      },
      {
        path: '/meetingList',
        name: 'MeetingList',
        component: () => import('@/views/meeting/list'),
        meta: { title: '会议培训列表', keepAlive: false }
      },
      {
        path: '/meetingDetail',
        name: 'MeetingDetail',
        component: () => import('@/views/meeting/detail'),
        meta: { title: '会议培训详情', keepAlive: false }
      },
      {
        path: '/videoList',
        name: 'VideoList',
        component: () => import('@/views/onlineVideo/list'),
        meta: { title: '在线视频列表', keepAlive: false }
      }
    ]
  },
  {
    path: '/phone',
    name: 'Phone',
    component: () => import('@/views/commonPage/phone'),
    meta: { title: '绑定手机号', keepAlive: false }
  }
]
