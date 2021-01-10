<!--
 * @Date: 2020-07-10 09:43:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-05 11:33:07
 * @FilePath: \project\src\views\batch\list.vue
-->
<template>
  <div>
    <div>
      <van-search
        v-model="params.batchNo"
        show-action
        placeholder="请输入批次号"
        @search="onSearch"
        @cancel="onCancel"
        @clear="onCancel"
        @input="onInput"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
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
                  <div class="content-title">{{ item.corpName }}</div>
                  <div class="content-status">
                    <img src="../../assets/images/jinxingzhong.png" alt="" v-if="item.status === 1" />
                    <img src="../../assets/images/yiqueren.png" alt="" v-if="item.status === 2" />
                  </div>
                </div>
                <div>
                  <div class="content-info">
                    <span>{{ item.batchNo }}（{{item.eventTotal === null ? 0 : item.eventTotal}}项）</span>
                  </div>
                  <div class="content-time">{{ item.startTime }}</div>
                </div>
                <div>
                  <div class="content-info">
                    <span>{{ item.endTime }}</span>
                  </div>
                </div>
              </div>
            </van-col>
          </van-row>
        </van-list>
      </van-pull-refresh>

      <div class="margin">
        <div class="addBtn" @click="addBatch">
          <van-icon name="plus" size="22" color="#ffffff" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createBatchNo, getBatchList, getBatchDetail } from '../../api/application.apis'

export default {
  name: 'Management',
  data() {
    return {
      params: {
        batchNo: '',
        corpId: '',
        limit: 6,
        page: 1
      },
      activeName: '',
      list: [],
      batchInfo: {},
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
    onSearch() {
      this.getList(this.params)
    },
    onCancel() {
      this.getList(this.params)
    },
    onInput() {
      if (this.params.batchNo === '') {
        this.getList(this.params)
      }
    },
    handleClick(val) {
      this.$router.push({
        name: 'BatchDetail',
        query: {
          id: val.batchNo,
          status: val.status
        }
      })
    },
    getStatus(status) {
      switch (status) {
        case 1:
          return '进行中'
        case 2:
          return '已完成'
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
      const res = await getBatchList(params)
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
    async collapseChange(val) {
      if (!val) {
        return
      }
      const res = await getBatchDetail({ batchNo: val })
      if (res.code === '0') {
        this.batchInfo = res.data
      } else {
        this.$toast(res.msg)
        this.batchInfo = {}
      }
    },
    async addBatch() {
      if (!this.params.corpId) {
        this.$toast('请选择企业后再新增批次号')
        return
      }
      let that = this
      this.$dialog.confirm({
        title: '新增批次提示',
        message: '确定新增吗？',
        beforeClose
      })
      async function beforeClose(action, done) {
        if (action === 'confirm') {
          const res = await createBatchNo({ corpId: that.params.corpId })
          if (res.code === '0') {
            that.getList(that.params)
            that.$toast('新增成功')
          } else {
            that.$toast(res.msg)
          }
        }
        done()
      }
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
