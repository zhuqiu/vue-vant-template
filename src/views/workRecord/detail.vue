<template>
  <div>
    <van-sticky>
      <van-nav-bar title="驻场登记" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <div class="content-view" v-if="edit">
      <ul class="content-detail">
        <li>
          <div class="content-label">详细说明</div>
          <div class="content-nav">{{ params.remark }}</div>
        </li>
        <li>
          <div class="content-label">随行人员</div>
          <div class="content-nav">{{ params.retinue }}</div>
        </li>
        <li>
          <div class="content-label">进驻事由</div>
          <div class="content-nav">{{ params.vistReason }}</div>
        </li>
        <li>
          <div class="content-label">状态</div>
          <div class="content-nav">{{ getStatus(params.status) }}</div>
        </li>
        <li>
          <div class="content-label">签名</div>
          <div class="content-nav" >
            <van-icon @click="addSignature" name="add" size="24" color="#07c160" v-if="fileList.length === 0 && params.status !== 2"/>
            <div :class="fileList.length > 0 ? 'img-view' : ''" v-else>
              <van-image
                style="margin-right: 0.32rem;"
                width="100"
                height="100"
                v-for="(item, index) in fileList"
                :key="index"
                @click="previewImg(index)"
                :src="item.url"
              />
              <van-icon v-if="params.status !== 2"  name="close" size="18" color="#ee0a24" @click="deletePic(index)"/>
            </div>
          </div>
        </li>
      </ul>
      <div style="margin: 0.32rem;">
        <van-button round block type="info" v-if="params.status !== 2" @click="submitRecord">提交</van-button>
      </div>
    </div>
    <van-form @submit="onSubmit" v-else>
      <van-field
        v-model="params.remark"
        rows="2"
        autosize
        label="详细说明"
        type="textarea"
        placeholder="请输入详细说明"
      />
      <van-field
        v-model="params.vistReason"
        rows="2"
        autosize
        label="进驻事由"
        type="textarea"
        placeholder="请输入进驻事由"
      />
      <van-field
        v-model="params.retinue"
        rows="2"
        autosize
        label="随行人员"
        type="textarea"
        placeholder="请输入随行人员"
      />
      <div style="margin: 0.32rem;">
        <van-button round block type="info" native-type="submit" :disabled="disabled">新增</van-button>
      </div>
    </van-form>

    <signature :show="show" @ok="handleOk" @close="handleClose"></signature>
  </div>
</template>

<script>

import { addWorkRecord, getWorkRecord, submitWorkRecord, uploadSignImg } from '../../api/application.apis';

import Signature from '../commonPage/signature.vue'

import {dataURLtoBlob, blobToFile} from '@/utils/index'

import { ImagePreview } from 'vant'

export default {
  name: 'workRecordDetail',
  components: {
    Signature
  },
  data() {
    return {
      edit: false,
      params: {
        remark: "",
        retinue: "",
        signUrlPath: "",
        status: 1,
        vistReason: ''
      },
      disabled: false,
      show: false,
      fileList: []
    }
  },
  created(){
    this.edit = !!this.$route.params.id;
    if(this.edit){
      this.getWorkRecord({id: this.$route.params.id})
    }

  },
  methods: {
    onClickLeft(){
      history.go(-1)
    },
    async getWorkRecord(params){
      let res = await getWorkRecord(params);
      if(res.code === '0'){
        this.params = res.data;
        if(res.data.signUrlPath){
          this.fileList.push({
            url: res.data.signUrlPath
          })
        }
      }else{
        this.$toast(res.msg)
      }
    },
    onSubmit(){
      this.addWorkRecord();
    },
    async submitRecord(){
      this.disabled = true;
      let res = await submitWorkRecord({workRecordId: this.$route.params.id});
      if (res.code === '0') {
        this.$toast('提交成功')
        this.goToWorkList()
      } else {
        this.disabled = false
        this.$toast(res.msg)
      }
    },
    async addWorkRecord(){
      this.disabled = true;
      this.params.corpId = JSON.parse(localStorage.getItem('select_enterprise')).id;
      let res = await addWorkRecord(this.params);
      if (res.code === '0') {
        this.$toast('新增成功')
        this.goToWorkList()
      } else {
        this.disabled = false
        this.$toast(res.msg)
      }
    },
    goToWorkList(){
      setTimeout(() => {
        this.$router.push({
          name: 'WorkRecordList'
        })
      }, 1000)
    },
    getStatus(status){
      switch(status){
        case 2:
          return '已提交'
        default:
          return '未提交'
      }
    },
    addSignature(){
      this.show = true;
    },
    async handleOk(val){
      this.show = false;
      let file = blobToFile(dataURLtoBlob(val),'签名.png');
      const formdata = new FormData()
      formdata.append('file', file)
      formdata.append('workRecordId', this.$route.params.id)
      let res = await uploadSignImg(formdata);
      if (res.code === '0') {
        this.fileList.push({
          url: res.data
        })
      } else {
        this.fileList = [];
        this.$toast(res.msg)
      }
    },
    handleClose(){
      this.show = false;
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
