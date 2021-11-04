<template>
  <!--高级查询对话框-->
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="75px">
        <el-form-item label="拒收原因" prop="descinfo">
          <rea-textarea v-model="form.descinfo"></rea-textarea>
        </el-form-item>
      </el-form>
      <dialog-button reset-btn="false" ok-btn="确 定" @resetBtn="resetForm" @cancelBtn="dialogClose" :cancelBtn="{show:false}"
                     @okBtn="submitFormData"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件

  export default {
    components: {},
    props: {
      title: '',
      width: {
        type: String,
        default: '50%'
      }
    },
    watch: {},
    //数据节点
    data() {
      return {
        dialogVisible: false,
        form: {
          descinfo: '',
        },
        formRules: {
          descinfo: [
            {
              required: true,
              message: '拒收原因不能为空',
              trigger: 'blur'
            }
          ]
        },
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      openDialog(data) {
        if (!this.$myfunction.isEmpty(data)) {
          this.form = this.$myfunction.copyData(data)
        }
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
      },
      submitFormData() {
        this.$refs.formRef.validate(valid => {
          if (!valid) return
          this.$emit('getFormData', this.$myfunction.copyData(this.form))
          this.dialogClose()
        })
      },
      resetForm() {
        this.$refs.dateRef.resetData()
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
