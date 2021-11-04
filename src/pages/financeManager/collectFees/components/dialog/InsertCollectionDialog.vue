<template>
  <el-dialog
    :visible.sync="dialogVisible"
    width="30%"
    :title="title"
    :close-on-click-modal="false"
  >
    <el-form :model="form" ref="formRef" :rules="formRules" label-width="110px">
      <el-form-item label="收款时间" prop="collTime">
        <rea-datepicker v-model="form.collTime"></rea-datepicker>
      </el-form-item>

      <el-form-item label="付款类型" prop="sumType">
        <el-select v-model="form.sumType" placeholder="请选择">
          <el-option label="公账" value="company"></el-option>
          <el-option label="现金" value="cash"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="付款人" prop="payer">
        <el-input placeholder="请输入" v-model="form.payer"></el-input>
      </el-form-item>

      <el-form-item label="收款金额(元)" prop="sumMoney">
        <el-input
          aria-placeholder="请输入整数"
          v-model="form.sumMoney"
        ></el-input>
      </el-form-item>
      <el-form-item label="收款回执单" prop="collAttach">
        <upload-button v-model="form.collAttach"></upload-button>
      </el-form-item>
    </el-form>

    <dialog-button
      resetBtn="false"
      :cancelBtn="{ show: false }"
      ok-btn="登 记"
      @okBtn="submitFormData"
      @cancelBtn="dialogClose"
    ></dialog-button>
  </el-dialog>
</template>

<script>
import DialogButton from "../../../acomponents/DialogButton.vue";

export default {
  components: {
    DialogButton,
    // UploadButton
  },
  props: {
    title: {
      type: String,
      dealt: "",
    },
  },
  watch: {
    title(newValue) {
      this.title1 = newValue;
    },
  },
  mounted() {
    // this.title=this.title1
  },
  data() {
    return {
      // 父窗口传递的弹窗标题
      title1: "",
      // 弹窗显示控制
      dialogVisible: false,
      // 表单对象
      form: {
        flowStatus: "有",
        collAttach: "",
      },
      // 表单验证规则
      formRules: {
        collTime: [
          {
            required: true,
            message: "请选择日期",
            tigger: "blur",
          },
        ],
        sumType: [
          {
            required: true,
            message: "请选择付款类型",
            tigger: "blur",
          },
        ],
        payer: [
          {
            required: true,
            message: "请输入付款人姓名",
            tigger: "blur",
          },
        ],
        sumMoney: [
          {
            required: true,
            message: "请输入金额",
            tigger: "blur",
          },
        ],
        // collAttach:[
        //   {
        //     required: true,
        //     message: '回执单',
        //     tigger: 'blur'
        //   }
        // ]
      },
    };
  },
  methods: {
    openDialog(forms = {}) {
      forms = Object.assign(forms, {
        sumMoney: JSON.stringify(forms.sumMoney),
      });
      this.form = forms;
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
      this.resetForm();
    },
    submitFormData() {
      // console.log(this.form);
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$emit("getFormData", this.$myfunction.copyData(this.form));
          this.dialogClose();
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.formRef.resetFields();
    },
    uploadFile() {
      this.$message.success("ok");
    },
  },
};
</script>

<style scoped></style>
