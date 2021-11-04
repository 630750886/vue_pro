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
          prop="aignetAppDate"
          label="申请日期"
          align="center"
        ></el-table-column>
        <el-table-column prop="aignetAppName" label="名称" align="center"></el-table-column>
        <el-table-column
          prop="aignetAppDesc"
          label="使用范围"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="aignetAppAuditDate"
          label="审核完成时间"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="250px">
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
      <apply-seal-ca-lock-dialog
        title="修改申请信息"
        ref="upRef"
      ></apply-seal-ca-lock-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TableButton from "../button/SealCALockApplyTableButton.vue";
import ApplySealCaLockDialog from "../dialog/ApplySealCALockDialog.vue";

export default {
  components: {
    TableButton,
    ApplySealCaLockDialog
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
          this.$refs.upRef.openDialog();
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
