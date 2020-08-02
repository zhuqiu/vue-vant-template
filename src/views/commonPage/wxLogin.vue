<template>
	<div>

	</div>
</template>

<script>
import { wxLogin, getWxLoginUrl } from '../../api/application.apis'
import { splitParam, GetRequest }  from'@/utils/index'
export default {
	name: 'wx-login',
	data() {
		return {
		}
  },
  created(){
    let query = GetRequest(window.location.href);
    if(query.code){
      this.wxLogin(query);
    }else{
      this.getWXurl(query);
    }
  },
	methods:{
    async wxLogin(query){
      let obj = {
        code: query.code,
      }
      let res = await wxLogin({
        code: query.code,
      });
      if(res.code === '0'){
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user_type', res.data.userType);
        setTimeout(() =>{
          this.$router.push({name:'Home'});
        },500)
      }

      // this.$axios.post(Api.serviceApi.wxLogin + splitParam(obj) ).then((res) => {
			//   if(res.data.code !== '0'){
      //     this.$toast(res.data.msg);
      //   }else{
      //     localStorage.setItem('data',JSON.stringify(res.data.data));
      //     localStorage.setItem('amout',res.data.data.money);
      //     localStorage.removeItem('list');
      //     setTimeout(() =>{
      //       this.$router.push({name:'Index'});
      //     },500)
      //   }
			// })
    },
    async getWXurl(query){
      let res = await getWxLoginUrl();
      if(res.code === '0'){
        window.location.href = res.data;
      }else {
        this.$toast(res.msg)
      }
    }
	}
}
</script>

<style scoped>
</style>
