<!--
 * @Date: 2020-07-21 13:43:10
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-10-30 20:31:30
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
              <img src="../../assets/images/yijiean.jpg" alt="" v-if="item.status === 8" />
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
              <span>{{ item.checkName }}</span>
            </div>
          </div>
          <van-icon
            v-if="item.status === 1"
            name="clear"
            class="content-delete"
            size="18px"
            @click.stop="handleDelete(item)"
          />
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
    },
    handleDelete(item) {
      this.$emit('delete', item)
    }
  }
}
</script>
<style lang="scss"></style>
