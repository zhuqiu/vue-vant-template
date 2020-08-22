<template>
  <div>
    <van-sticky>
      <van-nav-bar title="车间" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
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
      activeNames: []
    }
  },
  created() {
    this.findRoomList()
  },
  methods: {
    onClickLeft() {
      history.go(-1)
    },
    async findRoomList(id){
      const res = await findByCorpId({ corpId: JSON.parse(localStorage.getItem('select_enterprise')).id })
      this.list = res
    }
  }
}
</script>
<style lang="scss">

</style>
