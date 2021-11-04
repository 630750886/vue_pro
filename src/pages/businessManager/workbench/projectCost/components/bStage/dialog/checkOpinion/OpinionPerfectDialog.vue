<template>
  <!--框架或入库合同备案对话框-->
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible"  v-if="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="150px">
        <el-form-item label="委托人征询意见稿" prop="name">
          <upload-button v-model="form.probeNoticeAFile"
                         module-type="xm"
                         file-name="委托人征询意见稿"
                         :base-id="$store.state.workbench.currentItem.keyid"></upload-button>
        </el-form-item>
        <el-form-item label="委托人回复函" prop="name">
          <upload-button v-model="form.probeNoticeAReFile"
                         module-type="xm"
                         file-name="委托人回复函"
                         :base-id="$store.state.workbench.currentItem.keyid"></upload-button>
        </el-form-item>
        <el-form-item label="当事人1征询意见函" prop="name">
          <upload-button v-model="form.probeNoticeBFile"
                         module-type="xm"
                         file-name="当事人1征询意见函"
                         :base-id="$store.state.workbench.currentItem.keyid"></upload-button>
        </el-form-item>
        <el-form-item label="当事人1回复函" prop="name">
          <upload-button v-model="form.probeNoticeBReFile"
                         module-type="xm"
                         file-name="当事人1回复函"
                         :base-id="$store.state.workbench.currentItem.keyid"></upload-button>
        </el-form-item>
        <el-form-item label="当事人2征询意见函" prop="name">
          <upload-button v-model="form.probeNoticeCFile"
                         module-type="xm"
                         file-name="当事人2征询意见函"
                         :base-id="$store.state.workbench.currentItem.keyid"></upload-button>
        </el-form-item>
        <el-form-item label="当事人2回复函" prop="name">
          <upload-button v-model="form.probeNoticeCReFile"
                         module-type="xm"
                         file-name="当事人2回复函"
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

    },
    watch: {

    },
    //数据节点
    data() {
      return {
        dialogVisible: false,
        form: {
          probeNoticeAFile:'',
          probeNoticeAReFile:'',
          probeNoticeBFile:'',
          probeNoticeBReFile:'',
          probeNoticeCFile:'',
          probeNoticeCReFile:'',
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
          this.form = this.$myfunction.copyData(data)
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
        this.$refs.formRef.resetFields()
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
