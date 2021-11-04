<template>
  <div class="body">
    <div class="table">
      <el-table
        :data="dataList.content"
        align="left"
        height="6.8rem"
        highlight-current-row
        :header-cell-style="{fontSize: '13px','padding-left':'0px'}"
        border
      >
        <el-table-column
          prop="companyName"
          label="公司名称"
          width="242"
          fixed="left"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="companyTypeName"
          label="公司类型"
          show-overflow-tooltip
          width="80"
        ></el-table-column>
        <el-table-column
          prop="companyCreditCode"
          label="统一信用码"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="companyCorporate"
          label="法人"
          show-overflow-tooltip
          width="42"
        ></el-table-column>
        <el-table-column
          prop="companyBeginDate"
          width="84"
          label="成立日期"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="场所图片" width="56">
          <template slot-scope="scope">
            <download-button :value="scope.row.companyAddressFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column label="正本" width="42">
          <template slot-scope="scope">
            <download-button :value="scope.row.companyZLicenceFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column label="副本" width="42"> companyFLicenceNum
          <template slot-scope="scope">
            <download-button :value="scope.row.companyFLicenceFile"></download-button>
          </template>
        </el-table-column>
         <el-table-column label="副本数" width="48" prop="companyFLicenceNum">
        </el-table-column>
        <el-table-column label="合同" width="42">
          <template slot-scope="scope">
            <download-button :value="scope.row.contrantLicenceFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column
            label="有效期"
            width="155px"
            align="center"
        >
        <template slot-scope="scope">
           {{scope.row.contrantBeginDate}}-{{scope.row.contrantEndDate}}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="119">
          <template slot-scope="scope">
            <el-button v-if="btnListIndexOf('DENG1JI')" type="primary" plain size="mini" @click="$refs.companyInfoRef.openDialog(scope.row)">登记</el-button>
            <el-button v-if="btnListIndexOf('SHAN1CHU')" type="primary" plain size="mini" @click="delCompany(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <company-info-dialog
        ref="companyInfoRef"
        @getFormData="upcompanyinfo"
      ></company-info-dialog>
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
import CompanyInfoDialog from "../dialog/CompanyInfoDialog.vue";
import ElPopoverTemplate from "../../../acomponents/ElPopoverTemplate.vue";
import TextButton from "../../../acomponents/TextButton.vue";

import * as OrgCompany from "@/api/administration/OrgCompany.js"

export default {
  components: {
    TableButton,
    CompanyInfoDialog,
    ElPopoverTemplate,
    TextButton
  },
  props: {
    dataList: {
      type:Object,
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
    //删除
    delCompany(data){
      this.$confirm(`此操作将永久删除${data.companyName}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        OrgCompany.deletes_object({keyid:data.keyid}).then(res => {
          this.$emit("companyPageInfoChange",this.pageShow);
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
      this.$emit("companyPageInfoChange", this.pageShow);
    },
    handleSizeChange(val) {
      this.pageShow.pageInfo.limit = val;
      this.$emit("companyPageInfoChange", this.pageShow);
    },
    upcompanyinfo(data)
    {
      OrgCompany.edits_object(data).then(item=>{
				if (item.code === 200) {
				this.$message.success("编辑成功!");
				}
			});
    },
    tableButtonClick(btn,data) {
      switch (btn) {
        case 1:
          this.$refs.companyInfoRef.openDialog(data);
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
