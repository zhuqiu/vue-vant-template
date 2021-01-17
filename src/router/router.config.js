/*
 * @Date: 2020-07-10 09:43:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-05 11:58:33
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
        meta: { title: '入场登记', keepAlive: false }
      },
      {
        path: '/batchDetail',
        name: 'BatchDetail',
        component: () => import('@/views/batch/detail'),
        meta: { title: '入场登记详情', keepAlive: false }
      },
      {
        path: '/roomList',
        name: 'RoomList',
        component: () => import('@/views/room/list'),
        meta: { title: '车间列表', keepAlive: false }
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
        component: () => import('@/views/event/eventTab'),
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
        path: '/highTodo',
        name: 'HighTodo',
        component: () => import('@/views/event/highTodo'),
        meta: { title: '风险管控事件', keepAlive: false }
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
        component: () => import('@/views/onlineVideo/newList'),
        meta: { title: '在线视频列表', keepAlive: false }
      },
      {
        path: '/videoDetail',
        name: 'VideoDetail',
        component: () => import('@/views/onlineVideo/videoDetail'),
        meta: { title: '在线视频详情', keepAlive: false }
      },
      {
        path: '/oneLevel',
        name: 'OneLevel',
        component: () => import('@/views/check/oneLevel'),
        meta: { title: '一级巡查累心列表', keepAlive: false }
      },
      {
        path: '/secondLevel',
        name: 'SecondLevel',
        component: () => import('@/views/check/secondLevel'),
        meta: { title: '二级巡查累心列表', keepAlive: false }
      },
      {
        path: '/thirdLevel',
        name: 'ThirdLevel',
        component: () => import('@/views/check/thirdLevel'),
        meta: { title: '三级巡查累心列表', keepAlive: false }
      },
      {
        path: '/networkDisk',
        name: 'NetworkDisk',
        component: () => import('@/views/networkDisk/index'),
        meta: { title: '公共网盘', keepAlive: false }
      },
      {
        path: '/networkDiskDetail',
        name: 'NetworkDiskDetail',
        component: () => import('@/views/networkDisk/detail'),
        meta: { title: '公共网盘详情', keepAlive: false }
      },
      {
        path: '/accountRecord',
        name: 'AccountRecord',
        component: () => import('@/views/accountRecord/index'),
        meta: { title: '应急管理', keepAlive: false }
      },
      {
        path: '/accountRecordDetail',
        name: 'AccountRecordDetail',
        component: () => import('@/views/accountRecord/detail'),
        meta: { title: '应急管理详情', keepAlive: false }
      },
      {
        path: '/securityProduction',
        name: 'SecurityProduction',
        component: () => import('@/views/securityProduction/list'),
        meta: { title: '培训演练', keepAlive: false }
      },
      {
        path: '/securityProductionDetail',
        name: 'SecurityProductionDetail',
        component: () => import('@/views/securityProduction/detail'),
        meta: { title: '培训演练详情', keepAlive: false }
      },
      {
        path: '/fireExercise',
        name: 'FireExercise',
        component: () => import('@/views/fireExercise/list'),
        meta: { title: '危险作业', keepAlive: false }
      },
      {
        path: '/fireExerciseDetail',
        name: 'FireExerciseDetail',
        component: () => import('@/views/fireExercise/detail'),
        meta: { title: '危险作业详情', keepAlive: false }
      },
      {
        path: '/trainDrill',
        name: 'TrainDrill',
        component: () => import('@/views/trainDrill/list'),
        meta: { title: '培训演练', keepAlive: false }
      }
    ]
  },
  {
    path: '/phone',
    name: 'Phone',
    component: () => import('@/views/commonPage/phone'),
    meta: { title: '绑定手机号', keepAlive: false }
  },
  {
    path: '/videoPlay',
    name: 'VideoPlay',
    component: () => import('@/views/onlineVideo/playList'),
    meta: { title: '在线培训', keepAlive: false }
  }
]
