
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
    UploadSignImg: '/data/api/eventBatch/uploadSignImg'
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
    RemoveImg: '/data/api/event/removeImg',
    SubmitEvent: '/data/api/event/submitEvent',
    UploadImg: '/data/api/event/uploadImg'
  },
  checkType: {
    FindChildList: '/data/api/checkType/findChildList',
    FindRootList: '/data/api/checkType/findRootList',

  },
  user: {
    Login: '/user/login',
    GetPhoneCode: '/user/userinfo',
    WxLogin: '/data/api/user/wxLogin'
  }
}

let api = Object.assign({}, original);


export default api
