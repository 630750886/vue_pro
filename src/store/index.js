import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

//菜单
import menu from "./modules/meun/index.js";
//import dindinFlow from "./modules/dingdingFlow/index.js";
import hrStore from "./modules/HRManager/personInfo.js";
import recruitDispose from "./modules/HRManager/recruitDispose.js";
//类型
import loadType from "./modules/loadType/index.js";
//系统
import orgAndPost from "./modules/systemManager/orgAndPost.js";
import sysType from "./modules/systemManager/sysType.js";
//客户
import customerInfo from "./modules/customerManager/customerInfo.js";
import maintenance from "./modules/customerManager/maintenance.js";
//合同
import businessContract from "./modules/contractManager/businessContract.js";
import nonBusContract from "./modules/contractManager/nonBusContract.js";
//投标管理
import bidManager from "./modules/bidManager/index.js";
//原件管理
import originalScript from "./modules/originalScriptManager/index.js";
//模板管理
import template from "./modules/originalTemplate/index.js";
//财务管理
import fin from "./modules/finManager/index.js";
/**
 * 业务模块
 * projectConsult 工程咨询项目
 * projectConsultWorkbench 工程咨询工作台
 */
import projectConsult from "./modules/businessManager/projectConsult/index.js";
import projectCost from "./modules/businessManager/projectCost/index.js";
import biddingAgency from "./modules/businessManager/biddingAgency/index.js";
import biddingPlatform from "./modules/businessManager/biddingPlatform/index.js";
import projectSupervisor from "./modules/businessManager/projectSupervisor/index.js";
import itemManager from "./modules/businessManager/itemManager/index.js";
import workbench from "./modules/businessManager/workbench/index.js";

//流程管理
import flowManager from "./modules/flowManager/index.js";
//共享管理
import shareManager from "./modules/shareManager/index.js";

import policies from "./modules/policies/policies"

export default new Vuex.Store({
  state: {
    //当前登录用户
    currentUser: {
      token: "",
      dinCode: "", //钉钉用户的钉钉编号
      userId: "", //系统用户账号
      userName: "", //系统用户名
      mobile: "",
      position: "",
      department: [], //所有岗位
      loginName: "", //用户登录名
      personId: "", //人员id
      personName: "", //人员名称
      orgId: "", //当前组织id
      orgName: "", //当前组织名称
      postId: "", //当前岗位id
      postName: "", //当前岗位名称
      corpId: "",
      roles: [],
      code: "",
      currentPath: ""
    },
    //当前用户所有岗位信息
    userPost: [],

    isCollapse: false,
    collapseStyle: "el-icon-s-fold",
    sidebarWidth: 192,
    signTab: {},
    search: {}
  },
  getters: {
    isCollapse: state => state.isCollapse,
    collapseStyle: state => state.collapseStyle,
    signTab: state => state.signTab,
    search: state => state.search,
    sidebarWidth: state => state.sidebarWidth,
    Utoken: state => state.currentUser.token,
    getCurrentuser:state=>state.currentUser,
  },
  mutations: {
    updateCurrentUser(state, data) {
      state.currentUser = data;
    },
    updateUserPost(state, data) {
      state.userPost = data;
    },
    SET_LEFT_MEUN: state => {
      state.isCollapse = !state.isCollapse;
      if (state.isCollapse === true) {
        state.collapseStyle = "el-icon-s-fold";
        state.sidebarWidth = 35;
      } else {
        state.collapseStyle = "el-icon-s-unfold";
        state.sidebarWidth = 192;
      }
    },
    SET_TAB: (state, ts) => {
      state.signTab = ts;
    },
    SET_SEARCH: (state, searchData) => {
      state.search = searchData;
    }
  },
  actions: {
    setLeftMenu: ({ commit }) => {
      commit("SET_LEFT_MEUN");
    },
    setSearch: ({ commit }, data) => {
      commit("SET_SEARCH", data);
    }
  },
  modules: {
    menu,
    //dindinFlow,
    hrStore,
    recruitDispose,
    loadType,
    orgAndPost,
    sysType,
    customerInfo,
    maintenance,
    flowManager,
    shareManager,
    businessContract,
    nonBusContract,
    originalScript,
    template,
    bidManager,
    projectConsult,
    projectCost,
    biddingAgency,
    biddingPlatform,
    projectSupervisor,
    itemManager,
    workbench,
    fin,
    policies
  }
});
