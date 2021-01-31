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
      >
        <template #left>
          <van-icon name="scan" size="30" style="margin-right:10px" color="#666" />
        </template>
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </van-sticky>
    <van-empty v-if="!flag" description="无查询数据" />
    <div class="content-view" v-else>
      <ul class="content-detail">
        <li>
          <div class="content-label">器材类别</div>
          <div class="content-nav">{{ corpName }}</div>
        </li>
        <li>
          <div class="content-label">器材编号</div>
          <div class="content-nav">{{ corpName }}</div>
        </li>
        <li>
          <div class="content-label">存放位置</div>
          <div class="content-nav">{{ corpName }}</div>
        </li>
        <li>
          <div class="content-label">下次保养日</div>
          <div class="content-nav">{{ corpName }}</div>
        </li>
        <li>
          <div class="content-label">器材状态</div>
          <div class="content-nav">{{ corpName }}</div>
        </li>
        <li>
          <div class="content-label">包养人</div>
          <div class="content-nav">{{ corpName }}</div>
        </li>
        <li>
          <div class="content-label">建档日期</div>
          <div class="content-nav">{{ corpName }}</div>
        </li>
        <li>
          <div class="content-label">使用部门</div>
          <div class="content-nav">{{ corpName }}</div>
        </li>
        <li>
          <div class="content-label">生产日期</div>
          <div class="content-nav">{{ corpName }}</div>
        </li>
        <li>
          <div class="content-label">使用年限（年）</div>
          <div class="content-nav">{{ corpName }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { equipmentQuery } from '@/api/application.apis'

import { scanQRCode, initWXConfig } from '@/utils/wxApi'

export default {
  name: 'EquipmentQuery',
  data() {
    return {
      params: {
        keyword: ''
      },
      data: {},
      flag: false
    }
  },
  mounted() {
    initWXConfig(['scanQRCode'])
  },
  created() {},
  methods: {
    onSearch() {
      this.equipmentQuery()
    },
    onCancel() {
      this.equipmentQuery()
    },
    onClickLeft() {
      history.go(-1)
    },
    async equipmentQuery() {
      const res = await equipmentQuery({
        corpId: JSON.parse(localStorage.getItem('select_enterprise')).id,
        equipmentNo: this.params.keyword
      })
      if (res.code === '0') {
        this.flag = true
      } else {
        this.flag = false
        this.$toast(res.msg)
      }
    },
    scanQr() {
      scanQRCode(1).then(result => {
        console.log(result)
        this.params.keyword = result
        this.equipmentQuery()
      })
    }
  }
}
</script>
<style lang="scss">
.content-view {
  font-size: 0.37333rem;
  line-height: 0.64rem;
  background-color: #fff;
  .content-detail > li {
    padding: 0.26667rem 0.42667rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    &::after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      right: 0.42667rem;
      bottom: 0;
      left: 0.42667rem;
      border-bottom: 0.02667rem solid #ebedf0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
    &.no-border-line {
      padding-bottom: 0;
    }
    &.no-border-line::after {
      border: none;
    }
    .content-label {
      width: 3.5rem;
      margin-right: 0.3rem;
      color: #646566;
      text-align: left;
      word-wrap: break-word;
    }
    .content-nav {
      width: 100%;
      vertical-align: middle;
      overflow: visible;
      word-wrap: break-word;
    }
  }
}
</style>
