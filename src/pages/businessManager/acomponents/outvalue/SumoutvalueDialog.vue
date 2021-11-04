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
      <el-form
        :model="form"
        ref="formRef"
        :rules="formRules"
        label-width="80px"
      >
        <el-form-item label="合同编号" prop="contractCode">
        </el-form-item>
        <el-form-item label="合同名称" prop="contractName">
          <el-input v-model="form.contractName" disabled style="width:290px"></el-input>
        </el-form-item>

        <el-form-item label="项目名称" prop="projectName">
          
        </el-form-item>
      </el-form>
      <dialog-button
        reset-btn="false"
        :cancelBtn="{show:false}"
        :okBtn="{title:'新建'}"
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
  watch: {
    
  },
  computed: {
  },
  //数据节点 ,"招标代理合同"
  data() {
    return {
      dialogVisible: false,
      form: {
        contractTypeCode: "",
        contractTypeName: "",
        contractKeyid: "",
        contractCode: "",
        contractName: "",
        projectCode: "",
        projectName: "",
        projectOrgCode: "",
        projectOrgName: "",
      },
      formRules: {
         contractCode: [{ required: true, message: '请输入必填项', trigger: 'blur' }
          ],
          contractName: [
            { required: true, message: '请输入必填项', trigger: 'blur' }
          ],
           projectName: [
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
    openDialog() {
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
