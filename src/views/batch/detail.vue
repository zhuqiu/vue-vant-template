<template>
  <div>
    <van-sticky>
      <van-nav-bar title="批次详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <div class="content-view" v-if="edit">
      <ul class="content-detail">
        <li>
          <div class="content-label">企业名称</div>
          <div class="content-nav">{{ params.corpName }}</div>
        </li>
        <li>
          <div class="content-label">批次号</div>
          <div class="content-nav">{{ params.batchNo }}</div>
        </li>
        <li>
          <div class="content-label">开始时间</div>
          <div class="content-nav">{{ params.startTime }}</div>
        </li>
        <li v-if="params.endTime">
          <div class="content-label">结束时间</div>
          <div class="content-nav">{{ params.endTime }}</div>
        </li>
        <li>
          <div class="content-label">巡查总数</div>
          <div class="content-nav">{{ params.eventTotal }}</div>
        </li>
        <li>
          <div class="content-label">合格数</div>
          <div class="content-nav">{{ params.closedTotal }}</div>
        </li>
        <li>
          <div class="content-label">待处理数</div>
          <div class="content-nav">{{ params.notCloseTotal }}</div>
        </li>
        <li>
          <div class="content-label">状态</div>
          <div class="content-nav">{{ getStatus(params.status) }}</div>
        </li>
        <li>
          <div class="content-label">签名</div>
          <div class="content-nav">
            <van-button
              type="primary"
              size="mini"
              @click="addSignature"
              style="width:60px;"
              v-if="fileList.length === 0 && params.status === 1"
              >签名</van-button
            >
            <div :class="fileList.length > 0 ? 'img-view' : ''" v-if="fileList.length > 0">
              <van-image
                style="margin-right: 0.32rem;"
                width="100"
                height="100"
                v-for="(item, index) in fileList"
                :key="index"
                @click="previewImg(index)"
                :src="item.url"
              />
              <van-icon name="close" size="18" color="#ee0a24" v-if="params.status === 1" @click="deletePic(index)" />
            </div>
          </div>
        </li>
      </ul>
      <div style="margin: 0.32rem;" v-if="params.status === 1">
        <van-button round block type="info" @click="submitBatch">提交</van-button>
      </div>
    </div>
    <signature :show="show" @ok="handleOk" @close="handleClose"></signature>
  </div>
</template>

<script>
import { getBatchDetail, uploadBatchSignImg, submitBatch } from '../../api/application.apis'

import Signature from '../commonPage/signature.vue'

import { dataURLtoBlob, blobToFile } from '@/utils/index'

import { ImagePreview } from 'vant'

export default {
  name: 'BatchDetail',
  components: {
    Signature
  },
  data() {
    return {
      edit: false,
      params: '',
      disabled: false,
      show: false,
      fileList: []
    }
  },
  created() {
    this.edit = !!this.$route.query.id
    if (this.edit) {
      this.getBatchDetail({ batchNo: this.$route.query.id })
    }
  },
  methods: {
    onClickLeft() {
      history.go(-1)
    },
    async getBatchDetail(params) {
      const res = await getBatchDetail(params)
      if (res.code === '0') {
        this.params = res.data
        if (res.data.signUrlPath) {
          this.fileList.push({
            url: res.data.signUrlPath
          })
        }
      } else {
        this.$toast(res.msg)
      }
    },
    goToBatchList() {
      setTimeout(() => {
        this.$router.push({
          name: 'BatchList'
        })
      }, 1000)
    },
    getStatus(status) {
      switch (status) {
        case 2:
          return '已完成'
        default:
          return '进行中'
      }
    },
    addSignature() {
      this.show = true
    },
    async handleOk(val) {
      this.show = false
      const file = blobToFile(dataURLtoBlob(val), '签名.png')
      const formdata = new FormData()
      formdata.append('file', file)
      formdata.append('batchNo', this.$route.query.id)
      const res = await uploadBatchSignImg(formdata)
      if (res.code === '0') {
        this.fileList.push({
          url: res.data
        })
      } else {
        this.fileList = []
        this.$toast(res.msg)
      }
    },
    handleClose() {
      this.show = false
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
    deletePic(index) {
      this.fileList.splice(index, 1)
    },
    async submitBatch() {
      let res = await submitBatch({ batchNo: this.$route.query.id })
      if (res.code === '0') {
        setTimeout(() => {
          this.$router.push({
            name: 'BatchList'
          })
        }, 1000)
      } else {
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
      i {
        position: relative;
        top: 0.08rem;
      }
    }
    .img-view {
      position: relative;
      width: 100px;
      height: 100px;
      border: 1px dotted #ebedf0;
      border-radius: 4px;
      i {
        position: absolute;
        top: -0.2rem;
        right: -0.2rem;
      }
    }
  }
}
</style>
