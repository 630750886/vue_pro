<template>
  <div class="logContainer">
    <div class="search_container searchArea">
      <head-button @click="headBtnClick"></head-button>
    </div>
    <el-table
      :data="dataList"
      style="width: 100%"
      align="center"
      :height="tableHeight"
      highlight-current-row
      border
      :header-cell-style="{ fontSize: '14px' }"
    >
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="100px"
      ></el-table-column>
      <el-table-column
        label="合同名称"
        align="center"
        width="150px"
      ></el-table-column>
      <el-table-column
        label="合同编号"
        align="center"
        width="120px"
      ></el-table-column>
      <el-table-column
        label="客户名称"
        align="center"
        width="250px"
      ></el-table-column>
      <el-table-column
        label="项目总投资(万元)"
        align="center"
        width="250px"
      ></el-table-column>
      <el-table-column
        label="建筑安装工程费(万元)"
        align="center"
        width="150px"
      ></el-table-column>
      <el-table-column
        label="合同酬金金额(元)"
        align="center"
        width="250px"
      ></el-table-column>
      <el-table-column
        label="合同签订时间"
        align="center"
        width="180px"
      ></el-table-column>
      <el-table-column
        label="是否缴纳履约保证金"
        align="center"
        width="130px"
      ></el-table-column>
      <el-table-column
        label="工期(天)"
        align="center"
        width="130px"
      ></el-table-column>
      <el-table-column
        label="项目负责人"
        align="center"
        width="130px"
      ></el-table-column>
      <el-table-column
        label="总监理工程师"
        align="center"
        width="130px"
      ></el-table-column>
      <el-table-column label="操作" align="center" width="300px" fixed="right">
        <template slot-scope="scope">
          <table-button
            :user="user"
            :scope="scope.row"
            @click="tableBtnClick"
          ></table-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <pagination
      :pageTotal="total"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    >
    </pagination>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
export default {
  components: {},
  props: {
    myData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    pageTotal: {
      type: Number,
      default: 20
    },
    loadData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    myData() {
      this.dataList = this.myData;
    },
    pageTotal() {
      this.total = this.pageTotal;
    }
  },
  //数据节点
  data() {
    return {
      //数据源
      dataList: this.myData,
      //条数
      total: this.pageTotal,
      pageShow: {
        page: 1,
        limit: 30,
        filter: {}
      }
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    handleCurrentChange(val) {
      this.pageShow.page = val;
    },
    handleSizeChange(val) {
      this.pageShow.limit = val;
    },
    headBtnClick(btn) {
      switch (btn) {
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;
        case 5:
          break;
        case 6:
          break;
        case 7:
          break;
        case 8:
          break;
      }
    },
    tableBtnClick(btn) {
      switch (btn) {
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;
        case 5:
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.search_container {
  margin-bottom: 20px;
}

.logContainer {
  padding: 10px;
  background: #fff;
  box-sizing: border-box;
  height: 9.439rem;
  max-height: 9.439rem;
  overflow: hidden;
  border-radius: 6px;
  .logArea {
    overflow: auto;
    height: 100%;
  }
  .item {
    .title {
      font-size: 13px;
    }
    .time {
      color: #87de75;
    }
    .logContent {
      .logUl {
        padding-left: 30px;
        li {
          font-size: 0.162rem;
          list-style: disc;
          line-height: 0.27rem;
        }
      }
    }
  }
}

.searchArea {
  background: #e1dfdf;
  border-radius: 2px;
  padding: 18px 18px 0;
}
</style>
