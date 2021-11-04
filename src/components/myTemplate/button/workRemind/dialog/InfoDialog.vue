<template>
  <div>
    <el-dialog :append-to-body="true" :title="title" :visible.sync="dialogVisible" v-if="dialogVisible" :width="width" @close="dialogClose"  :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="0">
        <el-form-item label="" prop="info">
          <rea-textarea v-model="form.info" min-height="10" max-height="10"></rea-textarea>
        </el-form-item>
      </el-form>
      <dialog-button :reset-btn="{show:false}" ok-btn="发 送" :cancelBtn="{show:false}"  @cancelBtn="dialogClose" @okBtn="submitFormData"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件

  export default {
    components: {

    },
    props: {
      title:[String],
      width:{
        type:String,
        default:'50%'
      }
    },
    watch: {},
    //数据节点
    data() {
      return {
        dialogVisible:false,
        form:{
          info:'',
        },
        formRules:{
          info:[
            { required: true, message: '请输入信息', trigger: 'blur' },
          ]
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
        this.$refs.formRef.validate((valid) => {
          if (!valid) return
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
