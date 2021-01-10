<!--
 * @Date: 2020-07-21 15:11:05
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-10-30 20:36:12
 * @FilePath: \project\src\views\event\allTodo.vue
-->
<template>
  <div>
    <van-sticky>
      <van-dropdown-menu>
        <van-dropdown-item v-model="params.status" :options="getOptions()" @change="handleChange" />
        <van-dropdown-item title="筛选" ref="item">
          <van-form>
            <!-- <van-field
              :value="params.batchNo"
              readonly
              clickable
              name="picker"
              placeholder="请输入批次号"
              label="批次号"
              @click="batchClick"
            /> -->
            <van-field v-model="params.keyword" label="关键字" placeholder="请输入关键字" />
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
        <common-list :data="list" @click="handleClick" @delete="handleDelte"></common-list>
      </van-list>
    </van-pull-refresh>
    <div class="addBtn" @click="add">
      <van-icon name="plus" size="22" color="#ffffff" />
    </div>
  </div>
</template>

<script>
import StatusTypeItem from '@/utils/status-typing'

import commonList from '../commonPage/commonList.vue'

import { listEvents, findRoomList, deleteEvent, findBatchNoList } from '../../api/application.apis'

export default {
  name: 'AllTodo',
  components: {
    commonList
  },
  data() {
    return {
      params: {
        batchNo: '',
        keyword: '',
        corpId: '',
        limit: 6,
        page: 1,
        roomId: '',
        status: ''
      },
      room: '',
      showPicker: false,
      columns: [],
      roomList: [],
      batchNoList: [],
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      totalSize: 0,
      status: 0
    }
  },
  created() {
    this.getList(this.params)
    this.getRoomList()
    this.getBatchNoList()
    this.params.corpId = JSON.parse(localStorage.getItem('select_enterprise')).id
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
      const res = await listEvents(params)
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
    handleClick(val) {
      this.$router.push({
        name: 'Event',
        query: {
          id: val.id,
          status: val.status
        }
      })
    },
    handleDelte(val) {
      this.$dialog.confirm({
        title: '删除提示',
        message: '确定删除此条记录吗？',
        beforeClose
      })
      const that = this
      async function beforeClose(action, done) {
        if (action === 'confirm') {
          const res = await deleteEvent({ eventId: val.id })
          if (res.code === '0') {
            that.getList(that.params)
            that.$toast('删除成功')
          } else {
            that.$toast(res.msg)
          }
        }
        done()
      }
    },
    handleChange() {
      this.getList(this.params)
    },
    handleReset() {
      this.params.batchNo = ''
      this.params.checkName = ''
      this.params.roomId = ''
      this.room = ''
    },
    handleSearch() {
      this.$refs.item.toggle()
      this.getList(this.params)
    },
    getOptions() {
      return [
        { text: '全部', value: '' },
        { text: '新建', value: StatusTypeItem.Pending },
        { text: '不合格', value: StatusTypeItem.CheckNotPass },
        { text: '合格', value: StatusTypeItem.CheckPass },
        { text: '已结案', value: StatusTypeItem.EnterpriseConfirmed },
        { text: '待整改', value: StatusTypeItem.WaitRectification },
        { text: '驳回', value: StatusTypeItem.EnterpriseReject },
        { text: '已延期', value: StatusTypeItem.NotRectification },
        { text: '已整改', value: StatusTypeItem.EnterpriseRectified }
      ]
    },
    roomClick() {
      this.columns = this.roomList
      this.showPicker = true
      this.status = 1
    },
    batchClick() {
      this.columns = this.batchNoList
      this.showPicker = true
      this.status = 0
    },
    onConfirm(value) {
      if (this.status) {
        this.params.roomId = value.id
        this.room = value.text
      } else {
        this.params.batchNo = value.id
      }
      this.showPicker = false
    },
    add() {
      this.$router.push({
        name: 'Event'
      })
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
