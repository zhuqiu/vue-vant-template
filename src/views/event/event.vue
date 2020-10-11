<template>
  <div>
    <van-sticky>
      <van-nav-bar :title="edit ? '巡查记录' : '新增巡查记录'" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <div class="content-view" v-if="edit">
      <ul class="content-detail">
        <li>
          <div class="content-label">企业名称</div>
          <div class="content-nav">{{ corpName }}</div>
        </li>
        <li>
          <div class="content-label">巡查批次号</div>
          <div class="content-nav">{{ parmas.batchNo }}</div>
        </li>
        <li>
          <div class="content-label">巡查类型</div>
          <div class="content-nav">{{ checkType }}</div>
        </li>
        <li>
          <div class="content-label">巡查车间</div>
          <div class="content-nav">{{ room }}</div>
        </li>
        <li v-if="isWaitEnteriseRectification || isOverStatus || isWaitSure">
          <div class="content-label">巡查内容</div>
          <div class="content-nav">{{ submitEventParam.checkContext }}</div>
        </li>
        <li v-if="isWaitEnteriseRectification || isOverStatus || isWaitSure">
          <div class="content-label">现场图片</div>
          <div class="content-nav">
            <div>
              <van-image
                style="margin-right: 0.32rem;"
                width="100"
                height="100"
                v-for="(item, index) in fileList"
                :key="index"
                @click="previewImg(index)"
                :src="item.url"
              />
            </div>
          </div>
        </li>
        <li v-if="status === statusTypeItem.EnterpriseReject">
          <div class="content-label">企业驳回原因</div>
          <div class="content-nav">{{ confirmEventParam.rejectReason }}</div>
        </li>
        <li>
          <div class="content-label">创建时间</div>
          <div class="content-nav">{{ data.createTime }}</div>
        </li>
        <li>
          <div class="content-label">检查人</div>
          <div class="content-nav">{{ data.nickname }}</div>
        </li>
        <li v-if="data.expectRepairDate">
          <div class="content-label">预期整改时间</div>
          <div class="content-nav">{{ data.expectRepairDate }}</div>
        </li>
        <li v-if="data.corpConfirmCheckResultTime">
          <div class="content-label">验收时间</div>
          <div class="content-nav">{{ data.corpConfirmCheckResultTime }}</div>
        </li>
        <li v-if="data.checkTime">
          <div class="content-label">检查时间</div>
          <div class="content-nav">{{ data.checkTime }}</div>
        </li>
        <li v-if="data.repairDate">
          <div class="content-label">实际整改时间</div>
          <div class="content-nav">{{ data.repairDate }}</div>
        </li>
        <li v-if="data.rejectUserNickname">
          <div class="content-label">驳回人员</div>
          <div class="content-nav">{{ data.rejectUserNickname }}</div>
        </li>
      </ul>
    </div>
    <van-form @submit="onSubmit">
      <div class="content-view" v-if="!edit">
        <ul class="content-detail">
          <li>
            <div class="content-label">企业名称</div>
            <div class="content-nav">{{ corpName }}</div>
          </li>
        </ul>
      </div>

      <van-field
        v-if="!edit"
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
        v-if="!edit"
        readonly
        clickable
        :disabled="isOverStatus"
        name="picker"
        :value="checkType"
        label="巡查类型"
        placeholder="点击选择一级巡查类型"
        @click="handleClick(2)"
      />
      <van-field
        v-if="!edit && checkType"
        readonly
        clickable
        :disabled="isOverStatus"
        name="picker"
        :value="secondName"
        label=" "
        placeholder="点击选择二级巡查类型"
        @click="handleClick(4)"
      />
      <van-field
        v-if="!edit && secondName"
        readonly
        clickable
        :disabled="isOverStatus"
        name="picker"
        :value="thirdName"
        label=" "
        placeholder="点击选择三级巡查类型"
        @click="handleClick(5)"
      />
      <van-field
        v-if="!edit"
        readonly
        clickable
        :disabled="isOverStatus"
        name="picker"
        :value="room"
        label="巡查车间"
        placeholder="点击选择巡查车间"
        @click="handleClick(3)"
      />
      <van-field
        v-if="isPending"
        v-model="submitEventParam.checkContext"
        rows="2"
        autosize
        label="巡查内容"
        type="textarea"
        placeholder="请输入巡查内容"
      />
      <van-field
        name="uploader"
        :label="isWaitEnteriseRectification ? '整改图片' : '现场图片'"
        v-if="isPending || isWaitEnteriseRectification"
      >
        <template #input>
          <van-uploader v-model="imgList" :after-read="afterRead" :before-delete="beforeDelete" />
        </template>
      </van-field>
      <!-- <van-field
        v-if="!edit"
        v-model="submitEventParam.checkRemark"
        rows="2"
        autosize
        label="隐患内容"
        type="textarea"
        placeholder="请输入隐患内容"
      /> -->
      <van-field name="radio" label="检查结果" v-if="isPending">
        <template #input>
          <van-radio-group v-model="submitEventParam.checkResult" direction="horizontal">
            <van-radio :name="3">检查合格</van-radio>
            <van-radio :name="2">检查不合格</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-if="isPending || isWaitSure"
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
      <van-field name="radio" label="回复状态" v-if="isWaitSure">
        <template #input>
          <van-radio-group v-model="confirmEventParam.replyStatus" direction="horizontal">
            <van-radio :name="1">确认结果ok</van-radio>
            <van-radio :name="2">驳回</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-if="confirmEventParam.replyStatus === 2"
        v-model="confirmEventParam.rejectReason"
        rows="2"
        autosize
        label="驳回原因"
        type="textarea"
        placeholder="请输入驳回原因"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
      </van-popup>
      <div style="margin: 0.32rem;">
        <van-button round block type="info" native-type="submit" v-if="!edit" :disabled="disabled">新增</van-button>
        <van-button round block type="info" native-type="submit" v-if="statusNumber === '1'" :disabled="disabled"
          >提交</van-button
        >
        <van-button
          round
          block
          type="info"
          native-type="submit"
          v-if="statusNumber === '3'"
          :disabled="disabled"
          >确认已整改</van-button
        >
        <van-button round block type="info" native-type="submit" v-if="statusNumber === '2'" :disabled="disabled"
          >企业确认</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'

