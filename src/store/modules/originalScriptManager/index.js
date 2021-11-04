import Vue from "vue";
import {
  getOriginalScriptByWhere,
  getOriginalScriptByPageShow,
  addOriginalScript,
  upOriginalScript,
  delOriginalScript,
  getalldata
} from "../../../api/webapi-originalScript.js";

const _this = new Vue();

let model = {
  namespaced: true,
  state: {
    //原件类型 合同相关原件  项目相关
    originalScriptType: "",
    //数据存储对象
    originalScriptList: {
      dataList: [],
      total: 0
    }
  },
  getters: {},
  mutations: {
    updateOriginalScriptType(state, data) {
      state.originalScriptType = data;
    },
    updateOriginalScriptList(state, data) {
      state.originalScriptList = data;
    }
  },
  actions: {
    /**
     * 合同移交
     * networkGetMyTransfer 获取我移交原件信息
     * networkGetMyReceive  获取我接收原件信息
     */
    networkGetTransfer(context, pageShow) {
      pageShow.advancedQuery.outpersonkeyid =
        context.rootState.currentUser.personId;
      pageShow.advancedQuery.isOutPerson = "1";
      getOriginalScriptByPageShow(pageShow).then(item => {
        let ref = {
          dataList: item.data.content,
          total: item.data.totalElements
        };
        context.commit("updateOriginalScriptList", ref);
      });
    },
    networkGetReceive(context, pageShow) {
      pageShow.advancedQuery.inpersonkeyid =
      context.rootState.currentUser.personId;
      pageShow.advancedQuery.showReceive = true;
      getOriginalScriptByPageShow(pageShow).then(item => {
        let ref = {
          dataList: item.data.content,
          total: item.data.totalElements
        };
        context.commit("updateOriginalScriptList", ref);
      });
    },
    networkAddTransfer(context, formData) {
      console.log(context.rootState.currentUser.orgName);
      formData.outpersonkeyid = context.rootState.currentUser.personId;
      formData.outperson = context.rootState.currentUser.personName;
      formData.outOrgkeyid = context.rootState.currentUser.orgId;
      formData.outOrgName = context.rootState.currentUser.orgName;
      addOriginalScript(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message);
        } else {
          _this.$message.error(item.message);
        }
      });
    },
    //接收原件
    networkReceiveOriginalScript(context, formData) {
      formData.inOrgName = context.rootState.currentUser.orgName;
      formData.trunoverstatus = "已接收";
      formData.isInResult = "0";
      return upOriginalScript(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message);
          return true;
        } else {
          _this.$message.error(item.message);
          return false;
        }
      });
    },
    //拒收原件
    networkRejectionOriginalScript(context, formData) {
      formData.trunoverstatus = "已拒收";
      formData.isInResult = "1";
      return upOriginalScript(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message);
          return true;
        } else {
          _this.$message.error(item.message);
          return false;
        }
      });
    },
    //删除移交信息
    networkDelTransfer(context, formData) {
      formData.showflage=false;
      return upOriginalScript(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message);
          return true;
        } else {
          _this.$message.error(item.message);
          return false;
        }
      });
    },
    //删除移交信息
    networkDelReceive(context, formData) {
      formData.showflage = false;
      return upOriginalScript(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message);
          return true;
        } else {
          _this.$message.error(item.message);
          return false;
        }
      });
    }
  }
};
export default model;
