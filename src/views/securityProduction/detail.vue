<!--
 * @Author: zhuqiu
 * @since: 2020-12-05 10:57:32
 * @Description: 
-->
<template>
  <div>
    <van-sticky>
      <van-nav-bar title="安全生产详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <div class="content-view" v-if="edit">
      <ul class="content-detail">
        <li>
          <div class="content-label">培训对象</div>
          <div class="content-nav">{{ params.trainObj }}</div>
        </li>
        <li>
          <div class="content-label">培训内容</div>
          <div class="content-nav">{{ params.content }}</div>
        </li>
        <li>
          <div class="content-label">培训人数</div>
          <div class="content-nav">{{ params.persionAmount }}</div>
        </li>
        <li>
          <div class="content-label">培训地点</div>
          <div class="content-nav">{{ params.address }}</div>
        </li>
        <li></li>
        <li>
          <div class="content-label">培训单位</div>
          <div class="content-nav">{{ corpName }}</div>
        </li>
        <li>
          <div class="content-label">授课老师</div>
          <div class="content-nav">{{ params.teacher }}</div>
        </li>
        <li>
          <div class="content-label">培训时间</div>
          <div class="content-nav">{{ params.trainTime }}</div>
        </li>
      </ul>
    </div>
    <van-form @submit="handleSubmit" label-width="6.5em" v-else>
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
      <van-field v-model="params.persionAmount" label="培训人数" placeholder="请输入培训人数" />
      <van-field
        rows="2"
        autosize
        v-model="params.address"
        label="培训地点"
        placeholder="请输入培训地点"
        type="textarea"
      />
      <div class="content-view">
        <ul class="content-detail">
          <li>
            <div class="content-label">培训单位</div>
            <div class="content-nav">{{ corpName }}</div>
          </li>
        </ul>
      </div>
      <van-field v-model="params.teacher" label="授课老师" placeholder="请输入授课老师" />
      <van-field
        readonly
        clickable
        name="datetimePicker"
        v-model="params.trainTime"
        label="培训时间"
        placeholder="请选择培训时间"
        @click="timeClick('date')"
      />
      <van-field
        v-if="params.trainTime"
        readonly
        clickable
        name="datetimePicker"
        v-model="params.beginTime"
        label="培训时间"
        placeholder="请选择培训时间"
        @click="timeClick('start-time')"
      />
      <van-field
        v-if="params.trainTime"
        readonly
        clickable
        name="datetimePicker"
        v-model="params.endTime"
        label="培训时间"
        placeholder="请选择培训时间"
        @click="timeClick('end-time')"
      />
    </van-form>
    <van-field name="uploader" label="现场图片" v-if="id">
      <template #input>
        <van-uploader v-model="imgList" :after-read="afterRead" :before-delete="beforeDelete" />
      </template>
    </van-field>
    <van-popup v-model="showTime" position="bottom">
      <van-datetime-picker
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
      <van-button round block type="info" @click="handleSubmit">提交</van-button>
    </div>
  </div>
</template>

<script>
import { getTrainDetail, saveOrUpdateTrain, uploadImgTrain, removeImgTrain } from '../../api/application.apis'

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
        trainTime: '',
        beginTime: '',
        endTime: ''
      },
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
      this.getTrainDetail({ id: this.$route.query.id })
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
        this.params.cropId = JSON.parse(localStorage.getItem('select_enterprise')).id
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
      let res = await saveOrUpdateTrain(this.params)
      if (res.code === '0') {
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
    // previewImg(index) {
    //   const list = this.fileList
    //     .filter(res => res.imgType === 1)
    //     .map(f => {
    //       return f.url
    //     })
    //   ImagePreview({
    //     images: list,
    //     startPosition: index
    //   })
    // },
    onTimeConfirm(time) {
      switch (this.dataType) {
        case 'date':
          this.params.trainTime = this.$moment(time).format('YYYY-MM-DD')
          break
        case 'start-time':
          this.params.beginTime = time
          break
        case 'end-time':
          this.params.endTime = time
          break
      }
      this.showTime = false
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
