<template>
  <div class="logContainer">
    <div class="button">
      <head-button @click="headBtnClick" :json_data="jsondata" :json_fields="jsonfields"></head-button>
    </div>
    <div class="box-card">
      <el-tabs v-model="activeName" @tab-click="tabsHandleClick">
        <template v-for="item in tabsName">
          <el-tab-pane :name="item.keyid" :key="item.keyid" v-if="btnListIndexOf(item.urladdress)">
            <span slot="label">{{ item.listname }}</span>
          </el-tab-pane>
        </template>
      </el-tabs>
      <div class="table">
         <table-template :contract-type="activeName" :contracts="contracts" @pageInfoChange="getPageInfo"></table-template>
      </div>
    </div>
    <div class="dialog">
      <!--单合同备案-->
      <single-contract-dialog ref="singleRef" title="" width="30%" @getFormData="submitSingleForm"></single-contract-dialog>
      <!--框架或入库合同备案-->
      <frame-or-storage-contract-dialog ref="frameRef" title="" width="30%" @getFormData="submitSingleForm"></frame-or-storage-contract-dialog>
      <!--高级查询-->
      <query-dialog ref="queryRef" title="查询" @getFormData="submitQueryForm"></query-dialog>
      <echartcontract ref="echartcontract" title="统计数据显示">
      </echartcontract>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import HeadButton from "./button/HeadButton.vue";
