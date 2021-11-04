<template>
  <div class="body">
    <div class="card-head">
      <el-row>
        <el-col :span="2">
          <public-button
            name="WAN2SHAN4XIN4XI"
            title="完善信息"
            @click="$refs.upRef.openDialog(dataBasic)"
          ></public-button>
        </el-col>
        <el-col :span="12">
          <div v-if="false">
            <span style="color: red"
              >提示：当前合同需要缴纳保证金，请缴纳！</span
            >金额：{{ dataBasic.depositsum }}
            <public-button
              type="text"
              name="BAO3ZHENG4JIN1JIAO3NA4SHEN1QING"
              title="缴纳申请"
              @click="clickAppplay"
            ></public-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="card-main">
      <com-showinfo
        label="value"
        :index="index"
        :data-base="dataBasic"
        :label-prop-list="infoArray"
      ></com-showinfo>
    </div>
    <!--基本信息完善-->
    <up-basic-info-dialog
      ref="upRef"
      title=""
      width="60%"
      @getFormData="submitForm"
    ></up-basic-info-dialog>
    <!--支付信息-->
    <playAppDialog
    title=""
    ref="depoRef"
    @getFormData="depApply">
    </playAppDialog>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import UpBasicInfoDialog from "./dialog/UpBasicInfoDialog.vue";
import { createNamespacedHelpers } from "vuex";
import playAppDialog from "./dialog/playAppDialog.vue";
import { startFlow } from "@/api/webapi-flow";
import {
  getProject,
  getAll,
  addCollection,
  addCollectionList,
  getTender
} from "@/api/webapi-fin.js";

