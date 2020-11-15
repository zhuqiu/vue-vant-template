<template>
  <div>
    <van-sticky>
      <van-nav-bar title="台账记录" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-empty v-if="list.length === 0" description="暂无数据" />

    </van-pull-refresh>
  </div>
</template>

<script>

export default {
  name: 'accountRecord',
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      list: []
    }
  },
  methods: {
    onClickLeft() {
      history.go(-1)
    },
  }
}
</script>
<style lang="scss">

</style>
