<template>
  <!--单合同备案对话框-->
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :width="width"
      @close="dialogClose"
      :close-on-click-modal="false"
    >
      <el-form
        :model="form"
        ref="formRef"
        :rules="formRules"
        label-width="150px"
      >
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="合同名称" prop="contractName+">
              <el-input v-model="form.contractName"></el-input>
            </el-form-item>
            <el-form-item
              label="项目负责人"
              prop="contractSellerPerson"
            >
              <rea-query-input
                v-model="form.contractSellerPerson"
                url="hr/basicinfo/autofindwhere"
                filter-obj="{}"
                filter-key="contextname"
              ></rea-query-input>
            </el-form-item>
            <el-form-item label="合同争议方式" prop="methodDisputeCode">
              <rea-select
                v-model="form.methodDisputeCode"
                :data="disputeType.list"
                @getLabel="
                  item => {
                    form.methodDisputeName = item;
                  }
                "
              ></rea-select>
            </el-form-item>
            <el-form-item
              v-if="
                form.methodDisputeCode === '402880fa74c3492d0174d4a94ad10039'
              "
              label="法院名称"
              prop="disputeName"
            >
              <el-input v-model="form.disputeName"></el-input>
            </el-form-item>
            <el-form-item
              v-if="
                form.methodDisputeCode === '402880fa74c3492d0174d4a90e9d0038'
              "
              label="仲裁地点"
              prop="disputeName"
            >
              <el-input v-model="form.disputeName"></el-input>
            </el-form-item>
            <el-form-item label="签订时间" prop="concludesigndateTime">
              <rea-datepicker
                v-model="form.concludesigndateTime"
              ></rea-datepicker>
            </el-form-item>
            <!--402880fa74c3492d0174d988b0cb003f 招标代理编号-->
            <template
              v-if="
                form.contractTypeKeyId !== '402880fa74c3492d0174d988b0cb003f'
              "
            >
              <el-form-item label="项目总投资(万元)" prop="projectSum">
                <rea-number-input v-model="form.projectSum"></rea-number-input>
              </el-form-item>
            </template>
            <template
              v-if="
                form.contractTypeKeyId === '402880fa74c3492d0174d988b0cb003f'
              "
            >
              <el-form-item label="总投资/采购预算(万元)" prop="projectSum">
                <rea-number-input v-model="form.projectSum"></rea-number-input>
              </el-form-item>
            </template>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户方名称" prop="contractBurchaser">
              <rea-query-input
                v-model="form.contractBurchaser"
                url="crm/consumer/autofindwhere"
                filter-obj="{}"
                filter-key="contextname"
                @getObject="
                  item => {
                    form.contractBurchaserKeyid = item.keyid;
                  }
                "
              ></rea-query-input>
            </el-form-item>
            <el-form-item
              label="客户负责人"
              prop="contractBurchaserPerson"
            >
              <el-input v-model="form.contractBurchaserPerson"></el-input>
            </el-form-item>
            <el-form-item label="负责人联系电话" prop="projectHeadPhone">
              <el-input v-model="form.contractBurchaserPhone"></el-input>
            </el-form-item>
            <el-form-item label="合同酬金(元)" prop="contractSumtype">
              <com-truefalse
                v-model="form.contractSumtype"
                true-title="固定酬金"
                false-title="预估酬金"
              ></com-truefalse>
            </el-form-item>
            <el-form-item label="金额(元)" prop="contractSum">
              <rea-number-input v-model="form.contractSum"></rea-number-input>
            </el-form-item>
          </el-col>
        </el-row>

        <rea-divider title="第三方"></rea-divider>
        <add-party-c-template
          v-model="form.thirdparty"
          :is-select-customer-name="true"
        ></add-party-c-template>
        <rea-divider></rea-divider>
        <template
          v-if="form.contractTypeKeyId !== '402880fa74c3492d0174d988b0cb003f'"
        >
          <el-form-item label="项目规模" prop="projectScale">
            <rea-textarea v-model="form.projectScale"></rea-textarea>
          </el-form-item>
        </template>
        <template
          v-if="form.contractTypeKeyId === '402880fa74c3492d0174d988b0cb003f'"
        >
          <el-form-item label="项目规模/采购内容" prop="projectScale">
            <rea-textarea v-model="form.projectScale"></rea-textarea>
          </el-form-item>
        </template>
        <el-form-item label="合同收费标准" prop="projectStandard">
          <rea-textarea v-model="form.projectStandard"></rea-textarea>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="是否需要缴纳履约（风险）保证金"
              prop="isgather"
              label-width="220px"
            >
              <com-truefalse v-model="form.isgather"></com-truefalse>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <template v-if="form.isgather">
              <el-form-item label="缴纳金额(元)" prop="depositsum">
                <rea-number-input v-model="form.depositsum"></rea-number-input>
              </el-form-item>
            </template>
          </el-col>
        </el-row>
        <!--造价咨询-->
        <template
          v-if="form.contractTypeKeyId === '402880fa74c3492d0174d98812c0003e'"
        >
          <el-form-item label="计价标准" prop="castName">
            <rea-textarea v-model="form.castName"></rea-textarea>
          </el-form-item>
        </template>
        <!--工程监理-->
        <template
          v-if="form.contractTypeKeyId === '402880fa74c3492d0174d988f7670040'"
        >
          <el-form-item label="建筑安装工程费(万元)" prop="installsum">
            <rea-number-input v-model="form.installsum"></rea-number-input>
          </el-form-item>
          <el-form-item label="工程建设地" prop="projectAddress">
            <el-input v-model="form.projectAddress"></el-input>
          </el-form-item>
          <el-form-item label="工期(天)" prop="proTimeLimit">
            <el-input v-model="form.proTimeLimit"></el-input>
          </el-form-item>
          <el-form-item label="总监理工程师" prop="enPersonName">
            <el-input v-model="form.enPersonName"></el-input>
          </el-form-item>
          <el-form-item label="延期收费标准" prop="deferredCharges">
            <rea-textarea v-model="form.deferredCharges"></rea-textarea>
          </el-form-item>
        </template>
        <!--框架或入库-->
        <template
          v-if="form.contractTypeKeyId === '402880fa74c3492d0174d989e5de0044'"
        >
          <el-form-item label="是否有有效期" prop="isexpiryDate">
            <com-truefalse v-model="form.isexpiryDate"></com-truefalse>
          </el-form-item>
          <el-form-item
            v-if="form.isexpiryDate"
            label="有效期起止时间"
            prop="expiryDate"
          >
            <rea-datescope v-model="form.expiryDate"></rea-datescope>
          </el-form-item>
        </template>
        <el-form-item label="合同扫描件" prop="contractallfile">
          <upload-button v-model="form.contractallfile"></upload-button>
        </el-form-item>
      </el-form>
      <dialog-button
        :reset-btn="false"
        :cancelBtn="{show:false}"
        :okBtn="{title:'保存'}"
        @cancelBtn="dialogClose"
        @okBtn="submitFormData"
      ></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import AddPartyCTemplate from "../../../../acomponents/AddPartyCTemplate.vue";
