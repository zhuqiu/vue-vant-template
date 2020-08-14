<template>
  <div>
    <van-sticky>
      <van-dropdown-menu>
        <van-dropdown-item v-model="params.status" :options="options"/>
        <van-dropdown-item title="筛选" ref="item">
          <van-form>
            <van-field v-model="params.keyword" placeholder="请输入详细说明/进驻事由" label="关键字" />
          </van-form>
          <div class="btn-content">
            <van-button class="btn-width" size="small" type="primary" @click="handleReset">重置</van-button>
            <van-button class="btn-width" size="small" type="info" @click="handleSearch">查询</van-button>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </van-sticky>
    <ul class="work-list">
      <li v-for="(item, index) in list" :key="index" @click="handleClick(item)">
        <div>巡查企业：{{ item.corpName }}</div>
        <div>巡查日期：{{ item.workTime }}</div>
        <div>巡查人员：{{ item.retinue }}</div>
        <div>巡查事由：{{ item.vistReason }}</div>
        <div>登记说明：{{ item.remark }}</div>
        <div>登记状态：<span :class="item.status === 2 ? 'success' : 'fail'">{{ getStatus(item.status) }}</span></div>
      </li>
    </ul>

    <div class="addBtn" @click="add">
      <van-icon name="plus" size="22" color="#ffffff" />
    </div>

  </div>
</template>

<script>

import { findWorkRecord } from '../../api/application.apis'

export default {
  name: 'workRecord',
  data() {
    return {
      options: [
        {text: '全部', value: ''},
        // {text: '已提交', value: 2},
        // {text: '未提交', value: 1}
      ],
      params: {
        status: '',
        keyword: ''
      },
      list:[]
    }
  },
  created(){
    this.getList();
  },
  methods: {
    async getList(){
      let res = await findWorkRecord(this.params);
      if(res.code === '0'){
        this.list = res.data;
      }else {
        this.$toast(res.msg)
        this.list = []
      }
    },
    handleChange(){
      this.getList();
    },
    handleReset(){
      this.params.keyword = '';
    },
    handleSearch(){
      this.getList();
    },
    handleClick(val){
      this.$router.push({
        name: 'WorkRecordetail',
        params: {
          id: val.id,
          status: val.status
        }
      })
    },
    add() {
      this.$router.push({
        name: 'WorkRecordetail'
      })
    },
    getStatus(status){
      switch(status){
        case 2:
          return '已提交'
        default:
          return '未提交'
      }
    }
  }
}
</script>
<style lang="scss">
.work-list{
  li{
    border-radius: 0.1rem;
    margin: 0.32rem;
    background: #ffffff;
    color: #666;
    padding: 0.32rem;
    line-height: 0.52rem;
    div{
      overflow: hidden;
      text-overflow: ellipsis;
      .fail{
        color: #CC0033;
      }
      .success{
        color: #00FF99;
      }
    }
  }
}
.btn-content{
  display: flex;
  justify-content: space-around;
  margin: 0.32rem 0;
  .btn-width{
    width: 4rem;
  }
}
.addBtn {
  width: 0.8rem;
  height: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #0066ff;
  position: fixed;
  bottom: 100px;
  right: 20px;
  i {
    font-weight: 600;
  }
}
</style>
