<template>
  <div>
    <van-sticky>
      <van-nav-bar :title="id ? '巡查记录' : '新增巡查记录'" left-text="返回" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <van-tabs v-model="active" v-if="auditorFlg === 1 && flowList.length > 0">
      <van-tab title="巡查记录详情">
        <event :id="id" :status="status"></event>
      </van-tab>
      <van-tab title="流程审批详情">
        <flowEvent :data="flowList" :id="id"></flowEvent>
      </van-tab>
    </van-tabs>
    <event :id="id" :status="status" v-else></event>
  </div>
</template>

<script>
import { findEventAuditors } from '../../api/application.apis'
import flowEvent from './flowEvent'
import event from './event'
export default {
  name: 'eventTab',
  data() {
    return {
      active: 0,
      id: '',
      status: '',
      auditorFlg: '',
      flowList: []
    }
  },
  components: {
    flowEvent,
    event
  },
  created() {
    this.id = Number(this.$route.query.id),
    this.status = Number(this.$route.query.status)
    this.auditorFlg = Number(this.$route.query.auditorFlg)
    if(this.id){
      this.findEventAuditors()
    }
    if(location.href.indexOf('code=') > -1){
      this.active = 1;
    }
  },
  methods: {
    onClickLeft() {
      history.go(-1)
    },
    async findEventAuditors() {
      const res = await findEventAuditors({
        eventId: this.id
      })
      if (res.code === '0') {
        this.flowList = res.data
      } else {
        this.$toast(res.msg)
      }
    }
  }
}
</script>
<style lang="scss">
</style>
