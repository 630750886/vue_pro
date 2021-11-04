<template>
  <div class="logContainer">
    <div class="button">
      <head-button @click="headBtnClick" 
        :json_data="jsondata"
        :json_fields="jsonfields"
        ></head-button>
    </div>
    <div class="box-card">
      <el-table
        :data="contracts.dataList"
        style="width: 100%"
        align="left"
        height="525px"
        highlight-current-row
        :header-cell-style="{ fontSize: '14px' }"
        border
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
                <el-tooltip v-if="checkstat('3',scope.row)" class="item" effect="dark" :content="scope.row.callofftypename+':'+scope.row.calloffdesc" placement="top-start">
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
            <span style="margin-left:2px"><i v-if="checkturnoversp(scope.row)"  class="el-icon-star-on" style="color:red;font-size:14px"></i>{{scope.row.contractCode }}</span>
            </template>
        </el-table-column>
        <el-table-column
          prop="contractName"
          label="合同名称"
          align="left"
          width="260"
          fixed="left"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="createddateTime"
          label="创建时间"
          align="left"
          width="100"
        ><template slot-scope="scope">{{scope.row.createddateTime|datefmt('YYYY/MM/DD')}}</template></el-table-column>
        <el-table-column
            prop="syscreatepersonname"
            label="创建人"
            align="left"
            width="100"
          ></el-table-column>
          <el-table-column
          prop="contractTypename"
          label="类型"
          align="left"
          width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="sysorgadminname"
          label="签订部门"
          align="left"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="协议各方情况"
          align="left"
          width="150"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <p>甲方名称: {{ scope.row.contractBurchaser }}</p>
              <p>乙方名称: {{ scope.row.contractSeller }}</p>
              <p>第三方名称: {{ scope.row.thirdparty }}</p>
              <div slot="reference">
                <el-tag size="medium">详细</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="concludesigndateTime"
          label="签订时间"
          align="left"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="isexpiryDate"
          label="是否有有效期"
          align="left"
          width="130"
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
        <el-table-column
          prop="isdeposit"
          label="是否收取保证金"
          align="left"
          width="200"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.isdeposit">
              <el-popover trigger="click" placement="top">
                <p>收取金额(元)：{{ scope.row.depositsum }}</p>
                <p>收取时间：{{ scope.row.depositdateTime }}</p>
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
        <el-table-column
          prop="isgather"
          label="是否缴纳保证金"
          align="left"
          width="200"
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
        <el-table-column label="原件情况" align="center" width="200px">
          <template slot-scope="scope">
            <el-popover :trigger="tagType" placement="top">
              <div>
                <el-table :data="scope.row.turnOvers" border>
                  <el-table-column
                    prop="resourcename"
                    label="资料名称"
                    align="left"
                    width="100px"
                  ></el-table-column>
                  <el-table-column
                    prop="outOrgName"
                    label="移交组织"
                    align="left"
                    width="100px"
                  ></el-table-column>
                  <el-table-column
                    prop="outperson"
                    label="移交人"
                    align="left"
                    width="100px"
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
                    width="100px"
                  ></el-table-column>
                </el-table>
              </div>
              <div slot="reference">
                <el-tag size="medium">详细</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="合同争议方式" align="center" width="150px">
          <template slot-scope="scope">
            <el-popover :trigger="tagType" placement="top">
              <p>法院名称/仲裁地点: {{ scope.row.disputename }}</p>
              <div slot="reference">
                <el-tag
                  v-if="!$myfunction.isEmpty(scope.row.methodofdisputename)"
                  size="medium"
                >
                  {{ scope.row.methodofdisputename }}
                </el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="115px" fixed="right">
          <template slot-scope="scope">
            <table-button
              :scope="scope.row"
              @click="tableBtnClick"
            ></table-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <pagination
        :pageTotal="contracts.total"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      >
      </pagination>
    </div>
    <div class="dialog">
        <!--合同备案-->
        <add-contract-dialog
          ref="addRef"
          title=""
          width="30%"
          @getFormData="submitAddContract"
        ></add-contract-dialog>
        <!--高级查询-->
        <query-dialog
          ref="queryRef"
          title=""
          width="45%"
          @getFormData="submitQueryForm"
        ></query-dialog>
        <!--合同取消登记-->
        <cancel-contract-dialog
          ref="cancelRef"
          title=""
          width="35%"
          @getFormData="submitCancelForm"
        ></cancel-contract-dialog>
        <!--合同移交-->
        <transfer-contract-dialog
          ref="transferRef"
          title=""
          @getFormData="submitTransferForm"
        ></transfer-contract-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import pagination from "../../../../components/pagination/index.vue";
