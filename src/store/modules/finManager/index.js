
import {
  getAll,
  addCollection,
  delCollection
} from "../../../api/webapi-fin.js";
const module = {
  namespaced: true,
  state: {
    dataList: { collectionData: [], account: [], bid: [], payment: [] }

  },
  getters: {
    getData: state => state.dataList
  },
  mutations: {
    updateCollection(state, data) {
      state.dataList.collectionData = data;
    }
  },
  actions: {
    getAllData(context, data) {
      getAll(data).then(res => {
        context.commit("updateCollection", res.data);
      })
    },
    networkAddCollection(context, data) {
      addCollection(data).then(res => {
        let pa = {
          page: 1,
          limit: 30,
          filter: {}
        };
        context.dispatch("getAllData", pa);
      })
    },
    networkDelCollection(context, data) {
      delCollection(data).then(res => {
        let pa = {
          page: 1,
          limit: 30,
          filter: {}
        };
        context.dispatch("getAllData", pa);
      })
    }
  }
}
export default module;