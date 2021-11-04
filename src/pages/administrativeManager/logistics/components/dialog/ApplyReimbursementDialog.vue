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
        label-width="90px"
      >
        <el-form-item
          label="师傅"
          prop="userName"
          label-width="120px"
        ></el-form-item>
        <el-form-item
          label="总公里数"
          prop="userName"
          label-width="120px"
        ></el-form-item>
        <el-form-item
          label="每公里金额(元)"
          prop="userName"
          label-width="120px"
        ></el-form-item>
        <el-form-item
          label="总金额(元)"
          prop="userName"
          label-width="120px"
        ></el-form-item>
      </el-form>
      <dialog-button
        resetBtn="false"
        :cancelBtn="{show:false}"
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

export default {
  components: {
    DialogButton,
    ElSelectTemplate
  },
  props: {
    title: { type: String },
    station: {
      type: Object,
      default: () => {
        return {
          organize: []
        };
      }
    }
  },
  watch: {},
  //数据节点
  data() {
    return {
      dialogVisible: false,
      //表单对象
      form: {},
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
    openDialog() {
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
