<template>
  <div>
    <van-sticky>
      <van-nav-bar title="设施管理" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <div class="margin">
      <van-grid :column-num="3">
        <van-grid-item v-for="(item, index) in gridList" :key="index" :use-slot="true" @click="handleClick(item.path)">
          <van-icon :name="item.icon" size="30" :color="item.color" />
          <span class="margin-top">{{ item.text }}</span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  name: 'train',
  data() {
    return {
      gridList: [
        {
          icon: 'underway',
          text: '消防点检',
          color: '#66CCFF',
          path: 'FireCheck'
        },
        {
          icon: 'comment',
          text: '特种设备',
          color: '#66CCFF'
        },
        {
          icon: 'comment',
          text: '特种作业人员',
          color: '#00FF99'
        }
      ]
    }
  },
  created() {},
  methods: {
    onClickLeft() {
      history.go(-1)
    },
    handleClick(path) {
      if (!path) {
        this.$toast('功能正在开发中...')
        return
      }
      this.$router.push({
        name: path
      })
    }
  }
}
</script>
<style lang="scss"></style>
