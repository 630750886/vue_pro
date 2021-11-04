<template>
  <div class="logContainer">
    <div class="search_container searchArea">
      <head-button @click="headBtnClick"></head-button>
    </div>
    <div class="table">
      <table-template :dataList="dataList"></table-template>
      <pagination
        :pageTotal="total"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      ></pagination>
    </div>
    <div class="dialog">
      <query-item-dialog
        ref="queryItemRef"
        width="50%"
        @getFormData="submitQueryForm"
      ></query-item-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import HeadButton from "./button/HeadButton.vue";
import TableButton from "./button/TableButton.vue";
import AddItemDialog from "./dialog/AddItemDialog.vue";
import AddWordTemplateDialog from "./dialog/AddWordTemplateDialog.vue";
import QueryItemDialog from "./dialog/QueryItemDialog.vue";
import TableTemplate from "./table/TableTemplate.vue";
import { getItemByWholeOrIntegrated } from "../../../../api/webapi-business.js";
export default {
  inject: ["reload"],
  components: {
    HeadButton,
    TableButton,
    AddItemDialog,
    AddWordTemplateDialog,
    QueryItemDialog,
    TableTemplate
  },
  props: {},
  watch: {},
  //数据节点
  data() {
    return {
      dataList: [],
      total: 0,
      pageShow: {
        pageInfo: {
          page: 1,
          limit: 30
        },
        advancedQuery: {
          contractTypeCode: "402880fa74c3492d0174d9897c370042"
        }
      }
    };
  },
  //生命周期函数节点
  created() {
    this.networkGetDataList();
  },
  //自定义函数节点
  methods: {
    networkGetDataList() {
      getItemByWholeOrIntegrated(this.pageShow).then(item => {
        this.dataList = item.data.content;
        this.total = item.data.totalElements;
      });
    },
    headBtnClick(btn, data) {
      switch (btn) {
        case 2:
          this.$refs.queryItemRef.openDialog();
          break;
        case 9:
          this.reload();
          break;
      }
    },

    handleCurrentChange(val) {
      this.pageShow.pageInfo.page = val;
      this.networkGetDataList();
    },
    handleSizeChange(val) {
      this.pageShow.pageInfo.limit = val;
      this.networkGetDataList();
    },
    submitQueryForm(formData) {
      this.pageShow.advancedQuery = formData;
      this.networkGetDataList();
    }
  }
};
</script>
<style lang="less" scoped></style>
