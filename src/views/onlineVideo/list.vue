<template>
  <div>
    <van-sticky>
      <van-nav-bar title="在线培训" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-empty v-if="list.length === 0" description="暂无数据" />
      <van-list
        v-else
        :immediate-check="false"
        :offset="0"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ul class="video-list">
          <li v-for="(item, index) in list" :key="index">
            <div class="video-content">
              <video controls="controls" :id="'videoControls' + index">
                <source type="video/mp4" :src="item.url" />
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
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getListVideo, playVideo } from '../../api/application.apis'

import { getUuid } from '@/utils/index'

export default {
  name: 'VideoList',
  data() {
    return {
      list: [],
      params: {
        limit: 6,
        page: 1
      },
      loading: false,
      finished: false,
      refreshing: false,
      totalSize: 0
    }
  },
  mounted() {
    this.getList(this.params)
    // 生成唯一uuid
    const uuid = getUuid()
    if (!localStorage.getItem('uuid')) {
      localStorage.setItem('uuid', uuid)
    }
  },
  methods: {
    onClickLeft() {
      history.go(-1)
    },
    onLoad() {
      if (this.refreshing) {
        this.list = []
        this.params.limit = 6
        this.refreshing = false
      }
      this.params.limit = this.params.limit + 6
      this.getList(this.params)
      if (this.params.limit >= this.totalSize) {
        this.finished = true
      }
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
    async getList(params) {
      let res = await getListVideo(params)
      if (res.code === '0') {
        this.list = res.data
        this.totalSize = res.count
        // 加载状态结束
        this.loading = false
        this.$nextTick(() => {
          setTimeout(() => {
            let that = this
            this.list.forEach((res, index) => {
              let videoControls = document.getElementById('videoControls' + index)
              console.log(videoControls)
              videoControls.addEventListener('play', function() {
                //播放开始执行的函数
                that.playVideo(res.id)
              })
            }, 2000)
          })
        })
      } else {
        this.$toast(res.msg)
        this.list = []
      }
    },
    async playVideo(id) {
      let res = await playVideo({
        id: id,
        uuid: localStorage.getItem('uuid'),
        userUid: localStorage.getItem('select_enterprise').uid
      })
      if (res.code === '0') {
        this.list.forEach(l => {
          if (l.id === id) {
            l.palyTimes = res.data.palyTimes
            l.todayOnlineUsers = res.data.todayOnlineUsers
          }
        })
      }
    }
  }
}
</script>
<style lang="scss">
.video-list {
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
      text-indent: 0.46rem;
    }
  }
}
</style>
