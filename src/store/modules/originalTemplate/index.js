import Vue from "vue";
import {
  getTemplate,
  addTemplate,
  upTemplate,
  delTemplate
} from "../../../api/webapi-originalTemplate.js";
const _this = new Vue();

let model = {
  namespaced: true,
  state: {
    //所属模块编号
    model: {},
    //模板
    temList: {
      dataList: [],
      total: 0
    }
  },
  getters: {},
  mutations: {
    updateModel(state, data) {
      state.model = data;
    },
    updateTemList(state, data) {
      state.temList = data;
    }
  },
  actions: {
    networkGetTemplate(context, pageShow) {
      pageShow.advancedQuery.projectTypeKeyid = context.state.model.code;
      getTemplate(pageShow).then(item => {
        let ref = {
          dataList: item.data.content,
          total: item.data.totalElements
        };
        context.commit("updateTemList", ref);
      });
    },
    networkAddTemplate(context, formData) {
      console.log(context.state.model);
      formData.projectTypeKeyid = context.state.model.code;
      formData.projectTypeName = context.state.model.name;
      addTemplate(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message);
          context.dispatch("networkGetTemplate", {
            pageInfo: { page: 1, limit: 30 },
            advancedQuery: {}
          });
        } else {
          _this.$message.success(item.message);
        }
      });
    },
    networkUpTemplate(context, formData) {
      upTemplate(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message);
          context.dispatch("networkGetTemplate", {
            pageInfo: { page: 1, limit: 30 },
            advancedQuery: {}
          });
        } else {
          _this.$message.success(item.message);
        }
      });
    },
    networkDelTemplate(context, formData) {
      delTemplate(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message);
          context.dispatch("networkGetTemplate", {
            pageInfo: { page: 1, limit: 30 },
            advancedQuery: {}
          });
        } else {
          _this.$message.success(item.message);
        }
      });
    }
  }
};
export default model;
