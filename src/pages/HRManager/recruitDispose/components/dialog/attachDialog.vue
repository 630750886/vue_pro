<template>
  <el-dialog
    title="附件上传"
    :visible.sync="dialogVisible"
    :width="width"
    @close="dialogClose"
    :close-on-click-modal="false"
  >
    <el-form :model="form" ref="formRef" :rules="formRules" label-width="100px">
      <el-form-item label="附件">
        <el-button type="text" @click="attachUp">上传附件</el-button>
      </el-form-item>
    </el-form>
    <dialog-button
      reset-btn="false"
       :cancelBtn="{show:false}"
      ok-btn="提 交"
      @okBtn="submitForm"
      @cancelBtn="dialogClose"
    ></dialog-button>
  </el-dialog>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    title: { type: String },
    width: { type: String },
    labelWidth: {
      type: String,
      default: "130px"
    }
  },
  watch: {},
  //数据节点
  data() {
    return {
      q1: "2020/08/15",
      q2: "2020/08/15-2020/08/16",
      dialogVisible: false,
      form: {
        filepath: []
      },
      formRules: {}
    };
  },
  //生命周期函数节点
  created() {},
  computed: {
    ...mapGetters({
      attachpath: "flowManager/attachmentUploadStr"
    })
  },
  //自定义函数节点
  methods: {
    ...mapActions({
      GetAttachment: "flowManager/networkGetAttachment"
    }),
    attachUp() {
      this.GetAttachment();
    },
    openDialog() {
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
      this.form = this.$options.data().form;
    },
    checkValid() {
      let attpath = this.attachpath;

      let keys = Object.keys(attpath);
      if (keys.length == 0) {
        this.$message.info("附件不能为空");
        return false;
      }
      return true;
    },
    submitForm() {
      //if (this.checkValid()) {
      this.form.filepath = this.attachpath.data;
      this.$emit("getFormData", this.$myfunction.copyData(this.form));
      this.dialogClose();
      // }
    }
  }
};
</script>
