<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="110px">
        <el-form-item label="资料名称" prop="k1">
          <el-input v-model="form.k1" clearable></el-input>
        </el-form-item>
        <el-form-item label="盖章申请说明" prop="k2">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" v-model="form.k2" clearable></el-input>
        </el-form-item>
        <el-form-item label="审核附件">
          <el-button type="text">附件上传</el-button>
        </el-form-item>
      </el-form>
      <dialog-button reset-btn="false" :cancelBtn="{show:false}" ok-btn="提 交" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>
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
      }
    },
    watch: {},
    //数据节点
    data() {
      return {
        dialogVisible:false,
        form:{
          k1:'',
          k2:''
        },
        formRules:{}
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
        this.$refs.formRef.resetFields()
      },
      submitFormData(){
        this.$emit('getFormData',this.$myfunction.copyData(this,form))
        this.dialogClose()
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
