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
    
    <van-empty v-if="false" description="暂无数据" />

    <div>
      <common-list></common-list>
    </div>
    
  </div>
</template>

<script>

import commonList from '../commonPage/commonList.vue'

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
      option: [
        { text: '待处理', value: 0 },
      ],
    }
  },
  methods: {
    handleReset(){
      this.params.batchNo = '';
      this.params.checkName = '';
    },
    handleSearch(){
      this.$refs.item.toggle();
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
