<template>
  <div>
    <van-sticky>
      <van-nav-bar title="台账记录" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-empty v-if="list.length === 0" description="暂无数据" />
      <van-grid :column-num="3" class="margin-top" style="padding: 0 0.32rem">
        <van-grid-item v-for="(item, index) in list" :key="index" :use-slot="true" @click="handleClick(item)">
          <van-icon name="card" size="30" color="#FF9900" />
          <span class="margin-top">{{ item.dir.length > 5 ? item.dir.substring(0,5) + '...' : item.dir }}</span>
        </van-grid-item>
      </van-grid>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getCorpDisk } from '../../api/application.apis'
export default {
  name: 'accountRecord',
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      totalSize: 0,
      list: [],
      params: {
        limit: 6,
        page: 1,
        corpId: ''
      },
    }
  },
  created() {
    if (JSON.parse(localStorage.getItem('select_enterprise'))) {
      this.params.corpId = JSON.parse(localStorage.getItem('select_enterprise')).id
    }
    this.getList()
  },
  methods: {
    async getList(params) {
      let res = await getCorpDisk(this.params)
      if (res.code === '0') {
        this.list = this.convertData(res.data)
        this.totalSize = res.count
        // 加载状态结束
        this.loading = false
      } else {
        this.$toast(res.msg)
        this.list = this.convertData([])
      }
    },
    onLoad() {
      if (this.refreshing) {
        this.list = []
        this.params.limit = 6
        this.refreshing = false
      }
      this.params.limit = this.params.limit + 6
      this.getList(this.params)
      if (this.params.limit >= this.totalSize) {
        this.finished = true
      }
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
    onClickLeft() {
      history.go(-1)
    },
    handleClick(item){
      this.$router.push({
        name: 'NetworkDiskDetail',
        query: {
          item: JSON.stringify(item)
        }
      })
    },
    convertData(item){
      let obj = new Object();
      if(item.length === 0) return [];
      item.forEach(res => {
        if(!obj[res.dir]){
          obj[res.dir] = true;
        }
      })
      let dataList = [];
      for(let key in obj){
        let list = []
        item.forEach(res => {
          if(key === res.dir){
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
      return dataList;
    }
  }
}
</script>
<style lang="scss">

</style>
