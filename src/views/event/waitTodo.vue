<!--
 * @Date: 2020-07-21 13:39:43
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-08-19 17:00:32
 * @FilePath: \project\src\views\event\waitTodo.vue
-->
<template>
  <div>
    <van-sticky>
      <van-dropdown-menu>
        <van-dropdown-item v-model="params.status" :options="getOptions()" @change="handleChange" />
        <van-dropdown-item title="筛选" ref="item">
          <van-form validate-first>
            <van-field
              :value="params.batchNo"
              readonly
              clickable
              name="picker"
              placeholder="请输入批次号"
              label="批次号"
              @click="batchClick"
            />
            <!-- <van-field v-model="params.checkName" label="检查类型" placeholder="请输入检查类型" /> -->
            <van-field
              readonly
              clickable
              name="picker"
              :value="room"
              label="巡查车间"
              placeholder="点击选择巡查车间"
              @click="roomClick"
            />
          </van-form>
          <div class="btn-content">
            <van-button class="btn-width" size="small" type="primary" @click="handleReset">重置</van-button>
            <van-button class="btn-width" size="small" type="info" @click="handleSearch">查询</van-button>
          </div>
        </van-dropdown-item>
        <van-popup v-model="showPicker" position="bottom">
          <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
        </van-popup>
      </van-dropdown-menu>
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
        <common-list :data="list" @click="handleClick"></common-list>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import StatusTypeItem from '@/utils/status-typing'

import commonList from '../commonPage/commonList.vue'

import { listToDoEvents, findRoomList, findBatchNoList } from '../../api/application.apis'

export default {
  name: 'WaitTodo',
  components: {
    commonList
  },
  data() {
    return {
      params: {
        batchNo: '',
        checkName: '',
        roomId: '',
        limit: 6,
        status: '',
        page: 1
      },
      room: '',
      list: [],
      showPicker: false,
      columns: [],
      roomList: [],
      batchNoList: [],
      status: 0,
      loading: false,
      finished: false,
      refreshing: false,
      totalSize: 0
    }
  },
  created() {
    this.params.corpId = JSON.parse(localStorage.getItem('select_enterprise')).id;
    this.getList(this.params)
    this.getRoomList()
    this.getBatchNoList()
  },
  methods: {
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
      const res = await listToDoEvents(params)
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
    roomClick() {
      this.columns = this.roomList
      this.showPicker = true
      this.status = 1
    },
    batchClick(){
      this.columns = this.batchNoList
      this.showPicker = true
      this.status = 0
    },
    onConfirm(value) {
      if(this.status){
        this.params.roomId = value.id
        this.room = value.text
      }else {
        this.params.batchNo = value.id
      }
      this.showPicker = false
    },
    handleReset() {
      this.params.batchNo = ''
      this.params.checkName = ''
      this.params.roomId = ''
      this.room = ''
    },
    handleSearch() {
      this.$refs.item.toggle();
      this.getList(this.params)
    },
    handleClick(val) {
      this.$router.push({
        name: 'Event',
        query: {
          id: val.id,
          status: val.status
        }
      })
    },
    handleChange() {
      this.getList(this.params)
    },
    getOptions() {
      return [
        { text: '全部', value: '' },
        { text: '新建', value: StatusTypeItem.Pending },
        { text: '不合格', value: StatusTypeItem.CheckNotPass },
        { text: '合格', value: StatusTypeItem.CheckPass },
        { text: '待整改', value: StatusTypeItem.WaitRectification },
        { text: '驳回', value: StatusTypeItem.EnterpriseReject },
        { text: '已延期', value: StatusTypeItem.NotRectification }
      ]
    },
    async getBatchNoList() {
      const res = await findBatchNoList({
        corpId: JSON.parse(localStorage.getItem('select_enterprise')).id,
        status: 1
      })
      if (res.code === '0') {
        this.batchNoList = res.data.map(d => {
          return {
            text: d,
            id: d
          }
        })
      } else {
        this.$toast(res.msg)
        this.batchNoList = []
      }
    },
    async getRoomList() {
      const res = await findRoomList({ corpId: JSON.parse(localStorage.getItem('select_enterprise')).id })
      if (res.code === '0') {
        this.roomList = res.data.map(d => {
          return {
            text: d.roomName,
            id: d.id
          }
        })
      } else {
        this.$toast(res.msg)
        this.roomList = []
      }
    }
  }
}
</script>
<style lang="scss">
.btn-content {
  display: flex;
  justify-content: space-around;
  margin: 0.32rem 0;
  .btn-width {
    width: 4rem;
  }
}
</style>
