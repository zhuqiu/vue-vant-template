<template>
  <div>
    <van-sticky>
      <van-nav-bar title="三级巡查类型" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <van-collapse style="margin-top:0.32rem" v-model="activeNames" v-if="list.length > 0">
      <van-collapse-item :title="item.checkName" :name="index" v-for="(item, index) in list" :key="index">
        <div>{{item.remark}}</div>
      </van-collapse-item>
    </van-collapse>
    <van-empty v-else description="暂无数据" />
  </div>
</template>

<script>

import { findChildList } from '../../api/application.apis'

export default {
  name: 'thirdLevel',
  data() {
    return {
      list: [],
      activeNames: []
    }
  },
  created() {
    this.findChildList(this.$route.query.id)
  },
  methods: {
    onClickLeft() {
      history.go(-1)
    },
    async findChildList(id){
      const res = await findChildList({ id: id })
      if (res.code === '0') {
        this.list = res.data
      } else {
        this.$toast(res.msg)
        this.list = []
      }
    }
  }
}
</script>
<style lang="scss">

</style>
