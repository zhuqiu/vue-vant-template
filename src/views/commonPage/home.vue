<!--
 * @Date: 2020-07-10 09:43:26
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-07-10 14:11:45
 * @FilePath: \project\src\views\commonPage\home.vue
--> 
<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <img src="../../assets/images/banner01.jpg" style="width:100%" alt="">
      </van-swipe-item>
      <van-swipe-item>
        <img src="../../assets/images/banner01.jpg" style="width:100%" alt="">
      </van-swipe-item>
    </van-swipe>
    <div class="margin-top">
      <van-grid :column-num="3">
        <van-grid-item v-for="(item, index) in gridList" :key="index" :use-slot="true">
          <van-icon :name="item.icon" size="30" :color="item.color"/>
          <span class="margin-top">{{item.text}}</span>
        </van-grid-item>
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
          text: "会议培训",
          color: "#00FF99"
        },
        {
          icon: "label",
          text: "驻场登记",
          color: "#33FF99"
        },
        {
          icon: "todo-list",
          text: "巡查记录",
          color: "#6699FF"
        },
        {
          icon: "underway",
          text: "巡查类型",
          color: "#66CCFF"
        },
        {
          icon: "todo-list",
          text: "待处理",
          color: "#66FF99"
        },
        {
          icon: "comment-circle",
          text: "培训主题",
          color: "#99FFCC"
        }
      ]
    }
  },
  methods: {
    
  }
}
</script>
<style lang="scss">
</style>

