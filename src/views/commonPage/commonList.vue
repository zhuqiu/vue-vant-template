<!--
 * @Date: 2020-07-21 13:43:10
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-07-21 16:34:59
 * @FilePath: \project\src\views\commonPage\commonList.vue
-->
<template>
  <div>
    <van-row class="common-list">
      <van-col span="24" @click="handleClick(item)" v-for="(item,index) in data" :key="index">
        <div class="common-content">
          <div>
            <div class="content-title">{{ item.checkContext }}</div>
            <div class="content-status">
              <div :class="'status_' + item.status">{{ $getStatus(item.status) }}</div>
            </div>
          </div>
          <div>
            <div class="content-info">
              <van-icon name="smile-o" size="24" color="#00FFCC"/>
              <span>{{item.corpName}}</span>
            </div>
            <div class="content-time">{{ item.createTime }}</div>
          </div>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>

export default {
  name: 'commonList',
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handleClick(item){
      this.$emit('click', item)
    }
  }
}
</script>
<style lang="scss">
.common-list{
  padding: 0.32rem;
  .common-content {

    margin-bottom: 0.32rem;
    & > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.32rem;
      background: #ffffff;
      border-radius: 0.1rem;

    }
    .content-title{
      font-weight: 600;
      font-size: 14px;
      flex: 6;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .content-status{
      flex: 4;
      display: flex;
      justify-content: flex-end;
      & > div.status_1,  & > div.status_5{
        color: #0099FF;
      }
      & > div.status_2, & > div.status_6, & > div.status_7{
        color: #999999;
      }
      & > div.status_3, & > div.status_4, & > div.status_5, & > div.status_8{
        color: #33CC33;
      }
      & > div{
        font-size: 0.32rem;
        // width: 1.2rem;
        // height: 1.2rem;
        // text-align: center;
        // line-height: 1.2rem;
        // border-radius: 50%;
        // background: #00FFCC;
        // color: #ffffff;
        // font-size: 0.32rem;
      }
    }
    .content-info{
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      span {
        margin-left: 0.12rem;
        color: #999999;
      }
    }
    .content-time{
      color: #999999;
    }
  }
}
</style>
