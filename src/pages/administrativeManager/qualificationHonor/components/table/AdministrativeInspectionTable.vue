<template>
  <div class="body">
    <div class="table">
      <el-table
        :data="dataList.content"
        align="left"
        height="6.8rem"
        highlight-current-row
        :header-cell-style="{ fontSize: '14px' }"
        border
      >
        <el-table-column
          prop="licenceCheckName"
          label="行政检查名称"
          fixed="left"
          width="220px"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="licenceCheckUnit" show-overflow-tooltip label="检查单位">
        </el-table-column>
        <el-table-column
            label="检查日期"
            width="155px"
        >
        <template slot-scope="scope">
         {{scope.row.begindateTime}}-{{scope.row.enddateTime}}</template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="licenceCheckNeed" width="50px" label="要求">
          <template slot-scope="scope">
            <download-button :value="scope.row.licenceCheckNeed"></download-button></template
          >
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="licenceCheckAttachFile" width="50px" label="材料" >
          <template slot-scope="scope">
            <download-button :value="scope.row.licenceCheckNeed"></download-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="licenceCheckResult"
          label="检查结果"
          width="85px"
        >
        <template slot-scope="scope">
          <table-dropdown
              :checkscope="scope.row"
              :check="0"
              @click="mychange1"
            ></table-dropdown>
      </template>
        </el-table-column>
        <el-table-column prop="licenceCheckChangeAttachFile" width="77px" label="整改资料">
          <template slot-scope="scope">
            <download-button :value="scope.row.licenceCheckChangeAttachFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="licenceCheckChangeREsult"
          label="整改结果"
          width="85px"
        >
        <template slot-scope="scope">
             <table-dropdown
              :checkscope="scope.row"
              :check="1"
              @click="mychangeREsult"
            ></table-dropdown>
          </template>
        </el-table-column>
        <el-table-column prop="lcheckDocumentFile" label="证明材料" width="75px">
          <template slot-scope="scope">
            <download-button :value="scope.row.lcheckDocumentFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column  fixed="right" label="操作" align="center" width="130px">
          <template slot-scope="scope">
            <el-button v-if="btnListIndexOf('DENG1JI')" type="primary" plain size="mini" @click="$refs.upRef.openDialog(scope.row)">登记</el-button>
            <el-button v-if="btnListIndexOf('SHAN1CHU')" type="primary" plain size="mini" @click="delInspect(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <administrative-inspection-dialog
        ref="upRef"
        @getFormData="upadmini"
      ></administrative-inspection-dialog>
    </div>
    <!--分页 -->
    <pagination
        :pageTotal="dataList.totalElements"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
    ></pagination>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TableButton from "../button/TableButton.vue";
import TableDropdown from "../button/TableDropdown.vue";
import TextButton from "../../../acomponents/TextButton.vue";
import AdministrativeInspectionDialog from "../dialog/AdministrativeInspectionDialog.vue";

import * as OrgLicenceCheck from "@/api/administration/OrgLicenceCheck.js"
export default {
  components: {
    TableDropdown,
    TableButton,
    TextButton,
    AdministrativeInspectionDialog
  },
  props: {
    dataList: {
      type: Object,
      default: () => {
        return {};
      }
    },
    pageShow:{
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {},
  //数据节点
  data() {
    return {};
  },
  //生命周期函数节点
  created() {
    console.log(this.dataList);
  },
  //自定义函数节点
  methods: {
    //删除
    delInspect(data){
      this.$confirm(`此操作将永久删除${data.licenceCheckName}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        OrgLicenceCheck.deletes_object({keyid:data.keyid}).then(res => {
          this.$emit("inspectionPageInfoChange",this.pageShow);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(err => {
          console.log(err);
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //分页
    handleCurrentChange(val) {
      this.pageShow.pageInfo.page = val;
      this.$emit("inspectionPageInfoChange", this.pageShow);
    },
    handleSizeChange(val) {
      this.pageShow.pageInfo.limit = val;
      this.$emit("inspectionPageInfoChange", this.pageShow);
    },
    upadmini(data)
    {
      OrgLicenceCheck.edits_object(data).then(item=>{
				if (item.code === 200) {
				this.$message.success("编辑检查成功!");
				}
      });
    },
    mychange1(command,data){
      console.log(data);
      this.$confirm('此操作将改变结果, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            OrgLicenceCheck.edits_object(data).then(item=>{
            if (item.code === 200) {
            this.$message.success("编辑检查成功!");
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
    },
    mychangeREsult(vcomand,data){
    this.$confirm('此操作将改变结果, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          OrgLicenceCheck.edits_object(data).then(item=>{
            if (item.code === 200) {
            this.$message.success("编辑检查成功!");
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
    },
    tableButtonClick(btn,data) {
      console.log(data);
      switch (btn) {
        case 1:
          // this.$refs.upRef.openDialog(data);
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.el-tag {
  cursor: pointer;
}
</style>
