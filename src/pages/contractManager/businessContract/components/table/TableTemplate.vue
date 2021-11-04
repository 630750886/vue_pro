<template>
  <div class="body">
    <div class="table">
      <el-table
        :data="contracts.dataList"
        style="width: 100%"
        height="6.8rem"
        border
        highlight-current-row
        :header-cell-style="{ fontSize: '14px' }"
      >
        <el-table-column
          label="状态"
          align="center"
          width="40"
          fixed="left"
        >
          <template slot-scope="scope">
            <span>
              <i v-if="checkstat('1',scope.row)"  class="el-icon-document" style="color:#409eff;font-size:20px"></i>
              <i v-if="checkstat('2',scope.row)"  class="el-icon-document" style="color:#f88e05;font-size:20px"></i>
               <el-tooltip v-if="checkstat('3',scope.row)" class="item" effect="dark" :content="scope.row.callOffTypeName+':'+scope.row.callOffDesc" placement="top-start">
                <i  class="el-icon-document" style="color:#777572;font-size:20px"></i>
              </el-tooltip>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="合同编号"
          align="left"
          width="130"
          fixed="left"
        >
          <template slot-scope="scope">
          <span style="margin-left:2px"><i v-if="checkturnoversp(scope.row)"  class="el-icon-star-on" style="color:red;font-size:14px"></i><el-button type="text" @click="tableBtnClick(5, scope.row)" >{{scope.row.contractCode }}</el-button></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="contractName"
          label="合同名称"
          align="left"
          width="320"
          fixed="left"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="createddateTime"
          label="创建时间"
          align="left"
          width="85"
        ><template slot-scope="scope">{{scope.row.createddateTime|datefmt('YYYY/MM/DD')}}</template></el-table-column>
        <el-table-column
          prop="syscreatepersonname"
          label="创建人"
          align="left"
          width="70"
        ></el-table-column>
        <el-table-column
          prop="studyOutOrgName"
          label="归属"
          align="left"
          width="100"
        ></el-table-column>
        <el-table-column
          label="客户名称"
          align="left"
          width="280"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <template v-if="scope.row.contractBurchaser !== ''">
              <el-popover trigger="click" placement="top">
                <p>第三方名称: {{ scope.row.thirdparty }}</p>
                <div slot="reference">
                  <el-tag size="medium">{{
                    scope.row.contractBurchaser.length>35?scope.row.contractBurchaser.substring(0,32)+'...':scope.row.contractBurchaser
                  }}</el-tag>
                </div>
              </el-popover>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="concludesigndateTime"
          label="签订时间"
          align="left"
          width="90px"
        ></el-table-column>
        <el-table-column
          label="客户负责人"
          align="left"
          width="100"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <template v-if="scope.row.contractBurchaserPerson !== ''">
              <el-popover trigger="click" placement="top">
                <p>电话: {{ scope.row.contractBurchaserPhone }}</p>
                <div slot="reference">
                  <el-tag size="medium">{{
                    scope.row.contractBurchaserPerson
                  }}</el-tag>
                </div>
              </el-popover>
            </template>
          </template>
        </el-table-column>
        
        <!--框架入库-->
        <template v-if="contractType=='402880fa74c3492d0174d989e5de0044'">
          <el-table-column
            label="是否有有效期"
            align="left"
            width="105px"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.isexpiryDate">
                <el-popover trigger="click" placement="top">
                  <p>{{ scope.row.expiryDate }}</p>
                  <div slot="reference">
                    <el-tag size="medium">是</el-tag>
                  </div>
                </el-popover>
              </template>
              <template v-else>
                否
              </template>
            </template>
          </el-table-column>
        </template>
        <el-table-column
          prop="contractSellerPerson"
          label="项目负责人"
          align="left"
          width="85"
        ></el-table-column>
        <!--综合业务-->
        <template v-if="(contractType=='402880fa74c3492d0174d989b38e0043'||contractType=='402880fa74c3492d0174d989e5de0044')">
          <el-table-column
            prop="contractVocationalTypeName"
            label="涉及业务"
            align="left"
            width="100px"
          ></el-table-column>
        </template>
        <!--招标代理-->
        <template v-if="contractType !='402880fa74c3492d0174d988b0cb003f'">
          <el-table-column
            prop="projectSum"
            label="项目总投资(万元)"
            align="left"
            width="120px"
          ></el-table-column>
          <el-table-column label="项目规模" align="left" width="80px">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top">
                <div style="width: 300px;min-height:200px;">
                  <p>{{scope.row.projectScale}}</p>
                </div>
                <div slot="reference">
                  <el-tag size="medium">详细</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </template>
        <!--工程监理-->
        <template v-if="contractType =='402880fa74c3492d0174d988f7670040'">
          <el-table-column
            prop="installsum"
            label="建筑安装工程费(万元)"
            align="left"
            width="150px"
          ></el-table-column>
          <el-table-column
            prop="projectAddress"
            label="工程建设地"
            align="left"
            width="200px"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="proTimeLimit"
            label="监理工期(天)"
            align="left"
            width="130px"
          ></el-table-column>
          <el-table-column
            prop="enPersonName"
            label="总监理工程师"
            align="left"
            width="130px"
          ></el-table-column>
        </template>
        <!--招标代理-->
        <template v-if="contractType=='402880fa74c3492d0174d988b0cb003f'">
          <el-table-column
            prop="projectSum"
            label="项目总投资/采购预算(万元)"
            align="left"
            width="200px"
          ></el-table-column>
          <el-table-column
            label="项目规模/采购内容"
            align="left"
            width="150px"
          >
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top">
                <div style="width:300px;min-height: 200px;">
                  <p>{{scope.row.projectScale}}</p>
                </div>
                <div slot="reference">
                  <el-tag size="medium">详细</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="收费标准" align="center" width="80px">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <div style="width:300px;min-height:200px;">
                <p>{{scope.row.projectStandard}}</p>
              </div>
              <div slot="reference">
                <el-tag size="medium">详细</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <!--造价咨询-->
        <template v-if="contractType === '402880fa74c3492d0174d98812c0003e'">
          <el-table-column label="计价标准" align="left" width="80px">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top">
                <div style="width: 300px;min-height:200px;">
                  <p>{{scope.row.castName}}</p>
                </div>
                <div slot="reference">
                  <el-tag size="medium">详细</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </template>
        <!--工程监理-->
        <template v-if="contractType === '402880fa74c3492d0174d988f7670040'">
          <el-table-column
            label="延期收费标准"
            align="left"
            width="130"
          >
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top">
                <div style="width:300px;min-height: 200px;">
                  <p>{{scope.row.deferredCharges}}</p>
                </div>
                <div slot="reference">
                  <el-tag size="medium">详细</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </template>
        <el-table-column
          prop="contractSum"
          label="合同酬金(元)"
          align="left"
          width="100px"
        ></el-table-column>
        <el-table-column
          label="是否缴纳保证金"
          align="left"
          width="110px"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.isgather">
              <el-popover trigger="click" placement="top">
                <p>缴纳金额(元)：{{ scope.row.depositsum }}</p>
                <p>缴纳时间：{{ scope.row.depositdateTime }}</p>
                <p>退回时间：{{ scope.row.indepositdateTime }}</p>
                <div slot="reference">
                  <el-tag size="medium">是</el-tag>
                </div>
              </el-popover>
            </template>
            <template v-else>
              否
            </template>
          </template>
        </el-table-column>
        <el-table-column label="原件情况" align="center" width="100px">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <div>
                <el-table :data="scope.row.turnOvers" style="width: 542px" border>
                  <el-table-column
                    prop="resourcename"
                    label="资料名称"
                    align="left"
                    width="150px"
                  ></el-table-column>
                  <el-table-column
                    prop="outOrgName"
                    label="移交组织"
                    align="left"
                    width="150px"
                  ></el-table-column>
                  <el-table-column
                    prop="outperson"
                    label="移交人"
                    align="left"
                    width="80px"
                  ></el-table-column>
                  <el-table-column
                    prop="inturnoverdate"
                    label="接收时间"
                    align="left"
                    width="100px"
                  ></el-table-column>
                  <el-table-column
                    prop="copies"
                    label="份数"
                    align="left"
                    width="60px"
                  ></el-table-column>
                </el-table>
              </div>
              <div slot="reference">
                <el-tag size="medium">详细</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="合同争议方式"
          align="left"
          width="180px"
        >
        <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <p v-if="scope.row.methodDisputeName=='仲裁委员会申请仲裁'">
                仲裁地点: {{ scope.row.disputeName }}
              </p>
              <p v-if="scope.row.methodDisputeName == '人民法院起诉'">
                法院名称: {{ scope.row.disputeName }}
              </p>
              <div slot="reference">
                <el-tag
                  v-if="scope.row.methodDisputeName!=''"
                  size="medium"
                  >{{ scope.row.methodDisputeName }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="180px"
          fixed="right"
        >
          <template slot-scope="scope">
            <table-button
              :scope="scope.row"
              @click="tableBtnClick"
            ></table-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <!--分页-->
      <pagination
        :pageTotal="contracts.total"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      >
      </pagination>
    </div>
    <div class="dialog">
      <!--合同取消登记-->
      <cancel-contract-dialog
        ref="cancelRef"
        title="合同取消登记"
        width="35%"
        @getFormData="submitCancelForm"
      ></cancel-contract-dialog>
      <!--合同移交-->
      <transfer-file-dialog
        ref="transferRef"
        title="原件移交"
        @getFormData="submitTransferForm"
      ></transfer-file-dialog>
      <!--合同确定-->
      <ok-contract-dialog
        ref="okRef"
        title="合同确定申请"
        width="30%"
        @getFormData="submitOkForm"
      ></ok-contract-dialog>
      <!--合同执行情况-->
      <contract-execute-dialog
        ref="executeRef"
        title="合同执行情况"
        width="70%"
      ></contract-execute-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TableButton from "../button/TableButton.vue";
import CancelContractDialog from "../dialog/CancelContractDialog.vue";
import OkContractDialog from "../dialog/OkContractDialog.vue";
import TransferFileDialog from "../dialog/TransferFileDialog.vue";
import ContractExecuteDialog from "../dialog/ContractExecuteDialog.vue";
import vestindialog from "../dialog/vestinDialog.vue"

import {mapMutations, mapActions } from "vuex";

export default {
  components: {
    TableButton,
    CancelContractDialog,
    OkContractDialog,
    TransferFileDialog,
    ContractExecuteDialog,
    vestindialog
  },
  props: {
    contractType: String,
    contracts:Object
  },
  //数据节点
  data() {
    return {
      pageShow: {
        page: 1,
        limit: 30
      },
      radioStatus: "0"
    };
  },
  //自定义函数节点
  methods: {
    checkturnoversp(rowd)
    {
       let checks=rowd.turnoversp[0];
       return (checks=="ok")?true:false;
    },

    checkstat(col,rowds)
    {
       switch (col)
       {
          case "1":
            return (rowds.allstatuscode=="0"||rowds.allstatuscode=="1")?true:false;
            break;
          case "2":
            return (rowds.allstatuscode=="2")?true:false;
            break;
          case "3":
            return (rowds.allstatuscode=="3")?true:false;
            break;
          default:
            return false;
       }
    },

    ...mapMutations("businessContract", {
      updateContractInfo: "updateContractInfo"
    }),
    ...mapActions({
      networkGetContactBasic: "businessContract/networkGetContactBasic",
      networkAddTransfer: "originalScript/networkAddTransfer",
      networkOkContact: "businessContract/networkOkContact",
      networkCancelContact: "businessContract/networkCancelContact"
    }),
    radioStatusChange(status) {
      this.$emit("showStatus", status);
    },
    handleCurrentChange(val) {
      this.pageShow.page = val;
      this.$emit("pageInfoChange", this.pageShow);
    },
    handleSizeChange(val) {
      this.pageShow.limit = val;
      this.$emit("pageInfoChange", this.pageShow);
    },
    tableBtnClick(btn, data) {
      switch (btn) {
        case 1:
          this.networkGetContactBasic(data.keyid);
          this.updateContractInfo(data);
          this.$router.push({ path: "/contract/business_basic_manager" });
          break;
        case 2:
          this.$refs.cancelRef.openDialog(data);
          break;
        case 3:
          this.$refs.transferRef.openDialog(data);
          break;
        case 4:
          this.$refs.okRef.openDialog(data);
          break;
        case 5:
          this.$refs.executeRef.openDialog(data);
          break;
        case 6:
          this.$refs.cancelRef.openDialog(data, false);
          break;
        case 8:
          this.$refs.vestinRef.openDialog(data);
          break;
      }
    },
    //提交取消合同表单
    submitCancelForm(formData) {
      this.networkCancelContact(formData);
    },
    //提交合同移交表单
    submitTransferForm(formData) {
      //formData.forEach(item => {
      // this.networkAddTransfer(item);
      //});
      this.networkAddTransfer(formData);
    },
    //提交确认合同圣切
    submitOkForm(formData) {
      this.$confirm("是否确定发起流程审批?","提示！",
        {confirmButtonText: "确定",cancelButtonText: "取消",type: "warning"}).then(async () => 
          {
              this.ddform("v_2020_htgl_yw_htwc", {
                c: { code: formData.contractCode, name: formData.contractName },
                moneyList: [
                  { name: "合同酬金(元)", value: formData.contractSum },
                  { name: "实际收入(元)", value: formData.officialReceipts }
                ],
                muitList: [{ name: "差异描述", value: formData.differenceDesc }]
              }).then(flowId => {
                this.networkOkContact(formData).then(item => {
                  this.ddflow(2, "", {
                    baseId: formData.keyid,
                    baseUrl: "agr/busicontractbase",
                    baseColumn: "allstatuscode",
                    flowId: flowId,
                    fType: "合同完成申请"
                  });
                });
              });
          }).catch(() => {this.$message({type: "info",message: "已取消发起流程！"});});
    }
  }
};
</script>
<style lang="less" scoped>
.el-table {
  .el-tag {
    cursor: pointer;
    color: rgb(0, 0, 0);
  }
}
</style>
