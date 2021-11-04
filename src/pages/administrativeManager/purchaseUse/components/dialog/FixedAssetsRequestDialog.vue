<template>
  <el-dialog :visible.sync="dialogVisible"  v-if="dialogVisible" width="50%" :title="title1" :close-on-click-modal="false">
    <el-form :model="form" ref="formRef" :rules="formRules" label-width="20%">
      <el-form-item label="类型" prop="purchaseTypekeyid">
        <el-select-template :data="typeOptions"  v-model="form.purchaseTypeName" @getData="gettypedata"></el-select-template>
      </el-form-item>

      <el-form-item label="采购申请理由" prop="purchaseAppreason">
        <el-input v-model="form.purchaseAppreason" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="用途说明" prop="purchaseAppUse">
       <el-input v-model="form.purchaseAppUse" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="申请采购数量" prop="purchaseAppSum">
        <el-input-number v-model="form.purchaseAppSum" placeholder="请输入内容" :controls="false"></el-input-number>
      </el-form-item>
      <el-form-item label="申请采购预估总金额(元)" prop="purchaseAppCost">
        <el-input-number v-model="form.purchaseAppCost" placeholder="请输入内容" :controls="false"></el-input-number>
      </el-form-item>

    </el-form>

    <dialog-button :resetBtn="{show:false}" :cancelBtn="{show:false}" okBtn="提 交" @okBtn="submitFormData"
                   @cancelBtn="dialogClose"></dialog-button>
  </el-dialog>
</template>

<script>
  import DialogButton from "../../../acomponents/DialogButton.vue"
  import Station from "../../../acomponents/Station.vue"
  import ElSelectTemplate from "../../../acomponents/ElSelectTemplate.vue"
  import ElTextareaTemplate from "../../../acomponents/ElTextareaTemplate.vue"
//purchaseAppTypekeyid
//purchaseAppTypekeyid
  export default {
    components: {
      DialogButton,
      Station,
      ElSelectTemplate,
      ElTextareaTemplate
    },
    props: {
      title: {
        type: String,
        dealt: ''
      }
    },
    watch: {
      title(newValue) {
        this.title = newValue
      }
    },
    mounted() {
    },
    data: function () {

      return {

        //父窗口传递的弹窗标题
        title1: this.title,
        //弹窗显示控制
        dialogVisible: false,
        //类型
        typeOptions: [
          //办公家具、电子设备、交通运输设备、项目物品
          {id: 1, name: '办公家具'},
          {id: 2, name: '电子设备'},
          {id: 3, name: 'CA交通运输设备'},
          {id: 3, name: '项目物品锁'},
        ],

        //表单对象
        form: {
          purchaseAppTypekeyid:'001',
          purchaseAppTypeName:' 固定资产',
          purchaseTypeName:'',
          purchaseTypekeyid:'',
          purchaseAppreason:'',//采购申请理由
          purchaseAppUse:'',//用途说明
          purchaseAppSum:0,//申请采购数量
          purchaseAppCost:.0,//申请采购预估总金额
          appOrgKeyId:'',
          appOrgName:'',//申请组织
          appPersonKeyId:'',
          appPersonName:'',//申请人
          purchaseAppDesc:'',//描述
          purchaseAppDate:''//申请日期
        },
        //表单验证规则
        formRules: {
            purchaseTypekeyid:[{ required: true, message: '请输入必填项', trigger: 'blur' }],
            purchaseAppreason:[{ required: true, message: '请输入必填项', trigger: 'blur' }],
            purchaseAppUse:[{ required: true, message: '请输入必填项', trigger: 'blur' }],
            purchaseAppSum:[{ required: true, message: '请输入必填项', trigger: 'blur' }],
            purchaseAppCost:[{ required: true, message: '请输入必填项', trigger: 'blur' }]
          }
      }
    },

    methods: {

      gettypedata(item)
      {
           this.form.purchaseTypeName=item.name;
           this.form.purchaseTypekeyid=item.id;
      },
      //设置弹窗显示
      openDialog() {
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
        this.resetForm()
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
      resetForm() {
        this.$refs.formRef.resetFields()
      }
    }

  }
</script>

<style scoped>

</style>
