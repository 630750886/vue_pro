<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
       v-if="dialogVisible"
      :width="width"
      @close="dialogClose"
      :close-on-click-modal="false"
    >
      <el-form
        :model="form"
        ref="formRef"
        :rules="formRules"
        label-width="100px"
      >
        <el-form-item label="政策法规分类" prop="businessTypekeyid">
         <el-select v-model="form.businessTypekeyid" placeholder="请选择" @change="getsealType" style="width: 173px;">
            <el-option
            v-for="item in sealType"
            :key="item.keyid"
            :label="item.listname"
            :value="item.keyid">
            </el-option>
				</el-select>
        </el-form-item>
        <el-form-item label="政策法规名称" prop="policiesName">
          <el-input v-model="form.policiesName" style="width: 173px;" type="textarea"></el-input>
        </el-form-item>
         <el-form-item label="发布机构" prop="policiesSummary">
          <el-input v-model="form.policiesSummary" style="width: 173px;"></el-input>
        </el-form-item>
        <el-form-item label="发布日期" prop="publish">
          <el-date-picker
              v-model="form.publish"
              type="date"
              value-format="yyyy/MM/dd"
              placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="实施日期" prop="begindateTime">
          <el-date-picker v-model="form.begindateTime"  type="date" placeholder="选择日期" value-format="yyyy/MM/dd">
              </el-date-picker>
        </el-form-item>
        <el-form-item label="政策法规附件" prop="policiesAllPath">
           <upload-button v-model="form.policiesAllPath"></upload-button>
        </el-form-item>
        
      </el-form>
      <dialog-button
        reset-btn="false"
        :okBtn="{title:'新建'}"
        :cancelBtn="{show:false}"
        @okBtn="submitForm"
        @cancelBtn="dialogClose"
      ></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
// <upload-button v-model="form.file"></upload-button>
export default {
  components: {},
  props: {
    title: { type: String },
    width: { type: String },
    labelWidth: {
      type: String,
      default: "150px"
    }
  },

  watch: {},
  //数据节点
  data() {
    return {
      dialogVisible: false,
      form: {
        resourcekeyid: "TYPEZ-002",
        resourcename: "政策法规分类",
        businessTypekeyid: "",
        businessTypename: "",
        policiesName: "",
        policiesSummary:"",
        publish:"",
        begindateTime:"",
        policiesAllPath:""
      },
      sealType:[],
      formRules:{
        businessTypekeyid: [{ required: true, message: '请输入必填项', trigger: 'blur'}],
        policiesName: [{ required: true, message: '请填写资料名称', trigger: 'blur' }],
        policiesAllPath: [{ required: true, message: '请填写资料名称', trigger: 'blur' }]
      }
    };
  },
  //生命周期函数节点
  created() {
    this.getallcocoume();
  },
  //自定义函数节点
  methods: {
    getsealType(data){
      let ditem= this.sealType.find((item,index)=>{
        if(item.keyid=== data){
        return item;
      }
        })
      this.form.businessTypekeyid=ditem.keyid;
      this.form.businessTypename=ditem.listname;
      },
    getallcocoume()
      {
          this.javaHttp("systypelist/findbycode",{code:"TYPEZ-002"}).then(reqdata=>{
              this.sealType=reqdata.data;
          });
      },
    openDialog() {
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
      this.$refs.formRef.resetFields();
      this.form = this.$options.data().form;
    },
    submitForm() {
      this.$refs.formRef.validate((valid) => {
          if (valid) {
             this.$emit("getFormData", this.$myfunction.copyData(this.form));
             this.dialogClose();
          }else
          {
            this.$message.success("数据录入完不完整!请确认!")
          }
        });
    }
  }
};
</script>
<style lang="less" scoped></style>
