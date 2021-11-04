import Vue from "vue";
import { getrolelist, addrole } from "@/api/webapi-role.js";
const _this = new Vue();
let model = {
  namespaced: true,
  state: {
    roleOrg: [],
    roleMenu: [],
    RoleList: [],
    SysRole: {}
  },
  getters: {
    postList: state => {
      return {
        dataList: state.RoleList,
        total: state.RoleList.length
      };
    }
  },
  mutations: {},
  actions: {}
};
export default model;
