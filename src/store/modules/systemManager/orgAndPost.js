import Vue from "vue";
import {
  getOrgTree,
  getPost,
  getPostByOrgId,
  addOrgTree,
  upOrgTree,
  delOrgTree,
  addPost,
  delPost,
  upPost
} from "../../../api/webapi-sys.js";

const _this = new Vue();
let model = {
  namespaced: true,
  state: {
    orgTree: [],
    postList: [],
    currentOrg: {}
  },
  getters: {
    postList: state => {
      return {
        dataList: state.postList,
        total: state.postList.length
      };
    }
  },
  mutations: {
    updateOrgTree(state, data) {
      state.orgTree = data;
    },
    updatePostList(state, data) {
      state.postList = data;
    },
    updateCurrentOrg(state, data) {
      state.currentOrg = data;
    }
  },
  actions: {
    networkGetAllOrg(context) {
      getOrgTree({ keyid: "0000" }).then(item => {
        context.commit("updateOrgTree", item.data);
      });
    },
    networkGetPost(context) {
      getPost().then(item => {
        context.commit("updatePostList", item.data);
      });
    },
    networkGetPostByOrgId(context, keyid) {
      getPostByOrgId({ keyid: keyid }).then(item => {
        context.commit("updatePostList", item.data);
      });
    },
    networkSubmitAddOrg(context, formData) {
      addOrgTree(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message);
          context.dispatch("networkGetAllOrg");
        } else {
          _this.$message.error(item.message);
        }
      });
    },
    networkSubmitUpOrg(context, formData) {
      upOrgTree(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message);
          context.dispatch("networkGetAllOrg");
        } else {
          _this.$message.error(item.message);
        }
      });
    },
    networkSubmitDelOrg(context, formData) {
      delOrgTree(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message);
          context.dispatch("networkGetAllOrg");
        } else {
          _this.$message.error(item.message);
        }
      });
    },

    networkSubmitAddPos(context, formData) {
      addPost(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message);
          context.dispatch("networkGetPostByOrgId", formData.orgId);
        } else {
          this.$message.error(item.message);
        }
      });
    },
    networkSubmitDelPos(context, formData) {
      delPost(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message);
          context.dispatch("networkGetPostByOrgId", formData.orgId);
        } else {
          this.$message.error(item.message);
        }
      });
    },
    networkSubmitUpPos(context, formData) {
      upPost(formData).then(item => {
        if (item.code === 200) {
          _this.$message.success(item.message);
          context.dispatch("networkGetPostByOrgId", formData.orgId);
        } else {
          this.$message.error(item.message);
        }
      });
    }
  }
};
export default model;