import StatusTypeItem from '@/utils/status-typing'

import UserType from '@/utils/user-typing'

import {
  findBatchNoList,
  findRoomList,
  findRootList,
  findChildList,
  addEvent,
  submitEvent,
  confirmEvent,
  finishRepair,
  getEventDetail,
  uploadImg,
  removeImg,
  getEventControlerButton
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
      confirmEventParam: {
        replyStatus: 1,
        rejectReason: ''
      },
      data: '',
      corpName: '',
      checkType: '',
      room: '',
      columns: [],
      showPicker: false,
      showTime: false,
      currentSelect: 1,
      checkTypeList: [],
      secondTypeList: [],
      thirdTypeList: [],
      secondId: '',
      secondName: '',
      thirdId: '',
      thirdName: '',
      roomList: [],
      edit: false,
      status: '',
      fileList: [],
      imgList: [], // 当前图片组件中的文件信息
      disabled: false,
      statusTypeItem: '',
      btnText: '新增',
      minDate: new Date(),
      id: '',
      role: '',
      statusNumber: ''
    }
  },
  created() {
    this.role = localStorage.getItem('user_type')
    this.corpName = JSON.parse(localStorage.getItem('select_enterprise')).corpName
    this.id = Number(this.$route.query.id)
    this.statusTypeItem = StatusTypeItem
    this.edit = !!this.id
    if (this.edit) {
      this.getEventControlerButton();
      this.status = Number(this.$route.query.status)
      if (this.status === StatusTypeItem.Pending || this.status === StatusTypeItem.EnterpriseReject) {
        this.submitEventParam.eventId = this.id
        this.btnText = '提交'
      } else if (this.status === StatusTypeItem.CheckNotPass || this.status === StatusTypeItem.CheckPass) {
        this.btnText = '企业确认'
      } else if (this.status === StatusTypeItem.WaitRectification || this.status === StatusTypeItem.NotRectification) {
        this.btnText = '确认已整改'
      }
      this.getEventDetail()
    } else {
      this.btnText = '新增'
    }
  },
  computed: {
    // 状态为 进行中 企业驳回
    isPending() {
      return this.status === StatusTypeItem.Pending || this.status === StatusTypeItem.EnterpriseReject
    },
    // 检查合格 检查不合格
    isWaitSure() {
      return this.status === StatusTypeItem.CheckNotPass || this.status === StatusTypeItem.CheckPass
    },
    // 待企业整改 预期未整改
    isWaitEnteriseRectification() {
      return this.status === StatusTypeItem.WaitRectification || this.status === StatusTypeItem.NotRectification
    },
    // 企业已确认(结束) 企业已整改(结束)
    isOverStatus() {
      return this.status === StatusTypeItem.EnterpriseConfirmed || this.status === StatusTypeItem.EnterpriseRectified
    },
    //获取用户角色 -- 运维用户
    isServer() {
      return this.role === UserType.ADMIN || this.role === UserType.OPER_ADMIN
    },
    //获取用户角色 -- 企业用户
    isAgent() {
      return this.role === UserType.AGENT_ADMIN || this.role === UserType.AGENT_XUNCHAYUAN
    }
  },
  methods: {
    onClickLeft() {
      history.go(-1)
    },
    afterRead(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      this.uploadImg(file)
    },
    async uploadImg(file) {
      const formdata = new FormData()
      formdata.append('file', file.file)
      formdata.append('eventId', this.id)
      const res = await uploadImg(formdata)
      if (res.code === '0') {
        file.id = res.data.id
        file.status = 'done'
        file.message = 'done'
      } else {
        file.status = 'failed'
        file.message = '上传失败'
      }
    },
    async getEventControlerButton(){
      let res = await getEventControlerButton({
        eventId: this.id
      })
      if(res.code === '0'){
        this.statusNumber = res.data.status;
      }  
    },
    beforeDelete(file) {
      if (file.id) {
        this.$dialog.confirm({
          title: '删除提示',
          message: '确定删除吗？',
          beforeClose
        })
        async function beforeClose(action, done) {
          if (action === 'confirm') {
            const res = await removeImg({ imgId: file.id })
            if (res.code === '0') {
              location.reload()
            }
          }
          done()
        }
      } else {
        return true
      }
    },
    handleClick(val) {
      if (this.edit) {
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
        case 4:
          this.findChildList(this.parmas.checkTypeId, 4)
          break
        case 5:
          this.findChildList(this.secondId, 5)
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
          this.secondName = ''
          this.secondId = ''
          this.thirdId = ''
          this.thirdName = ''
          break
        case 3:
          this.parmas.roomId = value.id
          this.room = value.text
          break
        case 4:
          this.secondId = value.id
          this.secondName = value.text
          this.thirdId = ''
          this.thirdName = ''
          break
        case 5:
          this.thirdId = value.id
          this.thirdName = value.text
          break
      }
      this.showPicker = false
    },
    async onSubmit() {
      // if(!this.thirdId){
      //   this.$toast('请选择第三级巡查类型');
      //   return;
      // }
      this.disabled = true
      if (!this.edit) {
        const res = await addEvent({
          batchNo: this.parmas.batchNo,
          checkTypeId: this.thirdId,
          roomId: this.parmas.roomId
        })
        if (res.code === '0') {
          this.$toast('新增成功')
          this.goToAllTodo()
        } else {
          this.disabled = false
          this.$toast(res.msg)
        }
      } else {
        if (this.isPending) {
          const res = await submitEvent(this.submitEventParam)
          if (res.code === '0') {
            this.$toast('提交成功')
            this.goToAllTodo()
          } else {
            this.disabled = false
            this.$toast(res.msg)
          }
        } else if (this.isWaitSure) {
          const params = {
            eventId: this.id,
            expectRepairDate: this.submitEventParam.expectRepairDate,
            rejectReason: this.confirmEventParam.rejectReason,
            replyStatus: this.confirmEventParam.replyStatus
          }
          if (this.status === StatusTypeItem.CheckNotPass && !this.submitEventParam.expectRepairDate) {
            this.$toast('请选择预期整改时间')
            this.disabled = false
            return
          }
          if (this.confirmEventParam.replyStatus === 2 && !this.confirmEventParam.rejectReason) {
            this.$toast('请填写驳回原因')
            this.disabled = false
            return
          }
          const res = await confirmEvent(params)
          if (res.code === '0') {
            this.$toast('提交成功')
            this.goToAllTodo()
          } else {
            this.disabled = false
            this.$toast(res.msg)
          }
        } else if (this.isWaitEnteriseRectification) {
          let params = {
            eventId: this.id
          }
          const res = await finishRepair(params)
          if (res.code === '0') {
            this.$toast('提交成功')
            this.goToAllTodo()
          } else {
            this.disabled = false
            this.$toast(res.msg)
          }
        }
      }
    },
    goToAllTodo() {
      setTimeout(() => {
        this.$router.push({
          name: 'AllTodo'
        })
      }, 1000)
    },
    timeClick() {
      if (this.isOverStatus) {
        return
      }
      this.showTime = true
    },
    onTimeConfirm(time) {
      this.submitEventParam.expectRepairDate = this.$moment(time).format('YYYY-MM-DD')
      this.showTime = false
    },
    async getBatchNoList() {
      const res = await findBatchNoList({
        corpId: JSON.parse(localStorage.getItem('select_enterprise')).id,
        status: 1
      })
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
    async findChildList(id, type) {
      const res = await findChildList({ id: id })
      if (res.code === '0') {
        this.columns = res.data.map(d => {
          return {
            text: d.checkName,
            id: d.id
          }
        })
        if (type === 4) {
          this.secondTypeList = res.data
        } else if (type === 5) {
          this.thirdTypeList = res.data
        }
      } else {
        this.$toast(res.msg)
        this.columns = []
        if (type === 4) {
          this.secondTypeList = []
        } else if (type === 5) {
          this.thirdTypeList = []
        }
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
    async getEventDetail() {
      const res = await getEventDetail({ id: this.id })
      if (res.code === '0') {
        this.parmas.batchNo = res.data.batchNo
        this.parmas.checkTypeId = res.data.checkTypeId
        this.parmas.roomId = res.data.roomId
        this.checkType = res.data.checkName
        this.room = res.data.roomName
        this.corpName = res.data.corpName
        this.data = res.data
        this.submitEventParam.expectRepairDate = res.data.expectRepairDate
        this.submitEventParam.checkContext = res.data.checkContext
        this.submitEventParam.checkRemark = res.data.checkRemark
        this.confirmEventParam.rejectReason = res.data.rejectReason
        if (res.data.imgs) {
          this.fileList = res.data.imgs.map(m => {
            return {
              status: 'done',
              message: 'done',
              id: m.id,
              url: m.imgPath
            }
          })
          if (this.isWaitEnteriseRectification) {
            this.imgList = []
          } else {
            this.imgList = this.fileList
          }
        }
      } else {
        this.$toast(res.msg)
      }
    },
    previewImg(index) {
      const list = this.fileList.map(f => {
        return f.url
      })
      ImagePreview({
        images: list,
        startPosition: index
      })
    }
  }
}
</script>
<style lang="scss">
.content-view {
  font-size: 0.37333rem;
  line-height: 0.64rem;
  background-color: #fff;
  .content-detail > li {
    padding: 0.26667rem 0.42667rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    &::after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      right: 0.42667rem;
      bottom: 0;
      left: 0.42667rem;
      border-bottom: 0.02667rem solid #ebedf0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
    .content-label {
      width: 3rem;
      margin-right: 0.42rem;
      color: #646566;
      text-align: left;
      word-wrap: break-word;
    }
    .content-nav {
      width: 100%;
      vertical-align: middle;
      overflow: visible;
      word-wrap: break-word;
    }
  }
}
</style>
