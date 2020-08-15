<!--
 * @Date: 2020-07-10 09:43:26
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-07-21 15:30:37
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
        <van-grid-item v-for="(item, index) in gridList" :key="index" :use-slot="true" @click="handleClick(item.path)">
          <van-icon :name="item.icon" size="30" :color="item.color"/>
          <span class="margin-top">{{item.text}}</span>
        </van-grid-item>
      </van-grid>
    </div>

  </div>
</template>

<script>
import { wxLogin, listCorp } from '../../api/application.apis'
export default {
  name: 'Home',
  data() {
    return {
      gridList:[
        {
          icon: "comment",
          text: "会议培训",
          color: "#00FF99",
          path: 'MeetingList'
        },
        {
          icon: "label",
          text: "驻场登记",
          color: "#9933FF",
          path: "WorkRecordList"
        },
        {
          icon: "todo-list",
          text: "巡查记录",
          color: "#6699FF",
          path: "AllTodo"
        },
        {
          icon: "underway",
          text: "巡查类型",
          color: "#66CCFF",
          path: "OneLevel"
        },
        {
          icon: "todo-list",
          text: "待处理",
          color: "#CC3399",
          path: "WaitTodo"
        },
        {
          icon: "comment-circle",
          text: "在线培训",
          color: "#6666CC",
          path: 'VideoList'
        }
      ]
    }
  },
  async created(){
    this.getList({corpName: ''})
    // let res = await wxLogin({code:"test_code"});
    // if(res.code === "0"){
    //   //this.$store.dispatch('setToken', res.data.token)
    //   localStorage.setItem('token', res.data.token);
    //   localStorage.setItem('user_type', res.data.userType);
    //   this.getList({corpName: ''})
    // }
  },
  methods: {
    handleClick(path){
      if(!localStorage.getItem('select_enterprise')){
        this.$toast('请先选择企业');
        return;
      }
      let id = JSON.parse(localStorage.getItem('select_enterprise')).id;
      if(!id){
        this.$toast('请先选择企业');
        return;
      }
      this.$router.push({
        name: path
      })
    },
    async getList(params){
      let res = await listCorp(params);
      if(res.code === "0"){
        let id = JSON.parse(localStorage.getItem('select_enterprise')).id;
        let source = res.data.find((d) => d.id === id);
        if(!source){
          localStorage.setItem('select_enterprise', '')
        }
      }
    },
  }
}
</script>
<style lang="scss">
</style>

