<template>
  <div>
    <van-sticky>
      <van-nav-bar title="危险作业" left-text="返回" left-arrow @click-left="onClickLeft" />
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
  name: 'FireIndex',
  data() {
    return {
      gridList: [
        {
          icon: 'wap-nav',
          text: '动火作业',
          color: '#66CCFF'
        },
        {
          icon: 'comment',
          text: '有限空间作业',
          color: '#9933FF'
        },
        {
          icon: 'card',
          text: '吊装作业',
          color: '#00FF99'
        },
        {
          icon: 'column',
          text: '临时用电',
          color: '#00CC33'
        },
        {
          icon: 'underway',
          text: '高处作业（临边）',
          color: '#00FF99'
        },
        {
          icon: 'todo-list',
          text: '零星工程',
          color: '#CC3399'
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
