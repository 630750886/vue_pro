<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      width="50%"
      @close="dialogClose()"
      :close-on-click-modal="false"
    >
      <el-form
        :model="form"
        ref="formRef"
        :rules="formRules"
        label-width="120px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="保险类型">
              <el-select-template :data="safetype"  v-model="value" @getData="getsafetype"></el-select-template>
            </el-form-item>
            <el-form-item label="保险公司名称">
              <el-input v-model="form.safeCompanyName" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="保险公司联系人">
              <el-input v-model="form.safeCompanyPerson" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="保险有效期">
              <rea-datescope
                  v-model="datadefault"
                  value-type="array"
              ></rea-datescope>
<!--              <date-picker-scope  @getData="getdate" v-model="datadefault"></date-picker-scope>-->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="保险公司联系人电话">
              <el-input v-model="form.safeCompanyPhone" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="保险金额(元)">
              <el-input-number v-model="form.safeSum" :min="0" :max="900000" label="保险金额" :controls="false"></el-input-number>
            </el-form-item>
            <el-form-item label="保险扫描件">
              <upload-button v-model="form.safeVehicleAttachFile"></upload-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <dialog-button
        resetBtn="false"
        :okBtn="comman=='adds'?'新增':'保存'"
        :cancelBtn="{show:false}"
        @okBtn="submitFormData"
        @cancelBtn="dialogClose()"
      ></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import DialogButton from "../../../acomponents/DialogButton.vue";
import ElSelectTemplate from "../../../acomponents/ElSelectTemplate.vue";
import ElDataPickerTemplate from "../../../acomponents/ElDataPickerTemplate.vue";
import DatePickerScope from "../../../acomponents/DatePickerScope.vue";

export default {
  components: {
    DialogButton,
    ElSelectTemplate,
    ElDataPickerTemplate,
    DatePickerScope,
  },
  props: {
    title: { type: String },
    station: {
      type: Object,
      default: () => {
        return {
          organize: []
        };
      }
    },
    comman:{type:String,
			        default:'adds'
					}
  },
  watch: {},
  //数据节点
  data() {
    return {
      dialogVisible: false,
      //表单对象
      form: {
        vehicleKeyId:'',
        safeTypeId:'',
        safeTypeName:'',
        safeCompanyName:'',
        safeCompanyPerson:'',
        safeCompanyPhone:'',
        safeSum:0,
        safeVehicleAttachFile:'',
        safeBeginDate:'',
        safeEndDate:''
      },
      safetype:[
                  { id: 1, name: '交强险' },
                  { id: 2, name: '第三者责任险' },
                  { id: 3, name: '车上司机责任险不计免赔率' },
                  { id: 4, name: '车上司机责任险' },
                  { id: 5, name: '车上乘客责任险不计免赔率' },
                  { id: 6, name: '车上乘客责任险' },
                  { id: 7, name: '三责不计免赔率' }
                ],
      value:{id:'',name:''},
      //表单验证规则
      formRules: {},
      datadefault:[],
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    getdate(data)
			{
				if (data!==null)
				{
					this.form.safeBeginDate=data[0];
					this.form.safeEndDate=data[1];
				}
			},
    getsafetype(data)
    {
      this.form.safeTypeId=data.id;
      this.form.safeTypeName=data.name;
    },
    dialogClose() {
      this.dialogVisible = false;
      this.$refs.formRef.resetFields();
    },
    submitFormData() {
      this.$refs.formRef.validate(valid => {
        this.form.safeBeginDate=this.datadefault[0];
        this.form.safeEndDate=this.datadefault[1];
        if (!valid) return;
        this.$emit("getFormData", this.$myfunction.copyData(this.form));
        this.dialogClose();
      });
    },
    openDialog(data) {
      if (this.comman==="adds")
			  {
				  this.form.vehicleKeyId=data.keyid;
			  }
			  else
			  {
				this.form=data;
        this.value.id=this.form.safeTypeId;
        this.value.name=this.form.safeTypeName;
          this.datadefault=[]
        this.datadefault.push(this.form.safeBeginDate);
				this.datadefault.push(this.form.safeEndDate);
			  }
      this.dialogVisible = true;
    }
  }
};
</script>
<style lang="less" scoped>
.btn-right {
  float: right;
  margin-right: 0 !important;
}
</style>
