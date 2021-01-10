<!--
 * @Date: 2020-07-21 13:39:43
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-08-19 17:00:32
 * @FilePath: \project\src\views\event\waitTodo.vue
-->
<template>
  <div>
    <!-- <van-sticky>
      <van-nav-bar title="风险管控列表" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky> -->
    <van-search
      v-model="params.keyword"
      show-action
      placeholder="请输入关键字"
      @search="onSearch"
      @cancel="onCancel"
      @clear="onCancel"
      @input="onInput"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
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
        <common-list :data="list" @click="handleClick"></common-list>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import StatusTypeItem from '@/utils/status-typing'

import commonList from '../commonPage/commonList.vue'

import { listHighEvents } from '../../api/application.apis'

export default {
  name: 'WaitTodo',
  components: {
    commonList
  },
  data() {
    return {
      params: {
        limit: 6,
        page: 1,
        keyword: ''
      },
      room: '',
      list: [],
      showPicker: false,
      columns: [],
      roomList: [],
      batchNoList: [],
      status: 0,
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
  methods: {
    onSearch() {
      this.getList(this.params)
    },
    onCancel() {
      this.getList(this.params)
    },
    onInput() {
      if (this.params.keyword === '') {
        this.getList(this.params)
      }
    },
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
      const res = await listHighEvents(params)
      if (res.code === '0') {
        this.list = res.data
        this.totalSize = res.count
        // 加载状态结束
        this.loading = false
      } else {
        this.$toast(res.msg)
        this.list = []
      }
    },
    handleClick(val) {
      this.$router.push({
        name: 'Event',
        query: {
          id: val.id,
          status: val.status
        }
      })
    }
  }
}
</script>
<style lang="scss">
.btn-content {
  display: flex;
  justify-content: space-around;
  margin: 0.32rem 0;
  .btn-width {
    width: 4rem;
  }
}
</style>
