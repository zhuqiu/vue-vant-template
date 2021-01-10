<template>
  <div>
    <van-sticky>
      <van-search
      v-model="params.keyword"
      show-action
      placeholder="请输入关键字"
      @search="onSearch"
      @cancel="onCancel"
      @clear="onCancel"
      @input="onInput"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
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
          <li v-for="(item, index) in list" :key="index" @click="handleClick(item)">
            <img :src="item.imgUrl"/>
            <div class="title">{{item.title}}</div>
            <div class="dec">{{item.remark}}</div>
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
        page: 1,
        keyword: ''
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
    onSearch() {
      this.getList(this.params)
    },
    onCancel() {
      this.getList(this.params)
    },
    onInput() {
      if (this.params.keyword === '') {
        this.getList(this.params)
      }
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
    handleClick(item){
      this.$router.push({
        name: 'VideoDetail',
        query: {
          palyTimes: item.palyTimes,
          remark: item.remark,
          title: item.title,
          url: item.url,
          todayOnlineUsers: item.todayOnlineUsers
        }
      })
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
    width: 49%;
    margin-top: 10px;
    float: left;
    img {
      width: 100%;
      height: 120px;
    }
    .title{
      font-size: 14px;
      font-weight: 600;
      padding: 0 4px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .dec{
      padding: 0 4px;
      color: #999;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  li:nth-child(2n){
    margin-left: 2%;
  }
}
</style>
