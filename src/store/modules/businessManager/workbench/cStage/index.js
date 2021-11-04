import Vue from "vue";
import {
  getWorkPlanByKeyid,
  getReturnMaterials,
  addReturnMaterial,
  delReturnMaterial,
  upReturnMaterial,
  upWorkPlan
} from "../../../../../api/webapi-itemWorkGroup.js";
import { getItemByKeyId, upItem } from "../../../../../api/webapi-business.js";
const _this = new Vue();

let model = {
  namespaced: true,
  state: {
    currentItem: {},
    currWorkPlan: {},
    returnMaterials: []
  },
  getters: {},
  mutations: {
    updateCurrentItem(state, data) {
      state.currentItem = data;
    },
    updateCurrWorkPlan(state, data) {
      state.currWorkPlan = data;
    },
    updateReturnMaterials(state, data) {
      state.returnMaterials = data;
    }
  },
  actions: {
    networkGetItem(context) {
      getItemByKeyId({ keyid: context.state.currentItem.keyid }).then(item => {
        context.commit("updateCurrentItem", item.data[0]);
      });
    },
    networkUpItem(context, formData) {
      return upItem(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message);
          context.dispatch("networkGetItem");
          return item.data;
        }
      });
    },
    //获取当前工作计划
    networkGetCurrWorkPlan(context) {
      getWorkPlanByKeyid({
        keyid: context.state.currentItem.projectPlanKeyid
      }).then(item => {
        context.commit("updateCurrWorkPlan", item.data[0]);
      });
    },
    //修改工作计划
    networkUpCurrWorkPlan(context, formData) {
      upWorkPlan(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message);
          context.dispatch("networkGetCurrWorkPlan");
        }
      });
    },
    networkGetReturnMaterials(context) {
      getReturnMaterials({
        projectKeyid: context.state.currentItem.keyid
      }).then(item => {
        context.commit("updateReturnMaterials", item.data);
      });
    },
    networkAddReturnMaterial(context, formData) {
      formData.projectKeyid = context.state.currentItem.keyid;
      formData.projectCode = context.state.currentItem.projectCode;
      formData.projectName = context.state.currentItem.projectName;
      addReturnMaterial(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message);
          context.dispatch("networkGetReturnMaterials");
        }
      });
    },
    networkDelReturnMaterial(context, formData) {
      delReturnMaterial(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message);
          context.dispatch("networkGetReturnMaterials");
        }
      });
    },
    networkUpReturnMaterial(context, formData) {
      upReturnMaterial(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message);
          context.dispatch("networkGetReturnMaterials");
        }
      });
    }
  }
};
export default model;
