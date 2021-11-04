<template>
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
        label-width="90px"
      >
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="form.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="路由地址" prop="path">
          <el-input v-model="form.path" clearable></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="iconcls">
          <el-input v-model="form.iconcls" clearable></el-input>
        </el-form-item>
        <el-form-item label="URL" prop="url">
          <el-input v-model="form.url" clearable></el-input>
        </el-form-item>
      </el-form>
      <dialog-button
        :reset-btn="{ show: false }"
         :cancelBtn="{show:false}"
        ok-btn="保 存"
        @cancelBtn="dialogClose"
        @okBtn="submitFormData"
      ></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
export default {
  components: {},
  props: {
    title: { type: String, default: "" },
    width: { type: String, default: "" }
  },
  watch: {},
  //数据节点
  data() {
    return {
      dialogVisible: false,
      form: {
        pkeyid: "",
        typecode: "menu",
        name: "",
        path: "",
        iconcls: "",
        url: ""
      },
      formRules: {
        name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }]
      }
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    openDialog(data) {
      if (data) {
        this.form = this.$myfunction.copyData(data);
      }
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
      this.resetForm();
    },
    submitFormData() {
      this.$refs.formRef.validate(valid => {
        if (!valid) return;
        this.$emit("getFormData", this.$myfunction.copyData(this.form));
        this.dialogClose();
      });
    },
    resetForm() {
      this.$refs.formRef.resetFields();
    }
  }
};
</script>
<style lang="less" scoped></style>
