import Vue from "vue";
import {
  getBusContract,
  getBusById,
  addBusContract,
  upBusContract
} from "../../../api/webapi-contract.js";

const _this = new Vue();

let model = {
  namespaced: true,
  state: {
    activeName: "",
    //条件
    advancedQuery: {},
    //contracts: {
    //  dataList: [],
    //  total: 0
    //},
    contractInfo: {}
  },
  getters: {},
  mutations: {
    updateActiveName(state, data) {
      state.activeName = data;
    },
    updateAdvancedQuery(state, data) {
      state.advancedQuery = data;
    },
    //updateContracts(state, data) {
    //  state.contracts = data;
    //},
    updateContractInfo(state, data) {
      state.contractInfo = data;
    }
  },
  actions: {
    networkGetContacts(context, pageShow) {
      getBusContract(pageShow).then(item => {
        let ref = {
          dataList: item.data.content,
          total: item.data.totalElements
        };
        context.commit("updateContracts", ref);
      });
    },
    networkGetContactBasic(context, keyid) {
      getBusById({ keyid: keyid }).then(item => {
        context.commit("updateContractInfo", item.data[0]);
      });
    },
    networkAddContact(context, formData) {
      return addBusContract(formData).then(item => {
        if (item.code === 200) {
          _this.$msgbox.alert(
            '这是你添加的合同号：<span style="color:#409EFF;">' +
              item.data.contractCode +
              "</span>",
            "",
            {
              dangerouslyUseHTMLString: true
            }
          );
          context.commit("updateActiveName", formData.contractTypeKeyId);
          return true;
        }
      });
    },
    networkUpContact(context, formData) {
      upBusContract(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message);
          context.dispatch("networkGetContactBasic", formData.keyid);
        } else {
          _this.$message.success(item.message);
        }
      });
    },
    //确认合同
    networkOkContact(context, formData) {
      return upBusContract(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message);
          return item.data;
          //需要执行确认流程
        } else {
          _this.$message.success(item.message);
        }
      });
    },
    //取消合同
    networkCancelContact(context, formData) {
      return upBusContract(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message);
          //context.dispatch("networkGetContacts", {
          //  pageInfo: { page: 1, limit: 30 },
          // advancedQuery: context.state.advancedQuery
          //});
          //需要执行取消合同流程
          return true;
        } else {
          _this.$message.success(item.message);
        }
      });
    }
  }
};
export default model;