import { createNamespacedHelpers } from "vuex";

const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} = createNamespacedHelpers("loadType");
export default {
  components: {
    AddPartyCTemplate
  },
  props: {
    title: { type: String },
    width: {
      type: String,
      default: "50%"
    }
  },
  watch: {
    "form.expiryDate": function(newValue) {
      if (newValue.indexOf("-") !== -1) {
        let arr = newValue.split("-");
        this.form.expiryStartDate = arr[0];
        this.form.expiryEndDate = arr[1];
      }
    },
    "form.isexpiryDate": function(newValue) {
      if (!newValue) {
        this.form.expiryDate = "";
        this.form.expiryStartDate = "";
        this.form.expiryEndDate = "";
      }
    },
    "form.concludesigndateTime": function(newValue) {
      if (newValue && this.form.contractallfile !== "") {
        this.form.allstatuscode = "1";
      }
    }
  },
  computed: {
    ...mapState({
      disputeType: "disputeType"
    })
  },
  //数据节点
  data() {
    return {
      dialogVisible: false,
      thirdParty: false,
      form: {
        contractName: "",
        contractSellerPerson: "",
        methodDisputeCode: "",
        methodDisputeName: "",
        disputeName: "",
        concludesigndateTime: "",
        contractBurchaserKeyid: "",
        contractBurchaser: "",
        contractBurchaserPerson: "",
        contractBurchaserPhone: "",
        contractSumtype: "", //合同酬金类型
        thirdparty: [], //第三方
        contractSum: "",
        depositsum: "",
        projectScale: "",
        projectStandard: "",
        projectSum: "",
        costKeyid: "",
        castName: "",
        installsum: "",
        isgather: "",
        projectAddress: "",
        proTimeLimit: "",
        enPersonName: "",
        deferredCharges: "",
        isexpiryDate: "",
        expiryDate: "",
        expiryStartDate: "",
        expiryEndDate: ""
      },
      formRules: {}
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    openDialog(data) {
      if (!this.$myfunction.isEmpty(data)) {
        let ref = this.$myfunction.copyData(data);
        if (data.thirdparty.indexOf(",") !== -1) {
          ref.thirdparty = data.thirdparty.split(",");
        } else if (data.thirdparty !== "") {
          ref.thirdparty = [];
          ref.thirdparty.push(data.thirdparty);
        } else {
          ref.thirdparty = [];
        }
        this.form = ref;
      }
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
      this.resetForm();
    },
    submitFormData() {
      this.form.thirdparty = this.form.thirdparty.join(",");
      this.$emit("getFormData", this.$myfunction.copyData(this.form));
      this.dialogClose();
    },
    resetForm() {
      this.$refs.formRef.resetFields();
    }
  }
};
</script>
<style lang="less" scoped></style>
