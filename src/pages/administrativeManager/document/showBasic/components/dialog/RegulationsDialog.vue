<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" v-if="dialogVisible" width="30%" @close="dialogClose()" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="90px">
        <el-form-item label="制度类型" prop="userName" label-width="120px">
          <el-select-template :data="documentType"></el-select-template>
        </el-form-item>
        <el-form-item label="制度名称" prop="userName" label-width="120px">
          <el-input v-model="form.userName" clearable></el-input>
        </el-form-item>
        <el-form-item label="制度编号" prop="userName" label-width="120px">
          <el-input v-model="form.userName" clearable></el-input>
        </el-form-item>
        <el-form-item label=" 制度发布日期" prop="userName" label-width="120px">
          <el-data-picker-template></el-data-picker-template>
        </el-form-item>
        <el-form-item label=" 制度执行时间" prop="userName" label-width="120px">
          <el-data-picker-template></el-data-picker-template>
        </el-form-item>
        <el-form-item label=" 制度涉及的组织" prop="userName" label-width="120px">
          <el-select-template></el-select-template>
        </el-form-item>
        <el-form-item label="制度电子版" prop="userName" label-width="120px">
          <el-button type="text">附件上传</el-button>
        </el-form-item>
      </el-form>
      <dialog-button resetBtn="false" :cancelBtn="{show:false}" @okBtn="submitFormData" @cancelBtn="dialogClose()"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件


  export default {
    components: {

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
        //表单对象
        form: {

        },
        //表单验证规则
        formRules: {

        },
        documentType:[
          {id:1,name:'公司制度'},
          {id:2,name:'部门制度'},
          {id:3,name:'其他制度'},
        ]
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      dialogClose() {
        this.dialogVisible = false
        this.$refs.formRef.resetFields()
      },
      submitFormData() {
        this.$refs.formRef.validate(valid => {
          if (!valid) return
          this.$emit('getFormData', this.$myfunction.copyData(this.form))
          this.dialogClose()
        })
      },
      openDialog() {
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
