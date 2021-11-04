<template>
  <el-dialog :visible.sync="dialogVisible"
             width="30%"
             :title="title1"
             :close-on-click-modal="false">
    <el-form :model="form"
             ref="formRef"
             :rules="formRules"
             label-width="20%">
      <el-form-item label="退款时间">
        <rea-datepicker v-model="form.creatTime"></rea-datepicker>
        <!-- <el-date-picker v-model="form.date" format="yyyy/MM/dd" value-format="yyyy-MM-dd"></el-date-picker> -->
      </el-form-item>
      <el-form-item label="退款金额"
                    prop="drawbackMoney">
        <el-input v-model="form.drawbackMoney"
                  placeholder="请输入金额"></el-input>
      </el-form-item>
      <el-form-item label="退款回执单">
        <upload-button v-model="form.drawbackReturnAttach"></upload-button>
      </el-form-item>
    </el-form>

    <dialog-button :resetBtn="{ show: false }"
                   :cancelBtn="{show:false}"
                   okBtn="确 定"
                   @okBtn="submitFormData"
                   @cancelBtn="dialogClose"></dialog-button>
  </el-dialog>
</template>

<script>

import DialogButton from "../../../acomponents/DialogButton.vue";
import Station from "../../../acomponents/Station.vue";

export default {
  components: {
    DialogButton

  },
  props: {
    title: {
      type: String,
      dealt: "",
    },
  },
  watch: {
    title (newValue) {
      this.title = newValue;
    },
  },
  mounted () { },
  data: function () {
    var checkNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('金额不能为空！'));
      }
      setTimeout(() => { if (isNaN(value)) { callback(new Error('请输入数字值')) } else { callback() } }, 300);
    };
    return {
      //父窗口传递的弹窗标题
      title1: this.title,
      //弹窗显示控制
      dialogVisible: false,

      //表单对象
      form: {},
      //表单验证规则
      formRules: {
        drawbackMoney: [{ validator:checkNum, trigger: 'blur' }]
      },
    };
  },

  methods: {
    //设置弹窗显示
    openDialog (val) {
      //this.form=val;
      this.dialogVisible = true;
    },
    dialogClose () {
      this.dialogVisible = false;
      this.resetForm();
    },
    submitFormData () {
      this.$refs.formRef.validate((valid)=>{
        if(valid){
  this.$emit("getFormData", this.$myfunction.copyData(this.form));
      this.dialogClose();
        }else{
          return false;
        }
      });     
    },
    resetForm () {
      this.$refs.formRef.resetFields();
    },
  },
};
</script>

<style scoped>
</style>
