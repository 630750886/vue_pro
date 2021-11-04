<template>
  <!--框架或入库合同备案对话框-->
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" v-if="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="90px">
        <el-form-item label="客户联系人" prop="contactname">
          <el-input v-model="form.contactname" clearable></el-input>
        </el-form-item>
        <el-form-item label="联系人电话" prop="contactphone">
          <el-input v-model="form.contactphone" clearable></el-input>
        </el-form-item>
        <el-form-item label="联系人部门" prop="contactdepartment">
          <el-input v-model="form.contactdepartment" clearable></el-input>
        </el-form-item>
        <el-form-item label="联系人职务" prop="contactpost">
          <el-input v-model="form.contactpost" clearable></el-input>
        </el-form-item>
      </el-form>
      <dialog-button :reset-btn="{show:false}" @cancelBtn="dialogClose"
      :cancelBtn="{show:false}" :okBtn="Btntitle"  @okBtn="submitFormData"></dialog-button>
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
      updateData:''
    },
    watch: {
      updateData(newValue){
        this.form=this.$myfunction.copyData(newValue)
      }
    },
    //数据节点
    data() {
      return {
        dialogVisible:false,
        form:{
          contactname:'',
          contactphone:'',
          contactdepartment:'',
          contactpost:'',
          contactTypeKeyId:'402880fa754607d00175461061300003',
          contactTypeName:'委托联系人',
        },
        formRules:{
          contactname: [{ required: true, message: '请输入必填项', trigger: 'blur' }],
          contactphone: [{ required: true, message: '请输入必填项', trigger: 'blur' }]
        },
        Btntitle:{title:"新建"}
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      openDialog(data){
        if (!this.$myfunction.isEmpty(data)){
          this.Btntitle.title="保存";
          this.form=this.$myfunction.copyData(data)
        }
        this.dialogVisible=true
      },
      dialogClose(){
        this.dialogVisible=false
        this.resetForm()
      },
      submitFormData(){
        this.$emit('getFormData',this.$myfunction.copyData(this.form))
        this.dialogClose()
      },
      resetForm(){
        this.$refs.formRef.resetFields()
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
