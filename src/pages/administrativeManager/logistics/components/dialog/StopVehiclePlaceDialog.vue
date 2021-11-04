<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible"  v-if="dialogVisible" width="30%" @close="dialogClose()" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="100px">
        <el-form-item label="车位停放点">
          <el-input v-model="form.vehicleParkingName" clearable></el-input>
        </el-form-item>
        <el-form-item label="车位费用/元">
          <el-input-number v-model="form.paymoney" :controls="false"></el-input-number>
        </el-form-item>
        <el-form-item label="费用缴纳类型">
          <el-select-template :data="playtype" @getData="getselectitemplaytype"></el-select-template>
        </el-form-item>
        <el-form-item label="车位使用时间">
          <date-picker-scope  @getData="getdate" v-model="datadefault"></date-picker-scope>
        </el-form-item>
        <el-form-item label="车位缴费人">
          <el-select-template :data="payCostType" v-model="selectdefault" @getData="getselectpitem"></el-select-template>
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
  import DatePickerScope from "../../../acomponents/DatePickerScope.vue";
  import QueryInput from "../../../acomponents/QueryInput.vue";

  export default {
    components: {
      QueryInput,
      ElTextareaTemplate,
      DialogButton,
      ElSelectTemplate,
      ElDataPickerTemplate,
      DatePickerScope
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
        num: 1,
        //表单对象
        form: {
          keyid:'',
          vehicleParkingName: '',
          payVehicleCostTypeKeyId:'',
          payVehicleCostTypeName:'',
          paymoney:0,
          payPersonKeyid:'',
          payPersonName:'',
          stopBeginDate:'',
          stopEndDate:'',
          useVehicleParkingLists:[]
        },
        datadefault:[],
        parking:[],
        //表单验证规则
        formRules: {},
        playtype:[
						{id:1,name:'月'},
						{id:2,name:'季度'},
						{id:3,name:'半年'},
						{id:4,name:'1年'},
						{id:5,name:'2年'},
						{id:6,name:'3年'},
						{id:7,name:'其他'},
						],
        payCostType: [
          {id: 1, name: '公司缴费'},
          {id: 2, name: '个人缴费'},
        ],
        UseVehicle:{
          keyid:'',
          vehicleParkingKeyid:'',
          vehicleCode:'',
          vehiclePerson:''
        }
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      adduseVehic()
      {
        let usevehic={vehicleParkingKeyid:this.form.keyid,vehicleCode:'',vehiclePerson:''};
        this.form.useVehicleParkingLists.push(usevehic);
      },
      getselectitemplaytype(item){
         this.form.payVehicleCostTypeKeyId=item.id;
         this.form.payVehicleCostTypeName=item.name;
      },
      getselectpitem(item){
         this.form.payPersonKeyid=item.id;
         this.form.payPersonName=item.name;
      },
      getdate(data)
      {
        if (data!==null)
          {
            this.form.stopBeginDate=data[0];
            this.form.stopEndDate=data[1];
          }
      },
      dialogClose() {
        this.dialogVisible = false
        this.$refs.formRef.resetFields()
      },
      submitFormData() {
        //this.$refs.formRef.validate(valid => {
        //  if (!valid) return
          this.$emit('getFormData', this.$myfunction.copyData(this.form))
          this.dialogClose()
        //})
      },
      openDialog(data) {
        this.form=data;
        this.datadefault.push(data.stopBeginDate);
        this.datadefault.push(data.stopEndDate);
        this.parking=data.useVehicleParkingLists;
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
