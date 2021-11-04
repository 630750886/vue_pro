import Vue from "vue";
import {
  getAllCustomer,
  getCustomerById,
  queryCustomer,
  addCustomer,
  getContact,
  addContact,
  upCustomer,
  upContact,
  signContact
} from "../../../api/webapi-customer.js";

const _this = new Vue();

let model = {
  namespaced: true,
  state: {
    customerId: "",
    advancedQuery: {},
    //customerInfo: {dataList: [],total: 0},
    dataBasic: {},
    //客户联系人信息
    contacts: {
      dataList: [],
      total: 0
    },
    //业务信息
    business: {}
  },
  getters: {},
  mutations: {
    updateAdvancedQuery(state, data) {
      state.advancedQuery = data;
    },
    //updateCustomerInfo(state, data) {
    //  state.customerInfo = data;
    //},
    updateDataBasic(state, data) {
      state.dataBasic = data;
    },
    updateContacts(state, data) {
      state.contacts = data;
    },
    updateCustomerId(state, data) {
      state.customerId = data;
    }
  },
  actions: {
    networkGetCustomer(context, formData) {
      if (!formData) {
        formData = {
          pageInfo: {
            page: 1,
            limit: 30
          }
        };
      }
      getAllCustomer(formData)
        .then(item => {
          let ref = {
            dataList: item.data.content,
            total: item.data.totalElements
          };
          context.commit("updateCustomerInfo", ref);
        })
        .catch(() => {
          console.log("customerInfo：获取客户台账信息异常");
        });
    },
    networkGetCustomerByKeyId(context) {
      getCustomerById({ keyid: context.state.customerId })
        .then(item => {
          context.commit("updateDataBasic", item.data[0]);
        })
        .catch(() => {
          console.log("customerInfo：获取客户基本信息异常");
        });
    },
    networkQueryCustomer(context, formData) {
      queryCustomer(formData)
        .then(item => {
          let ref = {
            dataList: item.data.content,
            total: item.data.totalElements
          };
          context.commit("updateCustomerInfo", ref);
        })
        .catch(() => {
          console.log("customerInfo：查询客户台账信息异常");
        });
    },
    networkAddCustomer(context, formData) {
      let ref = context.rootState.currentUser;
      formData.syscreatepersonid = ref.personId;
      formData.syscreatepersonname = ref.personName;
      addCustomer(formData)
        .then(item => {
          if (item.code === 200) {
            _this.$message.success(item.message);
            //context.dispatch("networkGetCustomer");
          } else {
            _this.$message.error(item.message);
          }
        })
        .catch(() => {
          console.log("customerInfo：添加客户信息异常");
        });
    },
    networkUpCustomer(context, formData) {
      upCustomer(formData)
        .then(item => {
          if (item.code === 200) {
            _this.$message.success(item.message);
            context.dispatch("networkGetCustomerByKeyId", formData.keyid);
          } else {
            _this.$message.error(item.message);
          }
        })
        .catch(() => {
          console.log("customerInfo：添加客户信息异常");
        });
    },
    //获取客户联系人
    networkGetContacts(context, statusearlier) {
      getContact({
        clientid: context.state.customerId,
        statusearlier: statusearlier
      })
        .then(item => {
          let ref = {
            dataList: item.data,
            total: item.data.length
          };
          context.commit("updateContacts", ref);
        })
        .catch(() => {
          console.log("customerInfo：获取客户联系人异常");
        });
    },
    networkAddContacts(context, formData) {
      addContact(formData)
        .then(item => {
          if (item.code === 200) {
            _this.$message.success(item.message);
            context.dispatch("networkGetContacts", "pre");
          } else {
            _this.$message.error(item.message);
          }
        })
        .catch(() => {
          console.log("customerInfo：添加客户联系人异常");
        });
    },
    networkUpContacts(context, formData) {
      upContact(formData)
        .then(item => {
          if (item.code === 200) {
            _this.$message.success(item.message);
            context.dispatch("networkGetContacts", formData.statusearlier);
          } else {
            _this.$message.error(item.message);
          }
        })
        .catch(() => {
          console.log("customerInfo：修改客户联系人异常");
        });
    }
  }
};
export default model;
