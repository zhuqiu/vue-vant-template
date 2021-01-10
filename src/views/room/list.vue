<!--
 * @Author: zhuqiu
 * @since: 2020-12-04 14:10:14
 * @Description: 
-->
<template>
  <div>
    <!-- <van-sticky>
      <van-nav-bar title="车间" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky> -->
    <van-search
      v-model="roomName"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
      @clear="onCancel"
      @input="onInput"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <van-collapse style="margin-top:0.32rem" v-model="activeNames" v-if="list.length > 0">
      <van-collapse-item :name="index" v-for="(item, index) in list" :key="index">
        <template #title>
          <div v-if="item.riskLevel === '较大风险' || item.riskLevel === '重大风险'">
            {{ item.roomName }}
            <span style="color: #ee0a24">（{{ item.riskLevel }}）</span>
          </div>
          <div v-else-if="item.riskLevel === '一般风险'">
            {{ item.roomName }}
            <span style="color: #ff976a">（{{ item.riskLevel }}）</span>
          </div>
          <div v-else>
            {{ item.roomName }}
            <span>（暂无等级）</span>
          </div>
        </template>
        <div style="margin-bottom:5px; color: black">
          <span style="font-weight: 600">企业名称: </span>{{ item.corpName }}
        </div>
        <div style="margin-bottom:5px; color: black">
          <span style="font-weight: 600">车间负责人: </span>{{ item.roomManager }}
        </div>
        <div style="margin-bottom:5px; color: black">
          <span style="font-weight: 600">巡查总数: </span>{{ item.eventTotal }} 项
        </div>
        <div style="color: black"><span style="font-weight: 600">车间简介: </span></div>
        <div style="color: black">{{ item.roomDesc }}</div>
      </van-collapse-item>
    </van-collapse>
    <van-empty v-else description="暂无数据" />
  </div>
</template>

<script>
import { findByCorpId } from '../../api/application.apis'

export default {
  name: 'thirdLevel',
  data() {
    return {
      list: [],
      activeNames: [],
      roomName: ''
    }
  },
  created() {
    this.findRoomList()
  },
  methods: {
    onClickLeft() {
      history.go(-1)
    },
    async findRoomList() {
      const res = await findByCorpId({
        corpId: JSON.parse(localStorage.getItem('select_enterprise')).id,
        roomName: this.roomName
      })
      this.list = res
    },
    onSearch() {
      this.findRoomList()
    },
    onCancel() {
      this.findRoomList()
    },
    onInput() {
      if (this.roomName === '') {
        this.findRoomList()
      }
    }
  }
}
</script>
<style lang="scss"></style>
