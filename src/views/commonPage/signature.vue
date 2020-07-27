<template>
  <van-overlay :show="show" :z-index="999">
    <div class="wrapper" @click.stop>
      <vueSignature ref="signature" :sigOption="option" :w="'300px'" :h="'400px'"></vueSignature>
      <div class="bottom-btn">
        <van-button class="btn-width" size="small" type="primary" @click="handleReset">重置</van-button>
        <van-button class="btn-width" size="small" type="info" @click="handleSure">确定</van-button>
      </div> 
    </div>
  </van-overlay>
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
      console.log(png);
    }
	}
};
</script>
<style lang="scss">
.wrapper{
  height: 100%;
  position: relative;
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