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
          prop="vehicleParkingName"
          label="车位停放点"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="paymoney"
          label="车位费用/元"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="payVehicleCostTypeName"
          label="费用缴纳类型"
          align="center"
        ></el-table-column>
        <el-table-column
          label="车位使用时间"
          align="center"
        >
        <template slot-scope="scope">
          {{scope.row.stopBeginDate}}-{{scope.row.stopEndDate}}
        </template>
        </el-table-column>
        <el-table-column
          prop="payPersonName"
          label="车位缴费人"
          align="center"
        ></el-table-column>

        <el-table-column label="车位使用人情况" align="center">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <el-table :data="scope.row.useVehicleParkingLists" border>
                <el-table-column
                  prop="vehiclePerson"
                  label="车位使用人"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="vehicleCode"
                  label="车牌号"
                  align="center"
                ></el-table-column>
              </el-table>
              <div slot="reference">
                <el-tag size="medium">详细</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="100px">
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
      <stop-vehicle-place-dialog
        title="修改"
        ref="updateRef"
        @getFormData="updataplace"
      ></stop-vehicle-place-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TableButton from "../button/TableButton.vue";
import StopVehiclePlaceDialog from "../dialog/StopVehiclePlaceDialog.vue";
import * as vehicleparking from "@/api/administration/vehicleparking.js"
import * as UseVehicleParkingList from "@/api/administration/UseVehicleParkingList.js"
export default {
  components: {
    TableButton,
    StopVehiclePlaceDialog
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
    updataplace(data){
      if (data.useVehicleParkingLists.length>=1)
      {
         data.useVehicleParkingLists.forEach(element => {
           UseVehicleParkingList.adds_object(element).then(item=>{
               if (item.code !== 200) {
                   this.$message.success("有问题,请查看!");
                  }
              });
         });
      }
      vehicleparking.edits_object(data).then(item=>{
               if (item.code === 200) {
                   this.$message.success("编辑完成!");
                  }
        });
    },
    tableButtonClick(btn,data) {
      switch (btn) {
        case 1:
          this.$refs.updateRef.openDialog(data);
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
