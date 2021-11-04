<template>
  <!--框架或入库合同备案对话框-->
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="150px">
        <el-form-item label="修改要求" prop="needDesc">
          <rea-textarea v-model="form.needDesc"></rea-textarea>
        </el-form-item>
        <el-form-item label="修改后报告附件" prop="editReportsAttachFile">
          <upload-button v-model="form.editReportsAttachFile"
                         module-type="xm"
                         file-name="修改后报告附件"
                         :base-id="$store.state.workbench.currentItem.keyid"></upload-button>
        </el-form-item>
        <el-form-item label="修改后合成底稿" prop="editReportsSynthDraftFile">
          <upload-button v-model="form.editReportsSynthDraftFile"
                         module-type="xm"
                         file-name="修改后报告合成底稿"
                         :base-id="$store.state.workbench.currentItem.keyid"></upload-button>
        </el-form-item>
      </el-form>
      <dialog-button :reset-btn="{show:false}" @cancelBtn="dialogClose" :cancelBtn="{show:false}" @okBtn="submitFormData"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件


  export default {
    components: {
    },
    props: {
      title: '',
      width: {
        type: String,
        default: '50%'
      },
    },
    watch: {

    },
    //数据节点
    data() {
      return {
        dialogVisible: false,
        form: {
          needDesc:'',
          editReportsAttachFile:'',
          editReportsSynthDraftFile:'',
        },
        formRules: {
          needDesc: [
            { required: true, message: '请输入必填项', trigger: 'blur' }
          ],
          editReportsAttachFile: [
            { required: true, message: '请输入必填项', trigger: 'blur' }
          ],
          editReportsSynthDraftFile: [
            { required: true, message: '请输入必填项', trigger: 'blur' }
          ]
        },
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      openDialog(data) {
        if (!this.$myfunction.isEmpty(data)) {
          this.form = this.$myfunction.copyData(data)
        }
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
        this.resetForm()
      },
      submitFormData() {
        this.$refs.formRef.validate((valid) => {
          if (valid) {
            this.$emit('getFormData', this.$myfunction.copyData(this.form))
            this.dialogClose()            
          }else
          {
            this.$message.success("数据录入完不完整!请确认!")
          }
        });
      },
      resetForm() {
        this.form=this.$options.data().form
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
