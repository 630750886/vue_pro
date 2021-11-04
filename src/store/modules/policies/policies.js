import { getCascaderType } from "@/api/webapi-policies.js";
const module = {
    namespaced: true,
    state: {
      allstampData: [],
      newStampData: {},
      typeList: []
    },
    getters: {
      getStampData: state => state.allstampData
    },
    mutations: {
      updateStamp(state, data) {
        state.allstampData = data;
      },
      insertStamp(state, data) {
        state.newStampData = data;
      },
      updateTypeList(state, data) {
        state.typeList = data;
      }
    },
    actions: {
      getAllData(context, data) {
       
      },
      addStamp(context, data) {
       
      },
      getTypeList(context, data) {
      }
    }
  };
  export default module;
  