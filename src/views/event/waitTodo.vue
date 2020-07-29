<!--
 * @Date: 2020-07-21 13:39:43
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-07-21 14:52:12
 * @FilePath: \project\src\views\event\waitTodo.vue
-->
<template>
  <div>
    <van-sticky>
      <van-dropdown-menu>
        <van-dropdown-item v-model="value" :options="option" />
        <van-dropdown-item title="筛选" ref="item">
          <van-form validate-first>
            <van-field
              v-model="params.batchNo"
              placeholder="请输入批次号"
              label="批次号"
            />
            <van-field
              v-model="params.checkName"
              label="检查类型"
              placeholder="请输入检查类型"
            />
            <van-field
                readonly
                clickable
                name="picker"
                :value="room"
                label="巡查车间"
                placeholder="点击选择巡查车间"
                @click="roomClick"
              />
              <van-popup v-model="showPicker" position="bottom">
                <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
              </van-popup>
          </van-form>
          <div class="btn-content">
            <van-button class="btn-width" size="small" type="primary" @click="handleReset">重置</van-button>
            <van-button class="btn-width" size="small" type="info" @click="handleSearch">查询</van-button>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </van-sticky>

    <van-empty v-if="list.length === 0" description="暂无数据" />

    <common-list :data="list" @click="handleClick" v-else></common-list>

  </div>
</template>

<script>

import StatusTypeItem from '@/utils/status-typing'

import commonList from '../commonPage/commonList.vue'

import { listToDoEvents, findRoomList } from '../../api/application.apis'

export default {
  name: 'WaitTodo',
  components: {
    commonList
  },
  data() {
    return {
      value: 1,
      params: {
        batchNo: '',
        checkName: '',
        roomId: ''
      },
      room: '',
      list: [],
      option: [
        { text: '待处理', value: StatusTypeItem.Pending }
      ],
      showPicker: false,
      columns: []
    }
  },
  created(){
    this.getList(this.params);
    this.getRoomList()
  },
  methods: {
    async getList(params) {
      const res = await listToDoEvents(params)
      if (res.code === '0') {
        this.list = res.data
      } else {
        this.$toast(res.msg)
        this.list = []
      }
    },
    roomClick() {
      this.showPicker = true
    },
    onConfirm(value) {
      this.params.roomId = value.id
      this.room = value.text
      this.showPicker = false
    },
    handleReset(){
      this.params.batchNo = '';
      this.params.checkName = '';
      this.params.roomId = '';
      this.room = '';
    },
    handleSearch(){
      this.$refs.item.toggle();
    },
    handleClick(val){
      this.$router.push({
        name: 'Event',
        query: {
          id: val.id,
          status: val.status
        }
      })
    },
    async getRoomList() {
      const res = await findRoomList({ corpId: JSON.parse(localStorage.getItem('select_enterprise')).id })
      if (res.code === '0') {
        this.columns = res.data.map(d => {
          return {
            text: d.roomName,
            id: d.id
          }
        })
      } else {
        this.$toast(res.msg)
        this.columns = []
      }
    }
  }
}
</script>
<style lang="scss">
.btn-content{
  display: flex;
  justify-content: space-around;
  margin: 0.32rem 0;
  .btn-width{
    width: 4rem;
  }
}
</style>
