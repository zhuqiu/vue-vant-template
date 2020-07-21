<!--
 * @Date: 2020-07-21 15:11:05
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-07-21 15:54:14
 * @FilePath: \project\src\views\event\allTodo.vue
--> 
<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item v-model="params.status" :options="getOptions()" @change="handleChange"/>
      <van-dropdown-item title="筛选" ref="item">
        <van-form>
          <van-field
            v-model="params.batchNo"
            placeholder="请输入批次号"
            label="批次号"
          />
          <van-field
            v-model="params.checkName"
            label="检查类型"
            placeholder="请输入检查类型"
          />
        </van-form>
        <van-button block type="info" @click="handleSearch">查询</van-button>
      </van-dropdown-item>
    </van-dropdown-menu>
    
    <van-empty v-if="list.length === 0" description="暂无数据" />

    <common-list :data="list" @click="handleClick" v-else></common-list>

    <div class="addBtn" @click="add">
      <van-icon name="plus" size="24" color="#ffffff"/>
    </div>
    
  </div>
</template>

<script>

import StatusTypeItem from '@/utils/status-typing'

import commonList from '../commonPage/commonList.vue'

import { listEvents } from '../../api/application.apis'

export default {
  name: 'AllTodo',
  components: {
    commonList
  },
  data() {
    return {
      params: {
        batchNo: '',
        checkName: '',
        corpId: '',
        limit: 10,
        page: 1,
        roomId: '',
        status: ''
      },
      list: []
    }
  },
  created(){
    this.getList();
    this.params.corpId = JSON.parse(localStorage.getItem('select_enterprise')).id;
  },
  methods: {
    async getList(params){
      let res = await listEvents(params);
      if(res.code === "0"){
        this.list = res.data;
      }else{
        this.$toast(res.msg);
        this.list = [];
      }
    },
    handleClick(id){

    },
    handleChange(val){
      this.getList(this.params);
    },
    handleSearch(){
      this.$refs.item.toggle();
      this.getList(this.params)
    },
    getOptions(){
      return [
        { text: '全部', value: "" },
        { text: '进行中', value: StatusTypeItem.Pending },
        { text: '检查不合格', value: StatusTypeItem.CheckNotPass },
        { text: '检查合格', value: StatusTypeItem.CheckPass },
        { text: '企业已确认(结束)', value: StatusTypeItem.EnterpriseConfirmed },
        { text: '待企业整改', value: StatusTypeItem.WaitRectification },
        { text: '企业驳回', value: StatusTypeItem.EnterpriseReject },
        { text: '预期未整改', value: StatusTypeItem.NotRectification },
        { text: '企业已整改(结束)', value: StatusTypeItem.EnterpriseRectified }
      ]
    },
    add(){
      this.$router.push({
        name: 'AddEvent'
      })
    }
  }
}
</script>
<style lang="scss">
.addBtn{
  width: 0.8rem;
  height: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #0066FF;
  position: fixed;
  bottom: 100px;
  right: 20px;
  i{
    font-weight: 600;
  }
}
</style>
