<!--
 * @Date: 2020-07-21 13:43:10
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-08-18 10:35:10
 * @FilePath: \project\src\views\commonPage\commonList.vue
-->
<template>
  <div>
    <van-row class="common-list">
      <van-col span="24" @click="handleClick(item)" v-for="(item, index) in data" :key="index">
        <div class="common-content">
          <div>
            <div class="content-title">{{ item.corpName }}</div>
            <div class="content-status">
              <img src="../../assets/images/xinjian.png" alt="" v-if="item.status === 1" />
              <img src="../../assets/images/buhege.png" alt="" v-if="item.status === 2" />
              <img src="../../assets/images/hege.png" alt="" v-if="item.status === 3" />
              <img src="../../assets/images/yiwancheng.png" alt="" v-if="item.status === 4" />
              <img src="../../assets/images/daizhenggai.png" alt="" v-if="item.status === 5" />
              <img src="../../assets/images/bohui.png" alt="" v-if="item.status === 6" />
              <img src="../../assets/images/yiyanqi.png" alt="" v-if="item.status === 7" />
              <img src="../../assets/images/yijieshu.png" alt="" v-if="item.status === 8" />
            </div>
          </div>
          <div>
            <div class="content-info">
              <span>{{ item.batchNo }}</span>
            </div>
            <div class="content-time">{{ item.createTime }}</div>
          </div>
          <div>
            <div class="content-info">
              <span>{{ item.checkContext }}</span>
            </div>
            <div class="content-time">{{ item.checkName }}</div>
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
    return {}
  },
  methods: {
    handleClick(item) {
      this.$emit('click', item)
    }
  }
}
</script>
<style lang="scss">
// .common-list{
//   padding: 0.32rem;
//   .common-content {
//     border-radius: 4px;
//     margin-bottom: 0.32rem;
//     & > div {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       padding: 0.32rem;
//       padding-bottom: 0;
//       background: #ffffff;
//       border-radius: 0.1rem;
//     }
//     & > div:last-of-type{
//       padding-bottom: 0.32rem;
//     }
//     .content-title{
//       font-weight: 600;
//       font-size: 14px;
//       flex: 6;
//       overflow: hidden;
//       text-overflow: ellipsis;
//     }
//     .content-status{
//       flex: 1.5;
//       display: flex;
//       justify-content: flex-end;
//       img{
//         display: block;
//         width: 100%;
//         height: auto;
//       }
//     }
//     .content-info{
//       display: flex;
//       flex-direction: row;
//       justify-content: flex-start;
//       align-items: center;
//       span {
//         margin-left: 0.12rem;
//         color: #666666;
//       }
//     }
//     .content-time{
//       color: #999999;
//     }
//   }
// }
</style>
