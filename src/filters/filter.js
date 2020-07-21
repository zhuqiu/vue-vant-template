/*
 * @Date: 2020-07-10 09:43:26
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-07-21 16:34:12
 * @FilePath: \project\src\filters\filter.js
 */ 
/**
 *格式化时间
 *yyyy-MM-dd hh:mm:ss
 */

import StatusTypeItem from '@/utils/status-typing';

export function formatDate(time, fmt) {
  if (time === undefined || '') {
    return
  }
  const date = new Date(time)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
/*
 * 隐藏用户手机号中间四位
 */
export function hidePhone(phone) {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/*
 * 获取状态
 */
export function getStatus(val) {
  switch(val){
    case StatusTypeItem.Pending:
      return '进行中';
    case StatusTypeItem.CheckNotPass:
      return '检查不合格';
    case StatusTypeItem.检查合格:
      return '检查合格';
    case StatusTypeItem.EnterpriseConfirmed:
      return '企业已确认(结束)';
    case StatusTypeItem.WaitRectification:
      return '待企业整改';
    case StatusTypeItem.EnterpriseReject:
      return '企业驳回';
    case StatusTypeItem.NotRectification:
      return '预期未整改';
    case StatusTypeItem.EnterpriseRectified:
      return '企业已整改(结束)';
    default:
      return '';
  }
}
