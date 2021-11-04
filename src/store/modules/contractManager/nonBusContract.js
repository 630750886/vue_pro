import Vue from "vue";
import {
  getNonBusContract,
  getNonBusById,
  addNonBusContract,
  upNonBusContract,
  upBusContract
} from "../../../api/webapi-contract";

const _this = new Vue();

let model = {
  namespaced: true,
  state: {
    //条件
    advancedQuery: {},
    //contracts: {
    // dataList: [],
    // total: 0
    // },
    contractInfo: {}
  },
  getters: {},
  mutations: {
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
      getNonBusContract(pageShow).then(item => {
        let ref = {
          dataList: item.data.content,
          total: item.data.totalElements
        };
        //context.commit("updateContracts", ref);
      });
    },
    networkGetContactBasic(context, keyid) {
      getNonBusById({ keyid: keyid }).then(item => {
        context.commit("updateContractInfo", item.data[0]);
      });
    },
    networkAddContact(context, formData) {
      addNonBusContract(formData).then(item => {
        let ref = {
          pageInfo: { page: 1, limit: 30 },
          advancedQuery: {
            contractTypeKeyId: formData.contractTypeKeyId
          }
        };
        context.dispatch("networkGetContacts", ref);
        if (item.code === 200) {
          _this.$msgbox.alert(
            '这是你添加的合同号：<span style="color:#409EFF; text-align: center">' +
              item.data.contractCode +
              "</span>",
            "",
            {
              dangerouslyUseHTMLString: true
            }
          );
        }
      });
    },
    networkUpContract(context, formData) {
      upNonBusContract(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message);
          context.dispatch("networkGetContactBasic", formData.keyid);
        } else {
          _this.$message.error(item.message);
        }
      });
    },
    //取消合同
    networkCancelContact(context, formData) {
      return upNonBusContract(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message);
          return item.data;
        } else {
          _this.$message.success(item.message);
        }
      });
    }
  }
};
export default model;
