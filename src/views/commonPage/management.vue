<!--
 * @Date: 2020-07-10 09:43:26
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-07-10 10:43:50
 * @FilePath: \project\src\views\commonPage\management.vue
--> 
<template>
  <div>
    <div>
      <van-search
        v-model="params.batchNo"
        show-action
        placeholder="请输入批次号"
        @search="onSearch"
        @cancel="onCancel"
        @clear="onCancel"
        @input="onInput"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>

      <van-collapse v-model="activeName" accordion @change="collapseChange" v-for="(item,index) in list" :key="index">
        <van-collapse-item :name="item">
          <template #title>
            <div>批次号：{{ item }}</div>
          </template>
          <div>
            <div>创建时间：{{ batchInfo.startTime }}</div>
          </div>
        </van-collapse-item>
        
      </van-collapse>
    </div>
  </div>
</template>

<script>

import { findBatchNoList, getBatchDetail } from '../../api/application.apis'

export default {
  name: 'Management',
  data() {
    return {
      params: {
        batchNo: '',
        corpId: ''
      },
      activeName: '',
      list: [],
      batchInfo:{}
    }
  },
  created() {
    if(JSON.parse(localStorage.getItem('select_enterprise'))){
      this.params.corpId = JSON.parse(localStorage.getItem('select_enterprise')).id;
    }
    this.getList(this.params);
  },
  methods: {
    onSearch(){
      this.getList(this.params);
    },
    onCancel(){
      this.getList(this.params);
    },
    onInput(){
      if(this.params.batchNo === ''){
        this.getList(this.params);
      }
    },
    async getList(params){
      let res = await findBatchNoList(params);
      if(res.code === "0"){
        this.list = res.data;
      }else{
        this.$toast(res.msg);
        this.list = [];
      }
    },
    async collapseChange(val){
      if(!val){
        return;
      }
      let res = await getBatchDetail({ batchNo: val });
      if(res.code === "0"){
        this.batchInfo = res.data;
      }else{
        this.$toast(res.msg);
        this.batchInfo = {};
      }
    }
  }
}
</script>
<style lang="scss">

</style>


