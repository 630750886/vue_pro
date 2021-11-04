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
          prop="purchaseTypeName"
          label="类型"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="purchaseNum"
          label="采购数量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="purchasePrice"
          label="采购单价"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="purchaseSum"
          label="采购总价"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="250">
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
      <!-- <reimbursement-dialog title="报销申请" ref="reimRef"></reimbursement-dialog>-->
      <storage-info-dialog title="修改信息" ref="upRef" @getFormData="editstorage"></storage-info-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TableButton from "../button/TableButton.vue";
import ReimbursementDialog from "../dialog/ReimbursementDialog.vue";
import StorageInfoDialog from "../dialog/StorageInfoDialog.vue";
import * as PurchasePutin from "@/api/administration/PurchasePutin.js"

export default {
  components: {
    TableButton,
    ReimbursementDialog,
    StorageInfoDialog
  },
  props: {
    dataList: {
      type: Array,
      default: () => {
        return [
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
    editstorage(data)
    {
      console.log(data);
      PurchasePutin.edits_object(data).then(item=>{
           if (item.code === 200) {
               this.$message.success("修改完成!");
               }
           });
    },
    tableButtonClick(btn,data) {
      switch (btn) {
        case 1:
          break;
        case 2:
          this.$refs.upRef.openDialog(data);
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
