/*
 * @Date: 2020-07-16 16:14:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-23 13:50:46
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

// 查询风险管控事件
export function listHighEvents(params) {
  return request({
    url: api.event.ListHighEvents,
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

export function findByCorpId(params) {
  return request({
    url: api.room.FindByCorpId,
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

// 查询事件控制按钮显示
export function getEventControlerButton(params) {
  return request({
    url: api.event.GetEventControlerButton,
    method: 'get',
    params
  })
}

// 删除巡查事项
export function deleteEvent(params) {
  return request({
    url: api.event.DeleteEvent,
    method: 'get',
    params
  })
}

//查询事件审核流程列表
export function findEventAuditors(params) {
  return request({
    url: api.event.FindEventAuditors,
    method: 'get',
    params
  })
}

//事件流程审核-同意
export function eventAuditorOk(params) {
  return request({
    url: api.event.EventAuditorOk,
    method: 'get',
    params
  })
}

//事件流程审核-驳回
export function eventAuditorReject(params) {
  return request({
    url: api.event.EventAuditorReject,
    method: 'get',
    params
  })
}

//运维巡查员可驳回企业已结案的事项
export function rejectEvent(data) {
  return request({
    url: api.event.RejectEvent,
    method: 'post',
    data
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

export function getBatchList(params) {
  return request({
    url: api.eventBatch.List,
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

export function uploadBatchSignImg(data) {
  return request({
    url: api.eventBatch.UploadSignImg,
    method: 'post',
    data
  })
}

export function submitBatch(params) {
  return request({
    url: api.eventBatch.Submit,
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

// 查询子节点列表
export function findChildList(params) {
  return request({
    url: api.checkType.FindChildList,
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
    url: api.workRecord.List,
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

export function playVideo(params) {
  return request({
    url: api.onlineVideo.Play,
    method: 'get',
    params
  })
}

/**
 * 通知接口服务
 */

//分页查询消息通知
export function getListMsg(params) {
  return request({
    url: api.msg.ListMsg,
    method: 'get',
    params
  })
}

//批量清空消息列表
export function batchDeleteMsg(data) {
  return request({
    url: api.msg.BatchDeleteMsg,
    method: 'post',
    data
  })
}

//查阅未读消息总数
export function countUnreadMsgTotal(params) {
  return request({
    url: api.msg.CountUnreadMsgTotal,
    method: 'get',
    params
  })
}

//阅读消息
export function readMsg(data) {
  return request({
    url: api.msg.ReadMsg,
    method: 'post',
    data
  })
}

//阅读消息
export function readAll(params) {
  return request({
    url: api.msg.ReadAll,
    method: 'get',
    params
  })
}

//用户登录
export function wxLogin(params) {
  return request({
    url: api.user.WxLogin,
    method: 'get',
    params
  })
}

export function getWxLoginUrl(params) {
  return request({
    url: api.user.GetWxLoginUrl,
    method: 'get',
    params
  })
}

export function bindPhone(params) {
  return request({
    url: api.user.BindPhone,
    method: 'get',
    params
  })
}

export function getPhoneCode(params) {
  return request({
    url: api.user.GetPhoneCode,
    method: 'get',
    params
  })
}

//分页查询公共网盘
export function getPublicNetDisk(params) {
  return request({
    url: api.publicNetDisk.List,
    method: 'get',
    params
  })
}

//分页查询公共网盘
export function getCorpDisk(params) {
  return request({
    url: api.corpDisk.List,
    method: 'get',
    params
  })
}

//分页查询培训演练培训
export function getTrainList(params) {
  return request({
    url: api.train.List,
    method: 'get',
    params
  })
}

//查询培训演练培训详情
export function getTrainDetail(params) {
  return request({
    url: api.train.Get,
    method: 'get',
    params
  })
}

//获取控制显示按钮
export function getTrainControllerButton(params){
  return request({
    url: api.train.GetControllerButton,
    method: 'get',
    params
  })
}

//审核通过
export function trainAuditor(params){
  return request({
    url: api.train.Auditor,
    method: 'get',
    params
  })
}

//完成
export function trainFinish(params){
  return request({
    url: api.train.Finish,
    method: 'get',
    params
  })
}

//驳回
export function trainReject(data){
  return request({
    url: api.train.Reject,
    method: 'post',
    data
  })
}

//提交
export function trainSubmit(params){
  return request({
    url: api.train.Submit,
    method: 'get',
    params
  })
}

//培训演练培训保存
export function saveOrUpdateTrain(data) {
  return request({
    url: api.train.SaveOrUpdate,
    method: 'post',
    data
  })
}

//培训演练培训上传附件
export function uploadImgTrain(data) {
  return request({
    url: api.train.UploadImg,
    method: 'post',
    data
  })
}

//培训演练培训删除附件
export function removeImgTrain(params) {
  return request({
    url: api.train.RemoveImg,
    method: 'get',
    params
  })
}

//培训演练培训删除
export function deleteTrain(params) {
  return request({
    url: api.train.Delete,
    method: 'get',
    params
  })
}

//分页危险作业培训
export function getFireList(params) {
  return request({
    url: api.fireExercise.List,
    method: 'get',
    params
  })
}

//查询危险作业培训详情
export function getFireDetail(params) {
  return request({
    url: api.fireExercise.Get,
    method: 'get',
    params
  })
}
//获取控制显示按钮
export function getFireControllerButton(params){
  return request({
    url: api.fireExercise.GetControllerButton,
    method: 'get',
    params
  })
}

//审核通过
export function fireAuditor(params){
  return request({
    url: api.fireExercise.Auditor,
    method: 'get',
    params
  })
}

//完成
export function fireFinish(params){
  return request({
    url: api.fireExercise.Finish,
    method: 'get',
    params
  })
}

//驳回
export function fireReject(data){
  return request({
    url: api.fireExercise.Reject,
    method: 'post',
    data
  })
}

//提交
export function fireSubmit(params){
  return request({
    url: api.fireExercise.Submit,
    method: 'get',
    params
  })
}

//危险作业培训保存
export function saveOrUpdateFire(data) {
  return request({
    url: api.fireExercise.SaveOrUpdate,
    method: 'post',
    data
  })
}

//危险作业培训上传附件
export function uploadImgFire(data) {
  return request({
    url: api.fireExercise.UploadImg,
    method: 'post',
    data
  })
}

//危险作业培训删除附件
export function removeImgFire(params) {
  return request({
    url: api.fireExercise.RemoveImg,
    method: 'get',
    params
  })
}

//危险作业培训删除
export function deleteFire(params) {
  return request({
    url: api.fireExercise.Delete,
    method: 'get',
    params
  })
}
