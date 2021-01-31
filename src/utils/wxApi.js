import wx from 'weixin-jsapi'

import { initWXJSInterface } from '@/api/application.apis'

export async function initWXConfig(allowApi) {
  let url = window.location.href.split('#')[0]

  let para = {
    url: url
  }
  let res = await initWXJSInterface(para)
  if (res.code === '0') {
    let jssdk = res.data
    wx.config({
      // debug: process.env.NODE_ENV === 'production' ? false : true,
      appId: jssdk.appId,
      timestamp: jssdk.timestamp,
      nonceStr: jssdk.nonceStr,
      signature: jssdk.signature,
      // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      // appId: '', // 必填，公众号的唯一标识
      // timestamp: , // 必填，生成签名的时间戳
      // nonceStr: '', // 必填，生成签名的随机串
      // signature: '',// 必填，签名
      jsApiList: allowApi
    })
  }
  wx.ready(() => {
    // config后就会执行 不管是不是成功
  })
  wx.error(res => {
    alert('出错了：' + res.errMsg) //这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
  })
}

export function scanQRCode(type = 1) {
  return new Promise((resolve, reject) => {
    wx.ready(() => {
      wx.scanQRCode({
        // 微信扫一扫接口
        desc: 'scanQRCode desc',
        needResult: type, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success: res => {
          let result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
          resolve(result)
        },
        fail: error => {
          setTimeout(() => {
            window.location.reload(true)
          }, 500)
          reject({
            scan: false,
            error
          })
        }
      })
    })
  })
}
