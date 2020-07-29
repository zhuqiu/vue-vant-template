<template>
  <div>
    <van-grid :border="false" :column-num="4">
      <van-grid-item v-for="(item,index) in list" :key="index" style="margin-bottom:0.23rem;">
        <van-icon name="play-circle" size="40" color="#00CCFF"/>
        <div style="margin-top:0.23rem">{{ item.title }}</div>
      </van-grid-item>
     
    </van-grid>
  </div>
</template>

<script>

import { getListVideo } from '../../api/application.apis'

export default {
  name: 'VideoList',
  data() {
    return {
      list: []
    }
  },
  created(){
    this.getList();
  },
  methods: {
    async getList(){
      let res = await getListVideo();
      if(res.code === '0'){
        this.list = res.data;
      }else {
        this.$toast(res.msg)
        this.list = []
      }
    },
  }
}
</script>
<style lang="scss">

</style>