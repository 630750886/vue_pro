<template>
  <el-dialog
    :visible.sync="dialogVisible"
     v-if="dialogVisible"
    :append-to-body="true"
    width="300px"
    @close="dialogClose"
    :close-on-click-modal="false"
  >
    <el-form :model="form" ref="formRef" :rules="formRules" label-width="75px">
      <el-form-item label="职务名称" prop="projectJobKeyid">
        <rea-select
          v-model="form.projectJobKeyid"
          :data="workjobcurr"
          @getObject="
            item => {
              form.projectJobName = item.listname;
              form.projectJobNumber = parseInt(item.staticsCode);
              form.projectJobPnumber=item.urladdress;
              isContent = item.isplanitemtime;
            }
          "
        ></rea-select>
      </el-form-item>
      <el-form-item label="人员名称" prop="projectPersonName">
        <rea-query-input
          v-model="form.projectPersonName"
          url="hr/basicinfo/autofindwhere"
          filter-obj="{}"
          filter-key="contextname"
          @getObject="
            item => {
              form.projectPersonKeyid = item.keyid;
            }
          "
        ></rea-query-input>
      </el-form-item>
      <el-form-item
        v-if="isContent"
        :label="form.projectJobName === '其他人员' ? '工作备注' : '专业备注'"
        prop="jobDesc"
      >
        <rea-textarea v-model="form.jobDesc"></rea-textarea>
      </el-form-item>
    </el-form>
    <dialog-button
      :reset-btn="{ show: false }"
      :cancelBtn="{show:false}"
      @cancelBtn="dialogClose"
      @okBtn="submitFormData"
    ></dialog-button>
  </el-dialog>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
export default {
  components: {},
  props: {},
  //生命周期函数节点
  created() {},
  mounted() {},
  watch: {},
  //数据节点
  data() {
    return {
      workInfo: [],
      dialogVisible: false,
      isContent: false,
      workjobcurr: [],
      form: {
        projectKeyid: "",
        projectCode: "",
        projectName: "",
        projectJobKeyid: "",
        projectJobName: "",
        projectJobPnumber:"",
        projectJobNumber: 1,
        projectPersonKeyid: "",
        projectPersonName: "",
        projectPersonPhone: "",
        currStatus: "curr",
        jobDesc: ""
      },
      formRules: {
        projectJobKeyid: [
            { required: true, message: '请输入必填项', trigger: 'blur' }
          ],
        projectPersonName: [
            { required: true, message: '请输入必填项', trigger: 'blur' }
          ]
      }
    };
  },
  //自定义函数节点
  methods: {
    openDialog(workInfo) {
      this.workjobcurr=workInfo;
      if (workInfo.length>0){
         this.dialogVisible = true;
      }
      else
      {
        this.$message.error("职务数据为空！请联系管理人员！");
      }
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
      this.form = this.$options.data().form;
      this.workInfo = this.$options.data().workInfo;
      this.isContent = this.$options.data().isContent;
      this.workGroup = this.$options.data().workGroup;
    }
  }
};
</script>
<style lang="less" scoped></style>
