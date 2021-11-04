<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible"  v-if="dialogVisible" width="30%" @close="dialogClose()" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="90px">
        <el-form-item label="房东姓名" prop="ownerName" label-width="120px">
          <el-input v-model="form.ownerName" clearable></el-input>
        </el-form-item>
      </el-form>
      <dialog-button resetBtn="false" :cancelBtn="{show:false}" okBtn="新建" @okBtn="submitFormData" @cancelBtn="dialogClose()"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import DialogButton from '../../../acomponents/DialogButton.vue'
  import ElSelectTemplate from '../../../acomponents/ElSelectTemplate.vue'

  export default {
    components: {
      DialogButton,
      ElSelectTemplate
    },
    props: {
      title: '',
      station: {
        type: Object,
        default: () => {
          return {
            organize: [],
          }
        }
      }
    },
    watch: {},
    //数据节点
    data() {
      return {
        dialogVisible: false,
        //表单对象
        form: {

        },
        //表单验证规则
        formRules: {
            ownerName:[{ required: true, message: '请输入必填项', trigger: 'blur' }]
        },
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      dialogClose() {
        this.dialogVisible = false
        this.$refs.formRef.resetFields()
      },
      submitFormData() {
         this.$refs.formRef.validate((valid) => {
          if (valid) {
          this.$emit('getFormData', this.$myfunction.copyData(this.form))
          this.dialogClose()
          }else
          {
            this.$message.success("数据录入不完整!请确认!")
          }
         });
      },
      openDialog() {
        this.dialogVisible = true
      }
    }
  }
</script>
<style lang='less' scoped>
  .btn-right {
    float: right;
    margin-right: 0 !important;
  }
</style>
