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
          prop="aptitudeName"
          label="资质名称"
          fixed="left"
          show-overflow-tooltip
          width="245px"
        ></el-table-column>
        <el-table-column
          prop="aptitudeLevel"
          label="资质等级"
          show-overflow-tooltip
          width="110px"
        ></el-table-column>
        <el-table-column
          prop="aptitudeleading"
          label="技术负责人"
          show-overflow-tooltip
          width="80px"
        ></el-table-column>
        <el-table-column prop="aptitudeProfession" label="专业" show-overflow-tooltip >
        </el-table-column>
        <el-table-column prop="aptitudeOriginalAttachFile"  label="正本" width="45px" >
          <template slot-scope="scope">
            <download-button :value="scope.row.aptitudeOriginalAttachFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="aptitudeCarbonAttachFile" label="副本" width="45px" >
          <template slot-scope="scope">
            <download-button :value="scope.row.aptitudeCarbonAttachFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="aptitudeCarbonNumber" label="副本数" width="45px" >
        </el-table-column>
        <el-table-column
          label="有效期"
          width="155px"
        >
         <template slot-scope="scope">
           {{scope.row.aptitudeBeginDate}}-{{scope.row.aptitudeEndDate}}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="120px">
          <template slot-scope="scope">
            <el-button v-if="btnListIndexOf('DENG1JI')" type="primary" plain size="mini" @click="$refs.qualiRef.openDialog(scope.row)"> 登记</el-button>
            <el-button v-if="btnListIndexOf('SHAN1CHU')" type="primary" plain size="mini" @click="delAptitude(scope.row)"> 删除</el-button>
<!--            <table-button :scope="scope.row" @click="tableButtonClick"></table-button>-->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <qualification-info-dialog
        ref="qualiRef"
        @getFormData="editqualification"
      ></qualification-info-dialog>
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
import QualificationInfoDialog from "../dialog/QualificationInfoDialog.vue";
import ElPopoverTemplate from "../../../acomponents/ElPopoverTemplate.vue";
import TextButton from "../../../acomponents/TextButton.vue";

import * as OrgAptitudeInfo from "@/api/administration/OrgAptitudeInfo.js"

export default {
  components: {
    TableButton,
    QualificationInfoDialog,
    ElPopoverTemplate,
    TextButton
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
    return {
      copyManager: [
        { label: "管理人", prop: "" },
        { label: "管理数量", prop: "" }
      ]
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    //分页
    handleCurrentChange(val) {
      this.pageShow.pageInfo.page = val;
      this.$emit("aptitudePageInfoChange", this.pageShow);
    },
    handleSizeChange(val) {
      this.pageShow.pageInfo.limit = val;
      this.$emit("aptitudePageInfoChange", this.pageShow);
    },
    //删除
    delAptitude(data){
      this.$confirm(`此操作将永久删除${data.aptitudeName}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        OrgAptitudeInfo.deletes_object({keyid:data.keyid}).then(res => {
          let newPage = {
            pageInfo: {
              page: 1,
              limit: 30
            },
            advancedQuery: {

            }
          }
          this.$emit("aptitudePageInfoChange",newPage);
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
    editqualification(data)
    {
        OrgAptitudeInfo.edits_object(data).then(item=>{
                if (item.code === 200) {
                this.$message.success("修改完成!");
                this.$emit("aptitudePageInfoChange", this.pageShow);
                }
              });
    },
    tableButtonClick(btn,data) {
      switch (btn) {
        case 1:
          // this.$refs.qualiRef.openDialog(data);
          break;
        case 2:
          break;
        case 3:
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
