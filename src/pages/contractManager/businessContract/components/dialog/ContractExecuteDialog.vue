<template>
  <!-- 合同执行情况弹窗 -->
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :width="width"
      @close="dialogClose"
      :close-on-click-modal="false"
    >
    <div class="hdexecute">
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark">合同编号：{{form.contractInfo.contractCode}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark">合同名称：{{form.contractInfo.contractName}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark">客户名称：{{form.contractInfo.contractBurchaser}}</div></el-col>
    </el-row>


    <el-row :gutter="10">
      <el-col :span="16">
          <table>
              <tr><th colspan="5" style="background:#48ade7;color:#fff;">项目情况</th></tr>
              <tr><th>项目编号</th><th>项目名称</th><th>累计完成产值(元)</th><th>完成日期</th><th>归档日期</th></tr>
              <tr v-for="(item,index) in form.contractInfo.project_sp" :key="'tr'+index">
                <td>{{item.projectCode}}</td>
                <td>{{item.projectName}}</td>
                <td>{{item.outputValueSum}}</td>
                <td>{{item.accomplishdateTime}}</td>
                <td>{{item.placeonfiledateTime}}</td>
              </tr>
          </table>
    </el-col>
    <el-col :span="8">
        <table class="tbrigth">
            <tr><th colspan="3" class="thhead">资金情况(单位：元)</th></tr>
            <tr><td class="tdmony">合同酬金:</td><td>预估酬金</td><td>{{form.contractInfo.contractSum}}</td></tr>
            <tr><td class="tdmony">收入:</td> <td></td><td rowspan="2">收入-支出:<span style="min-width: 300px;"></span></td></tr>
            <tr><td class="tdmony">支出:</td><td></td></tr>
            <tr><td class="tdmony">开票金额:</td><td></td><td rowspan="2">应收账款:<span style="min-width: 300px;"></span></td></tr>
            <tr><td class="tdmony">回款金额:</td><td></td></tr>
            <tr><td class="tdmony" rowspan="2" >保证金:</td><td rowspan="2">{{form.contractInfo.depositsum}}</td><td>缴纳日期:{{form.contractInfo.depositdateTime}}</td></tr>
            <tr><td>退回日期:{{form.contractInfo.indepositdateTime}}</td></tr>
        </table>
      </el-col>
    </el-row>
</div>
    </el-dialog>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
export default {
  components: {},
  props: {
    title: { type: String },
    width: {
      type: String,
      default: "50%"
    }
  },
  watch: {
    contractId(newValue) {}
  },
  //数据节点
  data() {
    return {
      dialogVisible: false,
      contractId: "",
      tableData:[],
      form: {
        //合同信息
        contractInfo: {
        contractCode: "HDZX-2020-1", //合同编号
        contractName: "工程建设", //合同名称
        contractBurchaser: "高通房地产有限公司" //客户名称
        },
        //项目信息
        projectInfo: [
          {
            projectCode: "HDZX-2020-1-1", //项目编号
            projectName: "土建咨询", //项目名称
            planDays: "10", //计划天数
            workSchedule: "90%", //项目进度，计划服务总天数/已过的天数（保留整数）
            workDelayDays: "2", //工作延期
            filedDelayDays: "2", //归档延期
            filedInfo: "已归档", //档案情况，已归档/未归档
            serviceMoneyIncome: "30000", //服务费收入
            fileMoneyIncome: "500", // 文件费收入
            workTravelMoneyExpend: "750", // 项目支出
            taxesExpend: "1200" // 税金支出
          }
        ],
        //其他情况
        otherInfo: {
          invoiceSum: "3000", //开票金额
          collectInvoiceSum: "2000", //开票已收
          collectSum: "3500" //应收账款
        },
        //风险（履约）保证金情况
        bondSunInfo: {
          paymentSum: "1000", //缴纳金额
          paymentTime: "2020/05/08", //缴纳时间
          returnTime: "2020/05/30" //退回时间
        },
        tableData:[]
      },
      serviceMoneyIncomeTotal: 0,
      fileMoneyIncomeTotal: 0,
      workTravelMoneyExpendTotal: 0,
      taxesExpendTotal: 0
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    openDialog(data) {
      this.form.contractInfo=data;
      console.log(data);
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
      this.contractId = this.$options.data().contractId;
      this.form = this.$options.data().form;
      this.serviceMoneyIncomeTotal = this.$options.data().serviceMoneyIncomeTotal;
      this.fileMoneyIncomeTotal = this.$options.data().fileMoneyIncomeTotal;
      this.workTravelMoneyExpendTotal = this.$options.data().workTravelMoneyExpendTotal;
      this.taxesExpendTotal = this.$options.data().taxesExpendTotal;
    }
  }
};
</script>
<style lang="less" scoped>
.hdexecute{
  width: 98%;
  min-height: 300px;
  border-radius: 4px;
  border: 1px solid #e1e2e2;
  margin:0px;
  padding: 0px;
}

table { width: 100%; min-height: 100px; line-height: 25px; text-align: left; border-collapse: collapse; padding:2px;}
table,table tr th, table tr td { 
  background: #ffffff;
  border:1px solid #9fa0a0;
  }
th{
  color: #000;
  text-align: center;
  font-weight:30px;
  vertical-align: middle;
}
.thhead{
  background: #48ade7!important;
  width: 100%;
  min-height: 50px;
  line-height: 40px;
  font-weight: 20px;
  color: #fff;
}
.tdmony{
  min-width: 100px;
  text-align: right;
}
.el-row {
    margin-bottom: 4px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    padding: 0px;
    background: #ffffff;
    vertical-align: middle;
  }
  .bg-purple-light {
    background: #fdfdfd;
  }
  .grid-content {
    border-radius: 4px;
    min-height:25px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
