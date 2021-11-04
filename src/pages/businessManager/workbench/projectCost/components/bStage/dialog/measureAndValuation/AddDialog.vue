<template>
  <!--框架或入库合同备案对话框-->
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="150px">
        <el-form-item :label="form.prokectmvTypeName+'名称'" prop="mvName">
          <el-input v-model="form.mvName" clearable></el-input>
        </el-form-item>
        <el-form-item label="GBQ底稿" prop="pGBQDraftFile">
          <upload-button v-model="form.pGBQDraftFile"
                         module-type="xm"
                         :file-name="form.mvName+'GBQ底稿'"
                         :base-id="$store.state.workbench.currentItem.keyid"></upload-button>
        </el-form-item>
        <el-form-item label="电子表格底稿" prop="electDraftFile">
          <upload-button v-model="form.electDraftFile"
                         module-type="xm"
                         :file-name="form.mvName+'电子表格底稿'"
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
          prokectmvTypeName:'',
          mvName:'',
          pGBQDraftFile:'',
          electDraftFile:'',
        },
        formRules: {
          mvName:[
            { required: true, message: '请输入必填项', trigger: 'blur' },
            { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
          ],
          pGBQDraftFile:[
            { required: true, message: '请输入必填项', trigger: 'blur' },
            { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
          ],
          electDraftFile:[
            { required: true, message: '请输入必填项', trigger: 'blur' },
            { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
          ]
        },
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      openDialog(type) {
        this.form.prokectmvTypeName = type
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
