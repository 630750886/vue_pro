<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :width="width"
             @close="dialogClose" :close-on-click-modal="false">
    <el-form :model="form" ref="formRef" :rules="formRules" label-width="100px">
      <el-form-item label="申请金额(元)" prop="applyMoney">
        <rea-number-input v-model="form.applyMoney"></rea-number-input>
      </el-form-item>
      <el-form-item label="申请理由" prop="applyReason">
        <rea-textarea v-model="form.applyReason"></rea-textarea>
      </el-form-item>
    </el-form>
    <dialog-button reset-btn="false" :cancelBtn="{show:false}" ok-btn="提 交" @okBtn="submitForm" @cancelBtn="dialogClose"></dialog-button>
  </el-dialog>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import BecomeApplyTable from '../table/BecomeApplyTable.vue'

  export default {
    components: {
      BecomeApplyTable
    },
    props: {
      title: '',
      width: '',
      labelWidth: {
        type: String,
        default: '130px'
      }
    },
    watch: {},
    //数据节点
    data() {
      return {
        dialogVisible: false,
        form: {
          applyMoney: '',
          applyReason: '',
        },
        formRules: {
          applyMoney: [
            { required: true, message: '申请金额(元)', trigger: 'blur' }
          ],
          applyReason: [
            { required: true, message: '申请理由', trigger: 'blur' }
          ],
        },
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      openDialog(data) {
        if (data) {
          Object.assign(this.form,data)
        }
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
        this.form = this.$options.data().form
      },
      submitForm() {

        this.$refs.formRef.validate((valid) => {
          if (valid) {
            this.$emit('getFormData', this.$myfunction.copyData(this.form))
            this.dialogClose()
          }else
          {
            this.$message.success("数据录入完不完整!请确认!")
          }
         });

      }
    }
  }
</script>
<style lang='less' scoped>

</style>
