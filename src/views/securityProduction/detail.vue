<!--
 * @Author: zhuqiu
 * @since: 2020-12-05 10:57:32
 * @Description: 
-->
<template>
  <div>
    <van-sticky>
      <van-nav-bar
        :title="id ? '编辑培训演练培训' : '新增培训演练培训'"
        left-arrow
        @click-left="onClickLeft"
        :right-text="id ? '删除' : ''"
        left-text="返回"
        @click-right="handleDelete"
      />
    </van-sticky>
    <van-form @submit="handleSubmit" label-width="6.5em">
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
      <van-field name="uploader" label="现场图片" v-if="id">
        <template #input>
          <van-uploader v-model="imgList" :after-read="afterRead" :before-delete="beforeDelete" />
        </template>
      </van-field>
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
    <div style="margin: 0.32rem;">
      <van-button round block type="info" @click="handleSubmit">
        <span v-if="!id">提交</span>
        <span v-else>编辑</span>
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
  deleteTrain
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
        endTime: ''
      },
      minDate: new Date(),
      showTime: false,
      imgList: [],
      corpName: '',
      dataType: '',
      id: ''
    }
  },
  created() {
    this.edit = !!this.$route.query.id
    this.id = this.$route.query.id
    this.params.corpId = JSON.parse(localStorage.getItem('select_enterprise')).id
    this.corpName = JSON.parse(localStorage.getItem('select_enterprise')).corpName
    if (this.edit) {
      this.getTrainDetail({ trainId: this.id })
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
    async handleSubmit() {
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
        corpId: this.params.corpId
      }
      let res = await saveOrUpdateTrain(params)
      if (res.code === '0') {
        this.$toast(this.id ? '编辑成功' : '新增成功')
        this.id = res.data.id
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
