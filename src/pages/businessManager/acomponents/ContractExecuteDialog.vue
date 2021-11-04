<template>
  <!-- 合同执行情况弹窗 -->
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible"  v-if="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-row>
        <el-col :span="18">
          <div class="contractTable">
            <table>
              <tr>
                <th colspan="12">
                  <span>合同编号：{{form.contractInfo.contractCode}}</span>
                  <span style="margin-left: 50px">合同名称：{{form.contractInfo.contractName}}</span>
                  <span style="margin-left: 50px">客户名称：{{form.contractInfo.customerName}}</span>
                </th>
              </tr>
              <tr>
                <th colspan="7">项目情况</th>
                <th colspan="2">项目收入情况</th>
                <th colspan="3">项目支出情况</th>
              </tr>
              <tr>
                <th>项目编号</th>
                <th>项目名称</th>
                <th>计划天数</th>
                <th>工作进度</th>
                <th>工作延期天数</th>
                <th>归档延期天数</th>
                <th>档案情况</th>
                <th>服务费收入</th>
                <th>文件费收入</th>
                <th>项目支出</th>
                <th>税金支出</th>
              </tr>
              <template class="table-main" v-for="item in form.projectInfo">
                <template style="max-height: 500px">
                  <tr :key="item.keyid">
                    <td>{{item.projectCode}}</td>
                    <td>{{item.projectName}}</td>
                    <td>{{item.planDays}}</td>
                    <td>{{item.workSchedule}}</td>
                    <td>{{item.workDelayDays}}</td>
                    <td>{{item.filedDelayDays}}</td>
                    <td>{{item.filedInfo}}</td>
                    <td>{{item.serviceMoneyIncome}}</td>
                    <td>{{item.fileMoneyIncome}}</td>
                    <td>{{item.workTravelMoneyExpend}}</td>
                    <td>{{item.taxesExpend}}</td>
                  </tr>
                </template>
              </template>

              <tr>
                <td colspan="7">按合同收入</td>
                <td>{{serviceMoneyIncomeTotal}}</td>
                <td>{{fileMoneyIncomeTotal}}</td>
                <td>{{workTravelMoneyExpendTotal}}</td>
                <td>{{taxesExpendTotal}}</td>
              </tr>
              <tr>
                <td colspan="7" rowspan="2">全合同收支合计</td>
                <td colspan="2">{{serviceMoneyIncomeTotal+fileMoneyIncomeTotal}}</td>
                <td colspan="2">{{workTravelMoneyExpendTotal+taxesExpendTotal}}</td>
              </tr>
              <tr>
                <td colspan="4">{{serviceMoneyIncomeTotal+fileMoneyIncomeTotal-workTravelMoneyExpendTotal-taxesExpendTotal}}</td>
              </tr>
            </table>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="otherTable">
            <table>
              <tr>
                <th colspan="3">其他情况</th>
              </tr>
              <tr>
                <th>开票金额(元)</th>
                <th>开票已收(元)</th>
                <th>应收账款(元)</th>
              </tr>
              <tr>
                <td>{{form.otherInfo.invoiceSum}}</td>
                <td>{{form.otherInfo.collectInvoiceSum}}</td>
                <td>{{form.otherInfo.collectSum}}</td>
              </tr>
              <tr>
                <th colspan="3">风险（履约）保证金情况</th>
              </tr>
              <tr>
                <th>缴纳金额(元)</th>
                <th>缴纳时间</th>
                <th>退回时间</th>
              </tr>
              <tr>
                <td>{{form.bondSunInfo.paymentSum}}</td>
                <td>{{form.bondSunInfo.paymentTime}}</td>
                <td>{{form.bondSunInfo.returnTime}}</td>
              </tr>
            </table>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
  //import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      title: '',
      width: {
        type: String,
        default: '50%'
      }
    },
    watch: {
      contractId(newValue) {

      }
    },
    //数据节点
    data() {
      return {
        dialogVisible: false,
        contractId: '',
        form: {
          //合同信息
          contractInfo: {
            contractCode: 'HDZX-2020-1',//合同编号
            contractName: '工程建设',//合同名称
            customerName: '高通房地产有限公司',//客户名称
          },
          //项目信息
          projectInfo: [
            {
              projectCode: 'HDZX-2020-1-1',//项目编号
              projectName: '土建咨询',//项目名称
              planDays: '10',//计划天数
              workSchedule: '90%',//项目进度，计划服务总天数/已过的天数（保留整数）
              workDelayDays: '2',//工作延期
              filedDelayDays: '2',//归档延期
              filedInfo: '已归档',//档案情况，已归档/未归档
              serviceMoneyIncome: '30000',//服务费收入
              fileMoneyIncome: '500',// 文件费收入
              workTravelMoneyExpend: '750',// 项目支出
              taxesExpend: '1200',// 税金支出
            },
          ],
          //其他情况
          otherInfo: {
            invoiceSum:'3000',//开票金额
            collectInvoiceSum:'2000',//开票已收
            collectSum:'3500',//应收账款
          },
          //风险（履约）保证金情况
          bondSunInfo:{
            paymentSum:'1000',//缴纳金额
            paymentTime:'2020/05/08',//缴纳时间
            returnTime:'2020/05/30',//退回时间
          }
        },
        serviceMoneyIncomeTotal:0,
        fileMoneyIncomeTotal:0,
        workTravelMoneyExpendTotal:0,
        taxesExpendTotal:0,
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      openDialog(contractId) {
        if (contractId) {
          this.contractId = contractId
        }
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
        this.contractId=this.$options.data().contractId
        this.form=this.$options.data().form
        this.serviceMoneyIncomeTotal=this.$options.data().serviceMoneyIncomeTotal
        this.fileMoneyIncomeTotal=this.$options.data().fileMoneyIncomeTotal
        this.workTravelMoneyExpendTotal=this.$options.data().workTravelMoneyExpendTotal
        this.taxesExpendTotal=this.$options.data().taxesExpendTotal
      },
    }
  }
</script>
<style lang='less' scoped>
  div {
    display: inline-block;
    vertical-align: top;
  }

  .contractTable {
    table {
      border: 1px solid #bfcbd9;

      tr {
        height: 45px;

        th {
          border: 1px solid #bfcbd9;
          background: rgba(165, 231, 240, 0.2);
          font-size: 16px;
          text-align: center;

          &:nth-child(1) {
            width: 150px;
          }

          &:nth-child(2) {
            width: 150px;
          }
        }

        td {
          border: 1px solid #bfcbd9;
          font-size: 14px;
          text-align: center;
        }
      }
    }
  }

  .otherTable {
    table {
      border: 1px solid #bfcbd9;

      tr {
        height: 45px;

        th {
          border: 1px solid #bfcbd9;
          background: rgba(165, 231, 240, 0.2);
          font-size: 16px;
          text-align: center;

          &:nth-child(1) {
            width: 150px;
          }

          &:nth-child(2) {
            width: 150px;
          }
          &:nth-child(3) {
            width: 150px;
          }
        }

        td {
          border: 1px solid #bfcbd9;
          font-size: 14px;
          text-align: center;
        }
      }
    }
  }
</style>
