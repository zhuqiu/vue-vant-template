<!--
 * @Date: 2020-07-10 09:43:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-05 16:52:03
 * @FilePath: \project\src\views\commonPage\notification.vue
-->
<template>
  <div>
    <van-sticky>
      <van-nav-bar
        title="消息"
        left-text="返回"
        :right-text="unReadMsg > 0 ? '全部已读' : ''"
        left-arrow
        @click-left="onClickLeft"
        @click-right="batchReadMsg"
      />
    </van-sticky>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-empty v-if="list.length === 0" description="暂无数据" />
      <van-list
        v-else
        :immediate-check="false"
        :offset="0"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-row class="msg-list">
          <van-col span="24" v-for="(item, index) in list" :key="index" @click="goToDetail(item.id)">
            <div class="content">
              <div class="content-left">
                <div class="title" style="font-size:0.38rem;font-weight:600">{{ item.msgType }}</div>
                <div class="title">{{ item.ctime }}</div>
                <div class="title">{{ item.context }}</div>
              </div>
              <div class="content-right">
                <!-- <van-icon name="browsing-history" size="16" color="#07c160" v-if="!item.readTime" /> -->
                <span style="font-size: 12px; color: #1989fa" v-if="item.status === 'unread'">未读</span>
                <span style="font-size: 12px; color: #999" v-else>已读</span>
              </div>
            </div>
          </van-col>
        </van-row>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getListMsg, batchDeleteMsg, readMsg, countUnreadMsgTotal, readAll } from '../../api/application.apis'

import { mapGetters } from 'vuex'

export default {
  name: 'Notification',
  data() {
    return {
      list: [],
      ids: [],
      params: {
        limit: 6,
        page: 1
      },
      loading: false,
      finished: false,
      refreshing: false,
      totalSize: 0
    }
  },
  created() {
    this.params.corpId = JSON.parse(localStorage.getItem('select_enterprise')).id
    this.getList(this.params)
  },
  computed: {
    ...mapGetters(['unReadMsg'])
  },
  methods: {
    onClickLeft() {
      history.go(-1)
    },
    onLoad() {
      if (this.refreshing) {
        this.list = []
        this.params.limit = 6
        this.refreshing = false
      }
      this.params.limit = this.params.limit + 6
      this.getList(this.params)
      if (this.params.limit >= this.totalSize) {
        this.finished = true
      }
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
    async getList(params) {
      const res = await getListMsg(params)
      if (res.data.code === '0') {
        this.list = res.data.data
        this.totalSize = res.data.count
        // 加载状态结束
        this.loading = false
        this.countUnreadMsgTotal()
      } else {
        this.$toast(res.data.msg)
        this.list = []
      }
    },
    selectMsg(id) {
      if (this.ids.includes(id)) {
        let index = this.ids.findIndex(i => i === id)
        this.ids.splice(index, 1)
      } else {
        this.ids.push(id)
      }
    },
    async batchReadMsg() {
      let that = this
      this.$dialog.confirm({
        title: '全部已读提示',
        message: '确定全部已读吗？',
        beforeClose
      })
      async function beforeClose(action, done) {
        if (action === 'confirm') {
          let res = await readAll({
            corpId: JSON.parse(localStorage.getItem('select_enterprise')).id
          })
          if (res.code === '0') {
            that.getList(that.params)
          } else {
            that.$toast('设置失败')
          }
        }
        done()
      }
    },
    async goToDetail(id) {
      let res = await readMsg({
        context: '',
        ctime: '',
        idsArr: [id],
        nickname: '',
        readTime: '',
        status: ''
      })
      if (res.code === '0') {
        this.getList(this.params)
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
    // async batchDeleteMsg() {
    //   if (this.ids.length === 0) {
    //     return
    //   }
    //   const res = await batchDeleteMsg({
    //     idsArr: this.ids
    //   })
    //   if (res.code === '0') {
    //     this.list = res.data
    //     this.$toast('清除成功')
    //   } else {
    //     this.$toast(res.msg)
    //   }
    // }
  }
}
</script>
<style lang="scss">
.msg-list {
  padding: 0.32rem;
  .content {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0.32rem;
    background: #ffffff;
    border-radius: 0.1rem;
    margin-bottom: 0.32rem;
    .content-left {
      flex: 8;
      text-align: left;
      .title {
        font-weight: 500;
        font-size: 12px;
        margin: 0;
        margin-bottom: 0.32rem;
      }
    }
    .content-right {
      flex: 1;
      text-align: right;
      align-self: start;
    }
  }
}
</style>
