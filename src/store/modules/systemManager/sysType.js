import Vue from "vue";
import {
  addModule,
  delModule,
  upModule,
  getAllModule,
  addTypeList,
  upTypeList,
  delTypeList,
  getTypeList,
  getTypeListByModuleId,
  getTypeListByCode
} from "../../../api/webapi-sys.js";

const _this = new Vue();

let model = {
  namespaced: true,
  state: {
    allModule: [],
    allTypeList: [],
    currentModule: {}
  },
  getters: {
    allModule: state => {
      return {
        dataList: state.allModule,
        total: state.allModule.length
      };
    },
    allTypeList: state => {
      return {
        dataList: state.allTypeList,
        total: state.allTypeList.length
      };
    }
  },
  mutations: {
    updateAllModule(state, data) {
      state.allModule = data;
    },
    updateTypeList(state, data) {
      state.allTypeList = data;
    },
    updateCurrentModule(state, data) {
      state.currentModule = data;
    }
  },
  actions: {
    networkGetAllModule(context) {
      getAllModule({ keyid: "0000" })
        .then(item => {
          context.commit("updateAllModule", item.data);
        })
        .catch(() => {
          console.log("sysType：获取所有模块类型失败");
        });
    },
    networkGetAllTypeList(context) {
      getTypeList({})
        .then(item => {
          context.commit("updateTypeList", item.data);
        })
        .catch(() => {
          console.log("sysType：获取类型明细失败");
        });
    },
    networkGetTypeListByModuleId(context) {
      getTypeListByModuleId({ keyid: context.state.currentModule.keyid })
        .then(item => {
          context.commit("updateTypeList", item.data);
        })
        .catch(() => {
          console.log("sysType：获取模块下的类型明细失败");
        });
    },
    networkGetTypeListByCode(context, code) {
      let ref = {
        code: ""
      };
      if (!_this.$myfunction.isEmpty(code)) {
        ref.code = code;
      } else {
        ref.code = context.state.currentModule.code;
      }
      getTypeListByCode(ref)
        .then(item => {
          context.commit("updateTypeList", item.data);
        })
        .catch(() => {
          console.log("sysType：获取模块下的类型明细失败");
        });
    },
    networkAddModule(context, formData) {
      addModule(formData)
        .then(item => {
          if (item.code === 200) {
            _this.$message.success(item.message);
            context.dispatch("networkGetAllModule");
          } else {
            _this.$message.error(item.message);
          }
        })
        .catch(() => {
          console.log("sysType：添加模块失败");
        });
    },
    networkAddTypeList(context, formData) {
      addTypeList(formData)
        .then(item => {
          if (item.code === 200) {
            _this.$message.success(item.message);
            context.dispatch("networkGetTypeListByCode");
          } else {
            _this.$message.error(item.message);
          }
        })
        .catch(() => {
          console.log("sysType：删除模块失败");
        });
    },
    networkDelModule(context, formData) {
      delModule(formData)
        .then(item => {
          if (item.code === 200) {
            _this.$message.success(item.message);
            context.dispatch("networkGetAllModule");
          } else {
            _this.$message.error(item.message);
          }
        })
        .catch(() => {
          console.log("sysType：删除模块失败");
        });
    },
    networkDelTypeList(context, formData) {
      delTypeList(formData)
        .then(item => {
          if (item.code === 200) {
            _this.$message.success(item.message);
            context.dispatch("networkGetTypeListByCode", formData.code);
          } else {
            _this.$message.error(item.message);
          }
        })
        .catch(() => {
          console.log("sysType：删除模块失败");
        });
    },
    networkUpModule(context, formData) {
      upModule(formData)
        .then(item => {
          if (item.code === 200) {
            _this.$message.success(item.message);
            context.dispatch("networkGetAllModule");
          } else {
            _this.$message.error(item.message);
          }
        })
        .catch(() => {
          console.log("sysType：修改模块失败");
        });
    },
    networkUpTypeList(context, formData) {
      upTypeList(formData)
        .then(item => {
          if (item.code === 200) {
            _this.$message.success(item.message);
            context.dispatch("networkGetTypeListByCode", formData.code);
          } else {
            _this.$message.error(item.message);
          }
        })
        .catch(() => {
          console.log("sysType：修改类型明细失败");
        });
    }
  }
};
export default model;
