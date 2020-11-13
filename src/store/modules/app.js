/*
 * @Date: 2020-07-10 09:43:26
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-07-17 18:52:04
 * @FilePath: \project\src\store\modules\app.js
 */ 
const state = {
  userName: '',
  token: '',
  unReadMsg: 0
}
const mutations = {
  SET_USER_NAME(state, name) {
    state.userName = name
  },
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_UNREADMSG(state, msg){
    state.unReadMsg = msg
  }
}
const actions = {
  // 设置name
  setUserName({ commit }, name) {
    commit('SET_USER_NAME', name)
  },
  //设置token
  setToken({ commit }, token){
    commit('SET_TOKEN', token)
  },
  setUnReadMsg({ commit }, msg){
    commit('SET_UNREADMSG', msg)
  },
}
export default {
  state,
  mutations,
  actions
}
