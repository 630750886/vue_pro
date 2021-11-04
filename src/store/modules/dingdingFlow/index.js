import Vue from "vue";
import { GetHttp } from "../../../utils/http";

const _this = new Vue();

let model = {
  state: {
    flowData: {
      typeCode: "", //类型编号
      typeName: "", //类型名称
      flowddid: "", //流程钉钉ID
      flowName: "", //流程名称
      flowInstance: "", //流程实例id
      entityKeyid: "", //实体ID
      entityUrl: "", //实体URL
      instanceStatus: "", //实例状态
      changeColumn: "" //更新字段
    }
  },
  getters: {},
  mutations: {
    updateState(state, { k, v }) {
      state.flowData[k] = v;
    }
  },
  actions: {
    networkStartFlow(context) {
      GetHttp(
        "java_post",
        "/flow/flowInstanceinfo/adds",
        "post",
        context.state.flowData
      );
    }
  }
};
export default model;
