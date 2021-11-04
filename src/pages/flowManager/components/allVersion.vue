<template>
  <div>
    <el-table
      :data="mydata"
      style="width: 100%"
      align="left"
      :height="tableHeight"
      highlight-current-row
      :header-cell-style="{ fontSize: '14px' }"
      border
    >
      <el-table-column label="序号" type="index" align="left"></el-table-column>
      <el-table-column
        prop="Name"
        label="流程名称"
        align="left"
      ></el-table-column>
      <el-table-column
        prop="keyid"
        label="流程编号"
        align="left"
      ></el-table-column>
      <el-table-column prop="hasSetRole" label="动态角色绑定" align="left">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.hasSetRole === 0 ? 'primary' : 'success'"
            disable-transitions
            >{{ scope.row.hasSetRole == 1 ? "是" : "否" }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="jsonData" label="jsonData结构" align="left">
        <template slot-scope="scope">
          <el-popover trigger="click" placement="top">
            <p>{{ scope.row.jsonData }}</p>
            <div slot="reference">
              <el-tag size="medium">详情</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="handleClick(scope.row, scope.$index)"
            type="text"
            size="small"
            >查看环节</el-button
          >
          <!-- <el-button type="text" size="small">编辑</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "allVersion",
  data() {
    return {
      tableHeight: "650px"
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
    handleClick(row, index) {
      this.$emit("viewFlowExecute", index);
    }
  }
};
</script>
