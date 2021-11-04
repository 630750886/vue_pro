<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="updateDialogVisible"
      :width="dialogWidth"
      @close="dialogClose"
      :close-on-click-modal="false"
    >
      <el-form
        :model="form"
        ref="formRef"
        :rules="formRules"
        label-width="2.697rem"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="personName">
              <el-input v-model="form.personName"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <com-truefalse
                v-model="form.gender"
                true-title="男"
                false-title="女"
              ></com-truefalse>
            </el-form-item>
            <el-form-item label="身份证号" prop="idCard">
              <el-input v-model="form.idCard" clearable></el-input>
            </el-form-item>
            <el-form-item label="身份证上住址" prop="idCardAddress">
              <el-input v-model="form.idCardAddress"></el-input>
            </el-form-item>
            <el-form-item label="家庭住址" prop="familyAddress">
              <el-input v-model="form.familyAddress"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="紧急联系人" prop="emergencyPerson">
              <el-input v-model="form.emergencyPerson"></el-input>
            </el-form-item>
            <el-form-item label="紧急联系人电话" prop="emergencyPhone">
              <el-input v-model="form.emergencyPhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上传体检征明" prop="bodyInspectFile">
              <upload-button
                v-model="form.bodyInspectFile"
                :data="{
                  documentTypeName: '人事档案',
                  documentTypeListName: '体检征明',
                  entityKeyid: form.keyid
                }"
              ></upload-button>
            </el-form-item>
            <el-form-item label="上传无行为犯罪记录" prop="criminalRecordFile">
              <upload-button
                v-model="form.criminalRecordFile"
                :data="{
                  documentTypeName: '人事档案',
                  documentTypeListName: '无行为犯罪记录',
                  entityKeyid: form.keyid
                }"
              ></upload-button>
            </el-form-item>
            <el-form-item label="上传银行个人征信" prop="bankCreditFile">
              <upload-button
                v-model="form.bankCreditFile"
                :data="{
                  documentTypeName: '人事档案',
                  documentTypeListName: '银行个人征信',
                  entityKeyid: form.keyid
                }"
              ></upload-button>
            </el-form-item>
             <el-form-item label="人员分类" prop="personTypeCode">
              <rea-select
                v-model="form.personTypeCode"
                :data="personType.list"
                @getLabel="
                  item => {
                    form.personType = item;
                  }
                "
              ></rea-select>
            </el-form-item>
            <el-form-item label="入职时间" prop="entryTime">
              <rea-datepicker v-model="form.entryTime"></rea-datepicker>
            </el-form-item>
            <!--retirementFile-->
            <el-form-item label="退休证：" prop="postDutyBookFile">
              <upload-button
                v-model="form.retirementFile"></upload-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <dialog-button
        reset-btn="false"
         :cancelBtn="{show:false}"
        @okBtn="submitFormData"
        @cancelBtn="dialogClose"
      ></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import DialogButton from "../../../acomponents/button/DialogButton.vue";
import DatePickerScope from "../../../../../../components/myTemplate/reassembly/DatePickerScope.vue";
import { createNamespacedHelpers } from "vuex";

const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} = createNamespacedHelpers("loadType");
export default {
  components: {
    DialogButton,
    DatePickerScope
  },
  props: {
    title: { type: String },
    dialogWidth: { type: String }
  },
  watch: {
    //计算劳动合同是否有效
    "form.laborContractExpiryDate": function(newValue) {
      if (newValue !== "") {
        let timeArr = newValue.split("-");
        let startTime = new Date(timeArr[0]).getTime();
        let endTime = new Date(timeArr[1]).getTime();
        let currTime = new Date().getTime();
        if (currTime < startTime) {
          this.form.isLaborContractEffective = false;
        } else if (currTime > startTime && currTime < endTime) {
          this.form.isLaborContractEffective = true;
        } else if (currTime > endTime) {
          this.form.isLaborContractEffective = false;
        }
      }
    },
    //计算劳务合同是否有效
    "form.labourServiceContractDate": function(newValue) {
      if (newValue !== "") {
        let timeArr = newValue.split("-");
        let startTime = new Date(timeArr[0]).getTime();
        let endTime = new Date(timeArr[1]).getTime();
        let currTime = new Date().getTime();
        if (currTime < startTime) {
          this.form.isLabourServiceContractEffective = false;
        } else if (currTime > startTime && currTime < endTime) {
          this.form.isLabourServiceContractEffective = true;
        } else if (currTime > endTime) {
          this.form.isLabourServiceContractEffective = false;
        }
      }
    },
    //计算保密协议是否签订
    "form.secrecyTreatySignTime": function(newValue) {
      if (newValue !== "") {
        this.form.isSignSecrecyTreaty = true;
      }
    },
    //岗位职责书
    "form.postDutyBookSignTime": function(newValue) {
      if (newValue !== "") {
        this.form.isSignPostDutyBook = true;
      }
    },
    //禁业合同
    "form.prohibitionTreatySignTime": function(newValue) {
      if (newValue !== "") {
        this.form.isSignProhibitionTreaty = true;
      }
    }
  },
  mounted() {},
  computed: {
    ...mapState({
      personType: "personType"
    })
  },
  //数据节点
  data() {
    return {
      updateDialogVisible: false,
      //表单
      form: {
        keyid: "",
        personName: "",
        gender: "",
        age: "",
        birthday: "",
        dingTalkId: "",
        idCard: "",
        idCardFile: "",
        idCardExpiryDate: "",
        idCardAddress: "",
        familyAddress: "",
        phone: "",
        emergencyPerson: "",
        emergencyPhone: "",
        personTypeCode: "",
        personType: "",
        entryTime: "",
        bodyInspectFile: "",
        criminalRecordFile: "",
        bankCreditFile: "",
        laborContractExpiryDate: "",
        laborContractFile: "",
        labourServiceContractDate: "",
        labourServiceContractFile: "",
        secrecyTreatySignTime: "",
        secrecyTreatyFile: "",
        postDutyBookSignTime: "",
        postDutyBookFile: "",
        prohibitionTreatySignTime: "",
        prohibitionTreatyFile: "",
        retirementFile:""
      },
      //表单验证规则
      formRules: {},
      allPersonType: [
        {
          id: 1,
          name: "合同A类"
        },
        {
          id: 2,
          name: "合同B类"
        },
        {
          id: 3,
          name: "劳务A类"
        },
        {
          id: 4,
          name: "劳务B类"
        }
      ]
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    submitFormData() {
      this.$refs.formRef.validate(valid => {
        if (!valid) return;
        this.$emit("getFormData", this.$myfunction.copyData(this.form));
        this.dialogClose();
      });
    },
    dialogClose() {
      this.updateDialogVisible = false;
      this.$refs.formRef.resetFields();
    },
    openDialog(upData) {
      if (!this.$myfunction.isEmpty(upData)) {
        this.form = this.$myfunction.copyData(upData);
      }
      this.updateDialogVisible = true;
    }
  }
};
</script>
<style lang="less" scoped></style>
