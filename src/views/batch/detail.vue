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
        <li v-if="params.eventTotal">
          <div class="content-label">巡查总数</div>
          <div class="content-nav">{{ params.eventTotal }}</div>
        </li>
        <li v-if="params.heGeTotal">
          <div class="content-label">合格数</div>
          <div class="content-nav">{{ params.heGeTotal }}</div>
        </li>
        <li v-if="params.notHeGeTotal">
          <div class="content-label">不合格数</div>
          <div class="content-nav">{{ params.notHeGeTotal }}</div>
        </li>
        <li v-if="params.notRepairTotal">
          <div class="content-label">待整改</div>
          <div class="content-nav">{{ params.notRepairTotal }}</div>
        </li>
        <li v-if="params.closedTotal">
          <div class="content-label">已结案</div>
          <div class="content-nav">{{ params.closedTotal }}</div>
        </li>
        <li>
          <div class="content-label">状态</div>
          <div class="content-nav">{{ getStatus(params.status) }}</div>
        </li>
        <!-- <li>
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
        </li> -->
      </ul>
      <van-field

        v-model="params.retinue"
        rows="2"
        autosize
        label="检查人员"
        type="text"
        placeholder="请输入检查人员名称"
      />
      <div class="signature-content">
        <div class="signature" v-if="fileList.length === 0" @click="addSignature">
          签名提交
        </div>
        <div class="signature-show" v-else>
          <van-image
            style="margin-right: 0.32rem;"
            width="100%"
            height="auto"
            v-for="(item, index) in fileList"
            :key="index"
            @click="previewImg(index)"
            :src="item.url"
          />
          <van-icon name="close" size="18" color="#ee0a24" v-if="params.status === 1" @click="deletePic(index)" />
        </div>
      </div>
      <div style="margin: 0 0.32rem;" v-if="params.status === 1">
        <van-button round block type="info" @click="submitBatch">提交</van-button>
      </div>
    </div>
    <signature :show="show" @ok="handleOk" @close="handleClose"></signature>
  </div>
</template>

<script>
import { getBatchDetail, uploadBatchSignImg, submitBatch } from '../../api/application.apis'

import Signature from '../commonPage/signature.vue'

import { dataURLtoBlob, blobToFile, rotateBase64Img } from '@/utils/index'

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
          return '已确认'
        default:
          return '进行中'
      }
    },
    addSignature() {
      this.show = true
    },
     handleOk(val) {
      this.show = false
      let that = this;
      rotateBase64Img(val,270,async function(base64data){
        const file = blobToFile(dataURLtoBlob(base64data), '签名.png')
        const formdata = new FormData()
        formdata.append('file', file)
        formdata.append('batchNo', that.$route.query.id)
        const res = await uploadBatchSignImg(formdata)
        if (res.code === '0') {
          that.fileList.push({
            url: res.data
          })
        } else {
          that.fileList = []
          that.$toast(res.msg)
        }
      })
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

    }
  }
  .signature-content{
    background: white;
    padding: 0.32rem;
    color: #dbdb3293;
    font-size: 0.6rem;
    text-align: center;
    .signature{
      border: 1px dashed #f1f10d;
      border-radius: 3px;
      width: 100%;
      height: 4rem;
      line-height: 4rem;
    }
    .signature-show{
      border: 1px dashed #f1f10d;
      border-radius: 3px;
      position: relative;
      i {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
}
</style>
