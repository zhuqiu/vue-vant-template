<!--
 * @Date: 2020-07-10 09:43:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-26 18:15:42
 * @FilePath: \project\src\views\commonPage\home.vue
-->
<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in imgList" :key="item.id">
        <img :src="item.imgUrl" style="width:100%" alt="" />
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
import { wxLogin, listCorp, countUnreadMsgTotal, listCorpAdImg } from '../../api/application.apis'
export default {
  name: 'Home',
  data() {
    return {
      gridList: [
        {
          icon: 'todo-list',
          text: '巡查事项',
          color: '#6699FF',
          path: 'AllList'
        },
        {
          icon: 'wap-nav',
          text: '风险管控',
          color: '#CC3399',
          path: 'HighManagement'
        },
        {
          icon: 'video',
          text: '在线培训',
          color: '#6666CC',
          path: 'OnLineList'
        },
        {
          icon: 'column',
          text: '设施管理',
          color: '#00CC33',
          path: 'FireCheckList'
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
          text: '应急救援',
          color: '#9933FF',
          path: 'RescueList'
        },
        {
          icon: 'underway',
          text: '培训演练',
          color: '#66CCFF',
          path: 'TrainDrill'
        },
        {
          icon: 'comment',
          text: '危险作业',
          color: '#00FF99',
          path: 'FireIndex'
        }
      ],
      imgList: []
    }
  },
  async mounted() {
    this.getList({ corpName: '' })
    let that = this;
    this.$nextTick(() => {
      if (window.history && window.history.pushState) {
        //防止页面后退
        window.history.pushState(null, null, document.URL)
        window.addEventListener('popstate', () => {
          that.$router.push({
            path: '/home'
          })
        })
      }
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
        this.listCorpAdImg()
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
    },
    async listCorpAdImg() {
      let res = await listCorpAdImg({
        corpId: JSON.parse(localStorage.getItem('select_enterprise')).id
      }).then(res => {
        if(res.code === '0') {
          this.imgList = res.data;
        }
      })
    }
  }
}
</script>
<style lang="scss"></style>
