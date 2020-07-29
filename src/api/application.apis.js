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

// 完成整改
export function finishRepair(params) {
  return request({
    url: api.event.FinishRepair,
    method: 'get',
    params
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
export function createBatchNo(params) {
  return request({
    url: api.eventBatch.CreateBatchNo,
    method: 'get',
    params
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

/**
 * 驻场登记接口服务
 */

// 查询驻场登记
export function findWorkRecord(params) {
  return request({
    url: api.workRecord.Find,
    method: 'get',
    params
  })
}

// 新增驻场登记
export function addWorkRecord(data) {
  return request({
    url: api.workRecord.Add,
    method: 'post',
    data
  })
}

// 查询驻场登记详情
export function getWorkRecord(params) {
  return request({
    url: api.workRecord.Get,
    method: 'get',
    params
  })
}

// 查询驻场登记详情
export function submitWorkRecord(params) {
  return request({
    url: api.workRecord.Submit,
    method: 'get',
    params
  })
}

// 上传签名
export function uploadSignImg(data) {
  return request({
    url: api.workRecord.UploadSignImg,
    method: 'post',
    data
  })
}

/**
 * 会议培训接口服务
 */


 // 分页查询会议培训
export function getMeetingList(params) {
  return request({
    url: api.meeting.List,
    method: 'get',
    params
  })
}

// 查询培训详情
export function getMeetingDetail(params) {
  return request({
    url: api.meeting.Get,
    method: 'get',
    params
  })
}

// 提交审核
export function meetingFinish(params) {
  return request({
    url: api.meeting.Finish,
    method: 'get',
    params
  })
}

// 审核通过
export function meetingAuditor(params) {
  return request({
    url: api.meeting.Auditor,
    method: 'get',
    params
  })
}

// 上传附件
export function meetingUploadImg(data) {
  return request({
    url: api.meeting.UploadImg,
    method: 'post',
    data
  })
}

// 删除已上传的附件图片
export function meetingRemoveImg(params) {
  return request({
    url: api.meeting.RemoveImg,
    method: 'get',
    params
  })
}

/**
 * 在线视频接口服务
 */

 //分页查询在线视频列表
 export function getListVideo(params) {
  return request({
    url: api.onlineVideo.ListVideo,
    method: 'get',
    params
  })
}