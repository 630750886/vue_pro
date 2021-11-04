<template>
  <!--框架或入库合同备案对话框-->
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="90px">
        <el-form-item label="工作要求" prop="workRequirement">
          <rea-textarea v-model="form.workRequirement"></rea-textarea>
        </el-form-item>
      </el-form>
      <dialog-button :reset-btn="{show:false}" :cancelBtn="{show:false}" ok-btn="发 送" @cancelBtn="dialogClose" @okBtn="submitFormData"></dialog-button>
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
      relationUser:{
        type:Object,
        default: ()=>{
          return {

          }
        }
      }
    },
    watch: {
      relationUser(){
        this.form.remindUser=this.relationUser.remindUser
        this.form.operateUser=this.relationUser.operateUser
      }
    },
    //数据节点
    data() {
      return {
        dialogVisible:false,
        form:{
          remindUser:'',//被提醒人
          operateUser:'',//操作人
          workRequirement:'',
        },
        formRules:{},
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      openDialog(data){
        if (this.$myfunction.isEmpty(data)) {

        }
        this.dialogVisible=true
      },
      dialogClose(){
        this.dialogVisible=false
        this.resetForm()
      },
      submitFormData(){
        if (this.form.workRequirement === '') {
          this.$msgbox.confirm('请填写工作要求')
        }else {
          this.$emit('getFormData',this.$myfunction.copyData(this.form))
          this.dialogClose()
        }
      },
      resetForm(){
        this.$refs.formRef.resetFields()
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
