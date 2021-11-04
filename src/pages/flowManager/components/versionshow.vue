<template>
  <el-dialog
    :visible.sync="isVisible"
    title="版本管理"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :modal-append-to-body="false"
    @close="$emit('closeDialog')"
  >
    <el-table
      :data="dataList"
      style="width: 100%"
      align="center"
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
        label="版本名称"
        align="left"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        align="left"
      ></el-table-column>
      <el-table-column prop="status" label="状态" align="left">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === 1 ? 'primary' : 'success'"
            disable-transitions
            >{{ scope.row.tag == 1 ? "有效" : "无效" }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="250">
        <template slot-scope="scope" style="margin-left:10px">
          <el-button
            @click="handleClick(scope.$index)"
            type="text"
            size="small"
            v-show="scope.row.status == 1"
            >发起流程</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>
<script>
export default {
  name: "versionShow",
  data() {
    return {
      dataList: this.mydata,
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
    formatter_status(r, c) {
      let result = "无效";
      if (r.status == 1) {
        result = "有效";
      }
      return result;
    },
    handleClick(index) {
      let row = this.dataList[index];
    }
  }
};
</script>
