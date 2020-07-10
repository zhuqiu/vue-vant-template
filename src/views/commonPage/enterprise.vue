<!--
 * @Date: 2020-07-10 09:43:26
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-07-10 10:40:34
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

export default {
  name: 'Enterprise',
  data() {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>
<style lang="scss">

</style>

