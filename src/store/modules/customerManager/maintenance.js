import Vue from "vue";
import {
  getRegisterList,
  getRegisterByKeyId,
  addCustomerReturn,
  upCustomerReturn,
  getExamineResult,
  addExamineResult
} from "../../../api/webapi-customer.js";

const _this = new Vue();

let model = {
  namespaced: true,
  state: {
    advancedQuery: {},
    registerList: {
      dataList: [],
      total: 0
    },
    registerBase: {},
    examineResult: {
      dataList: [],
      total: 0
    }
  },
  getters: {},
  mutations: {
    updateAdvancedQuery(state, data) {
      state.advancedQuery = data;
    },
    updateRegisterList(state, data) {
      state.registerList = data;
    },
    updateRegisterBase(state, data) {
      state.registerBase = data;
    },
    updateExamineResult(state, data) {
      state.examineResult = data;
    }
  },
  actions: {
    networkGetRegisterList(context, pageShow) {
      getRegisterList(pageShow).then(item => {
        let ref = {
          dataList: item.data.content,
          total: item.data.totalElements
        };
        context.commit("updateRegisterList", ref);
      });
    },
    networkGetRegisterByKeyId(context, keyId) {
      console.log(keyId);
      return getRegisterByKeyId({ keyid: keyId }).then(item => {
        context.commit("updateRegisterBase", item.data[0]);
        return item;
      });
    },
    networkAddRegisterInfo(context, formData) {
      addCustomerReturn(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message);
          context.dispatch("networkGetRegisterList", {
            pageInfo: { page: 1, limit: 30 }
          });
        } else {
          _this.$message.error(item.message);
        }
      });
    },
    networkUpRegisterInfo(context, formData) {
      return upCustomerReturn(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message);
          context.dispatch("networkGetRegisterByKeyId", formData.keyid);
          return item;
        } else {
          _this.$message.error(item.message);
        }
      });
    },
    networkGetExamineResult(context, keyId) {
      getExamineResult({ sumerserveid: keyId }).then(item => {
        let ref = {
          dataList: item.data,
          total: item.data.length
        };
        context.commit("updateExamineResult", ref);
      });
    },
    networkAddExamineResult(context, formData) {
      return addExamineResult(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message);
          return item.data;
        } else {
          _this.$message.error(item.message);
        }
      });
    }
  }
};
export default model;