const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} = createNamespacedHelpers("businessContract");
export default {
  components: {
    UpBasicInfoDialog,
    playAppDialog
  },
  props: {},
  watch: {
    dataBasic(newValue) {
      this.typesJudge(newValue.contractTypeKeyId);
    }
  },
  computed: {
    ...mapState({
      dataBasic: "contractInfo"
    })
  },
  //数据节点
  data() {
    return {
      index: 13,
      infoArray: [
        { key: "contractTypeName", value: "合同类型" },//0
        { key: "contractCode", value: "合同编号" },//1
        { key: "contractName", value: "合同名称" },//2
        { key: "contractBurchaser", value: "客户方名称" },//3
        { key: "thirdparty", value: "第三方名称" },//4
        { key: "methodDisputeName", value: "合同争议方式" },//5
        { key: "disputeName", value: "仲裁地点/法院名称" },//6
        { key: "contractBurchaserPerson", value: "客户负责人" },//7
        { key: "contractBurchaserPhone", value: "联系电话" },//8
        { key: "contractSellerPerson", value: "项目负责人" },//9
        { key: "concludesigndateTime", value: "合同签订时间" },//10
        { key: "contractallfile",value: "合同扫描件",type: "file", btns: [{ name: "下载", type: "button"}]},//11

        { key: "projectSum", value: "项目总投资(万元)" },//12
        { key: "projectScale", value: "项目规模" },//13

        { key: "projectStandard", value: "合同收费标准" },//14
        { key: "contractSumtype", value: "合同酬金类型" },//15
        { key: "contractSum", value: "合同酬金金额(元)" },//16
        { key: "officialReceipts", value: "实际收入(元)" },//17
        { key: "differenceDesc", value: "差异描述" },//18
        { key: "isgather",value: "是否需要缴纳履约（风险）保证金",type: "boolean"},//19
        { key: "depositsum", value: "缴纳金额(元)" },//20
        { key: "depositdateTime", value: "履约（风险）保证金缴纳时间" },//21
        { key: "depositfile",value: "履约（风险）保证金缴纳回执单",type: "file",btns: [{ name: "下载", type: "button" }]},//22
        { key: "indepositdateTime", value: "履约（风险）保证金退回时间" },
        { key: "indepositfile",value: "履约（风险）保证金退回电子凭证",type: "file",btns: [{ name: "下载", type: "button" }]} //23
      ]
    };
  },
  mounted() {},
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    ...mapActions({
      networkUpContact: "networkUpContact"
    }),
    typesJudge(typeName) {
      this.infoArray = this.$options.data().infoArray;
      switch (typeName) {
        case "402880fa74c3492d0174d98812c0003e": //造价咨询
          this.infoArray.push({ key: "castName", value: "计价标准" });
          break;
        case "402880fa74c3492d0174d988b0cb003f": //招标代理
          this.infoArray.splice(12, 1, {
            key: "projectSum",
            value: "项目总投资/采购预算(万元)"
          });
          this.infoArray.splice(13, 1, {
            key: "projectScale",
            value: "项目规模/采购内容"
          });
          break;
        case "402880fa74c3492d0174d988f7670040": //工程监理
          this.infoArray.push({ key: "installsum", value: "建筑安装工程费(万元)" });
          this.infoArray.push({ key: "projectAddress", value: "工程建设地" });
          this.infoArray.push({ key: "proTimeLimit", value: "工期(天)" });
          this.infoArray.push({ key: "enPersonName", value: "总监理工程师" });
          this.infoArray.push({key: "deferredCharges",value: "延期收费标准"});
          break;
        case "402880fa74c3492d0174d989e5de0044": //框架或入库
          this.infoArray.push({key: "isexpiryDate",value: "是否有有效期",type: "bol"});
          this.infoArray.push({ key: "expiryDate", value: "有效期起止时间" });
          break;
        case "402880fa74c3492d0174d989b38e0043": //综合业务
          this.infoArray.splice(1, 0, {key: "contractVocationalTypeName",value: "涉及业务"});
          break;
      }
    },
    submitForm(form) {
      this.networkUpContact(form);
    },
    clickAppplay()
    {
      this.$refs.depoRef.openDialog({applyType:'app'});
    },
    depApply(data) {
      this.$confirm("是否确定发起流程审批?","提示！",
        {confirmButtonText: "确定",cancelButtonText: "取消",type: "warning"}).then(async () => 
          {
            if(data.applyType=="app"){
              let arr = [{"name":"申请时间","controlType":"input_sign","value":""},
                {"name":"申请组织","controlType":"input_sign","value":""},
                {"name":"联系人","controlType":"input_sign","value":""},
                {"name":"支付类型","controlType":"input_sign","value":""},
                {"name":"金额(元)","controlType":"input_money","value":""},
                {"name":"代支付证明","controlType":"input_attachment","value":""},
                {"name":"支付申请表","controlType":"input_attachment","value":""}];
                let dateNow = new Date();
                arr[0].value = dateNow.Format("yyyy-MM-dd");
                arr[1].value = this.cu.orgName;
                arr[2].value = this.cu.userName;
                arr[3].value = this.collTypeShow(data.collType);
                arr[4].value = data.collMoney;
                arr[5].value =await this.getfile(data.payProveAttach);
                arr[6].value =await this.getfile(data.payApplyAttach);
                let attachmentValue = JSON.stringify(arr); //这里一定要转换成字符串
                let passa = {
                  startPerson: this.cu.dinCode,
                  versionID: "v_2020_cwgl_bzjjlsq",
                  jsonData: attachmentValue,
                };

              await startFlow(passa).then((res) => {
                  if (res.success) {
                    this.$message.success("流程发起成功");
                    data = Object.assign(data, {
                      applyId: res.msg,
                      Status:1,
                      createBy: this.cu.dinCode,
                      createBy_name: this.cu.userName,
                      createBy_orgName:this.cu.orgName
                    });
                  let pa = { jsondata: JSON.stringify(data) };
                  console.log(pa);
                addCollectionList(pa).then((res) => {
                      if (res.code == 200) {
                        this.getall();
                        this.$message.success("添加成功");
                      }
                  });
                  }
                });
              }
          }).catch(() => {this.$message({type: "info",message: "已取消发起流程！"});});
    
      }
  }
};
</script>
<style lang="less" scoped>
.body {
  .card-head {
    height: 30px;
    margin-bottom: 20px;
  }
}
</style>
