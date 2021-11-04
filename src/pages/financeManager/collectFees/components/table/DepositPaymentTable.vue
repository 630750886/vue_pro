<template>
  <!--招标文件费台账-->
  <div class="body">
    <div class="table">
      <el-table
        :data="cuData"
        align="left"
        height="6.8rem"
        highlight-current-row
        :header-cell-style="{ fontSize: '14px' }"
        :default-sort="{ prop: 'createTime', order: 'descending' }"
        border
      >
        <el-table-column
          prop="createTime"
          label="创建时间"
        ></el-table-column>
        <el-table-column
          prop="createBy_orgName"
          label="创建组织"
        ></el-table-column>
        <el-table-column
          prop="createBy_name"
          label="创建人"
        ></el-table-column>
        <el-table-column
          prop="applyId"
          label="类型"
          :formatter="showApply"
        ></el-table-column>
        <el-table-column
          prop="collType"
          label="支付类型"
          :formatter="collTypeShow"
        ></el-table-column>
        <el-table-column
          prop="collMoney"
          label="支付金额(元)"
        ></el-table-column>
        <el-table-column
          prop="orgname"
          label="所属组织"
        ></el-table-column>
        <el-table-column
          prop="contractId"
          label="编号"
        ></el-table-column>
        <el-table-column
          prop="contract_name"
          label="名称"
          show-overflow-tooltip
        ></el-table-column>
        <!-- <el-table-column
          prop="projectId"
          label="项目编号"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="project_name"
          label="项目名称"
          align="left"
        ></el-table-column> -->
        <el-table-column
          prop="payDate"
          label="支付时间"
        ></el-table-column>
        <el-table-column label="支付回执单" align="left">
          <template slot-scope="scope">
            <download-button
              :value="scope.row.payApplyReturnAttach"
            ></download-button>
          </template>
        </el-table-column>
        <!-- <el-table-column label="支付信息" align="left">
          <template slot-scope="scope">
            <el-popover placement="right" width="300" trigger="click">
              <table>
                <tr>
                  <td>保证金收款账户名：</td>
                  <td>{{ scope.row.bankAccout }}</td>
                </tr>

                <tr>
                  <td>保证金收款账户开户行：</td>
                  <td>{{ scope.row.bank }}</td>
                </tr>

                <tr>
                  <td>保证金收款账户号：</td>
                  <td>{{ scope.row.bankAccoutId }}</td>
                </tr>
              </table>

              <el-button slot="reference" type="text">详细</el-button>
            </el-popover>
          </template>


          <download-button :value="scope.payApplyAttach"
              >下载申请表</download-button>


        </el-table-column> -->
        <!-- <el-table-column label="缴纳时间" align="center"></el-table-column> -->

        <el-table-column label="操作" align="center" width="180px">
          <template slot-scope="scope">
          <tab-button :scope="scope" @click="tabClick"></tab-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination
      :pageTotal="dataList.length"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    ></pagination>
    <div class="dialog">
      <deposit-complate-new-dialog
        title=""
        lable="支付登记"
        ref="upRef"
        @getFormData="complateData"
      ></deposit-complate-new-dialog>
      <!-- <deposit-complate-dialog
        title="完善信息"
        ref="upRef"
        @getFormData="complateData"
      ></deposit-complate-dialog> -->
      <!-- <deposit-complate-dialog-new
        title="完善信息"
        ref="upRef"
        @getFormData="complateData" ></deposit-complate-dialog-new> -->
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import DepositComplateDialog from "../dialog/DepositComplateDialog.vue";
import DepositComplateNewDialog from "../dialog/DepositComplateDialog_new.vue";
import { updateCollectionList } from "../../../../../api/webapi-fin.js";
import UploadDialog from "../../../../../components/upload/UploadDialog.vue";
import pagination from "@c/pagination/index.vue";
import tabButton from "../button/DepositTableButton.vue"
export default {
  components: {
    DepositComplateDialog,
    DepositComplateNewDialog,
    UploadDialog,
    DepositComplateNewDialog,
    pagination,
    tabButton
  },
  props: {
    dataList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },

  // 数据节点
  data() {
    return {
      currentRow: "",
      pageShow: { page: 1, limit: 30 }
    };
  },
  computed: {
    cuData() {
      return this.$myfunction.getPageData(this.dataList, this.pageShow);
    }
  },
  // 生命周期函数节点
  created() {},
  // 自定义函数节点
  methods: {
    tabClick(btn,data){
      switch (btn) {
        case 1:
          this.delRow(data);
          break;
          case 2:
            this.tableButtonClick(data);
            break;
            case 3:
              break;      
       
      }
    },
    handleCurrentChange(val) {
      this.pageShow = Object.assign(this.pageShow, { page: val });
    },
    // 点击页数
    handleSizeChange(val) {
      this.pageShow = Object.assign(this.pageShow, { limit: val });
    },
    showApply(row, col) {
      let result = "申请";
      if (!row.applyId) {
        result = "登记";
      }
      return result;
    },
    tableButtonClick(data) {
      this.currentRow = data;
      this.$refs.upRef.openDialog(data);
    },
    delRow(data) {
      this.currentRow = data;
      this.$confirm("此操作将删除相关的所有数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          data.delSign = 1;
          const pa = { jsondata: JSON.stringify(data) };
          updateCollectionList(pa).then((res) => {
            if (res.code == 200) {
              this.$message.success("删除成功");
              this.$parent.$parent.$parent.getall();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    complateData(data) {
      // console.log(data);
      data = Object.assign(this.currentRow, data);
      const pa = { jsondata: JSON.stringify(data) };
      updateCollectionList(pa).then((res) => {
        if (res.code == 200) {
          this.$message.success("收款明细缴纳信息完善成功");
          this.$parent.$parent.$parent.getall();
        }
      });
    },
    collTypeShow(row, col) {
      let result = "其它往来款";
      switch (row.collType) {
        case "6":
          result = "投标保证金";
          break;
        case "5":
          result = "风险（履约）保证金";
          break;
      }
      return result;
    }
  }
};
</script>
<style lang="less" scoped></style>
