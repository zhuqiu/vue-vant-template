/*
 * @Date: 2020-07-21 15:43:31
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-07-21 16:33:50
 * @FilePath: \project\src\utils\status-typing.js
 */ 

 const StatusTypeItem = {

   //新建 进行中
   Pending: 1,

   //检查不合格
   CheckNotPass: 2,

   //检查合格
   CheckPass: 3,

   //企业已确认(结束)
   EnterpriseConfirmed: 4,

   //待企业整改
   WaitRectification: 5,

   //企业驳回
   EnterpriseReject: 6,

   //预期未整改
   NotRectification: 7,

   //企业已整改(结束)
   EnterpriseRectified: 8
   
 }
export default StatusTypeItem;