/*
 * @Date: 2020-07-10 09:43:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-05 12:38:22
 * @FilePath: \project\src\api\index.js
 */
const original = {
  meeting: {
    Auditor: '/data/api/meeting/auditor',
    Finish: '/data/api/meeting/finish',
    Get: '/data/api/meeting/get',
    List: '/data/api/meeting/list',
    RemoveImg: '/data/api/meeting/removeImg',
    UploadImg: '/data/api/meeting/uploadImg'
  },
  workRecord: {
    Add: '/data/api/workRecord/add',
    Find: '/data/api/workRecord/find',
    Get: '/data/api/workRecord/get',
    List: '/data/api/workRecord/list',
    Submit: '/data/api/workRecord/submit',
    RemoveImg: '/data/api/workRecord/removeImg',
    UploadImg: '/data/api/workRecord/uploadImg',
    UploadSignImg: '/data/api/workRecord/uploadSignImg'
  },
  eventBatch: {
    CreateBatchNo: '/data/api/eventBatch/createBatchNo',
    FindBatchNo: '/data/api/eventBatch/findBatchNo',
    Get: '/data/api/eventBatch/get',
    List: '/data/api/eventBatch/list',
    UploadSignImg: '/data/api/eventBatch/uploadSignImg',
    Submit: '/data/api/eventBatch/submit'
  },
  event: {
    AddEvent4Room: '/data/api/event/addEvent4Room',
    ConfirmEvent: '/data/api/event/confirmEvent',
    FindRoomList: '/data/api/event/findRoomList',
    FinishRepair: '/data/api/event/finishRepair',
    Get: '/data/api/event/get',
    ListEvents: '/data/api/event/listEvents',
    ListCorp: '/data/api/event/listCorp',
    ListToDoEvents: '/data/api/event/listToDoEvents',
    ListHighEvents: '/data/api/event/listHighRiskEvents',
    RemoveImg: '/data/api/event/removeImg',
    SubmitEvent: '/data/api/event/submitEvent',
    UploadImg: '/data/api/event/uploadImg',
    GetEventControlerButton: '/data/api/event/getEventControlerButton',
    DeleteEvent: '/data/api/event/deleteEvent',
    FindEventAuditors: '/data/api/event/findEventAuditors',
    EventAuditorReject: '/data/api/event/eventAuditorReject',
    EventAuditorOk: '/data/api/event/eventAuditorOk',
    RejectEvent: '/data/api/event/rejectEvent',
    EndEvent: '/data/api/event/endEvent'
  },
  room: {
    FindByCorpId: '/data/api/room/findByCorpId'
  },
  checkType: {
    FindChildList: '/data/api/checkType/findChildList',
    FindRootList: '/data/api/checkType/findRootList'
  },
  onlineVideo: {
    ListVideo: '/data/api/onlineVideo/listVideo',
    Play: '/data/api/onlineVideo/play'
  },
  msg: {
    ListMsg: '/data/api/msg/listMsg',
    BatchDeleteMsg: '/data/api/msg/batchDel',
    CountUnreadMsgTotal: '/data/api/msg/countUnreadMsgTotal',
    ReadMsg: '/data/api/msg/readMsg',
    ReadAll: '/data/api/msg/readAll'
  },
  user: {
    Login: '/user/login',
    //GetPhoneCode: '/user/userinfo',
    WxLogin: '/data/api/user/wxLogin',
    GetWxLoginUrl: '/data/api/user/getWxLoginUrl',
    BindPhone: '/data/api/user/bindPhone',
    GetPhoneCode: '/data/api/user/getPhoneCode'
  },
  publicNetDisk: {
    List: '/data/api/publicNetDisk/list'
  },
  corpDisk: {
    List: '/data/api/corpDisk/list'
  },
  train: {
    List: '/data/api/train/list',
    Delete: '/data/api/train/delete',
    Get: '/data/api/train/get',
    RemoveImg: '/data/api/train/removeImg',
    SaveOrUpdate: '/data/api/train/saveOrUpdate',
    UploadImg: '/data/api/train/uploadImg',
    GetControllerButton: '/data/api/train/getControllerButton',
    Submit: '/data/api/train/submit',
    Reject: '/data/api/train/reject',
    Finish: '/data/api/train/finish',
    Auditor: '/data/api/train/auditor'
  },
  fireExercise: {
    SaveOrUpdate: '/data/api/show/saveOrUpdate',
    Delete: '/data/api/show/delete',
    Get: '/data/api/show/get',
    List: '/data/api/show/list',
    UploadImg: '/data/api/show/uploadImg',
    RemoveImg: '/data/api/show/removeImg',
    GetControllerButton: '/data/api/show/getControllerButton',
    Submit: '/data/api/show/submit',
    Reject: '/data/api/show/reject',
    Finish: '/data/api/show/finish',
    Auditor: '/data/api/show/auditor'
  },
  fireCheck: {
    ListNotCheckEquipmentThisMonth: '/data/api/equipment/listNotCheckEquipmentThisMonth',
    CheckEquipment: '/data/api/equipment/checkEquipment',
    Query: '/data/api/equipment/query',
    Query4Check: '/data/api/equipment/query4Check'
  },
  wxInfo: {
    InitWXJSInterface: '/data/weixin/initWXJSInterface'
  }
}

let api = Object.assign({}, original)

export default api
