<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" v-if="dialogVisible" width="30%" @close="dialogClose()" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="90px">
        <el-form-item label="同行人员" prop="useVehiclePerson" label-width="120px">
          <el-input v-model="form.useVehiclePerson" clearable></el-input>
        </el-form-item>
        <el-form-item label="目的地" prop="useVehicleaddress" label-width="120px">
          <el-input v-model="form.useVehicleaddress" clearable></el-input>
        </el-form-item>
        <el-form-item label="发车时间" prop="useVehicleBeginDate" label-width="120px">
          <el-date-picker
      v-model="form.useVehicleBeginDate"
      type="date"
      format="yyyy/MM/dd"
      value-format="yyyy/MM/dd"
      placeholder="选择日期">
    </el-date-picker>
        </el-form-item>
        <el-form-item label="返回公司时间" prop="useVehicleEndDate" label-width="120px">
          <el-date-picker
      v-model="form.useVehicleEndDate"
      type="date"
      value-format="yyyy/MM/dd"
      format="yyyy/MM/dd"
      placeholder="选择日期">
    </el-date-picker>
        </el-form-item>
        <el-form-item label="用车事由" prop="useVehicleDesc" label-width="120px">
          <el-input v-model="form.useVehicleDesc" clearable></el-input>
        </el-form-item>
      </el-form>
      <dialog-button resetBtn="false" :cancelBtn="{show:false}" @okBtn="submitFormData" @cancelBtn="dialogClose()"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import DialogButton from '../../../acomponents/DialogButton.vue'
  import ElSelectTemplate from '../../../acomponents/ElSelectTemplate.vue'
  import ElTextareaTemplate from "../../../acomponents/ElTextareaTemplate.vue";
  import ElDataPickerTemplate from "../../../acomponents/ElDataPickerTemplate.vue";

  export default {
    components: {
      ElTextareaTemplate,
      DialogButton,
      ElSelectTemplate,
      ElDataPickerTemplate
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
        form:{

        },
        //表单验证规则
        formRules: {
          useVehiclePerson:[{ required: true, message: '请输入必填项', trigger: 'blur' }],
          useVehicleaddress:[{ required: true, message: '请输入必填项', trigger: 'blur' }],
          useVehicleBeginDate:[{ required: true, message: '请输入必填项', trigger: 'blur' }],
          useVehicleEndDate:[{ required: true, message: '请输入必填项', trigger: 'blur' }],
          useVehicleDesc:[{ required: true, message: '请输入必填项', trigger: 'blur' }]   
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
