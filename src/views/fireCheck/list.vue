<template>
  <div>
    <van-sticky>
      <van-nav-bar title="消防点检" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <div class="margin">
      <van-grid :column-num="3">
        <van-grid-item v-for="(item, index) in gridList" :key="index" :use-slot="true" @click="handleClick(item.path)">
          <van-icon :name="item.icon" size="30" :color="item.color" />
          <span class="margin-top">{{ item.text }}</span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  name: 'train',
  data() {
    return {
      gridList: [
        {
          icon: 'underway',
          text: '保养计划',
          color: '#66CCFF',
          path: 'MaintenancePlan'
        },
        {
          icon: 'label',
          text: '器材点检',
          color: '#00FF99',
          path: 'CheckEquipment'
        },
        {
          icon: 'column',
          text: '器材查询',
          color: '#00CC33',
          path: 'EquipmentQuery'
        }
      ]
    }
  },
  created() {},
  methods: {
    onClickLeft() {
      history.go(-1)
    },
    handleClick(path) {
      this.$router.push({
        name: path
      })
    }
  }
}
</script>
<style lang="scss"></style>
