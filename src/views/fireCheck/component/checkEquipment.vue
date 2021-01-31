<template>
  <div>
    <van-sticky>
      <van-search
        v-model="params.keyword"
        show-action
        placeholder="请输入器材编号"
        @search="onSearch"
        @cancel="onCancel"
        @clear="onCancel"
        @input="onInput"
      >
        <template #left>
          <van-icon name="scan" size="30" style="margin-right:10px" color="#666" />
        </template>
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </van-sticky>
  </div>
</template>
<script>
import { query4Check, checkEquipment } from '@/api/application.apis'

import { scanQRCode, initWXConfig } from '@/utils/wxApi'

export default {
  name: 'CheckEquipment',
  data() {
    return {
      params: {
        keyword: ''
      }
    }
  },
  mounted() {
    initWXConfig(['scanQRCode'])
  },
  created() {},
  methods: {
    onSearch() {},
    onCancel() {},
    onInput() {
      if (this.params.keyword === '') {
      }
    },
    onClickLeft() {
      history.go(-1)
    },
    scanQr() {
      scanQRCode(1).then(result => {
        console.log(result)
        this.params.keyword = result
      })
    }
  }
}
</script>
<style lang="scss"></style>