import TableButton from "./button/TableButton.vue";
import SingleContractDialog from "./dialog/SingleContractDialog.vue";
import FrameOrStorageContractDialog from "./dialog/FrameOrStorageContractDialog.vue";
import QueryDialog from "./dialog/QueryDialog.vue";
import TableTemplate from "./table/TableTemplate.vue";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import echartcontract  from "./dialog/echart_contract.vue"
import {
  getBusContract,
  getdbc_outexcel,
  getbuscontractjson,
  getBusById,
  addBusContract,
  upBusContract
} from "@/api/webapi-contract.js";
export default {
  inject: ["reload"],
  components: {
    HeadButton,
    TableButton,
    SingleContractDialog,
    FrameOrStorageContractDialog,
    QueryDialog,
    TableTemplate,
    echartcontract
  },
  props: {
    tabsName: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  watch: {
    activeName(newValue) {
      this.session.setItem("contractType", newValue);
      this.pageShow.advancedQuery = this.advancedQuery;
      this.pageShow.advancedQuery.contractTypeKeyId = newValue;
      this.networkGetContacts();
    },
    vuexActiveName(newValue) {
      this.activeName = newValue;
    }
  },
  computed: {
    ...mapState({
      advancedQuery: state => state.businessContract.advancedQuery,
      vuexActiveName: state => state.businessContract.activeName
    })
  },
  //数据节点
  data() {
    return {
      activeName: "402880fa74c3492d0174d98785e3003d",
      contracts: {
        dataList: [],
        total: 0
      },
      pageShow: {
        pageInfo: {
          page: 1,
          limit: 30
        },
        advancedQuery: {
          allstatuscode: "",
          contractTypeKeyId:""
        }
      },
      statusList: [],
      loading: false,
      outexcelflag:0,
      jsondata:[],
      jsonfields:{},
      basejsonfields:{
        状态:{
          callback: value => {
            let checks=value.allstatuscode;
            switch (checks)
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
          callback: value => {
            let checks=value.turnoversp[0];
            return (checks=="ok")?"有":"无";
          }
        },
        合同编号:"contractCode",
        合同名称:"contractName",
        创建时间:"createddateTime",
        创建人:"syscreatepersonname",
        归属:"studyOutOrgName",
        "客户名称/第三方":{
          callback: value =>{
            return  value.contractBurchaser.concat(" 第三方名称：",value.thirdparty);
          }
        },
        签订时间:"concludesigndateTime",
        "客户负责人":{
          callback:value=>{
            return value.contractBurchaserPerson.concat(" 电话：",value.contractBurchaserPhone)
          }
        },
        项目负责人:"contractSellerPerson",
        "项目总投资(万元)":"projectSum",
        "项目规模":"projectScale",
        收费标准:"projectStandard",
        "合同酬金(元)":"contractSum",
        是否缴纳保证金:{
         callback: value => {
           if(value.isgather)
           {
             let temp="";
             let showtile=temp.concat("缴纳金额(元)：",value.depositsum,"缴纳时间：",value.depositdateTime,"退回时间：",value.indepositdateTime);
             return showtile;
           }
           else
           {
             return "否"
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
          callback: value => {
            return value.methodDisputeName.concat("仲裁地点/法院名称",value.disputeName);
          }
        }
      }
    };
  },
  //生命周期函数节点
  created() {
    this.networkGetContacts();
  },
  //自定义函数节点
  methods: {
    getjsondata()
    {
       this.jsonfieldsby(this.activeName);
       if (this.outexcelflag==0)
       {
          getdbc_outexcel({contractTypeKeyId:this.activeName}).then(item => {
                    this.jsondata=item.data;
                  }).catch((errorinfo)=>{
                    this.$message.error(errorinfo);
                  });
       }
       else
       {
          this.pageShow.advancedQuery.contractTypeKeyId = this.activeName;
          getbuscontractjson(this.pageShow).then(item => {
                    this.jsondata=item.data;
                  }).catch((errorinfo)=>{
                    this.$message.error(errorinfo);
                  });
       }
    },
    jsonfieldsby(activevalue){

      switch(activevalue) {
        case "402880fa74c3492d0174d989e5de0044": {
            //框架入库
          let formData={
          状态:{
          callback: value => {
            let checks=value.allstatuscode;
            switch (checks)
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
          }},
        原件:{
          callback: value => {
            let checks=value.turnoversp[0];
            return (checks=="ok")?"有":"无";
          }},
        合同编号:"contractCode",
        合同名称:"contractName",
        创建时间:"createddateTime",
        创建人:"syscreatepersonname",
        归属:"studyOutOrgName",
        "客户名称/第三方":{
          callback: value =>{
            return  value.contractBurchaser.concat(" 第三方名称：",value.thirdparty);
          }},
        签订时间:"concludesigndateTime",
        "客户负责人":{
          callback:value=>{
            return value.contractBurchaserPerson.concat(" 电话：",value.contractBurchaserPhone)
          }},
        项目负责人:"contractSellerPerson",
        "涉及业务":"contractVocationalTypeName",
        "项目总投资(万元)":"projectSum",
        "项目规模":"projectScale",
        收费标准:"projectStandard",
        "合同酬金(元)":"contractSum",
        是否缴纳保证金:{
         callback: value => {
           if(value.isgather)
           {
             let temp="";
             let showtile=temp.concat("缴纳金额(元)：",value.depositsum,"缴纳时间：",value.depositdateTime,"退回时间：",value.indepositdateTime);
             return showtile;
           }
           else
           {
             return "否"
           }
         }},
        "原件情况[资料名称,移交组织,移交人,接收时间,份数]":{
            field: "turnOvers",
              callback: value => {
                let dataresult="";
                value.forEach(element => {
                  dataresult=dataresult+"["+element.resourcename+" "+element.outOrgName+" "+element.outperson+" "+element.inturnoverdate+" "+element.copies+"]";
                });
                return dataresult;
              }},
        合同争议方式:{
          callback: value => {
            return value.methodDisputeName.concat("仲裁地点/法院名称",value.disputeName);
          }},
        "项目负责人":"contractSellerPerson",
        "是否有有效期":{
          callback:value=>{
               return value.isexpiryDate?value.expiryDate:"否"
          }
        }
         };
          this.jsonfields=formData;
            break;
        }
        case "402880fa74c3492d0174d988b0cb003f": {
            //招标代理
            let formData={
            状态:{
          callback: value => {
            let checks=value.allstatuscode;
            switch (checks)
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
          callback: value => {
            let checks=value.turnoversp[0];
            return (checks=="ok")?"有":"无";
          }
        },
        合同编号:"contractCode",
        合同名称:"contractName",
        创建时间:"createddateTime",
        创建人:"syscreatepersonname",
        归属:"studyOutOrgName",
        "客户名称/第三方":{
          callback: value =>{
            return  value.contractBurchaser.concat(" 第三方名称：",value.thirdparty);
          }
        },
        签订时间:"concludesigndateTime",
        "客户负责人":{
          callback:value=>{
            return value.contractBurchaserPerson.concat(" 电话：",value.contractBurchaserPhone)
          }
        },
        项目负责人:"contractSellerPerson",
        "项目总投资/采购预算(万元)":"projectSum",
        "项目规模/采购内容":"projectScale",
        收费标准:"projectStandard",
        "合同酬金(元)":"contractSum",
        是否缴纳保证金:{
         callback: value => {
           if(value.isgather)
           {
             let temp="";
             let showtile=temp.concat("缴纳金额(元)：",value.depositsum,"缴纳时间：",value.depositdateTime,"退回时间：",value.indepositdateTime);
             return showtile;
           }
           else
           {
             return "否"
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
          callback: value => {
            return value.methodDisputeName.concat("仲裁地点/法院名称",value.disputeName);
          }
        }};
          this.jsonfields=formData;
            break;
        }
         case "402880fa74c3492d0174d98812c0003e": {
            //造价咨询
            let formData={
              状态:{
          callback: value => {
            let checks=value.allstatuscode;
            switch (checks)
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
          callback: value => {
            let checks=value.turnoversp[0];
            return (checks=="ok")?"有":"无";
          }
        },
        合同编号:"contractCode",
        合同名称:"contractName",
        创建时间:"createddateTime",
        创建人:"syscreatepersonname",
        归属:"studyOutOrgName",
        "客户名称/第三方":{
          callback: value =>{
            return  value.contractBurchaser.concat(" 第三方名称：",value.thirdparty);
          }
        },
        签订时间:"concludesigndateTime",
        "客户负责人":{
          callback:value=>{
            return value.contractBurchaserPerson.concat(" 电话：",value.contractBurchaserPhone)
          }
        },
        项目负责人:"contractSellerPerson",
        "项目总投资(万元)":"projectSum",
        "项目规模":"projectScale",
        收费标准:"projectStandard",
        "计价标准":"castName",
        "合同酬金(元)":"contractSum",
        是否缴纳保证金:{
         callback: value => {
           if(value.isgather)
           {
             let temp="";
             let showtile=temp.concat("缴纳金额(元)：",value.depositsum,"缴纳时间：",value.depositdateTime,"退回时间：",value.indepositdateTime);
             return showtile;
           }
           else
           {
             return "否"
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
          callback: value => {
            return value.methodDisputeName.concat("仲裁地点/法院名称",value.disputeName);
          }
        }};
          this.jsonfields=formData;
          break;
        }
         case "402880fa74c3492d0174d988f7670040": {
            //工程监理
            let formData={
              状态:{
          callback: value => {
            let checks=value.allstatuscode;
            switch (checks)
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
          callback: value => {
            let checks=value.turnoversp[0];
            return (checks=="ok")?"有":"无";
          }
        },
        合同编号:"contractCode",
        合同名称:"contractName",
        创建时间:"createddateTime",
        创建人:"syscreatepersonname",
        归属:"studyOutOrgName",
        "客户名称/第三方":{
          callback: value =>{
            return  value.contractBurchaser.concat(" 第三方名称：",value.thirdparty);
          }
        },
        签订时间:"concludesigndateTime",
        "客户负责人":{
          callback:value=>{
            return value.contractBurchaserPerson.concat(" 电话：",value.contractBurchaserPhone)
          }
        },
        项目负责人:"contractSellerPerson",
        "项目总投资(万元)":"projectSum",
        "项目规模":"projectScale",
        "建筑安装工程费(万元)":"installsum",
        "工程建设地":"projectAddress",
        "监理工期(天)":"proTimeLimit",
        "总监理工程师":"enPersonName",
        收费标准:"projectStandard",
        "延期收费标准":"deferredCharges",
        "合同酬金(元)":"contractSum",
        是否缴纳保证金:{
         callback: value => {
           if(value.isgather)
           {
             let temp="";
             let showtile=temp.concat("缴纳金额(元)：",value.depositsum,"缴纳时间：",value.depositdateTime,"退回时间：",value.indepositdateTime);
             return showtile;
           }
           else
           {
             return "否"
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
          callback: value => {
            return value.methodDisputeName.concat("仲裁地点/法院名称",value.disputeName);
          }
        }
        };
          this.jsonfields=formData;
            break;
        }
        case "402880fa74c3492d0174d989b38e0043": {
            //综合业务
            let formData={
              状态:{
          callback: value => {
            let checks=value.allstatuscode;
            switch (checks)
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
          callback: value => {
            let checks=value.turnoversp[0];
            return (checks=="ok")?"有":"无";
          }
        },
        合同编号:"contractCode",
        合同名称:"contractName",
        创建时间:"createddateTime",
        创建人:"syscreatepersonname",
        归属:"studyOutOrgName",
        "客户名称/第三方":{
          callback: value =>{
            return  value.contractBurchaser.concat(" 第三方名称：",value.thirdparty);
          }
        },
        签订时间:"concludesigndateTime",
        "客户负责人":{
          callback:value=>{
            return value.contractBurchaserPerson.concat(" 电话：",value.contractBurchaserPhone)
          }
        },
        项目负责人:"contractSellerPerson",
        "涉及业务":"contractVocationalTypeName",
        "项目总投资(万元)":"projectSum",
        "项目规模":"projectScale",
        收费标准:"projectStandard",
        "合同酬金(元)":"contractSum",
        是否缴纳保证金:{
        callback: value => {
          if(value.isgather)
           {
             let temp="";
             let showtile=temp.concat("缴纳金额(元)：",value.depositsum,"缴纳时间：",value.depositdateTime,"退回时间：",value.indepositdateTime);
             return showtile;
           }
           else
           {
             return "否"
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
          callback: value => {
            return value.methodDisputeName.concat("仲裁地点/法院名称",value.disputeName);
          }
        }
            };
          this.jsonfields=formData;
            break;
        }
        default: {
          this.jsonfields=this.basejsonfields;
          break;
        }
      }
    },
    ...mapMutations({
      updateAdvancedQuery: "businessContract/updateAdvancedQuery",
      updateOriginalScriptType: "originalScript/updateOriginalScriptType"
    }),
    ...mapActions({
      networkAddContact: "businessContract/networkAddContact"
    }),
    networkGetContacts(){
      this.pageShow.advancedQuery.contractTypeKeyId = this.activeName;
      this.getjsondata();
      getBusContract(this.pageShow).then(item => {
              this.contracts.dataList=item.data.content;
              this.contracts.total=item.data.totalElements;
            }).catch((errorinfo)=>{
              this.$message.error(errorinfo);
            });
    },
    getdbcoutexcel()
    {
       getdbc_outexcel({contractTypeKeyId:this.activeName}).then(item => {
            if (item.code==200)
              {
                this.jsondata=item.data;
              }
            }).catch((errorinfo)=>{
              this.$message.error(errorinfo);
            });
    },
    getPageInfo(pageInfo) {
      this.pageShow.pageInfo = pageInfo;
      this.pageShow.advancedQuery = this.advancedQuery;
      this.pageShow.advancedQuery.contractTypeKeyId = this.activeName;
      this.networkGetContacts();
    },
    getStatus(status) {
      this.pageShow.advancedQuery = this.advancedQuery;
      this.pageShow.advancedQuery.allstatuscode = status;
      this.pageShow.advancedQuery.contractTypeKeyId = this.activeName;
      this.networkGetContacts();
    },
    headBtnClick(btn) {
      switch (btn) {
        case 1:
          this.$refs.singleRef.openDialog();
          break;
        case 2:
          this.$refs.frameRef.openDialog();
          break;
        case 3:
          this.$refs.queryRef.openDialog();
          break;
        case 4:
          this.$refs.echartcontract.openDialog();
          break;
        case 5:
          this.$router.push({ path: "/contract/original_script" });
          break;
        case 6:
          break;
        case 7:
          // eslint-disable-next-line no-case-declarations
          let ref = {
            code: "402880fa74e735230174ec6bbe490009",
            name: "合同模块/业务合同",
            modelName: "ht"
          };
          this.updateModel(ref);
          this.$router.push({ path: "/contract/template_manager" });
          break;
        case 8:
          break;
        case 9:
          this.reload();
          break;
      }
    },
    tabsHandleClick(tab, event) {
      let newadv={
        contractName: "",
        customerName: "",
        installsum: [],
        concludesigndateTime: [],
        isgather: "",
        isoriginal:"",
        createPerson:"",
        createOrgcode:"",
        contractCode: "",
        projectSum: [],
        contractSum: [],
        proTimeLimit: [],
        contractSellerPerson: "",
        enPersonName: "",
        allstatuscode:"",
        contractTypeKeyId:""
      };
      this.pageShow.advancedQuery=newadv;
      this.pageShow.advancedQuery.contractTypeKeyId = this.activeName;
      this.updateAdvancedQuery(this.pageShow.advancedQuery);
      this.networkGetContacts();
    },
    //提交合同表单
    submitSingleForm(formData) {
      this.networkAddContact(formData).then(item => {
        if (item) {
          this.pageShow.advancedQuery.contractTypeKeyId = this.activeName;
          this.networkGetContacts();
        }
      });
    },
    //提交查询表单
    submitQueryForm(formData) {
      this.outexcelflag=1;
      formData.contractTypeKeyId= this.activeName;
      this.updateAdvancedQuery(formData);
      this.pageShow.advancedQuery = formData;
      this.networkGetContacts();
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
