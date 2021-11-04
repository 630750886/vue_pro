<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
       v-if="dialogVisible"
      :width="width"
      @close="dialogClose"
      append-to-body
      :close-on-click-modal="false"
    >
       <el-form :model="form" ref="formRef"
        :rules="formRules"
        label-width="80px">
        <el-form-item label="开始时间" prop="begindateTime">
          <el-date-picker
              v-model="form.begindateTime"
              type="date"
              format="yyyy/MM/dd"
              value-format="yyyy/MM/dd"
              placeholder="开始时间">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="enddateTime">
          <el-date-picker
            v-model="form.enddateTime"
            type="date"
            format="yyyy/MM/dd"
            value-format="yyyy/MM/dd"
            placeholder="结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="调整说明" prop="changeDesc">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入调整说明"
            v-model="form.changeDesc"
            minlength=50>
          </el-input>
        </el-form-item>
       
      </el-form>
      <dialog-button
        reset-btn="false"
        :cancelBtn="{show:false}"
        :okBtn="{title:'调整'}"
        @okBtn="submitForm"
        @cancelBtn="dialogClose"
      ></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
//import {createNamespacedHelpers} from 'vuex'
//const {mapState, mapGetters, mapMutations, mapActions} = createNamespacedHelpers('loadType')
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
  //数据节点 ,"招标代理合同"
  data() {
    return {
      dialogVisible: false,
      form: {
        projectKeyid:"", //项目编号
	      projectName:"",//项目名称
        begindateTime: "",
        enddateTime: "",
        changeDesc: "",
        accomplishdateTime: "",
        placeonfiledateTime: "",
      },
      formRules: {
         begindateTime: [{ required: true, message: '请输入必填项', trigger: 'blur' }
          ],
         enddateTime: [
            { required: true, message: '请输入必填项', trigger: 'blur' }
          ],
        changeDesc:[
            { required: true, message: '请输入必填项', trigger: 'blur' }
          ]
      }
    };
  },
  //生命周期函数节点
  created() {
  },
  //自定义函数节点
  methods: {
    openDialog(data) {
      this.form=data;
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
      this.form = this.$options.data().form;
      this.$refs.formRef.resetFields();
    },
    submitForm() {
        console.log(this.form);
        this.$refs.formRef.validate((valid) => {
          if (valid) {
              this.$emit("getFormData", this.$myfunction.copyData(this.form));
              this.dialogClose();
          }else
          {
            this.$message.success("数据录入不完整!请确认!")
          }
         });
    }
  }
};
</script>
<style lang="less" scoped></style>
