import Vue from "vue";
import {getBidRecord,getBidRecordByKeyid,getBidRecordByWhere,addBidRecord,upBidRecord,delBidRecord} from "@/api/webapi-bidRecord.js";
const _this = new Vue();

let model = {
  namespaced: true,
  state: {
    activeName: "",
    pageInfo: {
      page: 1,
      limit: 30
    },
    //查询条件
    advancedQuery: {},
    //所有数据
    itemList: {
      dataList: [],
      total: 0
    },
    item: {}
  },
  getters: {
    pageShow: state => {
      return {
        pageInfo: state.pageInfo,
        advancedQuery: state.advancedQuery
      };
    }
  },
  mutations: {
    updateItems(state, data) {
      state.itemList = data;
    },
    updateItem(state, data) {
      state.item = data;
    },
    updateActiveName(state,data){
      state.activeName=data
    },
    updateadvancedQuery(state,data){
      state.advancedQuery=data
    },
  },
  actions: {
    networkGetDataList(context, pageShow) {
      getBidRecord(pageShow).then(item => {
        let ref = {
          dataList: item.data.content,
          total: item.data.totalElements
        };
        context.commit("updateActiveName", pageShow.advancedQuery.tenderstatuskeyid);
        context.commit("updateItems", ref);
      });
    },
    networkGetDataByKeyid(context, keyId) {
      getBidRecordByKeyid(keyId).then(item => {
        context.commit("updateItem",item.data[0]);
      });
    },
    networkAddData(context, formData) {
      getBidRecordByWhere({ projectname: formData.projectname }).then(item => {
        if (item.data.length <= 0) {
          addBidRecord(formData).then(item => {
            if (item.code === 200) {
              _this.$message.success(item.message);
              let pageShow = context.getters.pageShow;
              pageShow.advancedQuery.tenderstatuskeyid =
                formData.tenderstatuskeyid;
              context.dispatch("networkGetDataList", pageShow);
            }
          });
        } else {
          _this.$message.error("项目名称重复");
        }
      });
    },
    networkUpData(context, formData) {
      upBidRecord(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message);
          let pageShow = context.getters.pageShow;
          pageShow.advancedQuery.tenderstatuskeyid = formData.tenderstatuskeyid;
          context.dispatch("networkGetDataList", pageShow);
          context.commit("updateItem", item.data);
        }
      });
    },
    networkDelData(context, formData) {
      delBidRecord(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message);
          let pageShow = context.getters.pageShow;
          pageShow.advancedQuery.tenderstatuskeyid = formData.tenderstatuskeyid;
          context.dispatch("networkGetDataList", pageShow);
        }
      });
    }
  },
};
export default model;
