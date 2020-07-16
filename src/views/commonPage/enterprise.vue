<!--
 * @Date: 2020-07-10 09:43:26
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-07-16 16:23:14
 * @FilePath: \project\src\views\commonPage\enterprise.vue
--> 
<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索企业名称"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
  </div>
</template>

<script>

import { listCorp } from '../../api/application.apis'

export default {
  name: 'Enterprise',
  data() {
    return {
      
    }
  },
  created(){
    listCorp();
  },
  methods: {
    
  }
}
</script>
<style lang="scss">

</style>

