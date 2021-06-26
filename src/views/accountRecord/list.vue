<template>
  <div>
    <van-sticky>
      <van-nav-bar title="应急救援" left-text="返回" left-arrow @click-left="onClickLeft" />
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
          text: '应急救援队伍',
          color: '#66CCFF'
        },
        {
          icon: 'comment',
          text: '应急救援物资',
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
