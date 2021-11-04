<template>
  <!--框架或入库合同备案对话框-->
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible"  v-if="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="90px">
        <el-form-item label="是否需要进交易平台">
        	<el-radio v-model="form.radio" label="1">是</el-radio>
        	<el-radio v-model="form.radio" label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="交易平台名称" v-if="form.radio == '1'">
        	<el-select-template v-model="form.platform" :data="[{id:1,name:'平台1'}]"></el-select-template>
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
          radio:'1',
					platform:'',
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
