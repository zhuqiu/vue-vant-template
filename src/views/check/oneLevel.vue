<template>
  <div>
    <van-sticky>
      <van-nav-bar title="一级巡查类型" left-text="返回" left-arrow @click-left="onClickLeft" />
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
import { findRootList } from '../../api/application.apis'

export default {
  name: 'oneLevel',
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getCheckTypeList()
  },
  methods: {
    onClickLeft() {
      history.go(-1)
    },
    async getCheckTypeList() {
      const res = await findRootList({
        corpId: JSON.parse(localStorage.getItem('select_enterprise')).id
      })
      if (res.code === '0') {
        this.list = res.data
      } else {
        this.$toast(res.msg)
        this.list = []
      }
    },
    handleClick(item) {
      this.$router.push({
        name: 'SecondLevel',
        query: {
          id: item.id
        }
      })
    }
  }
}
</script>
<style lang="scss">
.check-list {
  li {
    margin: 0.32rem 0;
  }
}
</style>
