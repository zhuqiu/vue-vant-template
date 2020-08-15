<!--
 * @Date: 2020-07-10 09:43:26
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-08-15 10:54:59
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
      <ul class="work-list">
        <li v-for="(item, index) in list" :key="index" @click="handleClick(item)">
          <div>巡查企业：{{ item.corpName }}</div>
          <div>批次号：{{ item.batchNo }}</div>
          <div>开始时间：{{ item.startTime }}</div>
          <div>结束时间：{{ item.endTime }}</div>
          <div>
            状态：<span :class="item.status === 2 ? 'success' : 'fail'">{{ getStatus(item.status) }}</span>
          </div>
        </li>
      </ul>
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
        corpId: ''
      },
      activeName: '',
      list: [],
      batchInfo: {}
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
    async getList(params) {
      const res = await getBatchList(params)
      if (res.code === '0') {
        this.list = res.data
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
      const res = await createBatchNo({ corpId: this.params.corpId })
      if (res.code === '0') {
        this.getList(this.params)
      } else {
        this.$toast(res.msg)
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
