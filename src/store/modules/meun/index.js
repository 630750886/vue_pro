import Vue from "vue";

const _this = new Vue();
let model = {
  namespaced: true,
  state: {
    currSubMenu: "",
    currMenuItem: ""
  },
  getters: {},
  mutations: {
    updateCurrSubMenu(state, data) {
      state.currSubMenu = data;
    },
    updateCurrMenuItem(state, data) {
      state.currMenuItem = data;
    }
  },
  actions: {}
};
export default model;
