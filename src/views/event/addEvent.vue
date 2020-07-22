<template>
  <div>
    <van-nav-bar title="新增巡查记录" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
      <van-field
        readonly
        clickable
        name="picker"
        :value="parmas.batchNo"
        label="巡查批次号"
        placeholder="点击选择巡查批次号"
        @click="handleClick(1)"
      />
      <van-field
        readonly
        clickable
        name="picker"
        :value="checkType"
        label="巡查类型"
        placeholder="点击选择巡查类型"
        @click="handleClick(2)"
      />
      <van-field
        readonly
        clickable
        name="picker"
        :value="room"
        label="巡查车间"
        placeholder="点击选择巡查车间"
        @click="handleClick(3)"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
      </van-popup>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">新增</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { findBatchNoList, findRoomList, findRootList, addEvent } from '../../api/application.apis'
export default {
  name: 'AddEvent',
  data() {
    return {
      parmas: {
        batchNo: '',
        checkTypeId: '',
        roomId: ''
      },
      checkType: '',
      room: '',
      columns: [],
      showPicker: false,
      currentSelect: 1,
      checkTypeList: [],
      roomList: [],
      uploader: [{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }]
    }
  },
  methods: {
    onClickLeft() {
      history.go(-1)
    },
    handleClick(val) {
      this.showPicker = true
      this.currentSelect = val
      switch (val) {
        case 1:
          this.getBatchNoList()
          break
        case 2:
          this.getCheckTypeList()
          break
        case 3:
          this.getRoomList()
          break
      }
    },
    onConfirm(value, index) {
      switch (this.currentSelect) {
        case 1:
          this.parmas.batchNo = value
          break
        case 2:
          this.parmas.checkTypeId = value.id
          this.checkType = value.text
          break
        case 3:
          this.parmas.roomId = value.id
          this.room = value.text
          break
      }
      this.showPicker = false
    },
    async onSubmit() {
      const res = await addEvent(this.parmas)
      if (res.code === '0') {
        this.$toast('新增成功')
        setTimeout(() => {
          this.$router.push({
            name: 'AllTodo'
          })
        }, 1000)
      } else {
        this.$toast(res.msg)
      }
    },
    async getBatchNoList() {
      const res = await findBatchNoList({ corpId: JSON.parse(localStorage.getItem('select_enterprise')).id })
      if (res.code === '0') {
        this.columns = res.data
      } else {
        this.$toast(res.msg)
        this.columns = []
      }
    },
    async getCheckTypeList() {
      const res = await findRootList({ checkName: '' })
      if (res.code === '0') {
        this.columns = res.data.map(d => {
          return {
            text: d.checkName,
            id: d.id
          }
        })
        this.checkTypeList = res.data
      } else {
        this.$toast(res.msg)
        this.columns = []
        this.checkTypeList = []
      }
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
        this.roomList = res.data
      } else {
        this.$toast(res.msg)
        this.columns = []
        this.roomList = []
      }
    }
  }
}
</script>
<style lang="scss"></style>
