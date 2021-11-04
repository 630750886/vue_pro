<template>
  <div class="logContainer myborder">
    <div class="button">
      <head-button @click="headBtnClick"  :json_data="outexceldata" :json_fields="jsonfields"></head-button>
    </div>
    <div class="box-card">
      <el-table
       :data="dataList"
        style="width: 100%"
        align="left"
        height="7.5rem"
        highlight-current-row
        :header-cell-style="{ fontSize: '14px' }"
        border>
      <el-table-column
        prop="businessTypename"
        label="模板分类"
        width="180px">
      </el-table-column>
      <el-table-column
        prop="policiesName"
        label="模板名称"
        show-overflow-tooltip
        width="460px">
      </el-table-column>
      <el-table-column
        prop="createddateTime"
        label="创建日期"
        width="110px">
        <template slot-scope="scope">
        {{scope.row.createddateTime|datefmt('YYYY/MM/DD')}}
        </template>
      </el-table-column>
      <el-table-column
        label="附件">
        <template slot-scope="scope">
            <download-button :value="scope.row.policiesAllPath"></download-button>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
                    <table-button
                      :scope="scope.row"
                      @click="tableBtnClick"
                    ></table-button>
                  </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <!--分页 retirementFile--> 
      <pagination
        :pageTotal="total"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      >
      </pagination>
    </div>
    </div>
    <div>
      <addstandarddialog
        title=""
        ref="addDialogRef"
        width="25%"
        @getFormData="getAddFormData"
      ></addstandarddialog>
      <querystandarddialog
        title=""
        ref="queryDialogRef"
        width="25%"
        @getFormData="getqueryFormData"
      ></querystandarddialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件

import HeadButton from "./button/HeadButton.vue";
import tableButton from "./button/TableButton.vue";
import addstandarddialog from "./dialog/addstandarddialog.vue"
import querystandarddialog from "./dialog/querystandarddialog.vue"
import pagination from "../../../../components/pagination/index.vue";
//import { createNamespacedHelpers } from "vuex";
export default {
  inject: ["reload"],
  components: {
   HeadButton,
   tableButton,
   addstandarddialog,
   querystandarddialog,
   pagination
  },
  props: {},
  watch: {},
  computed: {
  },
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
          resourcekeyid:"TYPEZ-001",
          businessTypekeyid:"",
          policiesName:"",
          publish:[],
          begindateTime:[]
        }
      },
      outexceldata:[],
      jsonfields:{}
    };
  },
  //生命周期函数节点
  created() {
    this.getAlladvancedQuery();
  },
  //自定义函数节点
  methods: {
    headBtnClick(btnId) {
      switch (btnId) {
        case 1:
          this.$refs.addDialogRef.openDialog();
          break;
        case 2:
          this.$refs.queryDialogRef.openDialog();
          break;
        case 5:
          this.reload();
          break;
      }
    },
    tableBtnClick(btn, data) {
      this.$confirm(
        "此操作将删除相关数据,是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
           this.javaHttp("policies/policiesfileinfo/deletes",data).then(reqdata=>{
              if (reqdata.code === 200) {
                this.$message.success(reqdata.message)
                this.getAlladvancedQuery();
              } else {
                this.$message.error(reqdata.message)
              }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    
    getAddFormData(data){
       this.javaHttp("policies/policiesfileinfo/adds",data).then(reqdata=>{
              if (reqdata.code === 200) {
                this.$message.success(reqdata.message)
                this.getAlladvancedQuery();
              } else {
                this.$message.error(reqdata.message)
              }
          });
    },
    getAlladvancedQuery(){
       this.javaHttp("policies/policiesfileinfo/advancedQuery",this.pageShow).then(item=>{
          if (item.code === 200) {
                this.dataList=item.data.content;
                this.total=item.data.totalElements
              } else {
                this.$message.error(item.message)
              }
          });
    },
    getqueryFormData(data){
      this.pageShow.advancedQuery.businessTypekeyid=data.businessTypekeyid;
      this.pageShow.advancedQuery.policiesName=data.policiesName;
      this.getAlladvancedQuery();
    },
    handleCurrentChange(val) {
      this.pageShow.pageInfo.page=val
      this.getAlladvancedQuery();
      //this.$emit("getPageInfo", this.pageShow);
    },
    handleSizeChange(val) {
      this.pageShow.pageInfo.limit= val;
      this.getAlladvancedQuery();
      //this.$emit("getPageInfo", this.pageShow);
    },
  }
};
</script>
<style lang="less" scoped>
@import "../../../../style/ScrollBarExposure";
.button {
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
}

.el-tag {
  cursor: pointer;
}

.myborder{
  margin-right: 3px;
}
</style>
