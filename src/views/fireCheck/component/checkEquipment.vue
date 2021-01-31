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
          <div class="content-nav">{{ data.categoryName }}</div>
        </li>
        <li>
          <div class="content-label">保养人</div>
          <div class="content-nav">{{ data.keepPersion }}</div>
        </li>
      </ul>
      <div v-for="(item, index) in list" :key="index">
        <van-cell :title="item.content">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #extra>
            <van-button type="primary" size="mini" v-if="item.checkResult === 1" @click="handleClick(item)"
              >OK</van-button
            >
            <van-button type="danger" size="mini" v-else @click="handleClick(item)">NG</van-button>
          </template>
        </van-cell>
      </div>
    </div>
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
      },
      flag: false,
      data: {},
      list: []
    }
  },
  mounted() {
    initWXConfig(['scanQRCode'])
  },
  created() {},
  methods: {
    onSearch() {
      this.query4Check()
    },
    onCancel() {
      if (this.params.keyword === '') {
        return
      }
      this.query4Check()
    },
    onClickLeft() {
      history.go(-1)
    },
    scanQr() {
      scanQRCode(1).then(result => {
        console.log(result)
        this.params.keyword = result
      })
    },
    async query4Check() {
      const res = await query4Check({
        equipmentNo: this.params.keyword
      })
      if (res.code === '0') {
        if (res.data) {
          this.flag = true
          this.data = res.data.equipment
          this.list = res.data.checkRecordList
        } else {
          this.flag = false
        }
      } else {
        this.flag = false
        this.$toast(res.msg)
      }
    },
    handleClick(item) {
      let that = this
      let checkResult = item.checkResult
      let content = `确认点检${item.checkResult === 1 ? '不合格' : '合格'}吗？`
      this.$dialog.confirm({
        title: '温馨提示',
        message: content,
        beforeClose
      })
      async function beforeClose(action, done) {
        if (action === 'confirm') {
          const res = await checkEquipment({
            checkResult: item.checkResult === 1 ? 0 : 1,
            equipmentCheckRecordId: item.id
          })
          if (res.code === '0') {
            that.query4Check()
          } else {
            that.$toast(res.msg)
          }
        }
        done()
      }
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
      width: 4.2rem;
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
