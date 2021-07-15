<template>
  <div class="flow-list">
    <van-steps direction="vertical" active-icon="success" :active="getActiveIndex()">
      <van-step v-for="(item, index) in data" :key="index">
        <span style="font-size: 14px; font-weight: 600; margin-right: 20px">{{ item.postName }}</span>
        <span class="status pendding" v-if="item.expireTime && !item.auditorResult">进行中</span>
        <!-- <span class="status not-start" v-if="!item.expireTime && !item.auditorResult">未启动</span> -->
        <span class="status success" v-if="item.auditorTime && item.auditorResult === 1">完成</span>
        <span class="status reject" v-if="item.auditorResult === 2">驳回</span>
        <p v-if="item.nickname">审批人：{{ item.nickname }}</p>
        <p v-if="item.auditorResult">审批结果：{{ getAuditorResult(item.auditorResult) }}</p>
        <p v-if="item.rejectReason">驳回原因：{{ item.rejectReason }}</p>
        <p v-if="item.auditorTime">审批时间：{{ item.auditorTime }}</p>
        <p v-if="item.displayOperBtn">过期时间：{{item.expireTime}}</p>
        <p v-if="item.auditorResult === 2" style="color:#ff976a">未落实安全生产主体责任，将承担法律责任。</p>
        <div style="text-align: right" v-if="item.displayOperBtn">
          <van-button plain type="primary" size="small" style="margin-right: 10px" @click="handleReject(item.id)"
            >驳回</van-button
          >
          <van-button type="primary" size="small" @click="handleAgree(item.id)">同意</van-button>
        </div>
      </van-step>
    </van-steps>
    <van-dialog v-model="show" title="驳回原因" @confirm="handleConfirm" @cancel="handleCancel" show-cancel-button>
      <div style="font-size:12px;padding: 8px 16px;color:#ee0a24">未落实安全生产主体责任，将承担法律责任。</div>
      <van-field v-model="rejectReason" rows="3" autosize label="" type="textarea" placeholder="请输入驳回原因" />
    </van-dialog>
  </div>
</template>

<script>

import {
  eventAuditorOk,
  eventAuditorReject
} from '../../api/application.apis'
export default {
  name: 'flow',
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    id: {
      type: Number,
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {
      show: false,
      rejectReason: '',
      eventAuditorRecordId: ''
    }
  },
  created() {},
  methods: {
    handleReject(id) {
      this.show = true
      this.eventAuditorRecordId = id
    },
    getActiveIndex(){
      return this.data.findIndex(res => res.expireTime && !res.auditorResult) || 0
    },
    getAuditorResult(result){
      return result === 1 ? '同意整改' : '已驳回'
    },
    async handleAgree(id){
      const res = await eventAuditorOk({
        eventAuditorRecordId: id
      })
      if(res.code === '0'){
        this.$toast('同意成功')
        setTimeout(() => {
          this.$router.push({
            name: 'AllTodo'
          })
        }, 1000)
      }else{
        this.$toast('同意失败')
      }
    },
    async handleConfirm() {
      const res = await eventAuditorReject({
        eventAuditorRecordId: this.eventAuditorRecordId,
        rejectReason: this.rejectReason
      })
      if(res.code === '0'){
        this.$toast('驳回成功');
        setTimeout(() => {
          this.$router.push({
            name: 'AllTodo'
          })
        }, 1000)
      }else{
        this.$toast(res.msg)
      }
    },
    handleCancel() {
      this.rejectReason = ''
    }
  }
}
</script>
<style lang="scss">
.flow-list {
  .status {
    font-size: 12px;
  }
  p {
    font-size: 12px;
  }
  .status.pendding {
  }
  .status.success {
    color: #1989fa;
  }
  .status.reject {
    color: #ee0a24;
  }
  .status.not-start {
    color: #969799;
  }
}
</style>
