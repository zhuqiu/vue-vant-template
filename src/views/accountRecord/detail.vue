<!--
 * @Date: 2020-11-16 09:45:44
 * @LastEditors: zhuqiu
-->
<template>
  <div>
    <van-sticky>
      <van-nav-bar :title="item.dir" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <ul class="file-content">
      <li v-for="(source, index) in this.item.list" :key="index" @click="preview(source)">
        <div class="file-label">
          <van-icon name="card" size="30" color="#6666CC" />
        </div>
        <div class="file-nav">{{ source.fileName }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'

export default {
  name: 'networkDiskDetail',
  data() {
    return {
      item: ''
    }
  },
  created() {
    this.item = JSON.parse(this.$route.query.item)
  },
  methods: {
    onClickLeft() {
      history.go(-1)
    },
    preview(data) {
      let suffix = this.getFileSuffix(data.fileName)
      console.log(suffix)
      if (suffix === 'jpg' || suffix === 'png' || suffix === 'jpeg') {
        ImagePreview({
          images: [data.filePath]
        })
      } else if (suffix === 'pdf') {
        this.pdfSrc = data.filePath
        this.fileType = suffix
        this.show = true
      } else {
        this.$toast('该文件不支持预览')
      }
    },
    getFileSuffix(name) {
      return name.substring(name.lastIndexOf('.') + 1).toLocaleLowerCase()
    }
  }
}
</script>
<style lang="scss">
.file-content {
  margin-top: 0.2rem;
  padding: 0 0.2rem;
  li {
    background: white;
    padding: 0.2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 0.2rem;
    .file-label {
      display: flex;
      align-items: center;
    }
    .file-nav {
      margin-left: 0.4rem;
    }
  }
}
</style>
