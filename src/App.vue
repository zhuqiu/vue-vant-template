<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
.common-list{
  padding: 0.32rem;
  .common-content {
    border-radius: 4px;
    margin-bottom: 0.32rem;
    & > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.32rem;
      padding-bottom: 0;
      background: #ffffff;
      border-radius: 0.1rem;
    }
    & > div:last-of-type{
      padding-bottom: 0.32rem;
    }
    .content-title{
      font-weight: 600;
      font-size: 14px;
      flex: 6;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .content-status{
      flex: 1.5;
      display: flex;
      justify-content: flex-end;
      img{
        display: block;
        width: 100%;
        height: auto;
      }
    }
    .content-info{
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      span {
        margin-left: 0.12rem;
        color: #666666;
      }
    }
    .content-time{
      color: #999999;
    }
  }
}
</style>
