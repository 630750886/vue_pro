<template>
  <!--框架或入库合同备案对话框-->
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" @close="dialogClose"  :close-on-click-modal="false" v-if="dialogVisible">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="90px">
        <el-form-item :label="fileLabel" prop="name">
          <el-input v-model="form.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="附件" prop="file">
          <upload-button v-model="form.file"></upload-button>
        </el-form-item>
      </el-form>
      <dialog-button :reset-btn="{show:false}" :cancelBtn="{show:false}"  @cancelBtn="dialogClose" @okBtn="submitFormData" :okBtn="{title:'新建'}"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {
    },
    props: {
      title:'',
      width:{
        type:String,
        default:'50%'
      },
      fileLabel:{
        type:String,
        default:'文件名称'
      },
    },
    watch: {

    },
    //数据节点
    data() {
      return {
        dialogVisible:false,
        form:{
          name:'',
          file:'',
        },
        formRules:{
          name: { required: true, message: '填写资料名称', trigger: 'change' },
          file:{ required: true, message: '请上传上传附件', trigger: 'change' },
        },
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      openDialog(){
        this.dialogVisible=true
      },
      dialogClose(){
        this.dialogVisible=false
        this.resetForm()
      },
      submitFormData(){
        this.$refs.formRef.validate(valid=>{
          if(!valid) return;
          this.$emit('getFormData',this.$myfunction.copyData(this.form))
          this.dialogClose()
        })

      },
      resetForm(){
        this.$refs.formRef.resetFields()
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
