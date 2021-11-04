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
         <el-select v-model="form.businessTypekeyid" placeholder="请选择" @change="getsealType" style="width: 245px;">
            <el-option
            v-for="item in sealType"
            :key="item.keyid"
            :label="item.listname"
            :value="item.keyid">
            </el-option>
				</el-select>
        </el-form-item>
        <el-form-item label="政策法规名称" prop="policiesName">
          <el-input v-model="form.policiesName" style="width: 245px;" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="发布日期" prop="policiesName">
          <el-date-picker v-model="form.publish[0]"  type="date" placeholder="选择日期" value-format="yyyy/MM/dd" style="width: 120px;">
              </el-date-picker>-
           <el-date-picker v-model="form.publish[1]"  type="date" placeholder="选择日期" value-format="yyyy/MM/dd" style="width: 120px;">
              </el-date-picker>
        </el-form-item>
        <el-form-item label="实施日期" prop="policiesName">
          <el-date-picker v-model="form.begindateTime[0]"  type="date" placeholder="选择日期" value-format="yyyy/MM/dd" style="width: 120px;">
              </el-date-picker>-
           <el-date-picker v-model="form.begindateTime[1]"  type="date" placeholder="选择日期" value-format="yyyy/MM/dd" style="width: 120px;">
              </el-date-picker>
        </el-form-item>
      </el-form>
      <dialog-button
         ok-btn="筛 选"
        :cancelBtn="{show:false}"
        @resetBtn="resetForm"
        @okBtn="submitForm"
        @cancelBtn="dialogClose"
      ></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件

export default {
  components: {},
  props: {
    title: { type: String },
    width: { type: String },
    labelWidth: {
      type: String,
      default: "130px"
    }
  },

  watch: {},
  //数据节点
  data() {
    return {
      dialogVisible: false,
      sealType:[],
      form: {
        resourcekeyid: "TYPEZ-002",
        resourcename: "政策法规分类",
        businessTypekeyid: "",
        businessTypename: "",
        policiesName: "",
        publish:[],
        begindateTime:[]
      }
    };
  },
  //生命周期函数节点
  created() {
    this.getallcocoume();
  },
  //自定义函数节点
  methods: {
    getallcocoume()
      {
          this.javaHttp("systypelist/findbycode",{code:"TYPEZ-002"}).then(reqdata=>{
              this.sealType=reqdata.data;
          });
      },
    getsealType(data){
      let ditem= this.sealType.find((item,index)=>{
        if(item.keyid=== data){
        return item;
      }
        })
      this.form.businessTypekeyid=ditem.keyid;
      this.form.businessTypename=ditem.listname;
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
        this.$emit("getFormData", this.$myfunction.copyData(this.form));
        this.dialogClose();
    }
  }
};
</script>
<style lang="less" scoped></style>
