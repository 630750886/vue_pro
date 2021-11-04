<template>
  <!--框架或入库合同备案对话框-->
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
       v-if="dialogVisible"
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
        <el-form-item label="姓名" prop="projectPersonName">
          <rea-query-input
            v-model="form.projectPersonName"
            url="hr/basicinfo/autofindwhere"
            filter-obj="{}"
            filter-key="contextname"
            @getObject="
              item => {
                form.projectPersonKeyid = item.keyid;
                form.projectPersonPhone = item.address;
              }
            "
          ></rea-query-input>
        </el-form-item>
        <el-form-item label="专业备注" v-if="showMajorNote">
          <rea-textarea></rea-textarea>
        </el-form-item>
        <el-form-item label="工作备注" prop="JobDesc" v-if="showOtherNote">
          <rea-textarea v-model="form.JobDesc"></rea-textarea>
        </el-form-item>
      </el-form>
      <dialog-button
        :reset-btn="{ show: false }" :cancelBtn="{show:false}"
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
      showOtherNote: false,
      showMajorNote: false,
      form: {
        projectPersonName: "",
        projectPersonKeyid: "",
        projectPersonPhone: "",
        JobDesc: ""
      },
      formRules: {}
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    openDialog({ showOtherNote, showMajorNote, data }) {
      if (!this.$myfunction.isEmpty(showMajorNote)) {
        this.showMajorNote = showMajorNote;
      }
      if (!this.$myfunction.isEmpty(showOtherNote)) {
        this.showMajorNote = showOtherNote;
      }
      if (!this.$myfunction.isEmpty(data)) {
        this.form = data;
        this.form.pprojectPersonName = data.projectPersonName;
        this.form.pkeyid = data.keyid;
      }
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
      this.showOtherNote = false;
      this.showMajorNote = false;
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
