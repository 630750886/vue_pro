<template>
  <div>
    <el-table
      :data="dataList"
      style="width: 100%"
      align="left"
      :height="tableHeight"
      highlight-current-row
      :header-cell-style="{ fontSize: '14px' }"
      border
    >
      <el-table-column
        label="序号"
        type="index"
        align="left"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="流程名称"
        align="left"
      ></el-table-column>
      <el-table-column
        prop="proCode"
        label="编号"
        align="left"
      ></el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="250">
        <template slot-scope="scope" style="margin-left:10px">
          <el-button type="text" size="small">查看版本</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "flowIndex",
  data() {
    return {
      dataList: this.mydata
    };
  },
  props: {
    mydata: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  methods: {
    getFlow() {},
    handleClick(index) {
      this.$emit("versionShow", index);
    }
  }
};
</script>
