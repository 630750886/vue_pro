<template>
  <div class="logContainer">
    <div class="search_container searchArea">
      <head-button @click="headBtnClick" :json_data="sjson_data"
      :json_fields="sjson_fields"></head-button>
    </div>
    <div class="table">
      <el-tabs v-model="activeName" style="margin-left: 10px;">
        <template v-for="item in projectStatus.list">
          <el-tab-pane
            :label="item.listname"
            :name="item.staticsCode"
            :key="item.keyid">
          </el-tab-pane>
        </template>
      </el-tabs>
       <table-template @handlePageInfo="getPageInfo"></table-template>
    </div>

    <div class="dialog">
      <add-item-dialog
        ref="addItemRef"
        @getFormData="submitAddForm"
        width="400px"
      ></add-item-dialog>
      <query-item-dialog
        ref="queryItemRef"
        width="60%"
        @getFormData="submitQueryForm"
      ></query-item-dialog>
      <query-info-data-dialog
        title="信息数据查询"
        ref="infoDataRef"
        width="40%"
      ></query-info-data-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import HeadButton from "./button/HeadButton.vue";

import AddItemDialog from "./dialog/AddItemDialog.vue";
import QueryItemDialog from "./dialog/QueryItemDialog.vue";
import QueryInfoDataDialog from "./dialog/QueryInfoDataDialog.vue";
import TableTemplate from "./table/TableTemplate.vue";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  inject: ["reload"],
  components: {
    HeadButton,
    AddItemDialog,
    QueryItemDialog,
    QueryInfoDataDialog,
    TableTemplate
  },
  props: {
    myData: {},
    pageTotal: { type: Number }
  },
  watch: {
    activeName(newValue) {
      this.updateActiveName(newValue);
      this.pageShow.advancedQuery = this.advancedQuery;
      this.pageShow.advancedQuery.projectStatusKeyId = newValue;
      this.networkGetItems(this.pageShow);
    },
    vuexActiveName(newValue) {
      this.activeName = newValue;
    },
    advancedQuery(newValue) {
      this.pageShow.advancedQuery = newValue;
    }
  },
  computed: {
    ...mapState({
      advancedQuery: state => state.projectConsult.advancedQuery,
      vuexActiveName: state => state.projectConsult.activeName,
      projectStatus: state => state.loadType.projectStatus
    })
  },
  //数据节点
  data() {
    return {
      activeName: "0",
      pageShow: {
        pageInfo: {
          page: 1,
          limit: 30
        },
        advancedQuery: {
          contractVocationalTypeKeyId: "402880fa74c3492d0174d45ebe360015",
          projectStatusKeyId: "0"
        }
      },
      sjson_data:[],
      sjson_fields:{
          项目编号:"projectCode",
          项目名称:"projectName",
          创建时间:"createddateTime",
          创建人:"syscreatepersonname",
          合同类型:"contractTypeName",
          合同编号:"contractCode",
          合同名称:"contractName",
          客户方名称:{
            callback: value => {
              if(value.contractbase.contractBurchaser!==""){
                return value.contractbase.contractBurchaser.concat("（第三方名称:",value.contractbase.thirdparty+"）");
              }else {
                return ""
              }

            }
          },
          "项目总投资(万元)":"contractbase.projectSum"
          ,
          专业工程分类:"projectMajorName",
          项目类型:"projectTypeName",
          工作组成员:{
            field: "groupWorks",
            callback: value => {
              let allPersonal="";
              value.forEach(element => {
                allPersonal=allPersonal+"["+"职称:"+element.projectJobName+" / "+
                  "姓名:"+element.projectPersonName+"]"
              })
              return allPersonal
            }
          },
          委托联系人:{
            field: "projectcontact",
            callback: value => {
              let dataresult="";
              value.forEach(element => {
                dataresult=dataresult+"["+"姓名:"+element.contactname+" / "+
                  "电话:"+element.contactphone+" / "+
                  "部门:"+element.contactdepartment+" / "+
                  "职务:"+element.contactpost+"]"
              })
              return dataresult
            }
          },
          成果文件:{
            callback:value => {
              return ""
            }
          },
          行政许可:{
            callback:value => {
              return ""
            }
          },
          项目归属:"projectOrgName"
        }
    };
  },
  //生命周期函数节点
  created() {
    this.networkGetItems(this.pageShow);
  },
  //自定义函数节点
  methods: {
    ...mapMutations({
      updateActiveName: "projectConsult/updateActiveName",
      updateAdvancedQuery: "projectConsult/updateAdvancedQuery",
      updateModel: "template/updateModel"
    }),
    ...mapActions({
      networkGetItems: "projectConsult/networkGetItems",
      networkAddItem: "projectConsult/networkAddItem"
    }),
    getPageInfo(pageInfo) {
      this.pageShow.pageInfo = pageInfo;
      this.networkGetItems(this.pageShow);
    },
    headBtnClick(btn, data) {
      switch (btn) {
        case 1:
          this.$refs.addItemRef.openDialog();
          break;
        case 2:
          this.$refs.queryItemRef.openDialog();
          break;
        case 3:
          this.$refs.queryItemRef.openDialog();
          break;
        case 4:
          this.$router.push({ path: "item_original" });
          break;
        case 6:
          let ref = {
            code: "402880fa74e735230174ec6ddc3e000c",
            name: "业务模块/工程咨询模块"
          };
          this.updateModel(ref);
          this.$router.push({ path: "template" });
          break;
        case 8:
          this.$refs.infoDataRef.openDialog();
          break;
        case 9:
          this.reload();
          break;
      }
    },
    submitAddForm(formData) {
      this.networkAddItem(formData);
    },
    submitQueryForm(formData) {
      formData.projectStatusKeyId = this.activeName;
      this.updateAdvancedQuery(formData);
      this.pageShow.advancedQuery = formData;
      this.networkGetItems(this.pageShow);
    }
  }
};
</script>
<style lang="less" scoped>
.el-table {
  .el-tag {
    cursor: pointer;
  }
}
</style>
