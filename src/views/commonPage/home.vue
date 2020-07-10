<!--
 * @Date: 2020-07-10 09:43:26
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-07-10 10:36:24
 * @FilePath: \project\src\views\commonPage\home.vue
--> 
<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <div class="margin-top">
      <van-grid :column-num="3">
        <van-grid-item v-for="(item, index) in gridList" :key="index" :icon="item.icon" :text="item.text" />
      </van-grid>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      gridList:[
        {
          icon: "comment",
          text: "会议培训"
        },
        {
          icon: "label",
          text: "驻场登记"
        },
        {
          icon: "todo-list",
          text: "巡查记录"
        },
        {
          icon: "underway",
          text: "巡查类型"
        },
        {
          icon: "todo-list",
          text: "待处理"
        },
        {
          icon: "comment-circle",
          text: "培训主题"
        }
      ]
    }
  },
  methods: {
    
  }
}
</script>
<style lang="scss">
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>

