<template>
  <div class="container">
    <van-cell-group>
      <van-field
        v-model="formData.loginName"
        type="number"
        label="手机号"
        placeholder="请输入手机号"
        :error-message="errorData.errorName"
        required
      />
      <van-field
        v-model="formData.phoneCode"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
        :error-message="errorData.errPhoneCode"
        required
      >
        <van-button slot="button" size="small" type="primary" :disabled ="disabled" @click="sendPhoneCode">{{ sendText }}</van-button>
      </van-field>
    </van-cell-group>

    <van-row>
      <van-col span="24">
        <div style="margin: 0.32rem;">
          <van-button block type="primary" @click="bindPhone">绑定</van-button>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { phone }  from'@/utils/index'
import { bindPhone, getPhoneCode } from '../../api/application.apis'
export default {
  name: 'register',
   components:{
  },
  data () {
    return {
      formData: {
      	loginName: '',
        phoneCode: '',
      },
      errorData: {
      	errorName: '',
        errPhoneCode: '',
      },
      sendText: '获取验证码',
      disabled: false
    }
  },
  methods:{
    async bindPhone(){
			if(this.formData.loginName === ''){
				this.errorData.errorName = '请输入手机号';
				return
			}
			if(phone(this.formData.loginName)){
				this.errorData.errorName = '请输入正确的手机号';
				return
			}
			if(this.formData.phoneCode === ''){
				this.errorData.errPhoneCode = '请输入验证码';
				return
			}
      this.errorData.errPhoneCode = '';
      let res = await bindPhone({
        phone: this.formData.loginName,
        phoneCode: this.formData.phoneCode
      })
      if(res.code === '0'){
        localStorage.setItem('token',res.data.token);
        localStorage.setItem('user_type', res.data.userType);
        setTimeout(() =>{
          this.$router.push({name:'Home'});
        },1000)
      }else {
        this.$toast(res.msg)
      }
    },
    async sendPhoneCode(){
      if(this.formData.loginName === ''){
				this.$toast('请输入手机号');
				return
			}
			if(phone(this.formData.loginName)){
				this.$toast('请输入正确的手机号');
				return
      }
      this.disabled = true;
      let res = await getPhoneCode({
        phone: this.formData.loginName
      })
      if(res.code === '0'){
        let num = 60;
        let timer = setInterval( () => {
          if(num <= 0){
            clearInterval(timer);
            this.sendText = '获取验证码';
            this.disabled = false;
          }else{
            num--;
            this.sendText = num + ' s';
          }
        },1000)
      }else{
        this.$toast(res.msg);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>