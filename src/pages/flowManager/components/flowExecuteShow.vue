<template>
  <el-dialog
    :visible.sync="isVisible"
    title="执行环节"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :modal-append-to-body="false"
    @close="closeDialog"
  >
    <div class="search_container searchArea">
      <el-button class="btn_color" size="mini" icon="view" @click="onAdd"
        >添加环节</el-button
      >

      <!-- <div class="btnRight">
        <el-button class="btn_color" size="mini" icon="view" @click="webManager()">网站管理</el-button>
      </div> -->
    </div>
    <el-table
      :data="mydata"
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
        prop="nodeName"
        label="环节名称"
        align="left"
      ></el-table-column>
      <el-table-column
        prop="userName"
        label="执行人员"
        align="left"
      ></el-table-column>

      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="handleClick(1, scope.row, scope.$index)"
            type="text"
            size="small"
            >修改</el-button
          >
          <el-button
            @click="handleClick(2, scope.row, scope.$index)"
            type="text"
            size="small"
            >删除</el-button
          >
          <!-- <el-button type="text" size="small">编辑</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="isVisible = false">关 闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "allVersion",
  data() {
    return {
      tableHeight: "350px",
      isVisible: this.isShow
    };
  },
  props: {
    mydata: {
      type: Array,
      default: () => {
        return [];
      }
    },
    isShow: {
      type: Boolean,
      default: () => {
        return false;
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    onAdd() {
      let orders = this.mydata.length + 1;
      let row = {
        versionId: "",
        nodeName: "",
        ExecuteId: "",
        orderNum: orders,
        status: 1
      };
      this.$emit("Add", row);
    },
    handleClick(btn, row, index) {
      this.$emit("modifyFlowExecute", btn, row);
    }
  }
};
</script>
<style lang="less" scoped>
.search_container {
  margin-bottom: 20px;
}
.btnRight {
  float: right;
  margin-right: 0px !important;
}
.searchArea {
  background: #e1dfdf;
  border-radius: 2px;
  padding: 18px 18px 0;
}
</style>
