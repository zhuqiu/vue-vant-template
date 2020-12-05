<!--
 * @Date: 2020-07-10 09:43:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-05 11:29:20
 * @FilePath: \project\src\views\commonPage\enterprise.vue
-->
<template>
  <div>
    <van-search
      v-model="params.corpName"
      show-action
      placeholder="请输入搜索关键词"
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
        <van-row class="enterprise-list">
          <van-col span="24" v-for="(item, index) in list" :key="index" @click="enterpriseChange(item.id)">
            <div class="content">
              <div class="content-left">
                <p class="title">公司名称：
                  <span v-if="item.monthServiceTimes" style="font-size: 12px">进场
                    <span v-if="item.monthServiceTimes === 3" style="color: #07c160">{{item.monthServiceTimes}}</span>
                    <span v-else-if="item.monthServiceTimes < 3" style="color: #ee0a24">{{item.monthServiceTimes}}</span>
                    <span v-else>{{item.monthServiceTimes}}</span>
                    次
                  </span>
                </p>
                <span class="name">{{ item.corpName }}</span>
              </div>
              <div class="content-right">
                <van-icon name="checked" size="24" color="#07c160" v-if="selevtionId === item.id" />
              </div>
            </div>
          </van-col>
        </van-row>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { listCorp } from '../../api/application.apis'

export default {
  name: 'Enterprise',
  data() {
    return {
      list: [],
      params: {
        corpName: '',
        limit: 6,
        page: 1
      },
      selevtionId: '',
      loading: false,
      finished: false,
      refreshing: false,
      totalSize: 0
    }
  },
  created() {
    this.getList(this.params)
    if (localStorage.getItem('select_enterprise') && JSON.parse(localStorage.getItem('select_enterprise'))) {
      this.selevtionId = JSON.parse(localStorage.getItem('select_enterprise')).id
      document.title = JSON.parse(localStorage.getItem('select_enterprise')).corpName
    }
  },
  computed: {},
  methods: {
    onSearch() {
      this.getList(this.params)
    },
    onCancel() {
      this.getList(this.params)
    },
    onInput() {
      if (this.params.corpName === '') {
        this.getList(this.params)
      }
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
      let res = await listCorp(params)
      if (res.code === '0') {
        this.list = res.data
        this.totalSize = res.count
        if (!localStorage.getItem('select_enterprise') && this.list.length > 0) {
          localStorage.setItem('select_enterprise', JSON.stringify(this.list[0]))
          this.selevtionId = this.list[0].id
          this.title = this.list[0].corpName
          document.title = this.list[0].corpName
        }
        // 加载状态结束
        this.loading = false
      } else {
        this.$toast(res.msg)
        this.list = []
      }
    },
    enterpriseChange(id) {
      let source = this.list.find(l => l.id === id)
      localStorage.setItem('select_enterprise', JSON.stringify(source))
      this.selevtionId = id
      document.title = source.corpName
      this.$router.push({
        name: 'Home'
      })
    }
  }
}
</script>
<style lang="scss">
.enterprise-list {
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
        font-size: 16px;
        margin: 0;
        margin-bottom: 0.32rem;
      }
    }
    .content-right {
      flex: 1;
      text-align: right;
    }
  }
}
</style>
