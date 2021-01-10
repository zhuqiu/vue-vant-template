<!--
 * @Date: 2020-07-10 09:43:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-05 16:51:45
 * @FilePath: \project\src\views\commonPage\home.vue
-->
<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <img src="../../assets/images/banner01.png" style="width:100%" alt="" />
      </van-swipe-item>
      <van-swipe-item>
        <img src="../../assets/images/banner02.png" style="width:100%" alt="" />
      </van-swipe-item>
      <van-swipe-item>
        <img src="../../assets/images/banner03.png" style="width:100%" alt="" />
      </van-swipe-item>
      <van-swipe-item>
        <img src="../../assets/images/banner04.png" style="width:100%" alt="" />
      </van-swipe-item>
    </van-swipe>
    <div class="margin-top">
      <van-grid :column-num="3">
        <van-grid-item v-for="(item, index) in gridList" :key="index" :use-slot="true" @click="handleClick(item.path)">
          <van-icon :name="item.icon" size="30" :color="item.color" />
          <span class="margin-top">{{ item.text }}</span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { wxLogin, listCorp, countUnreadMsgTotal } from '../../api/application.apis'
export default {
  name: 'Home',
  data() {
    return {
      gridList: [
        // {
        //   icon: 'comment',
        //   text: '会议培训',
        //   color: '#00FF99',
        //   path: 'MeetingList'
        // },
        // {
        //   icon: 'label',
        //   text: '驻场登记',
        //   color: '#9933FF',
        //   path: 'WorkRecordList'
        // },
        {
          icon: 'todo-list',
          text: '巡查记录',
          color: '#6699FF',
          path: 'AllTodo'
        },
        // {
        //   icon: 'underway',
        //   text: '巡查类型',
        //   color: '#66CCFF',
        //   path: 'OneLevel'
        // },
        {
          icon: 'todo-list',
          text: '风险管控',
          color: '#CC3399',
          path: 'HighTodo'
        },
        {
          icon: 'video',
          text: '在线培训',
          color: '#6666CC',
          path: 'VideoList'
        },
        {
          icon: 'column',
          text: '入场登记',
          color: '#00CC33',
          path: 'BatchList'
        },
        {
          icon: 'wap-nav',
          text: '车间列表',
          color: '#0066FF',
          path: 'RoomList'
        },
        {
          icon: 'card',
          text: '公共网盘',
          color: '#0066FF',
          path: 'NetworkDisk'
        },
        {
          icon: 'bars',
          text: '应急管理',
          color: '#9933FF',
          path: 'AccountRecord'
        },
        {
          icon: 'underway',
          text: '培训演练',
          color: '#66CCFF',
          path: 'TrainDrill'
        }
        // {
        //   icon: 'comment',
        //   text: '危险作业',
        //   color: '#00FF99',
        //   path: 'FireExercise'
        // }
        // {
        //   icon: 'weapp-nav',
        //   text: '敬请期待',
        //   color: '#6666CC'
        // }
      ]
    }
  },
  async mounted() {
    this.getList({ corpName: '' })
    this.$nextTick(() => {
      // if (window.history && window.history.pushState) {
      //   //防止页面后退
      //   window.history.pushState(null, null, document.URL)
      //   window.addEventListener('popstate', function() {
      //     window.history.pushState(null, null, document.URL)
      //   })
      // }
    })
  },
  methods: {
    handleClick(path) {
      if (!path) {
        this.$toast('功能规划中，敬请期待')
        return
      }
      if (!localStorage.getItem('select_enterprise')) {
        this.$toast('请先选择企业')
        return
      }
      let id = JSON.parse(localStorage.getItem('select_enterprise')).id
      if (!id) {
        this.$toast('请先选择企业')
        return
      }
      this.$router.push({
        name: path
      })
    },
    async getList(params) {
      let res = await listCorp(params)
      if (res.code === '0') {
        // 判断缓存中的公司是否在当前公司列表中
        if (localStorage.getItem('select_enterprise')) {
          let id = JSON.parse(localStorage.getItem('select_enterprise')).id
          let source = res.data.find(d => d.id === id)
          if (!source) {
            localStorage.setItem('select_enterprise', '')
            if (res.data.length > 0) {
              localStorage.setItem('select_enterprise', JSON.stringify(res.data[0]))
              document.title = res.data[0].corpName
            }
          } else {
            document.title = source.corpName
          }
        } else {
          if (res.data.length > 0) {
            localStorage.setItem('select_enterprise', JSON.stringify(res.data[0]))
            document.title = res.data[0].corpName
          }
        }
        this.countUnreadMsgTotal()
      } else if (res.code === '-1') {
        localStorage.setItem('select_enterprise', '')
      }
    },
    async countUnreadMsgTotal() {
      let res = await countUnreadMsgTotal({
        context: '',
        ctime: '',
        idsArr: [],
        nickname: '',
        readTime: '',
        status: 'unread',
        corpId: JSON.parse(localStorage.getItem('select_enterprise')).id
      })
      if (res.code === '0') {
        this.$store.dispatch('setUnReadMsg', res.data)
      }
    }
  }
}
</script>
<style lang="scss"></style>
