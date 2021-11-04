<template>
  <el-dialog :visible.sync="dialogVisible"  v-if="dialogVisible" width="50%" :title="title1" :close-on-click-modal="false">
    <el-form :model="Purchasesform" ref="formRef" :rules="formRules" label-width="20%">
      <el-form-item label="采购数量">
        <el-input-number  v-model="Purchasesform.purchaseNum" @change="comNsum" :controls="false"></el-input-number>
      </el-form-item>
      <el-form-item label="采购单价">
        <el-input-number v-model="Purchasesform.purchasePrice" @change="comsum" :controls="false"></el-input-number>
      </el-form-item>
      <el-form-item label="采购总价">
        <el-input-number :disabled="true" v-model="Purchasesform.purchaseSum" :controls="false"></el-input-number>
      </el-form-item>
      <el-form-item label="供应商名称">
        <el-input v-model="Purchasesform.supplierName"></el-input>
      </el-form-item>
      <el-form-item label="供应商联系人">
        <el-input v-model="Purchasesform.supplierPerson"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="Purchasesform.supplierPhone"></el-input>
      </el-form-item>
      <el-form-item label="固定资产备注">
        <el-input v-model="Purchasesform.purchaseEquipmentDesc"></el-input>
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
        },
        Purchasesform:{
          keyid:'',
          purchaseAppkeyid:'',
          purchaseAppTypekeyid:'',
          purchaseAppTypeName:'',//类型
          purchaseNum:0,//采购数量
          purchasePrice:0,//申请采购单价
          purchaseSum:0,//申请采购总金额
          supplierName:'',//供应商名称
          supplierPerson:'',//供应商联系人
          supplierPhone:'',//联系电话
          purchaseEquipmentDesc:'',//固定资产备注
          purchaseDate:''//日期
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
        this.form=data;
        if (this.form.purchases.length>0)
        {this.Purchasesform=this.form.purchases[0];}
        else{
          this.Purchasesform.purchaseAppkeyid=this.form.keyid;
          this.Purchasesform.purchaseTypekeyid=this.form.purchaseTypekeyid;
          this.Purchasesform.purchaseTypeName=this.form.purchaseTypeName;
        }
        console.log(this.form);
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
        this.resetForm()
      },
      submitFormData() {
        //push({}) 增加  splice(3,1)删除 
        if (this.form.purchases.length>0)
        {this.form.purchases[0]=this.Purchasesform;}
        else{
          this.form.purchases.push(this.Purchasesform);
        }
        this.$emit('getFormData', this.$myfunction.copyData(this.form));
        this.dialogClose();
      },
      resetForm() {
        this.$refs.formRef.resetFields()
      },
      comsum(currentValue, oldValue)
      { console.log(currentValue);
          this.Purchasesform.purchaseSum=this.Purchasesform.purchasePrice*this.Purchasesform.purchaseNum;
      },
      comNsum(currentValue, oldValue)
      {
        console.log(currentValue);
          this.Purchasesform.purchaseSum=this.Purchasesform.purchaseNum*this.Purchasesform.purchasePrice;
      }
    }

  }
</script>

<style scoped>

</style>
