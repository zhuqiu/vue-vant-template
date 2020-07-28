<template>
  <div class="wrapper" v-if="show" @click.stop>
    <vueSignature ref="signature" :sigOption="option"></vueSignature>
    <div class="close">
      <van-icon name="close" size="24" color="#ee0a24" @click="handleClose"/>
    </div>
    <div class="bottom-btn">
      <van-button class="btn-width" size="small" type="primary" @click="handleReset">重置</van-button>
      <van-button class="btn-width" size="small" type="info" @click="handleSure">确定</van-button>
    </div> 
  </div>
</template>
 
<script>

export default {
  name: "app",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
	data() {
		return {
			option:{
				penColor:"rgb(0, 0, 0)",
				backgroundColor:"rgb(255,255,255)"
			},
			disabled:false
		};
  },
	methods:{
    handleReset(){
      this.$refs.signature.clear();
    },
    handleSure(){
      var png = this.$refs.signature.save();
      this.$emit('ok',png);
      this.handleReset();
    },
    handleClose(){
      this.handleReset();
      this.$emit('close');
    }
	}
};
</script>
<style lang="scss">
.wrapper{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
}
.close{
  position: absolute;
  top: 0.32rem;
  right: 0.32rem;
}
.bottom-btn{
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-content: center;
  padding: 0.32rem 0;
  .btn-width{
    width: 100px;
  }
}
</style>