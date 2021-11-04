<template>
  <!--框架或入库合同备案对话框-->
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible"  v-if="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="90px">
        <el-form-item label="存档资料名称" prop="payVisitDocName">
					<el-input v-model="form.payVisitDocName" :readonly="isDataTypeName"></el-input>
        </el-form-item>
				<el-form-item label="附件" prop="payVisitDocFile">
          <upload-button v-model="form.payVisitDocFile"></upload-button>
				</el-form-item>
      </el-form>
      <dialog-button :cancelBtn="{show:false}" :reset-btn="{show:false}" @cancelBtn="dialogClose" @okBtn="submitFormData"></dialog-button>
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
    },
    watch: {
    },
    //数据节点
    data() {
      return {
        isDataTypeName:false,
        dialogVisible:false,
        form:{
          payVisitDocName:'',
          payVisitDocFile:''
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
        if (!this.$myfunction.isEmpty(data)) {
          this.form=data
          this.isDataTypeName=true
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
        this.isDataTypeName=false
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
