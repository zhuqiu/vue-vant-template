<!--
 * @Date: 2020-07-10 09:43:26
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-07-10 10:15:55
 * @FilePath: \project\src\views\layouts\index.vue
-->
<template>
  <div class="app-container">
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
    <div class="layout-footer">
      <TabBar :data="tabbars" @change="handleChange" />
    </div>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar'

export default {
  name: 'AppLayout',
  data() {
    return {
      tabbars: [
        {
          title: '首页',
          to: {
            name: 'Home'
          },
          icon: 'home-o'
        },
        {
          title: '企业',
          to: {
            name: 'Enterprise'
          },
          icon: 'friends-o'
        },
        // {
        //   title: '批次',
        //   to: {
        //     name: 'BatchList'
        //   },
        //   icon: 'todo-list-o'
        // },
        {
          title: '通知',
          to: {
            name: 'Notification'
          },
          icon: 'volume-o'
        }
      ]
    }
  },
  components: {
    TabBar
  },
  methods: {
    handleChange(v) {
      console.log('tab value:', v)
    }
  }
}
</script>
