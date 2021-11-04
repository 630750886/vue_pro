import { getAll, add } from "../../../api/webapi-share.js";
import { getCascaderType } from "../../../api/webapi-sys.js";
const module = {
  namespaced: true,
  state: {
    allstampData: [],
    newStampData: {},
    parentList: [
      {
        keyid: "402880fa74dd23350174e1f3ff0d0009",
        pkeyid: "0000",
        code: "TYPE-024",
        label: "投标费用",
        children: ""
      },
      {
        keyid: "402880fa74dd23350174e1f44e86000a",
        pkeyid: "0000",
        code: "TYPE-025",
        label: "业务费用",
        children: ""
      },
      {
        keyid: "402880fa74dd23350174e1f496f5000b",
        pkeyid: "0000",
        code: "TYPE-026",
        label: "部门费用",
        children: ""
      },
      {
        keyid: "402880fa74dd23350174e1f4d64e000c",
        pkeyid: "0000",
        code: "TYPE-027",
        label: "公司费用",
        children: ""
      },
      {
        keyid: "402880fa74dd23350174e1f52617000d",
        pkeyid: "0000",
        code: "TYPE-028",
        label: "刘总费用",
        children: ""
      },
      {
        keyid: "402880fa762249280176225523a60000",
        pkeyid: "0000",
        code: "TYPE-029",
        label: "陈总费用",
        children: ""
      }
    ],
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
      getAll(data).then(res => {
        context.commit("updateStamp", res.data);
      });
    },
    addStamp(context, data) {
      // console.log("进入addStamp：得到的结果为:"+JSON.stringify(data));
      add(data).then(res => {
        let pa = {
          page: 1,
          limit: 30,
          filter: {}
        };
        // context.dispatch("getAllData",pa);
        context.commit("insertStamp", res.data);
      });
    },
    getTypeList(context, data) {
      data.forEach(async item => {
        await getCascaderType({ code: item.code }).then(res => {
          item.children = res.data;
        });
        context.commit("updateTypeList", data);
      });
      // context.state.typeList.forEach(async (item)=>{
      //   await getCascaderType({code: item.code}).then(res=>{
      //        item.children=res.data;
      //      });
      // })
    }
  }
};
export default module;
