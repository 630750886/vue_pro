<template>
  <div class="body">
    <div class="table">
      <el-table
        :data="dataList"
        align="center"
        height="7.5rem"
        highlight-current-row
        :header-cell-style="{ fontSize: '14px' }"
        border
      >
        <el-table-column
          label="申请日期"
          align="center"
        ></el-table-column>
        <el-table-column
          label="申请组织"
          align="center"
        ></el-table-column>
        <el-table-column
          label="申请人"
          align="center"
        ></el-table-column>
        <el-table-column label="类型" align="center"></el-table-column>
        <el-table-column label="采购情况" align="center">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <p>采购数量：10</p>
              <p>采购单价：20</p>
              <p>采购总价：200</p>
              <div slot="reference">
                <el-tag size="medium">详细</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="供应商情况" align="center">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <p>供应商名称：李四水果批发超市</p>
              <p>供应商联系人：李四</p>
              <p>联系电话：18208972200</p>
              <div slot="reference">
                <el-tag size="medium">详细</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="费用情况" align="center">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <p>采购总价：200</p>
              <p>发票金额：200</p>
              <p>欠票金额：0</p>
              <div slot="reference">
                <el-tag size="medium">详细</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200px">
          <template slot-scope="scope">
            <table-button
              :scope="scope.row"
              @click="tableButtonClick"
            ></table-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <update-invoice-dialog
        title="补交发票"
        ref="updateRef"
      ></update-invoice-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TableButton from "../button/PurchaseTableButton.vue";
import UpdateInvoiceDialog from "../dialog/UpdateInvoiceDialog.vue";
export default {
  components: {
    TableButton,
    UpdateInvoiceDialog
  },
  props: {
    dataList: {
      type: Array,
      default: () => {
        return [
          {
            type: "新增"
          },
          {
            type: "申请"
          }
        ];
      }
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
    tableButtonClick(btn) {
      switch (btn) {
        case 1:
          this.$refs.updateRef.openDialog();
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
