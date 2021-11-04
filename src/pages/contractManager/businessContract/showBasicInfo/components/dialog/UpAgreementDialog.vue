<template>
  <div>
    <el-dialog
      :v-if="dialogVisible"
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
        <el-form-item label="修改要求" prop="changedesc">
          <rea-textarea v-model="form.changedesc"></rea-textarea>
        </el-form-item>
        <el-form-item label="修改后底稿" prop="manuscriptcomplete">
          <upload-button
            v-model="form.manuscriptcomplete"
            module-type="ht"
            file-name="修改后底稿"
            :base-id="contractInfo.keyid"
          ></upload-button>
        </el-form-item>
      </el-form>
      <dialog-button
        :reset-btn="false"
        ok-btn="保 存"
        :cancelBtn="{show:false}"
        @cancelBtn="dialogClose"
        @okBtn="submitFormData"
      ></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import { mapState } from "vuex";
export default {
  components: {},
  props: {
    title: { Type: String },
    width: {
      type: String,
      default: "50%"
    }
  },
  watch: {},
  computed: {
    ...mapState("businessContract", {
      contractInfo: "contractInfo"
    })
  },
  //数据节点
  data() {
    return {
      dialogVisible: false,
      form: {
        changedesc: "",
        manuscriptcomplete: "",
        manuscriptfile: ""
      },
      formRules: {
        changedesc: [
            { required: true, message: '请输入修改要求', trigger: 'blur' }
          ],
        manuscriptcomplete:[{ required: true, message: '必填必选项', trigger: 'blur' }]
      }
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
      this.$refs.formRef.validate((valid) => {
          if (valid) {
            this.$emit("getFormData", this.$myfunction.copyData(this.form));
            this.dialogClose();
          }else
          {
            this.$message.success("数据录入完不完整!请确认!")
          }
         });

    },
    resetForm() {
      this.$refs.formRef.resetFields();
    }
  }
};
</script>
<style lang="less" scoped></style>
