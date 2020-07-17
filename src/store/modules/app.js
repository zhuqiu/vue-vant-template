/*
 * @Date: 2020-07-10 09:43:26
 * @LastEditors: zhuqiu
 * @LastEditTime: 2020-07-17 18:52:04
 * @FilePath: \project\src\store\modules\app.js
 */ 
const state = {
  userName: '',
  token: ''
}
const mutations = {
  SET_USER_NAME(state, name) {
    state.userName = name
  },
  SET_TOKEN(state, token) {
    state.token = token
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
  }
}
export default {
  state,
  mutations,
  actions
}
