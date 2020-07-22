<template>
  <div>
    <van-nav-bar :title="edit ? '巡查记录' : '新增巡查记录'" left-text="返回" left-arrow @click-left="onClickLeft" />
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
        v-model="submitEventParam.checkContext"
        rows="2"
        autosize
        label="巡查内容"
        type="textarea"
        placeholder="请输入巡查内容"
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
      <van-field name="uploader" label="现场图片">
        <template #input>
          <van-uploader v-model="uploader" />
        </template>
      </van-field>
      <van-field
        v-model="submitEventParam.checkRemark"
        rows="2"
        autosize
        label="隐患内容"
        type="textarea"
        placeholder="请输入隐患内容"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
      </van-popup>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" :disabled="disabled">新增</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>

import StatusTypeItem from '@/utils/status-typing'

import { findBatchNoList, findRoomList, findRootList, addEvent, getEventDetail } from '../../api/application.apis'

export default {
  name: 'AddEvent',
  data() {
    return {
      parmas: {
        batchNo: '',
        checkTypeId: '',
        roomId: ''
      },
      submitEventParam: {
        checkContext: '',
        checkRemark: ''
      },
      checkType: '',
      room: '',
      columns: [],
      showPicker: false,
      currentSelect: 1,
      checkTypeList: [],
      roomList: [],
      edit: false,
      status: '',
      uploader: [],
      disabled: false,
      statusTypeItem: ''
    }
  },
  created(){
    this.statusTypeItem = StatusTypeItem;
    this.edit = !!this.$route.params.id;
    if(this.edit){
      this.status = this.$route.params.status;
      this.getEventDetail()
    }
  },
  methods: {
    onClickLeft() {
      history.go(-1)
    },
    handleClick(val) {
      if(this.edit){
        return
      }
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
      this.disabled = true;
      const res = await addEvent(this.parmas)
      if (res.code === '0') {
        this.$toast('新增成功')
        setTimeout(() => {
          this.$router.push({
            name: 'AllTodo'
          })
        }, 1000)
      } else {
        this.disabled = false;
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
    },
    async getEventDetail(){
      let res = await getEventDetail({id: this.$route.params.id});
      if(res.code === '0'){
        this.parmas.batchNo = res.data.batchNo;
        this.parmas.checkTypeId = res.data.checkTypeId;
        this.parmas.roomId = res.data.roomId;
        this.checkType = res.data.checkName;
        this.room = res.data.roomName;
      }else {
        this.$toast(res.msg)
      }
    }
  }
}
</script>
<style lang="scss"></style>
