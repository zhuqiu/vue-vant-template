<template>
  <div class="wrapper" v-if="show" @click.stop>
    <div class="wrapper-btn">
      <div class="wrapper-btn-content">
        <a @click="handleClose">
          <i>取消</i>
        </a>
        <a @click="handleReset">
          <i>重置</i>
        </a>
        <a @click="handleSure" style="background:#07c160;color:white;border:1px solid #07c160;">
          <i>确定</i>
        </a>
      </div>

    </div>
    <div class="wrapper-signature">
      <vueSignature ref="signature" :sigOption="option"></vueSignature>
    </div>

  </div>
</template>

<script>

import vueSignature from '../signaturePad/vue-signture.vue'

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
        width: 667,
        height: 375,
				backgroundColor:"rgb(255,255,255)"
			},
			disabled:false
		};
  },
  components: {
    vueSignature
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
  display: flex;
  flex-direction: row;
  background: white;
  &-btn{
    width: 0.943rem;
    height: 100%;
    padding: 0px 0.25rem;
    border-right: 1px dashed rgb(230, 230, 230);
    position: relative;
    &-content{
      position: absolute;
      bottom: 0.32rem;
      a{
        border-radius: 3px;
        color: rgb(43, 43, 43);
        border: 1px solid rgb(43, 43, 43);
        display: inline-block;
        height: 1.4rem;
        line-height: 1.4rem;
        margin: 0.32rem 0px 0px;
        text-align: center;
        width: 0.9rem;
        font-size: 0.34rem;
        max-height: 1.4rem;
        i{
          font-style: normal;
          transform: rotate(90deg);
          display: block;
        }
      }

    }
  }
  &-signature{
    flex: 1 1 0%;
  }
}
.close{
  position: absolute;
  top: 0.32rem;
  right: 0.32rem;
}
.bottom-btn{
  position: absolute;
  bottom: 0;
  width: 0.943rem;
  display: flex;
  justify-content: space-around;
  align-content: center;
  .btn-width{
    width: 100px;
  }
}
</style>
