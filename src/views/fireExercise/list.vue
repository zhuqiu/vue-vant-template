<!--
 * @Author: zhuqiu
 * @since: 2020-12-05 10:57:20
 * @Description:
-->
<template>
  <div>
    <div>
      <van-sticky>
        <van-nav-bar title="危险作业培训" left-arrow @click-left="onClickLeft" left-text="返回" />
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
          <van-row class="common-list">
            <van-col span="24" @click="handleClick(item)" v-for="(item, index) in list" :key="index">
              <div class="common-content">
                <div>
                  <div class="content-title">{{ item.corpName }}（{{ item.persionAmount }}人）</div>
                  <div class="content-status">{{item.statusCh}}</div>
                </div>
                <div>
                  <div class="content-info">
                    <span>{{ item.teacher }}</span>
                  </div>
                  <div class="content-time">{{ item.showDate }} :{{ item.beginTime }}至{{ item.endTime }}</div>
                </div>
                <div>
                  <div class="content-info">
                    <span>{{ item.content }}</span>
                  </div>
                </div>
              </div>
            </van-col>
          </van-row>
        </van-list>
      </van-pull-refresh>

      <div class="margin">
        <div class="addBtn" @click="handleAddInfo">
          <van-icon name="plus" size="22" color="#ffffff" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFireList } from '../../api/application.apis'

export default {
  name: 'fireExercise',
  data() {
    return {
      params: {
        corpId: '',
        limit: 6,
        page: 1
      },
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      totalSize: 0
    }
  },
  created() {
    if (JSON.parse(localStorage.getItem('select_enterprise'))) {
      this.params.corpId = JSON.parse(localStorage.getItem('select_enterprise')).id
    }
    this.getList(this.params)
  },
  methods: {
    onClickLeft() {
      history.go(-1)
    },
    handleClick(val) {
      this.$router.push({
        name: 'FireExerciseDetail',
        query: {
          id: val.id
        }
      })
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
      const res = await getFireList(params)
      if (res.code === '0') {
        this.list = res.data
        this.totalSize = res.count
        // 加载状态结束
        this.loading = false
      } else {
        this.$toast(res.msg)
        this.list = []
      }
    },

    async handleAddInfo() {
      this.$router.push({
        name: 'FireExerciseDetail'
      })
    }
  }
}
</script>
<style lang="scss">
.work-list {
  li {
    border-radius: 0.1rem;
    margin: 0.32rem;
    background: #ffffff;
    color: #666;
    padding: 0.32rem;
    line-height: 0.52rem;
    div {
      overflow: hidden;
      text-overflow: ellipsis;
      .fail {
        color: #cc0033;
      }
      .success {
        color: #00ff99;
      }
    }
  }
}
.addBtn {
  width: 0.8rem;
  height: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #0066ff;
  position: fixed;
  bottom: 100px;
  right: 20px;
  i {
    font-weight: 600;
  }
}
</style>
