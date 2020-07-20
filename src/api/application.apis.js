/*
 * @Date: 2020-07-16 16:14:34
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-07-17 18:30:05
 * @FilePath: \project\src\api\application.apis.js
 */
import api from './index'
// axios
import request from '@/utils/request'

// 查询企业列表
export function listCorp(params) {
  return request({
    url: api.event.ListCorp,
    method: 'get',
    params
  })
}

//查询待处理事件
export function listToDoEvents(params) {
  return request({
    url: api.event.ListToDoEvents,
    method: 'get',
    params
  })
}

/**
 * 批次接口服务
 */
export function createBatchNo(data) {
  return request({
    url: api.eventBatch.CreateBatchNo,
    method: 'post',
    data
  })
}

export function findBatchNoList(params) {
  return request({
    url: api.eventBatch.FindBatchNo,
    method: 'get',
    params
  })
}

export function getBatchDetail(params) {
  return request({
    url: api.eventBatch.Get,
    method: 'get',
    params
  })
}


/**
 * 会议培训接口服务
 */

//审核通过
export function auditor(params) {
  return request({
    url: api.auditor,
    method: 'get',
    params
  })
}

export function wxLogin(data) {
  return request({
    url: api.user.WxLogin,
    method: 'post',
    data
  })
}

