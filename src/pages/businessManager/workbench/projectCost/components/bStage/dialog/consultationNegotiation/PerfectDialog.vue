<template>
  <!--框架或入库合同备案对话框-->
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="90px">
        <el-form-item label="争议主要事项" prop="disputeKeyTitle">
          <el-input v-model="form.disputeKeyTitle"></el-input>
        </el-form-item>
        <el-form-item label="相关附件" prop="negdisputeFile">
          <upload-button v-model="form.negdisputeFile"
                         module-type="xm"
                         file-name="会商相关附件"
                         :base-id="$store.state.workbench.currentItem.keyid"></upload-button>
        </el-form-item>
        <el-form-item label="核对底稿后是否有调整" prop="ischangeData">
          <com-truefalse v-model="form.ischangeData"></com-truefalse>
        </el-form-item>
        <el-form-item label="调整后相关记录" prop="negRecordFile">
          <upload-button v-model="form.negRecordFile"
                         module-type="xm"
                         file-name="会商调整后相关记录"
                         :base-id="$store.state.workbench.currentItem.keyid"></upload-button>
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
      title: '',
      width: {
        type: String,
        default: '50%'
      },
      updateData: ''
    },
    watch: {
      updateData(newValue) {
        this.form = this.$myfunction.copyData(newValue)
      }
    },
    //数据节点
    data() {
      return {
        dialogVisible: false,
        form: {
          disputeKeyTitle:'',
          negdisputeFile:'',
          ischangeData:'',
          negRecordFile:'',
        },
        formRules: {},
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      openDialog(data) {
        if (!this.$myfunction.isEmpty(data)) {
          this.form=this.$myfunction.copyData(data)
        }
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
        this.resetForm()
      },
      submitFormData() {
        this.$emit('getFormData', this.$myfunction.copyData(this.form))
        this.dialogClose()
      },
      resetForm() {
        this.form=this.$options.data().form
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
