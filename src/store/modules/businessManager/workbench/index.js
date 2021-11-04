import Vue from "vue";
import aStage from "./aStage/index.js";
import cStage from "./cStage/index.js";
const _this = new Vue();

let model = {
  namespaced: true,
  state: {
    workbenchKeyid: "",
    serviceType: [],
    currentItem: {}
  },
  getters: {},
  mutations: {
    updateWorkbenchKeyid(state, data) {
      state.workbenchKeyid = data;
    },
    updateServiceType(state, data) {
      state.serviceType = data;
    },
    updateCurrentItem(state, data) {
      state.currentItem = data;
      _this.session.removeItem([
        "activeName_workbench_index",
        "activeName_aStage",
        "activeName_bStage",
        "activeName_cStage"
      ]);
    }
  },
  actions: {},
  modules: {
    aStage,
    cStage
  }
};
export default model;
