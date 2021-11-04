<template>
  <div class="body">
    <div class="card-main">
      <el-table
        :data="examineResult.dataList"
        style="width: 100%"
        align="center"
        height="330px"
        highlight-current-row
        :header-cell-style="{ fontSize: '14px' }"
        border
      >
        <el-table-column
          prop="createddateTime"
          label="申请时间"
          align="center"
          width="100"
        ><template slot-scope="scope">{{scope.row.createddateTime|datefmt('YYYY/MM/DD')}}</template></el-table-column>
        <el-table-column
          prop="rectification"
          label="整改提升措施"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="handleResults"
          label="处理结果"
          align="center"
        ></el-table-column>
        <el-table-column label="相关处理资料" align="center" width="150px">
          <template slot-scope="scope">
            <download-button :value="scope.row.handleMaterialFile"
              >下载</download-button
            >
          </template>
        </el-table-column>
        <el-table-column label="客户回访调查表" align="center" width="150px">
          <template slot-scope="scope">
            <download-button :value="scope.row.handleTableFile"
              >下载</download-button
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="approvedate"
          label="审核完成时间"
          align="center"
          width="150px"
        ></el-table-column>
        <el-table-column label="审核状态" align="center" width="150px">
          <template slot-scope="scope">
            <status-button
              code="088"
              :status="scope.row.allstatuscode"
            ></status-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import { createNamespacedHelpers } from "vuex";

const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} = createNamespacedHelpers("maintenance");
export default {
  components: {},
  props: {},
  watch: {},
  computed: {
    ...mapState({
      examineResult: "examineResult",
      registerBase: "registerBase"
    })
  },
  //数据节点
  data() {
    return {};
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {}
};
</script>
<style lang="less" scoped>
.body {
  height: 550px;
  .card-head {
    height: 30px;
    margin-bottom: 20px;
    .el-col {
      position: relative;
      height: 30px;
      line-height: 30px;
      span {
        font-size: 20px;
      }
      .el-button {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
  .card-main {
    position: relative;
    .table {
      width: 50%;
      table {
        position: relative;
        width: 100%;
        tr {
          height: 25px;
          line-height: 25px;
          font-size: 14px;
        }
      }
      &:nth-child(2) {
        position: absolute;
        top: 0;
        right: 0;
      }
    }

    .form-box {
      margin-top: 10px;
      height: 310px;
      .el-form {
        margin-bottom: 20px;
        .el-form-item {
          margin-bottom: 15px;
          .el-input {
            height: 25px;
          }
        }
      }
    }
  }
}
</style>
