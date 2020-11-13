<!--
 * @Date: 2020-08-14 09:57:06
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-08-20 14:12:11
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
          setTimeout(() => {
            this.$router.push({ name: 'Home' })
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
