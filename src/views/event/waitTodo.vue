<!--
 * @Date: 2020-07-21 13:39:43
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-07-21 14:52:12
 * @FilePath: \project\src\views\event\waitTodo.vue
--> 
<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item v-model="value" :options="option" />
      <van-dropdown-item title="筛选" ref="item">
        <van-form validate-first @failed="onFailed">
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
        <div class="btn-content">
          <van-button class="btn-width" type="primary" @click="handleReset">重置</van-button>
          <van-button class="btn-width" type="info" @click="handleSearch">查询</van-button>
        </div>
      </van-dropdown-item>
    </van-dropdown-menu>

    <van-empty v-if="list.length === 0" description="暂无数据" />

    <common-list :data="list" @click="handleClick" v-else></common-list>
    
  </div>
</template>

<script>

import commonList from '../commonPage/commonList.vue'

import { listToDoEvents } from '../../api/application.apis'

export default {
  name: 'WaitTodo',
  components: {
    commonList
  },
  data() {
    return {
      value: 0,
      params: {
        batchNo: '',
        checkName: ''
      },
      list: [],
      option: [
        { text: '待处理', value: 0 },
      ],
    }
  },
  created(){
    this.getList(this.params);
  },
  methods: {
    async getList(params) {
      const res = await listToDoEvents(params)
      if (res.code === '0') {
        this.list = res.data
      } else {
        this.$toast(res.msg)
        this.list = []
      }
    },
    handleReset(){
      this.params.batchNo = '';
      this.params.checkName = '';
    },
    handleSearch(){
      this.$refs.item.toggle();
    },
    handleClick(val){
      this.$router.push({
        name: 'Event',
        params: {
          id: val.id,
          status: val.status
        }
      })
    }
  }
}
</script>
<style lang="scss">
.btn-content{
  display: flex;
  justify-content: space-around;
  .btn-width{
    width: 4rem;
  }
}
</style>
