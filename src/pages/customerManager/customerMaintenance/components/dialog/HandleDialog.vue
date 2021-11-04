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
        label-width="110px"
      >
        <el-form-item label="整改提升措施" prop="rectification">
          <rea-textarea v-model="form.rectification"></rea-textarea>
        </el-form-item>
        <el-form-item label="处理结果" prop="handleResults">
          <rea-textarea v-model="form.handleResults"></rea-textarea>
        </el-form-item>
        <el-form-item label="相关处理资料" prop="handleMaterialFile">
          <upload-button
            v-model="form.handleMaterialFile"
            file-name="相关处理资料"
            module-type="kh"
            :base-id="form.sumerserveid"
          ></upload-button>
        </el-form-item>
        <el-form-item label="客户回访调查表" prop="handleMaterialFile">
          <upload-button
            v-model="form.handleTableFile"
            file-name="客户回访调查表"
            module-type="kh"
            :base-id="form.sumerserveid"
          ></upload-button>
        </el-form-item>
      </el-form>
      <dialog-button
        :reset-btn="{ show: false }"
        :cancelBtn="{show:false}"
        ok-btn="提 交"
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
    title: { type: String },
    width: {
      type: String,
      default: "50%"
    }
  },
  watch: {},
  //数据节点
  data() {
    return {
      dialogVisible: false,
      form: {
        sumerserveid: "",
        rectification: "",
        handleResults: "",
        handleMaterialFile: "",
        handleTableFile: ""
      },
      formRules: {}
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    openDialog(data) {
      if (data) {
        this.form.sumerserveid = data.keyid;
      }
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
      this.resetForm();
    },
    submitFormData() {
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
