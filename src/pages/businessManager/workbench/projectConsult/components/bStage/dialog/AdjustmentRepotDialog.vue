<template>
  <!--框架或入库合同备案对话框-->
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible"  v-if="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :key="formKey" :model="form" ref="formRef" :rules="formRules" label-width="120px">
        <el-form-item label="修改要求" prop="needDesc">
          <rea-textarea v-model="form.needDesc"></rea-textarea>
        </el-form-item>
        <el-form-item label="委托方修改底稿" prop="editReportsAttachFile">
          <upload-button v-model="form.editReportsAttachFile"
                         module-type="xm"
                         file-name="委托方修改报告底稿"
                         :base-id="currentItem.keyid"
                         ></upload-button>
        </el-form-item>
        <el-form-item label="修改后底稿" prop="editReportsSynthDraftFile">
          <upload-button v-model="form.editReportsSynthDraftFile"
                         module-type="xm"
                         file-name="报告修改后底稿"
                         :base-id="currentItem.keyid"
                         ></upload-button>
        </el-form-item>
      </el-form>
      <dialog-button :reset-btn="{show:false}" @cancelBtn="dialogClose" :cancelBtn="{show:false}" @okBtn="submitFormData"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import {mapState} from 'vuex'

  export default {
    components: {

    },
    props: {
      title: '',
      width: {
        type: String,
        default: '50%'
      },
      updateData: ''
    },
    watch: {
      updateData(newValue) {
        this.form = this.$myfunction.copyData(newValue)
      }
    },

    computed:{
      ...mapState('workbench', {
        currentItem: 'currentItem'
      })
    },
    //数据节点
    data() {
      return {
        formKey:1,
        dialogVisible: false,
        form: {
          needDesc:'',
          editReportsAttachFile:'',
          editReportsSynthDraftFile:'',
        },
        formRules: {
          needDesc:[{ required: true, message: '请输入描述', trigger: 'blur' }],
          editReportsSynthDraftFile:[{ required: true, message: '请上传文件', trigger: 'blur' }]
        },
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      openDialog(data) {
        //this.formKey++
        if (!this.$myfunction.isEmpty(data)) {
          this.form=this.$myfunction.copyData(data)
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
