<!--
 * @Date: 2020-07-10 09:43:26
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-07-16 20:20:56
 * @FilePath: \project\src\views\commonPage\enterprise.vue
--> 
<template>
  <div>
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>

    <van-row class="enterprise-list">
      <van-col span="24">span: 8</van-col>
    </van-row>
    
  </div>
</template>

<script>

import { listCorp } from '../../api/application.apis'

export default {
  name: 'Enterprise',
  data() {
    return {
      value:''
    }
  },
  created(){
    listCorp();
  },
  methods: {
    onSearch(){
      console.log("onSearch")
    }
  }
}
</script>
<style lang="scss">

</style>

