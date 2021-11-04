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
        <el-table-column prop="documentName" label="名称" width="245" show-overflow-tooltip fixed="left"></el-table-column>
        <el-table-column prop="documentCode" label="编号" show-overflow-tooltip width="190"></el-table-column>
        <el-table-column prop="fileTypeName" label="类型" show-overflow-tooltip width="90"></el-table-column>
        <el-table-column
          prop="documentDesc"
          label="内容摘要"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="documentIssueDate"
          label="发布日期"
          width="90"
        ></el-table-column>
        <el-table-column
          prop="documentBeginDate"
          label="执行日期"
          width="90"
        ></el-table-column>
        <el-table-column prop="documentAttachFile" label="附件" width="50">
          <template slot-scope="scope">
            <download-button :value="scope.row.documentAttachFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="125px" fixed="right">
          <template slot-scope="scope">
            <el-button v-if="btnListIndexOf('DENG1JI')" type="primary" size="mini" plain @click="$refs.upRef.openDialog(scope.row)">登记</el-button>
            <el-button v-if="btnListIndexOf('SHAN1CHU')" type="primary" size="mini" plain @click="delRegulations(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <regulations-dialog title="" ref="upRef"
      @getFormData="updategz"></regulations-dialog>
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
import RegulationsDialog from "../dialog/RegulationsDialog.vue";
import TextButton from "../../../acomponents/TextButton.vue";
import * as document from "@/api/administration/DocumentInfo.js"
export default {
  components: {
    TableButton,
    RegulationsDialog,
    TextButton
  },
  props: {
    dataList: {
      type: Object,
      default: () => {
        // [
        //   {
        //     type: "新增"
        //   },
        //   {
        //     type: "申请"
        //   }
        // ]
        return {};
      }
    },
    pageShow:{
      type: Object
    }
  },
  watch: {},
  //数据节点
  data() {
    return {};
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    //分页
    handleCurrentChange(val) {
      this.pageShow.pageInfo.page = val;
      this.$emit("pageInfoChange", this.pageShow);
    },
    handleSizeChange(val) {
      this.pageShow.pageInfo.limit = val;
      this.$emit("pageInfoChange", this.pageShow);
    },
    //删除
    delRegulations(data){
      this.$confirm(`删除${data.documentName}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        document.deletes_object({keyid:data.keyid}).then(res =>{
          this.$emit("updataGo");
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(err =>{console.log(err);})

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    updategz(data)
    {
       document.edits_object(data).then(item=>{
         if (item.code === 200) {
           this.$emit("updataGo");
           this.$message.success("修改完成!");
         }
      });
    },
    tableButtonClick(btn, data) {
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
