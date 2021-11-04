<template>
  <!--招标文件费台账-->
  <div class="body">
    <el-button type="text" @click="test">aaaaaaa</el-button>
    <div class="table">
      <el-table
        :data="dataList"
        align="left"
        height="7.5rem"
        highlight-current-row
        :header-cell-style="{ fontSize: '14px' }"
        :default-sort = "{prop: 'createTime', order: 'descending'}"
        border
      >
        <el-table-column
          prop="createTime"
          label="申请时间"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="orgname"
          label="申请组织"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="createBy_name"
          label="申请人"
          align="left"
        ></el-table-column>

        <el-table-column
          prop="collType"
          label="缴纳类型"
          align="left"
          :formatter="collTypeShow"
        ></el-table-column>
        <!-- <el-table-column
          label="所属组织"
          align="center"
        ></el-table-column> -->
        <el-table-column
          prop="contractId"
          label="合同编号"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="contract_name"
          label="合同名称"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="projectId"
          label="项目编号"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="project_name"
          label="项目名称"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="collMoney"
          label="缴纳金额(元)"
          align="left"
        ></el-table-column>
        <el-table-column label="缴纳信息" align="left">
          <template slot-scope="scope">
            <el-popover placement="right" width="300" trigger="click">
              <table>
                <tr>
                  <td>保证金收款账户名：</td>
                  <td>{{ scope.row.bankAccout }}</td>
                </tr>

                <tr>
                  <td>保证金收款账户开户行：</td>
                  <td>{{ scope.row.bank }}</td>
                </tr>

                <tr>
                  <td>保证金收款账户号：</td>
                  <td>{{ scope.row.bankAccoutId }}</td>
                </tr>
              </table>

              <el-button slot="reference" type="text">详细</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <!-- <el-table-column label="缴纳时间" align="center"></el-table-column> -->
        <el-table-column label="缴纳回执单" align="left">
          <el-button type="text">下载</el-button>
        </el-table-column>
        <el-table-column label="操作" align="left" width="150px">
          <template slot-scope="scope">
            <el-button type="text" @click="$refs.upRef.openDialog(scope.row)"
              >完善信息</el-button
            >
            <el-button type="text">下载申请表</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <!-- <deposit-complate-dialog
        title="完善信息"
        ref="upRef"
        @getFormData="complateData"        
      ></deposit-complate-dialog> -->
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
//import DepositComplateDialog from "../dialog/DepositComplateDialog.vue";
export default {
  components: {
    // DepositComplateDialog,
  },
  props: {
    dataList: []
  },
  watch: {},
  //数据节点
  data() {
    return {
      // dataList: [
      //   {
      //     info: { name: "小张", username: "2654665884", userbank: "中国银行" },
      //   },
      // ],
    };
  },
  mounted() {
    console.log("-------------------tettt--------------");
    console.log(this.dataList);
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    test() {
      console.log("-------------------tettt--------------");
      console.log(this.dataList);
    },
    showApply(row, col) {
      let result = "申请";
      if (!row.applyId) {
        result = "登记";
      }
      return result;
    },
    complateData(data) {
      console.log(data);
    },
    collTypeShow(row, col) {
      let result = "风险（履约）保证金";
      if (row.collType == 6) {
        result = "投标保证金";
      }
      return result;
    }
  }
};
</script>
<style lang="less" scoped></style>
