<template>
  <div>
    <!-- <van-sticky>
      <van-dropdown-menu>
        <van-dropdown-item v-model="params.status" :options="options"/>
        <van-dropdown-item title="筛选" ref="item">
          <van-form>
            <van-field v-model="params.keyword" placeholder="请输入详细说明/进驻事由" label="关键字" />
          </van-form>
          <div class="btn-content">
            <van-button class="btn-width" size="small" type="primary" @click="handleReset">重置</van-button>
            <van-button class="btn-width" size="small" type="info" @click="handleSearch">查询</van-button>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </van-sticky> -->
    <ul class="meeting-list">
      <li v-for="(item, index) in list" :key="index" @click="handleClick(item)">
        <div>培训主题：{{ item.theme }}</div>
        <div>培训人：{{ item.speakUser }}</div>
        <div>培训开始时间：{{ item.beginTime }}</div>
        <div>培训结束时间：{{ item.endTime }}</div>
        <div>状态：<span :class="'status_' + item.status">{{ getStatus(item.status) }}</span></div>
      </li>
    </ul>
  </div>
</template>

<script>

import { getMeetingList } from '../../api/application.apis'

export default {
  name: 'MeetingList',
  data() {
    return {
      list:[]
    }
  },
  created(){
    this.getList();
  },
  methods: {
    async getList(){
      let res = await getMeetingList();
      if(res.code === '0'){
        this.list = res.data;
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
        params: {
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
    color: #999;
    padding: 0.32rem;
    line-height: 0.52rem;
    div{
      overflow: hidden;
      text-overflow: ellipsis;
      .status_1{
        color: #3300FF;
      }
      .status_2{
        color: #6633FF;
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
