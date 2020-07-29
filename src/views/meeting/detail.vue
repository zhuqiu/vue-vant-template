<template>
  <div>
    <van-sticky>
      <van-nav-bar title="培训详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <div class="content-view">
      <ul class="content-detail">
        <li>
          <div class="content-label">培训主题</div>
          <div class="content-nav">{{ params.theme }}</div>
        </li>
        <li>
          <div class="content-label">培训人</div>
          <div class="content-nav">{{ params.speakUser }}</div>
        </li>
        <li>
          <div class="content-label">培训开始时间</div>
          <div class="content-nav">{{ params.beginTime }}</div>
        </li>
        <li>
          <div class="content-label">培训结束时间</div>
          <div class="content-nav">{{ params.endTime }}</div>
        </li>
        <li>
          <div class="content-label">状态</div>
          <div class="content-nav">{{ getStatus(params.status) }}</div>
        </li>
        <li v-if="status !== 1">
          <div class="content-label">培训图片</div>
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
      </ul>
    </div>
    <van-form @submit="onSubmit" v-if="status === 1">
      <van-field name="uploader" label="培训图片">
        <template #input>
          <van-uploader v-model="fileList" :after-read="afterRead" :before-delete="beforeDelete" />
        </template>
      </van-field>
      <div style="margin: 0.32rem;">
        <van-button round block type="info" native-type="submit" :disabled="disabled">发起审核</van-button>
      </div>
    </van-form>
    <div style="margin: 0.32rem;" v-if="status === 2">
      <van-button round block type="info" :disabled="disabled" @click="onSubmit">审核通过</van-button>
    </div>
  </div>
</template>

<script>

import { getMeetingDetail, meetingFinish, meetingAuditor,meetingUploadImg,meetingRemoveImg } from '../../api/application.apis';

import { ImagePreview } from 'vant'

export default {
  name: 'workRecordDetail',
  data() {
    return {
      params: {},
      disabled: false,
      fileList: [],
      status: '',
      id: ''
    }
  },
  created(){
    this.id = Number(this.$route.query.id);
    this.getMeetingDetail({id: this.id})
    this.status = Number(this.$route.query.status)
  },
  methods: {
    onClickLeft(){
      history.go(-1)
    },
    async getMeetingDetail(params){
      let res = await getMeetingDetail(params);
      if(res.code === '0'){
        this.params = res.data;
        if(res.data.imgs.length > 0){
          this.fileList = res.data.imgs.map((d) => {
            return {
              id: d.id,
              url: d.imgPath
            }
          })
        }
      }else{
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
      formdata.append('meetingId', this.id)
      const res = await meetingUploadImg(formdata)
      if (res.code === '0') {
        file.id = res.data.id;
        file.status = 'done'
        file.message = 'done'
      } else {
        file.status = 'failed'
        file.message = '上传失败'
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
            const res = await meetingRemoveImg({ imgId: file.id })
            if (res.code === '0') {
              location.reload()
            }
          }
          done()
          return true
        }
      } else {
        return true
      }
    },
    async onSubmit(){
      this.disabled = true;
      let res = '';
      if(this.status === 1){
        res = await meetingFinish({id: this.id});
      }else if(this.status === 2){
        res = await meetingAuditor({id: this.id});
      }
      if (res.code === '0') {
        this.$toast('提交成功')
        this.goToMeetingList()
      } else {
        this.disabled = false
        this.$toast(res.msg)
      }
    },
    goToMeetingList(){
      setTimeout(() => {
        this.$router.push({
          name: 'MeetingList'
        })
      }, 1000)
    },
    getStatus(status){
      switch(status){
        case 1:
          return '发起'
        case 2:
          return '待审核'
        case 3:
          return '已审核'
        case 4:
          return '已延期'
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
    },
    deletePic(index){
      this.fileList.splice(index,1)
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
      margin-right: 0.32rem;
      color: #646566;
      text-align: left;
      word-wrap: break-word;
    }
    .content-nav {
      width: 100%;
      vertical-align: middle;
      overflow: visible;
      word-wrap: break-word;
      i{
        position: relative;
        top: 0.08rem;
      }
    }
    .img-view{
      position: relative;
      width: 100px;
      height: 100px;
      border: 1px dotted #ebedf0;
      border-radius: 4px;
      i{
        position: absolute;
        top: -0.2rem;
        right: -0.2rem;
      }
    }
  }
}
</style>
