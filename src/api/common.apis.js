/*
 * @Date: 2020-11-11 14:06:59
 * @LastEditors: zhuqiu
 */
import api from './index'
// axios
import request from '@/utils/request'

// get 请求事例
export function listCorp(params) {
  return request({
    url: api.meeting.Auditor,
    method: 'get',
    params
  })
}

// post 请求事例
export function addEvent(data) {
    return request({
      url: api.meeting.Finish,
      method: 'post',
      data
    })
  }
