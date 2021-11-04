<template>
  <!--框架或入库合同备案对话框-->
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="120px">
        <el-form-item label="质询形式" prop="inquiryWayName">
          <rea-select v-model="form.inquiryWayName" :data="type" prop="name" label="name"></rea-select>
        </el-form-item>
        <el-form-item v-if="form.inquiryWayName==='书面形式答复质询'" label="附件" prop="inquiryAttachFile">
          <upload-button v-model="form.inquiryAttachFile"
                         module-type="xm"
                         file-name="书面形式答复质询附件"
                         :base-id="$store.state.workbench.currentItem.keyid"></upload-button>
        </el-form-item>
        <template v-if="form.inquiryWayName==='出庭或出场接收质询'">
          <el-form-item  label="出庭或出场日期" prop="inquirydateTime">
            <rea-datepicker v-model="form.inquirydateTime"></rea-datepicker>
          </el-form-item>
          <el-form-item  label="出庭人" prop="name">
            <el-input v-model="form.inquiryPersonName"></el-input>
          </el-form-item>
        </template>
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
          inquiryWayName:'',
          inquiryAttachFile:'',
          inquirydateTime:'',
          inquiryPersonName:''
        },
        formRules: {},
        type:[
          {id:1,name:'书面形式答复质询'},
          {id:2,name:'出庭或出场接收质询'},
        ]
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      openDialog(data) {
        if (data !== undefined) {
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
