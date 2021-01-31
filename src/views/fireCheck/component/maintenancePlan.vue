<!--
 * @Author: zhuqiu
 * @since: 2020-12-05 10:57:20
 * @Description:
-->
<template>
  <div>
    <van-sticky>
      <van-search
        v-model="params.keyword"
        show-action
        placeholder="请输入器材编号"
        @search="onSearch"
        @cancel="onCancel"
        @clear="onCancel"
        @input="onInput"
      >
        <template #left>
          <van-icon name="scan" size="30" style="margin-right:10px" color="#666" />
        </template>
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
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
        <van-row class="common-list">
          <van-col span="24" @click="handleClick(item)" v-for="(item, index) in list" :key="index">
            <div class="common-content">
              <div>
                <div class="content-title">{{ item.equipmentNo }}</div>
                <div class="content-status">未点检</div>
              </div>
              <div>
                <div class="content-info">
                  <span>{{ item.keepPersion }}</span>
                </div>
                <div class="content-time">{{ item.location }}</div>
              </div>
            </div>
          </van-col>
        </van-row>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { listNotCheckEquipmentThisMonth } from '@/api/application.apis'

import { scanQRCode, initWXConfig } from '@/utils/wxApi'

export default {
  name: 'MainterancePlan',
  data() {
    return {
      params: {
        corpId: '',
        limit: 6,
        page: 1,
        keyword: ''
      },
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      totalSize: 0
    }
  },
  mounted() {
    initWXConfig(['scanQRCode'])
  },
  created() {
    if (JSON.parse(localStorage.getItem('select_enterprise'))) {
      this.params.corpId = JSON.parse(localStorage.getItem('select_enterprise')).id
    }
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
    handleClick(val) {
      this.$router.push({
        name: 'SecurityProductionDetail',
        query: {
          id: val.id
        }
      })
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
      const res = await listNotCheckEquipmentThisMonth(params)
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
    scanQr() {
      scanQRCode(1).then(result => {
        console.log(result)
        this.params.keyword = result
      })
    }
  }
}
</script>
<style lang="scss"></style>
