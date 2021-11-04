<template>
  <!--框架或入库合同备案对话框-->
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="150px">
        <el-form-item label="修改要求" prop="needDesc">
          <rea-textarea v-model="form.needDesc"></rea-textarea>
        </el-form-item>
        <el-form-item label="修改后GBQ底稿" prop="edit_pGBQDraftFile">
          <upload-button v-model="form.edit_pGBQDraftFile"
                         module-type="xm"
                         :file-name="form.mvName+'修改后GBQ底稿'"
                         :base-id="$store.state.workbench.currentItem.keyid"></upload-button>
        </el-form-item>
        <el-form-item label="修改后电子表格底稿" prop="edit_electDraftFile">
          <upload-button v-model="form.edit_electDraftFile"
                         module-type="xm"
                         :file-name="form.mvName+'修改后电子表格底稿'"
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
      updateData: ''
    },
    watch: {
      updateData(newValue) {
        this.form = this.$myfunction.copyData(newValue)
      }
    },
    //数据节点
    data() {
      return {
        dialogVisible: false,
        form: {
          needDesc: '',
          edit_pGBQDraftFile: '',
          edit_electDraftFile: '',
          pkeyid:''
        },
        formRules: {
          needDesc:[
            { required: true, message: '请输入必填项', trigger: 'blur' }
          ],
          edit_pGBQDraftFile:[
            { required: true, message: '请输入必填项', trigger: 'blur' }
          ],
          edit_electDraftFile:[
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
        this.$refs.formRef.resetFields()
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