import HeadButton from "./button/HeadButton.vue";
import TableButton from "./button/TableButton.vue";
import AddContractDialog from "./dialog/AddContractDialog.vue";
import QueryDialog from "./dialog/QueryDialog.vue";
import CancelContractDialog from "./dialog/CancelContractDialog.vue";
import TransferContractDialog from "./dialog/TransferContractDialog.vue";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import {
  getNonBusContract,
  getNonBusContractjson,
  getNonBusById,
  addNonBusContract,
  upNonBusContract,
  upBusContract
} from "@/api/webapi-contract";
export default {
  inject: ["reload"],
  components: {
    pagination,
    HeadButton,
    TableButton,
    AddContractDialog,
    QueryDialog,
    CancelContractDialog,
    TransferContractDialog
  },
  props: {},
  model: {
    prop: "model",
    event: "getPageShow"
  },
  watch: {},
  computed: {
    ...mapState({
      advancedQuery: state => state.nonBusContract.advancedQuery
    })
  },
  //数据节点
  //contracts: state => state.nonBusContract.contracts
  data() {
    return {
      tagType: "click",
      jsondata:[],
      jsonflag:0,
      contracts: {
          dataList: [],
          total: 0
        },
      pageShow: {
        pageInfo: {
          page: 1,
          limit: 30
        },
        advancedQuery: {}
      },
      jsonfields:{
         状态:{
          field:"allstatuscode",
          callback: value => {
            switch (value)
              {
                  case "0":
                  case "1":
                    return "备案";
                    break;
                  case "2":
                    return "完成";
                    break;
                  case "3":
                    return "取消";
                    break;
                  default:
                    return "无";
              }
          }
        },
        原件:{
          field: "turnoversp",
          callback:value=>{
           let checks=value[0];
          return (checks=="ok")?"有":"无";
          }
        },
        合同编号:"contractCode",
        合同名称:"contractName",
        创建时间:"createddateTime",
        创建人:"syscreatepersonname",
        类型:"contractTypename",
        签订部门:"sysorgadminname",
        "协议各方情况":{
          callback: value => {
            let resdata="甲方名称:"
            return resdata.concat(value.contractBurchaser,"乙方名称:"+value.contractSeller,"第三方名称:"+value.thirdparty)
          }
        },
        签订时间:"concludesigndateTime",
        是否有有效期:{
          field:"isexpiryDate",
          callback: value =>{
            return value?"是":"否";
          }
        },
        是否收取保证金:{
          callback: (value) => {
            let datatext="";
            if (value.isdeposit){
              datatext=datatext.concat("收取金额(元)：",value.depositsum,"收取时间：",value.depositdateTime,"退回时间：",value.indepositdateTime);
              return datatext;
            }
            else{
              return `否`;
            }
            }
        },
        是否缴纳保证金:{
          callback: (value) => {
            let datatext="";
            if (value.isgather){
              datatext=datatext.concat("缴纳金额(元)：",value.depositsum,"缴纳时间：",value.depositdateTime,"退回时间：",value.indepositdateTime);
              return datatext;
            }
            else{
              return `否`;
            }
            }
        },
        "原件情况[资料名称,移交组织,移交人,接收时间,份数]":{
          field: "turnOvers",
           callback: value => {
             let dataresult="";
                value.forEach(element => {
                  dataresult=dataresult+"["+element.resourcename+" "+element.outOrgName+" "+element.outperson+" "+element.inturnoverdate+" "+element.copies+"]";
                });
                return dataresult;
          }
        },
        合同争议方式:{
          callback: (value) => {
            let datatext="";
            datatext=datatext.concat("法院名称/仲裁地点：",value.disputename,value.methodofdisputename);
              return datatext;
            }
        }
      }
    };
  },
  //生命周期函数节点
  created() {
    this.networkGetContacts(this.pageShow);
  },
  //自定义函数节点
  methods: {
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
    getjsondata()
    {
       getNonBusContractjson(this.pageShow).then(item => {
        this.jsondata=item.data;
      });
    },
    ...mapMutations("nonBusContract", {
      updateContractInfo: "updateContractInfo"
    }),
    ...mapMutations({
      updateAdvancedQuery: "nonBusContract/updateAdvancedQuery",
      updateModel: "template/updateModel"
    }),
    ...mapActions({
      //networkGetContacts: "nonBusContract/networkGetContacts",
      networkAddContact: "nonBusContract/networkAddContact",
      networkGetContactBasic: "nonBusContract/networkGetContactBasic",
      networkUpContract: "nonBusContract/networkUpContract",
      networkCancelContact: "nonBusContract/networkCancelContact",
      networkAddTransfer: "originalScript/networkAddTransfer"
    }),
    checkturnoversp(rowd)
    {
       let checks=rowd.turnoversp[0];
       return (checks=="ok")?true:false;
    },
    networkGetContacts(pageShow){
      this.getjsondata();
      getNonBusContract(pageShow).then(item => {
        let ref = {
          dataList: item.data.content,
          total: item.data.totalElements
        };
        //context.commit("updateContracts", ref);
        this.contracts=ref;
      });
    },
    handleCurrentChange(val) {
      this.pageShow.page = val;
      this.pageShow.advancedQuery = this.advancedQuery;
      this.networkGetContacts(this.pageShow);
    },
    handleSizeChange(val) {
      this.pageShow.limit = val;
      this.pageShow.advancedQuery = this.advancedQuery;
      this.networkGetContacts(this.pageShow);
    },
    headBtnClick(btn) {
      switch (btn) {
        case 1:
          this.$refs.addRef.openDialog();
          break;
        case 2:
          this.$refs.queryRef.openDialog();
          break;
        case 3:
          this.$router.push({ path: "/contract/original_script" });
          break;
        case 5:
          let ref = {
            code: "402880fa74e735230174ec6c6f79000a",
            name: "合同模块/非业务合同",
            modelName: "ht"
          };
          this.updateModel(ref);
          this.$router.push({ path: "/contract/template_manager" });
          break;
        case 9:
          this.reload();
          break;
      }
    },
    tableBtnClick(btn, data) {
      switch (btn) {
        case 1:
          this.updateContractInfo(data);
          this.networkGetContactBasic(data.keyid);
          this.$router.push({ path: "/contract/basic_manager" });
          break;
        case 2:
          this.$refs.cancelRef.openDialog(data);
          break;
        case 3:
          this.$refs.transferRef.openDialog(data);
          break;
        case 4:
          break;
        case 6:
          this.$refs.cancelRef.openDialog(data, false);
          break;
      }
    },
    submitAddContract(data) {
      this.networkAddContact(data);
    },
    submitQueryForm(data) {
      this.updateAdvancedQuery(data);
      this.pageShow.advancedQuery = data;
      this.networkGetContacts(this.pageShow);
    },
    submitCancelForm(data) {
      this.networkCancelContact(data).then(item => {
        if (item) {
          this.networkGetContacts(this.pageShow);
        }
      });
    },
    submitTransferForm(formDataArray) {
      this.networkAddTransfer(formDataArray);
      //formDataArray.forEach(item => {
      //  this.networkAddTransfer(item);
      //});
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../../style/ScrollBarExposure";
.button {
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
}
</style>
