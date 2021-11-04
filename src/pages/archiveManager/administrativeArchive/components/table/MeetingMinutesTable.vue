<template>
  <div class="body">
    <div class="table">
      <el-table
        :data="dataList.content"
        align="center"
        height="7.5rem"
        highlight-current-row
        :header-cell-style="{ fontSize: '14px' }"
        border
      >
        <el-table-column
          label="会议类型"
          prop="fileTypeName"
          align="center"
        ></el-table-column>
        <el-table-column
          label="会议主题"
          prop="documentName"
          align="center"
        ></el-table-column>
        <el-table-column
          label="会议编号"
          prop="documentCode"
          align="center"
        ></el-table-column>
        <el-table-column
          label="会议主办单位"
          prop="conferenceOrganizers"
          align="center"
        ></el-table-column>
        <el-table-column
          label="内容摘要"
          prop="documentDesc"
          align="center"
        ></el-table-column>
        <el-table-column
          label="参会人员"
          align="center"
        ></el-table-column>
        <el-table-column
          label="缺勤人员"
          align="center"
        ></el-table-column>
        <el-table-column
          label="会议时间"
          prop="meetingBeginDate"
          align="center"
        ></el-table-column>
        <el-table-column
          label="会议地点"
          prop="meetingAddress"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="200px">
          <template slot-scope="scope">
<!--            <table-button :scope="scope.row" @click="tableButtonClick"></table-button>-->
            <el-button type="primary" plain size="mini" @click="">档案备注</el-button>
            <el-button type="primary" plain size="mini" @click="">修改档案</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页 -->
      <pagination
          :pageTotal="dataList.totalElements"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
      ></pagination>
    </div>
    <div class="dialog"></div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
// import TableButton from "../button/TableButton.vue";

export default {
  components: {
    // TableButton
  },
  props: {
    dataList: {
      type: Object,
      default: () => {
      }
    },
    pageShow:{
      type:Object,
    }
  },
  watch: {},
  //数据节点
  data() {
    return {
      checkList: []
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    //分页
    handleCurrentChange(val) {
      this.pageShow.pageInfo.page = val;
      this.$emit("pageInfoChange", this.pageShow);
    },
    handleSizeChange(val) {
      this.pageShow.pageInfo.limit = val;
      this.$emit("pageInfoChange", this.pageShow);
    },
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
