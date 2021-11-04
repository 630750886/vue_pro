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
          label="公司名称"
          align="center"
          prop="companyName"
        ></el-table-column>
        <el-table-column
          label="公司类型"
          prop="companyTypeName"
          align="center"
        ></el-table-column>
        <el-table-column
          label="统一社会信用代码"
          prop="companyCreditCode"
          align="center"
        ></el-table-column>
        <el-table-column
          label="法定代表人/负责人"
          prop="companyCorporate"
          align="center"
        ></el-table-column>
        <el-table-column
          label="成立日期"
          prop="companyBeginDate"
          align="center"
        ></el-table-column>
        <el-table-column
          label="营业场所"
          align="center"
        ></el-table-column>
        <el-table-column label="副本情况" align="center"  prop="companyFLicenceNum">
<!--          <template slot-scope="scope">-->
<!--            <el-popover trigger="click" placement="top">-->
<!--              <p>-->
<!--                <span style="margin-right: 20px">管理人1：张三</span-->
<!--                ><span>管理数量：10</span>-->
<!--              </p>-->
<!--              <div slot="reference">-->
<!--                <el-tag size="medium">详细</el-tag>-->
<!--              </div>-->
<!--            </el-popover>-->
<!--          </template>-->

        </el-table-column>
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
      type:Object,
    },
    pageShow:{
      type: Object,
      default: () => {
        return {};
      }
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
      this.$emit("companyPageInfoChange", this.pageShow);
    },
    handleSizeChange(val) {
      this.pageShow.pageInfo.limit = val;
      this.$emit("companyPageInfoChange", this.pageShow);
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
