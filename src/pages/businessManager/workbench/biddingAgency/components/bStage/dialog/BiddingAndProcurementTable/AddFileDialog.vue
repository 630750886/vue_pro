<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible"  v-if="dialogVisible" :width="width"
               @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="120px">
        <el-form-item label="文件次数" prop="preqcount">
          <el-input v-model="form.preqcount"></el-input>
        </el-form-item>
				<el-form-item label="文件电子版" prop="attachFile">
          <upload-button v-model="form.attachFile"></upload-button>
				</el-form-item>
        <el-form-item label="盖章扫描件" prop="resultAttachFile">
          <upload-button v-model="form.resultAttachFile"></upload-button>
        </el-form-item>
      </el-form>
      <dialog-button reset-btn="false" :cancelBtn="{show:false}"
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
      },
			data:{},
    },
    watch: {},
    //数据节点
    data() {
      return {
        dialogVisible: false,
				num:1,
        form:{
          attachFile:'',
          resultAttachFile:'',
          publicityCount:''
        },
        formRules:{
          attachFile: {required: true,message: '请上传文件电子版',trigger: 'change'},
          resultAttachFile:{required: true,message: '请上传盖章扫描件',trigger: 'change'},
          preqcount:{required: true,message: '请填写文件次数',trigger: 'blur'}
        },
      }
    },
    //生命周期函数节点
    created() {

			},
    //自定义函数节点
    methods: {
      openDialog() {
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
          }else
          {
            this.$message.success("上传附件为空!请确认!")
          }
         });

      },
    }
  }
</script>
<style lang='less' scoped>

</style>
