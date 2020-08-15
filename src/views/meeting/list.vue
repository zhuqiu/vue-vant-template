<template>
  <div>
    <van-sticky>
      <van-nav-bar title="会议培训" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
    >
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
        <ul class="meeting-list">
          <li v-for="(item, index) in list" :key="index" @click="handleClick(item)">
            <div>企业名称：{{ item.corpName }}</div>
            <div>培训主题：{{ item.theme }}</div>
            <div>培训人：{{ item.speakUser }}</div>
            <div>培训开始时间：{{ item.beginTime }}</div>
            <div>培训结束时间：{{ item.endTime }}</div>
            <div>状态：<span :class="'status_' + item.status">{{ getStatus(item.status) }}</span></div>
          </li>
        </ul>
      </van-list>
    </van-pull-refresh>

  </div>
</template>

<script>

import { getMeetingList } from '../../api/application.apis'

export default {
  name: 'MeetingList',
  data() {
    return {
      list:[],
      params: {
        limit: 6,
        page: 1
      },
      loading: false,
      finished: false,
      refreshing: false,
      totalSize: 0,
    }
  },
  created(){
    this.getList(this.params);
  },
  methods: {
    onClickLeft() {
      history.go(-1)
    },
    onLoad(){
      if (this.refreshing) {
        this.list = [];
        this.params.limit = 6
        this.refreshing = false;
      }
      this.params.limit = this.params.limit + 6;
      this.getList(this.params);
      if(this.params.limit >= this.totalSize){
        this.finished = true;
      }
    },
    onRefresh(){
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    async getList(params){
      let res = await getMeetingList(params);
      if(res.code === '0'){
        this.list = res.data;
        this.totalSize = res.count
        // 加载状态结束
        this.loading = false;
      }else {
        this.$toast(res.msg)
        this.list = []
      }
    },
    handleReset(){
      this.params.keyword = '';
    },
    handleSearch(){
      this.getList();
    },
    handleClick(val){
      this.$router.push({
        name: 'MeetingDetail',
        query: {
          id: val.id,
          status: val.status
        }
      })
    },
    getStatus(status){
      switch(status){
        case 1:
          return '发起'
        case 2:
          return '待审核'
        case 3:
          return '已审核'
        case 4:
          return '已延期'
      }
    }
  }
}
</script>
<style lang="scss">
.meeting-list{
  li{
    border-radius: 0.1rem;
    margin: 0.32rem;
    background: #ffffff;
    color: #666;
    padding: 0.32rem;
    line-height: 0.52rem;
    div{
      overflow: hidden;
      text-overflow: ellipsis;
      .status_1{
        color: #3300FF;
      }
      .status_2{
        color: #9900FF;
      }
      .status_3{
        color: #00FF99;
      }
      .status_4{
        color: #CC0033;
      }
    }
  }
}
</style>
