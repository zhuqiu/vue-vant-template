<!--
 * @Date: 2020-07-10 09:43:26
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-07-17 19:51:02
 * @FilePath: \project\src\views\commonPage\home.vue
-->
<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <img src="../../assets/images/banner01.png" style="width:100%" alt="">
      </van-swipe-item>
      <van-swipe-item>
        <img src="../../assets/images/banner02.png" style="width:100%" alt="">
      </van-swipe-item>
      <van-swipe-item>
        <img src="../../assets/images/banner03.png" style="width:100%" alt="">
      </van-swipe-item>
      <van-swipe-item>
        <img src="../../assets/images/banner04.png" style="width:100%" alt="">
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
import { wxLogin } from '../../api/application.apis'
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
          color: "#9933FF"
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
          color: "#CC3399"
        },
        {
          icon: "comment-circle",
          text: "培训主题",
          color: "#6666CC"
        }
      ]
    }
  },
  async created(){
    let res = await wxLogin({code:"test_code"});
    if(res.code === "0"){
      this.$store.dispatch('setToken', res.data.token)
    }
  },
  methods: {

  }
}
</script>
<style lang="scss">
</style>

