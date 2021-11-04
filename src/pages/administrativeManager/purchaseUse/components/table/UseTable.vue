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
          label="领用日期"
          align="center"
        ><template slot-scope="scope">{{scope.row.createddateTime|datefmt('YYYY/MM/DD')}}</template></el-table-column>
        <el-table-column
          prop="sysorgadminname"
          label="领用组织"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="syscreatepersonname"
          label="领用人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="purchaseTypeName"
          label="领用物品类型"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="useAppSum"
          label="领用数量"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="appusedesc"
          label="用途说明"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="useAppAuditDate"
          label="审核完成时间"
          align="center"
        ></el-table-column>
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
    <div class="dialog"></div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TableButton from "../button/UseTableButton.vue";

export default {
  components: {
    TableButton
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
