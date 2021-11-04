<template>
  <!--框架或入库合同备案对话框-->
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="90px">
        <el-form-item label="报告编号" prop="reportsCode">
          <el-input v-model="form.reportsCode"></el-input>
        </el-form-item>
        <el-form-item label="报告出具时间" prop="name">
          <rea-datepicker v-model="form.outPutdateTime"></rea-datepicker>
        </el-form-item>
        <el-form-item label="盖章扫描件" prop="name">
          <upload-button v-model="form.reportsOutAttchFile"
                         module-type="xm"
                         file-name="报告盖章扫描件"
                         :base-id="$store.state.workbench.currentItem.keyid"></upload-button>
        </el-form-item>
        <el-form-item label="编制金额(元)" prop="reportsSum">
          <el-input v-model="form.reportsSum"></el-input>
        </el-form-item>
        <el-form-item label="送审金额(元)" prop="sendAuditSum">
          <el-input v-model="form.sendAuditSum"></el-input>
        </el-form-item>
        <el-form-item label="审定金额(元)" prop="auditSignSum">
          <el-input v-model="form.auditSignSum"></el-input>
        </el-form-item>
        <rea-divider title="造价工程师执业章"></rea-divider>
        <com-add-person v-model="form.personName"></com-add-person>
        <rea-divider></rea-divider>
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
          personName:[]
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
          if (ref.personName.indexOf(',')!==-1) {
            ref.personName=ref.personName.split(',')
          }else {
            let arr=[]
            if (ref.personName!=='') {
              arr.push(ref.personName)
            }
            ref.personName=arr
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
        this.form.personName=this.form.personName.join(',')
        this.form.auditUpSum=parseInt(this.form.sendAuditSum)-parseInt(this.form.auditSignSum)
        this.form.auditDownSum=(this.form.auditUpSum/parseInt(this.form.sendAuditSum)*100).toFixed(2)+'%'
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
