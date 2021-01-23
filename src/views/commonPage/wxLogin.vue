<!--
 * @Date: 2020-08-14 09:57:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-21 12:56:05
 * @FilePath: \project\src\views\commonPage\wxLogin.vue
-->
<template>
  <div></div>
</template>

<script>
import { wxLogin, getWxLoginUrl } from '../../api/application.apis'
import { splitParam, GetRequest } from '@/utils/index'
export default {
  name: 'wx-login',
  data() {
    return {}
  },
  created() {
    let query = GetRequest(window.location.href)
    if (query.code) {
      this.wxLogin(query)
    } else {
      this.getWXurl()
    }
  },
  methods: {
    async wxLogin(query) {
      let res = await wxLogin({
        code: query.code
      })
      if (res.code === '0') {
        if (!res.data.token) {
          this.$router.push({
            name: 'Phone',
            query: {
              openid: res.data.openid
            }
          })
        } else {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('user_type', res.data.userType)
          let pathName = '/home'
          let queryPath;
          if (query.state === 'null' || query.state === '123' || !query.state) {
            pathName = '/home'
          } else {
            let path = query.state.split('/')[0];
            if(path.indexOf('?') > -1){
              path = path.split('?')[0]
              queryPath = GetRequest(path.split('?')[1]);
            }
            pathName = path.replace(path[0], path[0].toLowerCase())
          }
          setTimeout(() => {
            // this.$router.push({ name: pathName })
            this.$router.push({
              path: pathName,
              query: queryPath
            })
          }, 500)
        }
      } else {
        this.$toast('接口调用失败')
      }
    },
    async getWXurl() {
      let res = await getWxLoginUrl()
      if (res.code === '0') {
        window.location.href = res.data
      } else {
        this.$toast(res.msg)
      }
    }
  }
}
</script>

<style scoped></style>
