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
          prop="createddateTime"
          label="申请时间"
          align="center"
        >
        <template slot-scope="scope">
            {{scope.row.createddateTime|datefmt('YYYY/MM/DD')}}
          </template>
        </el-table-column>
        <el-table-column
          prop="sysorgadminname"
          label="申请组织"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="syscreatepersonname"
          label="申请人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="useVehiclePerson"
          label="同行人员"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="useVehicleaddress"
          label="目的地"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="useVehicleBeginDate"
          label="发车时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="useVehicleEndDate"
          label="返回公司时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="useVehicleDesc"
          label="用车事由"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="driveName"
          label="陪同师傅"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="useVehicleRouteNum"
          label="公里数"
          align="center"
        ></el-table-column>
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
      <kilometre-register-dialog ref="kilometreRef" @getFormData="gchkil"></kilometre-register-dialog>
      <apply-reimbursement-dialog ref="applyRef"></apply-reimbursement-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TableButton from "../button/UseVehicleTableButton.vue";
import KilometreRegisterDialog from "../dialog/KilometreRegisterDialog.vue";
import ApplyReimbursementDialog from "../dialog/ApplyReimbursementDialog.vue";
 import * as UseVehicleApp from "@/api/administration/UseVehicleApp.js"

export default {
  components: {
    TableButton,
    KilometreRegisterDialog,
    ApplyReimbursementDialog
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
    gchkil(data)
    {
      UseVehicleApp.edits_object(data).then(item=>{
        if (item.code === 200) {
          this.$message.success(" 修改完成!");
        }
      });
    },
     
    tableButtonClick(btn,data) {
      switch (btn) {
        case 1:
          this.$refs.kilometreRef.openDialog(data);
          break;
        case 2:
          this.$refs.applyRef.openDialog();
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
