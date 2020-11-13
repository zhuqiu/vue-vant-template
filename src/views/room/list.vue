<template>
  <div>
    <!-- <van-sticky>
      <van-nav-bar title="车间" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky> -->
    <van-search
      v-model="roomName"
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
    <van-collapse style="margin-top:0.32rem" v-model="activeNames" v-if="list.length > 0">
      <van-collapse-item :title="item.roomName" :name="index" v-for="(item, index) in list" :key="index">
        <div>企业名称: {{item.corpName}}</div>
        <div>车间负责人: {{item.roomManager}}</div>
        <div>巡查总数: {{item.eventTotal}}</div>
      </van-collapse-item>
    </van-collapse>
    <van-empty v-else description="暂无数据" />
  </div>
</template>

<script>

import { findByCorpId } from '../../api/application.apis'

export default {
  name: 'thirdLevel',
  data() {
    return {
      list: [],
      activeNames: [],
      roomName: ''
    }
  },
  created() {
    this.findRoomList()
  },
  methods: {
    onClickLeft() {
      history.go(-1)
    },
    async findRoomList(){
      const res = await findByCorpId({ 
        corpId: JSON.parse(localStorage.getItem('select_enterprise')).id,
        roomName: this.roomName
      })
      this.list = res;
    },
    onSearch(){
      this.findRoomList();
    },
    onCancel(){
      this.findRoomList();
    },
    onInput(){
      if(this.roomName === ''){
        this.findRoomList();
      }
    },
  }
}
</script>
<style lang="scss">

</style>
