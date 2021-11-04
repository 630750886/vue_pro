<template>
  <div class="body">
    <div class="table">
      <el-table
        :data="dataList"
        align="center"
        height="7.5rem"
        highlight-current-row
        @selection-change="handleSelectionChange"
        :header-cell-style="{ fontSize: '14px' }"
        border
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column
          prop="useVehicleBeginDate"
          label="发车时间"
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
        <el-table-column
          prop="useVehicleExpenseDate"
          label="报销时间"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="250px">
          <template slot-scope="scope">
            <status-button title="审核中"></status-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog"></div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TableButton from "../button/VehicleTableButton.vue";
import TextButton from "../../../acomponents/TextButton.vue";
import StatusButton from "../../../acomponents/StatusButton.vue";
export default {
  components: {
    TableButton,
    TextButton,
    StatusButton
  },
  props: {
    dataList: {
      type: Array,
      default: () => {
        return [
          {
            name: "张三",
            kilometre: 60
          },
          {
            kilometre: 50,
            name: "张三"
          },
          {
            kilometre: 77,
            name: "张三"
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
          this.$refs.addInspection.openDialog();
          break;
        case 3:
          this.$refs.addInsurance.openDialog();
          break;
      }
    },
    //多选框
    handleSelectionChange(val) {
      let obj = {
        name: "张三",
        totalKilometre: 0,
        unitPrice: "",
        totalPrice: ""
      };
      val
        .filter(function(item, index, arr) {
          return item.kilometre > 50;
        })
        .forEach(item => {
          obj.totalKilometre += item.kilometre;
        });
      this.$emit("handleSelectionChange", obj);
    }
  }
};
</script>
<style lang="less" scoped>
.el-tag {
  cursor: pointer;
}
</style>
