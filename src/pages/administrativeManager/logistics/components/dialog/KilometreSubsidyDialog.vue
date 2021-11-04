<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
       v-if="dialogVisible"
      width="30%"
      @close="dialogClose()"
      :close-on-click-modal="false"
    >
      <el-form
        :model="form"
        ref="formRef"
        :rules="formRules"
        label-width="120px"
      >
        <el-form-item label="师傅" prop="name">
          <query-input v-model="form.name"></query-input>
        </el-form-item>
        <el-form-item label="总公里数" prop="totalKilometre">
          <el-input v-model="form.totalKilometre" clearable></el-input>
        </el-form-item>
        <el-form-item label="每公里金额(元)" prop="unitPrice">
          <el-input v-model="form.unitPrice" clearable></el-input>
        </el-form-item>
        <el-form-item label="总金额(元)" prop="totalPrice">
          <el-input v-model="form.totalPrice" clearable></el-input>
        </el-form-item>
      </el-form>
      <dialog-button
        resetBtn="false"
        :cancelBtn="{show:false}"
        ok-btn="提 交"
        @okBtn="submitFormData"
        @cancelBtn="dialogClose()"
      ></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import DialogButton from "../../../acomponents/DialogButton.vue";
import ElSelectTemplate from "../../../acomponents/ElSelectTemplate.vue";
import ElTextareaTemplate from "../../../acomponents/ElTextareaTemplate.vue";
import ElDataPickerTemplate from "../../../acomponents/ElDataPickerTemplate.vue";
import QueryInput from "../../../acomponents/QueryInput.vue";

export default {
  components: {
    ElTextareaTemplate,
    DialogButton,
    ElSelectTemplate,
    ElDataPickerTemplate,
    QueryInput
  },
  props: {
    title: { type: String }
  },
  watch: {},
  //数据节点
  data() {
    return {
      dialogVisible: false,
      //表单对象
      form: {
        name: "",
        totalKilometre: 0,
        unitPrice: "",
        totalPrice: ""
      },
      //表单验证规则
      formRules: {}
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    dialogClose() {
      this.dialogVisible = false;
      this.$refs.formRef.resetFields();
    },
    submitFormData() {
      this.$refs.formRef.validate(valid => {
        if (!valid) return;
        this.$emit("getFormData", this.$myfunction.copyData(this.form));
        this.dialogClose();
      });
    },
    openDialog(data) {
      if (!this.$myfunction.isEmpty(data)) {
        this.form = data;
      }
      this.dialogVisible = true;
    }
  }
};
</script>
<style lang="less" scoped>
.btn-right {
  float: right;
  margin-right: 0 !important;
}
</style>
