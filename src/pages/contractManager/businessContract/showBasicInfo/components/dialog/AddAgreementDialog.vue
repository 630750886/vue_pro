<template>
  <!--单合同备案对话框-->
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="90px">
        <el-form-item :label="data.documentTypeListName?data.documentTypeListName:'初稿'" prop="studyoutfile">
          <upload-button v-model="form.studyoutfile"></upload-button>
        </el-form-item>
      </el-form>
      <dialog-button :reset-btn="false" icon="el-icon-plus" @cancelBtn="dialogClose" :cancelBtn="{show:false}" :okBtn="{title:'新建'}"  @okBtn="submitFormData"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import {mapState} from 'vuex'
  export default {
    components: {
    },
    props: {
      title: '',
      width: {
        type: String,
        default: '50%'
      }
    },
    computed:{
      ...mapState('businessContract',{
        contractInfo:'contractInfo'
      })
    },
    watch: {},
    //数据节点
    data() {
      return {
        dialogVisible: false,
        form: {
          studyoutfile:''
        },
        formRules: {
           studyoutfile: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
        },
        data:{}
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      openDialog(data) {
        if (data) {
          this.data=data
        }
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
        this.resetForm()
      },
      submitFormData() {
        this.$refs.formRef.validate((valid) => {
          if (valid) {
            this.$emit('getFormData', this.$myfunction.copyData(this. form))
            this.dialogClose()
          }else
          {
            this.$message.success("数据录入完不完整!请确认!")
          }
         });

      },
      resetForm() {
        this.form=this.$options.data().form
        this.data={}
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
