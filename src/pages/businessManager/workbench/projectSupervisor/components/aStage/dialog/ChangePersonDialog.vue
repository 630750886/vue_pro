<template>
  <!--框架或入库合同备案对话框-->
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="90px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="专业备注" prop="name" v-if="showMajorNote == true">
          <el-textarea-template></el-textarea-template>
        </el-form-item>
				<el-form-item label="工作备注" prop="name" v-if="showOtherNote == true">
				  <el-textarea-template></el-textarea-template>
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
      title:'',
      width:{
        type:String,
        default:'50%'
      },
			showOtherNote:{
			  type:Boolean,
				default:false
			},
			showMajorNote:{
			  type:Boolean,
				default:false
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
          name:'',
        },
        formRules:{},
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      openDialog(key,value){
        this.$set(this.form,key,value)
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
