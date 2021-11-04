<template>
  <el-dialog :visible.sync="dialogVisible"  v-if="dialogVisible" width="50%" :title="title1" :close-on-click-modal="false">
    <el-form :model="Purchasesform" ref="formRef" :rules="formRules" label-width="20%">
			<el-form-item label="采购数量" prop="purchaseNum">
				<el-input-number v-model="Purchasesform.purchaseNum" placeholder="请输入内容" ></el-input-number>
			</el-form-item>
			<el-form-item label="采购单价" prop="purchasePrice"> 
				<el-input-number v-model="Purchasesform.purchasePrice" placeholder="请输入内容" ></el-input-number>
			</el-form-item>
			<el-form-item label="采购总价" prop="purchaseSum">
				 <el-input-number v-model="Purchasesform.purchaseSum" placeholder="请输入内容" ></el-input-number>
			</el-form-item>
    </el-form>

    <dialog-button :resetBtn="{show:false}" :cancelBtn="{show:false}" okBtn="确 定" @okBtn="submitFormData"
                   @cancelBtn="dialogClose"></dialog-button>
  </el-dialog>
</template>

<script>
  import DialogButton from "../../../acomponents/DialogButton.vue"
  import Station from "../../../acomponents/Station.vue"
  import ElSelectTemplate from "../../../acomponents/ElSelectTemplate.vue"
  import ElTextareaTemplate from "../../../acomponents/ElTextareaTemplate.vue"

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
    created()
    {
      resetForm();
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
        typeOptions:[
                  //弘典酒、茅台酒、飞天迎宾酒、A4纸、A3纸、安全帽、工作服
                  {id:1,name:'弘典酒'},
                  {id:2,name:'茅台酒'},
                  {id:3,name:'飞天迎宾酒'},
                  {id:3,name:'A4纸'},
                  {id:3,name:'A3纸'},
                  {id:3,name:'安全帽'},
                  {id:3,name:'工作服'},
                ],

        //表单对象
        Purchasesform:{
          //表单对象
					keyid:'',
					purchaseAppkeyid:'',
					purchasekeyid:'',
					purchaseTypekeyid:'',
					purchaseTypeName:'',//类型
					purchaseNum:0,//采购数量
					purchasePrice:0,//申请采购单价
					purchaseSum:0,//申请采购总金额
					urchaseEquipmentDesc:'',//固定资产备注 EquipmentUseApp
					purchasePutInDate:'',//日期
        },
        //表单验证规则
        formRules: {}
      }
    },
      created(){
        resetForm();
      },
    methods: {
      //设置弹窗显示
      openDialog(data) {
        this.Purchasesform=data;
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
        this.resetForm()
      },
      submitFormData() {
        //push({}) 增加  splice(3,1)删除 
        this.$emit('getFormData', this.$myfunction.copyData(this.Purchasesform));
        this.dialogClose();
      },
      resetForm() {
        this.$refs.formRef.resetFields()
      },
    }

  }
</script>

<style scoped>

</style>
