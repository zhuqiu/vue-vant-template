<template>
  <div>
    <van-sticky>
      <van-nav-bar title="二级巡查类型" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <ul class="check-list" v-if="list.length > 0">
      <li v-for="(item, index) in list" :key="index" @click="handleClick(item)">
        <van-cell :title="item.checkName" is-link />
      </li>
    </ul>
    <van-empty v-else description="暂无数据" />
  </div>
</template>

<script>

import { findChildList } from '../../api/application.apis'

export default {
  name: 'secondLevel',
  data() {
    return {
      list: []
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
    },
    handleClick(item){
      this.$router.push({
        name: 'ThirdLevel',
        query: {
          id: item.id
        }
      })
    }
  }
}
</script>
<style lang="scss">

</style>
