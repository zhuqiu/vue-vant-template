<template>
  <div>
    <!-- <van-grid :border="false" :column-num="4">
      <van-grid-item v-for="(item,index) in list" :key="index" style="margin-bottom:0.23rem;">
        <van-icon name="play-circle" size="40" color="#00CCFF"/>
        <div style="margin-top:0.23rem">{{ item.title }}</div>
      </van-grid-item>

    </van-grid> -->
    <ul class="video-list">
      <li v-for="(item,index) in list" :key="index">
        <div class="video-content">
          <video :src="item.url" controls="controls">
          </video>
        </div>
        <div class="video-title">
          {{ item.title }}
        </div>

        <div class="video-mark">
          <span style="color:#CC3399">在线人数：{{ item.todayOnlineUsers }}</span>
          <span style="color:#66CCFF">播放次数：{{ item.palyTimes }}</span>
        </div>
        <div class="video-dec">
          {{ item.remark }}
        </div>
      </li>
    </ul>
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
.video-list{
  li{
    border-radius: 0.12rem;
    background: white;
    margin-bottom: 0.32rem;
    .video-content{
      video{
        width: 100%;
        height: 4rem;
      }
    }
    .video-title{
      padding: 0.32rem;
      font-size: 0.36rem;
      font-weight: 600;
    }
    .video-mark{
      padding: 0 0.32rem;
      display: flex;
      justify-content: space-between;
    }
    .video-dec{
      padding: 0.32rem;
      font-size: 0.32rem;
      text-indent: 0.46rem;
    }
  }
}
</style>
