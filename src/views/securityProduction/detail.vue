<!--
 * @Author: zhuqiu
 * @since: 2020-12-05 10:57:32
 * @Description:
-->
<template>
  <div>
    <van-sticky>
      <van-nav-bar
        :title="id ? '编辑安全培训' : '新增安全培训'"
        left-arrow
        @click-left="onClickLeft"
        :right-text="btnPermission.deleteBtn ? '删除' : ''"
        left-text="返回"
        @click-right="handleDelete"
      />
    </van-sticky>
    <van-form label-width="6.5em">
      <div class="content-view">
        <ul class="content-detail">
          <li>
            <div class="content-label">培训单位</div>
            <div class="content-nav">{{ corpName }}</div>
          </li>
        </ul>
      </div>
      <van-field
        rows="2"
        autosize
        v-model="params.trainObj"
        label="培训对象"
        placeholder="请输入培训对象"
        type="textarea"
      />
      <van-field
        rows="2"
        autosize
        v-model="params.content"
        label="培训内容"
        placeholder="请输入培训内容"
        type="textarea"
      />
      <van-field v-model="params.persionAmount" label="培训人数" type="digit" placeholder="请输入培训人数" />
      <van-field
        rows="2"
        autosize
        v-model="params.address"
        label="培训地点"
        placeholder="请输入培训地点"
        type="textarea"
      />
      <van-field v-model="params.teacher" label="授课老师" placeholder="请输入授课老师" />
      <van-field
        readonly
        clickable
        name="datetimePicker"
        v-model="params.trainDate"
        label="培训时间"
        placeholder="请选择培训时间"
        @click="timeClick('date')"
      />
      <van-field
        v-if="params.trainDate"
        readonly
        clickable
        name="datetimePicker"
        v-model="params.beginTime"
        label="开始时间"
        placeholder="请选择开始时间"
        @click="timeClick('start-time')"
      />
      <van-field
        v-if="params.trainDate"
        readonly
        clickable
        name="datetimePicker"
        v-model="params.endTime"
        label="结束时间"
        placeholder="请选择结束时间"
        @click="timeClick('end-time')"
      />
      <van-field
        readonly
        clickable
        name="picker"
        :value="getName"
        label="审核人"
        placeholder="请选择审核人"
        @click="showPicker = true"
      />
      <van-field
        name="uploader"
        label="现场图片"
        v-if="btnPermission.finishBtn || params.status === 5 || params.status === 4">
        <template #input>
          <van-uploader
            v-model="imgList"
            :after-read="afterRead"
            :before-delete="beforeDelete"
            :show-upload="params.status !== 5 && params.status !== 4"
            :deletable="params.status !== 5 && params.status !== 4"
          />
        </template>
      </van-field>
      <van-field
        v-if="btnPermission.auditoAndRejectBtn || params.status === 4"
        rows="2"
        autosize
        v-model="params.auditorFailReason"
        label="驳回原因"
        placeholder="请输入驳回原因"
        type="textarea"
      />
    </van-form>

    <van-popup v-model="showTime" position="bottom">
      <van-datetime-picker
        :min-date="minDate"
        :type="dataType === 'date' ? 'date' : 'time'"
        @confirm="
          time => {
            return onTimeConfirm(time, dataType)
          }
        "
        @cancel="showTime = false"
      />
    </van-popup>

    <van-popup v-model="showPicker" position="bottom">
      <van-picker show-toolbar :columns="getColumnsValue" @confirm="onConfirm" @cancel="showPicker = false">
        <template #title>
          <van-search v-model="pickerWord" placeholder="请输入搜索关键词" style="width: 180px"/>
        </template>
      </van-picker>
    </van-popup>
    <div style="margin: 0.32rem;">
      <van-button v-if="!id" round block type="info" @click="handleClick(0)">
        新增
      </van-button>
      <van-button style="margin-bottom: 8px;" v-if="btnPermission.saveBtn" round block type="info" @click="handleClick(1)">
        保存
      </van-button>
      <van-button
        v-if="btnPermission.submitBtn"
        round block
        type="info"
        @click="handleClick(2)"
      >
        提交
      </van-button>

      <van-button style="margin-bottom: 8px;" v-if="btnPermission.auditoAndRejectBtn" round block type="info" @click="handleClick(3)">
        审核通过
      </van-button>
      <van-button v-if="btnPermission.auditoAndRejectBtn" round block type="info" @click="handleClick(4)">
        驳回
      </van-button>
      <van-button v-if="btnPermission.finishBtn" round block type="info" @click="handleClick(5)">
        完成
      </van-button>
    </div>
  </div>
