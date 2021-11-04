<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible"  v-if="dialogVisible" :width="width"
               @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="100px">
        <el-form-item label="文件名称" prop="tenderdocumentsname">
          <el-input v-model="form.tenderdocumentsname"></el-input>
        </el-form-item>
        <el-form-item label="修改要求" prop="changedesc">
          <rea-textarea v-model="form.changedesc"></rea-textarea>
        </el-form-item>
        <el-form-item label="修改后底稿" prop="changedocumentsfile">
          <upload-button v-model="form.changedocumentsfile" size="max" module-type="tb" file-name="修改后底稿" :base-id="form.tenderkeyid"></upload-button>
        </el-form-item>
      </el-form>
      <dialog-button reset-btn="false" ok-btn="确 定"  :cancelBtn="{show:false}"
                     @okBtn="submitForm" @cancelBtn="dialogClose"></dialog-button>
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
      width: '',
      labelWidth: {
        type: String,
        default: '130px'
      }
    },
    watch: {},
    //数据节点
    data() {
      return {
        dialogVisible: false,
        form:{
          tenderdocumentsname:'',
          tenderdocumenteditdesc:'',
          changedocumentsfile:'',
        },
        formRules:{
          tenderdocumentsname: [
            { required: true, message: '文件名称', trigger: 'blur' }
          ],
            changedesc: [
            { required: true, message: '修改要求', trigger: 'blur' }
          ],
          changedocumentsfile:[
            { required: true, message: '修改后底稿', trigger: 'blur' }
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
          this.form=this.$myfunction.copyData(data)
        }
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
        this.form=this.$options.data().form
      },
      submitForm() {
         this.$refs.formRef.validate((valid) => {
          if (valid) {
             this.$emit('getFormData',this.$myfunction.copyData(this.form))
             this.dialogClose()
          } 
          else
          {
            this.$message.success("数据录入完不完整!请确认!")
          }
        });
       
      },
    }
  }
</script>
<style lang='less' scoped>

</style>
