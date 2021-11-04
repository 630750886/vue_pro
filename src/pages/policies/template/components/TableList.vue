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
        label="政策法规分类"
        width="180">
      </el-table-column>
      <el-table-column
        prop="policiesName"
        label="政策法规名称"
        show-overflow-tooltip
        width="300">
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
        prop="policiesSummary"
        show-overflow-tooltip
        label="发布机构">
      </el-table-column>
      <el-table-column
        prop="publish"
        label="发布日期">
      </el-table-column>
      <el-table-column
        prop="begindateTime"
        label="实施日期">
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
      <addtemplatedialog
        title=""
        ref="addDialogRef"
        width="30%"
        @getFormData="getAddFormData"
      ></addtemplatedialog>
      <querytemplatedialog
        title=""
        ref="queryDialogRef"
        width="35%"
        @getFormData="getqueryFormData"
      ></querytemplatedialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件

import HeadButton from "./button/HeadButton.vue";
import tableButton from "./button/TableButton.vue";
import addtemplatedialog from "./dialog/addtemplatedialog.vue"
import querytemplatedialog from "./dialog/querytemplatedialog.vue"
import pagination from "../../../../components/pagination/index.vue";
//import { createNamespacedHelpers } from "vuex";
export default {
  inject: ["reload"],
  components: {
   HeadButton,
   tableButton,
   addtemplatedialog,
   querytemplatedialog,
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
          resourcekeyid:"TYPEZ-002",
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
      this.pageShow.advancedQuery.publish=data.publish;
      this.pageShow.advancedQuery.begindateTime=data.begindateTime;
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
