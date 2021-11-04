<template>
  <!--框架或入库合同备案对话框-->
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
        <el-form-item label="定案表出具时间" prop="outPutdateTime">
          <rea-datepicker v-model="form.outPutdateTime"></rea-datepicker>
        </el-form-item>
        <el-form-item label="盖章扫描件" prop="verdictOutAttchFile">
          <upload-button
            v-model="form.verdictOutAttchFile"
            module-type="xm"
            file-name="盖章扫描件"
            :base-id="$store.state.workbench.currentItem.keyid"
          ></upload-button>
        </el-form-item>
        <el-form-item label="送审金额(元)" prop="sendAuditSum">
          <el-input v-model="form.sendAuditSum"></el-input>
        </el-form-item>
        <el-form-item label="审定金额(元)" prop="auditSignSum">
          <el-input v-model="form.auditSignSum"></el-input>
        </el-form-item>
      </el-form>
      <dialog-button
        :reset-btn="{ show: false }"
        :cancelBtn="{show:false}"
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
        outPutdateTime: "",
        verdictOutAttchFile: "",
        sendAuditSum: "",
        auditSignSum: ""
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
        this.form = this.$myfunction.copyData(data);
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
      this.form = this.$options.data().form;
    }
  }
};
</script>
<style lang="less" scoped></style>
