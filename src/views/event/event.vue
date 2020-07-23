<template>
  <div>
    <van-nav-bar :title="edit ? '巡查记录' : '新增巡查记录'" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
      <van-field
        readonly
        clickable
        :disabled="isOverStatus"
        name="picker"
        :value="parmas.batchNo"
        label="巡查批次号"
        placeholder="点击选择巡查批次号"
        @click="handleClick(1)"
      />
      <van-field
        readonly
        clickable
        :disabled="isOverStatus"
        name="picker"
        :value="checkType"
        label="巡查类型"
        placeholder="点击选择巡查类型"
        @click="handleClick(2)"
      />
      <van-field
        v-if="status"
        :disabled="isOverStatus"
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
        :disabled="isOverStatus"
        name="picker"
        :value="room"
        label="巡查车间"
        placeholder="点击选择巡查车间"
        @click="handleClick(3)"
      />
      <van-field name="uploader" label="现场图片" v-if="status">
        <template #input>
          <van-uploader :disabled="isOverStatus" v-model="fileList" :after-read="afterRead" :before-delete="beforeDelete"/>
        </template>
      </van-field>
      <van-field
        :disabled="isOverStatus"
        v-if="status"
        v-model="submitEventParam.checkRemark"
        rows="2"
        autosize
        label="隐患内容"
        type="textarea"
        placeholder="请输入隐患内容"
      />
      <van-field name="radio" label="检查结果" v-if="status === statusTypeItem.Pending || status === statusTypeItem.Pending.EnterpriseReject">
        <template #input>
          <van-radio-group :disabled="isOverStatus" v-model="submitEventParam.checkResult" direction="horizontal">
            <van-radio :name="3">检查合格</van-radio>
            <van-radio :name="2">检查不合格</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-if="status === statusTypeItem.Pending || status === statusTypeItem.Pending.EnterpriseReject"
        readonly
        clickable
        name="datetimePicker"
        :value="submitEventParam.expectRepairDate"
        label="企业预估整改时间"
        placeholder="请选择企业预估整改时间"
        @click="timeClick"
      />
      <van-popup v-model="showTime" position="bottom">
        <van-datetime-picker
          :disabled="isOverStatus"
          type="date"
          :min-date="minDate"
          @confirm="onTimeConfirm"
          @cancel="showTime = false"
        />
      </van-popup>
      <van-popup v-model="showPicker" position="bottom">
        <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
      </van-popup>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" v-if="!isOverStatus" :disabled="disabled">{{ btnText }}</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>

import StatusTypeItem from '@/utils/status-typing'

import {
  findBatchNoList,
  findRoomList,
  findRootList,
  addEvent,
  submitEvent,
  getEventDetail,
  uploadImg,
  removeImg
} from '../../api/application.apis'

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
        checkRemark: '',
        checkResult: 3,
        expectRepairDate: '',
        eventId: ''
      },
      checkType: '',
      room: '',
      columns: [],
      showPicker: false,
      showTime: false,
      currentSelect: 1,
      checkTypeList: [],
      roomList: [],
      edit: false,
      status: '',
      fileList: [],
      disabled: false,
      statusTypeItem: '',
      btnText: '新增',
      minDate: new Date(),
    }
  },
  created(){
    this.statusTypeItem = StatusTypeItem;
    this.edit = !!this.$route.params.id;
    if(this.edit){
      this.status = this.$route.params.status;
      if(this.status === StatusTypeItem.Pending || this.status === StatusTypeItem.EnterpriseReject){
        this.submitEventParam.eventId = this.$route.params.id;
        this.btnText = '提交';
      }else if(this.status === StatusTypeItem.CheckNotPass || this.status === StatusTypeItem.CheckPass){
        this.btnText = '企业确认';
      }else if(this.status === StatusTypeItem.WaitRectification || this.status === StatusTypeItem.NotRectification){
        this.btnText = '确认已整改';
      }
      this.getEventDetail()
    }else {
      this.btnText = '新增';
    }
  },
  computed:{
    isOverStatus(){
      return this.status === StatusTypeItem.EnterpriseConfirmed || this.status === StatusTypeItem.EnterpriseRectified;
    }
  },
  methods: {
    onClickLeft() {
      history.go(-1)
    },
    afterRead(file) {
      file.status = 'uploading';
      file.message = '上传中...';
      this.uploadImg(file);
    },
    async uploadImg(file){
      let formdata = new FormData();
      formdata.append('file',file.file);
      formdata.append('eventId',this.$route.params.id);
      let res = await uploadImg(formdata);
      if(res.code === '0'){
        file.status = 'done';
        file.message = 'done'
      }else{
        file.status = 'failed';
        file.message = '上传失败';
      }
    },
    beforeDelete(file){
      if(file.id){
        this.$dialog.confirm({
          title: '删除提示',
          message: '确定删除吗？',
          beforeClose,
        });
        async function beforeClose(action, done) {
          if (action === 'confirm') {
            let res = await removeImg({imgId: file.id});
            if(res.code === '0'){
              location.reload();
            } 
          }
          done();
        }
      }else{
        return true;
      }
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
      if(!this.edit){
        const res = await addEvent(this.parmas)
        if (res.code === '0') {
          this.$toast('新增成功')
          this.goToAllTodo();
        } else {
          this.disabled = false;
          this.$toast(res.msg)
        }
      }else {
        if(this.status === StatusTypeItem.Pending || this.status === StatusTypeItem.EnterpriseReject){
          let res = await submitEvent(this.submitEventParam);
          if(res.code === '0'){
            this.$toast('提交成功')
            this.goToAllTodo();
          } else {
          this.disabled = false;
          this.$toast(res.msg)
        }
        }
      }
      
    },
    goToAllTodo(){
      setTimeout(() => {
        this.$router.push({
          name: 'AllTodo'
        })
      }, 1000)
    },
    timeClick(){
      if(this.isOverStatus){
        return;
      }
      this.showTime = true;
    },
    onTimeConfirm(time){
      this.submitEventParam.expectRepairDate = this.$moment(time).format('YYYY-MM-DD');
      this.showTime = false;
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
        this.submitEventParam.expectRepairDate = res.data.expectRepairDate;
        this.submitEventParam.checkContext = res.data.checkContext
        this.submitEventParam.checkRemark = res.data.checkRemark;
        if(res.data.imgs){
          this.fileList = res.data.imgs.map((m) => {
            return {
              status: 'done',
              message: 'done',
              id: m.id,
              url: m.imgPath
            }
          })
        }
      }else {
        this.$toast(res.msg)
      }
    }
  }
}
</script>
<style lang="scss"></style>
