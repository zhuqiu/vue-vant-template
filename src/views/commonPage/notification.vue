<!--
 * @Date: 2020-07-10 09:43:26
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-07-10 10:43:59
 * @FilePath: \project\src\views\commonPage\notification.vue
--> 
<template>
  <div>
    <van-row class="msg-list">
      <van-col span="24" v-for="(item, index) in list" :key="index" @click="selectMsg(item.id)">
        <div class="content">
          <div class="content-left">
            <div class="title">消息内容： {{ item.content }}</div>
            <div class="title">创建时间：{{ item.ctime }}</div>
            <div class="title">创建人：{{ item.nickname }}</div>
          </div>
          <div class="content-right">
            <van-icon name="checked" size="24" color="#07c160" v-if="ids.includes(item.id)"/>
          </div>
        </div>
      </van-col>
    </van-row>
    <van-empty v-if="list.length === 0" description="暂无数据" />
    <div style="margin: 0.32rem;" v-if="list.length > 0">
      <van-button round block type="info" @click="batchDeleteMsg" :disabled="ids.length === 0">批量清空</van-button>
    </div>
  </div>
</template>

<script>

import { getListMsg, batchDeleteMsg } from '../../api/application.apis'

export default {
  name: 'Notification',
  data() {
    return {
      list: [],
      ids: []
    }
  },
  created(){
    this.getList();
  },
  methods: {
    async getList() {
      const res = await getListMsg()
      if (res.code === '0') {
        this.list = res.data
      } else {
        this.$toast(res.msg)
        this.list = []
      }
    },
    selectMsg(id){
      if(this.ids.includes(id)){
        let index = this.ids.findIndex((i) => i === id);
        this.ids.splice(index,1);
      }else{
        this.ids.push(id);
      }
    },
    async batchDeleteMsg(){
      const res = await batchDeleteMsg({
        idsArr: this.ids
      });
      if (res.code === '0') {
        this.list = res.data
        this.$toast('清除成功')
      } else {
        this.$toast(res.msg)
      }
    }
  }
}
</script>
<style lang="scss">
.msg-list{
  padding: 0.32rem;
  .content{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0.32rem;
    background: #ffffff;
    border-radius: 0.1rem;
    margin-bottom: 0.32rem;
    .content-left{
      flex: 8;
      text-align: left;
      .title{
        font-weight: 500;
        font-size: 12px;
        margin: 0;
        margin-bottom: 0.32rem;
      }
    }
    .content-right{
      flex: 1;
      text-align: right;
    }
  }
}
</style>

