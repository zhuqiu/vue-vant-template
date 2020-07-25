/*
 * @Date: 2020-07-16 16:14:34
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-07-21 15:21:26
 * @FilePath: \project\src\api\application.apis.js
 */
import api from './index'
// axios
import request from '@/utils/request'

/**
 * 检查接口服务
 */

// 查询企业列表
export function listCorp(params) {
  return request({
    url: api.event.ListCorp,
    method: 'get',
    params
  })
}

// 查询待处理事件
export function listEvents(params) {
  return request({
    url: api.event.ListEvents,
    method: 'get',
    params
  })
}

// 查询待处理事件
export function listToDoEvents(params) {
  return request({
    url: api.event.ListToDoEvents,
    method: 'get',
    params
  })
}

// 查询企业下的车间列表
export function findRoomList(params) {
  return request({
    url: api.event.FindRoomList,
    method: 'get',
    params
  })
}

// 为车间新增巡查项目
export function addEvent(data) {
  return request({
    url: api.event.AddEvent4Room,
    method: 'post',
    data
  })
}

// 提交检查结果
export function submitEvent(data) {
  return request({
    url: api.event.SubmitEvent,
    method: 'post',
    data
  })
}

// 企业确认检查结果
export function confirmEvent(data) {
  return request({
    url: api.event.ConfirmEvent,
    method: 'post',
    data
  })
}

// 查询企业下的车间列表
export function getEventDetail(params) {
  return request({
    url: api.event.Get,
    method: 'get',
    params
  })
}

// 上传附件
export function uploadImg(data) {
  return request({
    url: api.event.UploadImg,
    method: 'post',
    data
  })
}

// 删除已上传的附件图片
export function removeImg(params) {
  return request({
    url: api.event.RemoveImg,
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

// 审核通过
export function auditor(params) {
  return request({
    url: api.auditor,
    method: 'get',
    params
  })
}

export function wxLogin(params) {
  return request({
    url: api.user.WxLogin,
    method: 'get',
    params
  })
}

/**
 * 巡查类型接口服务
 */

// 查询根节点巡查类型
export function findRootList(params) {
  return request({
    url: api.checkType.FindRootList,
    method: 'get',
    params
  })
}
