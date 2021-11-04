<template>
    <div>
      <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
       v-if="dialogVisible"
      width="30%"
      @close="dialogClose"
      :close-on-click-modal="false"
    >
     <el-form
        :model="form"
        ref="formRef"
        :rules="formRules"
        label-width="120px"
      >
         <el-form-item label="项目编号" prop="projectCode">
            <el-input v-model="form.projectCode" :disabled="true"></el-input>
         </el-form-item>
            <el-form-item label="项目名称" prop="projectName">
               <el-input v-model="form.projectName"></el-input>
            </el-form-item>
      </el-form>
      <dialog-button
        reset-btn="false"
        :cancelBtn="{show:false}"
        ok-btn="确 定"
        @okBtn="submitForm"
        @cancelBtn="dialogClose"
      ></dialog-button>
    </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
         return {
            dialogVisible: false,
            form:{
                projectCode:'',
                projectName:''
            },
            formRules: {projectName:[{ required: true, message: '请输入必填项', trigger: 'blur' }]},
         }
    },
    props:{
        title:{type:String,default:""},
    },
    methods:{
    openDialog(data) {
      this.form=data;
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
    },
    submitForm() {
     this.$refs.formRef.validate((valid) => {
          if (valid) {
            this.javaHttp("/pro/cmbaseproject/edits", this.form).then(item => {
                    if (item.code === 200) {
                    this.$message.success(item.message);
                    this.$emit("getFormData","完成!");
                    this.dialogClose();
                    } else {
                    this.$message.success(item.message);
                    this.dialogClose();
                    }
                });
          }else
          {
            this.$message.success("数据录入不完整!请确认!")
          }
         });
    }
    }
}
</script>