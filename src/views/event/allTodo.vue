<!--
 * @Date: 2020-07-21 15:11:05
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-07-21 15:54:14
 * @FilePath: \project\src\views\event\allTodo.vue
--> 
<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item v-model="params.status" :options="option" />
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
    
    <van-empty v-if="list.length === 0" description="暂无巡查记录..." />

    <common-list :data="list" v-else></common-list>
    
  </div>
</template>

<script>

import { StatusTypeItem } from '@/utils/status-typing'

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
      option: [
        { text: '全部', value: "" },
        { text: '企业已整改（结束）', value: 8 },
        { text: '企业已确认（结束）', value: 4 },
      ],
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
    handleSearch(){
      this.$refs.item.toggle();
    }
  }
}
</script>
<style lang="scss">

</style>
