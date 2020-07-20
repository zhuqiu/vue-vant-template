<!--
 * @Date: 2020-07-10 09:43:26
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-07-16 20:20:56
 * @FilePath: \project\src\views\commonPage\enterprise.vue
-->
<template>
  <div>
    <van-search
      v-model="params.corpName"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
      @clear="onCancel"
      @input="onInput"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>

    <van-row class="enterprise-list">
      <van-col span="24" v-for="(item, index) in list" :key="index" @click="enterpriseChange(item.id)">
        <div class="content">
          <div class="content-left">
            <p class="title">公司名称：</p>
            <span class="name">{{ item.corpName }}</span>
          </div>
          <div class="content-right">
            <van-icon name="checked" size="24" color="#07c160" v-if="selevtionId === item.id"/>
          </div>
        </div>
      </van-col>
    </van-row>

    <!-- 搜索提示 -->
    <van-empty v-if="list.length === 0" image="search" description="未查询到内容" />
  </div>
</template>

<script>

import { listCorp } from '../../api/application.apis'

export default {
  name: 'Enterprise',
  data() {
    return {
      list: [],
      params: {
        corpName: ''
      },
      selevtionId: ''
    }
  },
  created(){
    this.getList(this.params);
    if(JSON.parse(localStorage.getItem('select_enterprise'))){
      this.selevtionId = JSON.parse(localStorage.getItem('select_enterprise')).id;
    }
  },
  computed: {

  },
  methods: {
    onSearch(){
      this.getList(this.params);
    },
    onCancel(){
      this.getList(this.params);
    },
    onInput(){
      if(this.params.corpName === ''){
        this.getList(this.params);
      }
    },
    async getList(params){
      let res = await listCorp(params);
      console.log(res);
      if(res.code === "0"){
        this.list = res.data;
      }else{
        this.$toast(res.msg);
        this.list = [];
      }
    },
    enterpriseChange(id){
      let source = this.list.find((l) => l.id === id);
      localStorage.setItem('select_enterprise',JSON.stringify(source));
      this.selevtionId = id;
    },

  }
}
</script>
<style lang="scss">
.enterprise-list{
  padding: 0.32rem;
  .content{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0.32rem;
    background: #ffffff;
    border-radius: 0.1rem;
    margin-bottom: 0.32rem;
    .content-left{
      flex: 8;
      text-align: left;
      .title{
        font-weight: 500;
        font-size: 16px;
        margin: 0;
        margin-bottom: 0.32rem;
      }
    }
    .content-right{
      flex: 1;
      text-align: right;
    }
  }
}
</style>

