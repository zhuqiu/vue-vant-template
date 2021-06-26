<template>
  <div>
    <van-sticky>
      <van-nav-bar title="在线培训" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <van-empty v-if="list.length === 0" description="暂无数据" />
    <van-grid :column-num="3" class="margin-top" style="padding: 0 0.32rem">
      <van-grid-item v-for="(item, index) in list" :key="index" :use-slot="true" @click="handleClick(item)">
        <van-icon name="card" size="30" color="#FF9900" />
        <span class="margin-top">{{
          item.categoryName.length > 5 ? item.categoryName.substring(0, 5) + '...' : item.categoryName
        }}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { findCategory } from '../../api/application.apis'
export default {
  name: 'OnlineList',
  data() {
    return {
      list: []
    }
  },
  created() {
    this.findCategory()
  },
  methods: {
    async findCategory(params) {
      let res = await findCategory()
      if (res.code === '0') {
        this.list = res.data
      } else {
        this.$toast(res.msg)
        this.list = []
      }
    },
    onClickLeft() {
      history.go(-1)
    },
    handleClick(item) {
      this.$router.push({
        name: 'VideoList',
        query: {
          id: item.id
        }
      })
    },
    convertData(item) {
      let obj = new Object()
      if (item.length === 0) return []
      item.forEach(res => {
        if (!obj[res.dir]) {
          obj[res.dir] = true
        }
      })
      let dataList = []
      for (let key in obj) {
        let list = []
        item.forEach(res => {
          if (key === res.dir) {
            list.push({
              filePath: res.filePath,
              fileName: res.fileName
            })
          }
        })
        dataList.push({
          dir: key,
          list
        })
      }
      return dataList
    }
  }
}
</script>
<style lang="scss"></style>
