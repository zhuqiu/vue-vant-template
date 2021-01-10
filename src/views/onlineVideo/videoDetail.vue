<template>
  <div>
    <van-sticky>
      <van-nav-bar title="在线培训详情" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </van-sticky>
    <ul class="video-detail">
      <li>
        <div class="video-content">
          <video controls="controls" :src="data.url">
            <!-- <source type="video/*" :src="data.url" /> -->
          </video>
        </div>
        <div class="video-title">
          {{ data.title }}
        </div>

        <div class="video-mark">
          <span style="color:#CC3399">在线人数：{{ data.todayOnlineUsers }}</span>
          <span style="color:#66CCFF">播放次数：{{ data.palyTimes }}</span>
        </div>
        <div class="video-dec">
          {{ data.remark }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'VideoList',
  data() {
    return {
      data: '',
    }
  },
  mounted() {
    this.data = this.$route.query

  },
  methods: {
    onClickLeft() {
      history.go(-1)
    }
  }
}
</script>
<style lang="scss">
.video-detail {
  li {
    border-radius: 0.12rem;
    background: white;
    margin-bottom: 0.32rem;
    .video-content {
      video {
        width: 100%;
        height: 4rem;
      }
    }
    .video-title {
      padding: 0.32rem;
      font-size: 0.36rem;
      font-weight: 600;
    }
    .video-mark {
      padding: 0 0.32rem;
      display: flex;
      justify-content: space-between;
    }
    .video-dec {
      padding: 0.32rem;
      font-size: 0.32rem;
      // text-indent: 0.46rem;
    }
  }
}
</style>