</template>

<script>
import {
  getTrainDetail,
  saveOrUpdateTrain,
  uploadImgTrain,
  removeImgTrain,
  deleteTrain,
  getTrainControllerButton,
  trainSubmit,
  trainReject,
  trainFinish,
  trainAuditor,
  findTrainCorpUser,
} from '../../api/application.apis'

import { ImagePreview } from 'vant'

export default {
  name: 'securityProductionDetail',
  data() {
    return {
      edit: false,
      params: {
        address: '',
        content: '',
        persionAmount: '',
        teacher: '',
        trainObj: '',
        trainDate: '',
        beginTime: '',
        endTime: '',
        auditorFailReason: '',
        auditorUserUid: ''
      },
      minDate: new Date(),
      showTime: false,
      imgList: [],
      corpName: '',
      dataType: '',
      id: '',
      btnPermission: '',
      userList: [],
      showPicker: false,
      pickerWord: '',
    }
  },
  created() {
    this.findTrainCorpUser();
    this.edit = !!this.$route.query.id
    this.id = this.$route.query.id
    this.params.corpId = JSON.parse(localStorage.getItem('select_enterprise')).id
    this.corpName = JSON.parse(localStorage.getItem('select_enterprise')).corpName
    if (this.edit) {
      this.getTrainDetail({ trainId: this.id })
      this.getControllerButton();
    }
  },
  computed: {
    getColumnsValue() {
      if(!this.pickerWord){
        return this.userList;
      }else {
        return this.userList.filter(res => res.text.indexOf(this.pickerWord) > -1);
      }
    },
    getName() {
      let source = this.userList.find(res => res.id === this.params.auditorUserUid)
      if(source){
        return source.text;
      }
      return '';
    }
  },
  methods: {
    onClickLeft() {
      history.go(-1)
    },
    async getTrainDetail(params) {
      const res = await getTrainDetail(params)
      if (res.code === '0') {
        this.params = res.data
        this.params.corpId = JSON.parse(localStorage.getItem('select_enterprise')).id
        if (res.data.imgs) {
          this.imgList = res.data.imgs.map(m => {
            return {
              status: 'done',
              message: 'done',
              id: m.id,
              url: m.imgPath,
              imgType: m.imgType
            }
          })
        }
      } else {
        this.$toast(res.msg)
      }
    },
    async findTrainCorpUser() {
      let res = await findTrainCorpUser({
        corpId: JSON.parse(localStorage.getItem('select_enterprise')).id
      });
      if (res.code === '0') {
        this.userList = res.data.map(d => {
          return {
            text: d.nickname,
            id: d.uid,
          }
        });
      } else {
        this.$toast(res.msg)
      }
    },
    onConfirm(value) {
      this.params.auditorUserUid = value.id;
      this.showPicker = false
    },
    async handleClick(type) {
      switch(type){
        case 0:
        case 1:
          this.saveOrUpdateTrain()
          break;
        case 2:
          this.trainSubmit()
          break;
        case 3:
          this.trainAuditor()
          break;
        case 4:
          this.trainReject()
          break;
        case 5:
          this.trainFinish()
          break;
      }
    },
    async saveOrUpdateTrain(){
      let params = {
        address: this.params.address,
        content: this.params.content,
        persionAmount: this.params.persionAmount,
        teacher: this.params.teacher,
        trainObj: this.params.trainObj,
        trainDate: this.params.trainDate,
        beginTime: this.params.beginTime,
        endTime: this.params.endTime,
        id: this.id ? this.id : null,
        corpId: this.params.corpId,
        auditorUserUid: this.params.auditorUserUid,
      }
      let res = await saveOrUpdateTrain(params)
      if (res.code === '0') {
        this.$toast(this.id ? '保存成功' : '新增成功')
        setTimeout(() => {
          this.$router.push({
            name: 'SecurityProduction'
          })
        }, 1000)
      } else {
        this.$toast(res.msg)
      }
    },
    async trainAuditor(){
      const res = await trainAuditor({ trainId: this.id })
      if (res.code === '0') {
        this.$toast('审核成功')
        setTimeout(() => {
          this.$router.push({
            name: 'SecurityProduction'
          })
        }, 1000)
      } else {
        this.$toast(res.msg)
      }
    },
    async trainFinish(){
      const res = await trainFinish({ trainId: this.id })
      if (res.code === '0') {
        this.$toast('完成成功')
        setTimeout(() => {
          this.$router.push({
            name: 'SecurityProduction'
          })
        }, 1000)
      } else {
        this.$toast(res.msg)
      }
    },
    async trainReject(){
      const res = await trainReject({
        id: this.id,
        auditorFailReason: this.params.auditorFailReason
       })
      if (res.code === '0') {
        this.$toast('驳回成功')
        setTimeout(() => {
          this.$router.push({
            name: 'SecurityProduction'
          })
        }, 1000)
      } else {
        this.$toast(res.msg)
      }
    },
    async trainSubmit(){
      const res = await trainSubmit({ trainId: this.id })
      if (res.code === '0') {
        this.$toast('提交成功')
        setTimeout(() => {
          this.$router.push({
            name: 'SecurityProduction'
          })
        }, 1000)
      } else {
        this.$toast(res.msg)
      }
    },
    afterRead(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      this.uploadImg(file)
    },
    async uploadImg(file) {
      const formdata = new FormData()
      formdata.append('file', file.file)
      formdata.append('trainId', this.id)
      const res = await uploadImgTrain(formdata)
      if (res.code === '0') {
        file.id = res.data.id
        file.status = 'done'
        file.message = 'done'
      } else {
        file.status = 'failed'
        file.message = '上传失败'
        this.$toast(res.msg)
      }
    },
    beforeDelete(file) {
      const that = this
      if (file.id) {
        this.$dialog.confirm({
          title: '删除提示',
          message: '确定删除吗？',
          beforeClose
        })
        async function beforeClose(action, done) {
          if (action === 'confirm') {
            const res = await removeImgTrain({ imgId: file.id })
            if (res.code === '0') {
              that.$toast('删除成功')
              let index = that.imgList.findIndex(f => f.id === file.id)
              that.imgList.splice(index, 1)
            } else {
              that.$toast('删除失败')
            }
          }
          done()
        }
      } else {
        return true
      }
    },
    timeClick(type) {
      this.showTime = true
      this.dataType = type
    },
    onTimeConfirm(time) {
      switch (this.dataType) {
        case 'date':
          this.params.trainDate = this.$moment(time).format('YYYY-MM-DD')
          break
        case 'start-time':
          this.params.beginTime = time
          break
        case 'end-time':
          this.params.endTime = time
          break
      }
      this.showTime = false
    },
    async handleDelete() {
      const that = this
      this.$dialog.confirm({
        title: '删除提示',
        message: '确定删除吗？',
        beforeClose
      })
      async function beforeClose(action, done) {
        if (action === 'confirm') {
          const res = await deleteTrain({
            trainId: that.id
          })
          if (res.code === '0') {
            that.$toast('删除成功')
            setTimeout(() => {
              that.$router.push({
                name: 'SecurityProduction'
              })
            }, 1000)
          } else {
            that.$toast(res.msg)
          }
        }
        done()
      }
    },
    async getControllerButton(){
      const res = await getTrainControllerButton({
        trainId: this.id
      });
      if(res.code === '0'){
        this.btnPermission = res.data;
      }else{
        this.$toast(res.msg)
      }
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
      width: 3.5rem;
      margin-right: 0.3rem;
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
