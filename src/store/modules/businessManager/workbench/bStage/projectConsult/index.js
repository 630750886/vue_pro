import Vue from 'vue'
import siteSurvey from './siteSurvey/index.js'
const _this = new Vue()

let model = {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  mobiles:{
    siteSurvey
  }
}
export default model
