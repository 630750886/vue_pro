<template>
  <div class="panel">
    <div class="column">
      <el-tabs v-model="activeName" @tab-click="tabsHandleClick">
        <el-tab-pane name="1">
          <span slot="label">基本信息</span>
          <basic-info></basic-info>
        </el-tab-pane>
        <el-tab-pane name="2">
          <span slot="label">审核结果</span>
          <audit-results></audit-results>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import BasicInfo from "./BasicInfo.vue";
import AuditResults from "./AuditResults.vue";

export default {
  components: {
    BasicInfo,
    AuditResults
  },
  props: {},
  watch: {},
  //数据节点
  data() {
    return {
      activeName: "1"
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    tabsHandleClick() {}
  }
};
</script>
<style lang="less" scoped>
.panel {
  display: flex;
  margin-top: 20px;
  .column {
    flex: 2;
    padding: 0 10px;
    .el-card {
      height: 650px;
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
        table {
          position: relative;
          width: 100%;
          tr {
            height: 25px;
            line-height: 25px;
            font-size: 14px;
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
  }
}
</style>
