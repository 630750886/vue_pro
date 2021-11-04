<template>
  <!--框架或入库合同备案对话框-->
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible"  v-if="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="120px">
        <el-form-item label="邀请当事人参加造价核对工作通知函" prop="collatNoticefile" label-width="220px">
          <upload-button v-model="form.collatNoticefile"
                         module-type="xm"
                         file-name="邀请当事人参加造价核对工作通知函"
                         :base-id="$store.state.workbench.currentItem.keyid"></upload-button>
        </el-form-item>

        <rea-divider title="核对人"></rea-divider>
        <com-add-person v-model="form.collator"></com-add-person>
        <rea-divider></rea-divider>

        <el-form-item label="核对工作相关资料" prop="collatDataFile">
          <upload-button v-model="form.collatDataFile"
                         module-type="xm"
                         file-name="核对工作相关资料"
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
          collatNoticefile:'',
          collator:[],
          collatDataFile:'',
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
          let ref=this.$myfunction.copyData(data)
          if (ref.collator.indexOf(',')!==-1) {
            ref.collator=ref.collator.split(',')
          }else {
            let arr=[]
            arr.push(ref.collator)
            ref.collator=arr
          }
          this.form=this.$myfunction.copyData(ref)
        }
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
        this.resetForm()
      },
      submitFormData() {
        let ref =this.$myfunction.copyData(this.form)
        ref.collator=ref.collator.join(',')
        this.$emit('getFormData', ref)
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
