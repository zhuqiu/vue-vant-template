/*
 * @Date: 2020-07-10 09:43:26
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-07-17 19:16:39
 * @FilePath: \project\src\store\getters.js
 */ 
const getters = {
  userName: state => state.app.userName,
  token: state => state.app.token,
}
export default getters
