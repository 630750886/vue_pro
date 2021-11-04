<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" v-if="dialogVisible" width="30%" @close="dialogClose()" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="90px">
        <el-form-item label="文件类型" prop="userName" label-width="120px">
          <el-select-template :data="documentType"></el-select-template>
        </el-form-item>
        <el-form-item label="文件名称" prop="userName" label-width="120px">
          <el-input v-model="form.userName" clearable></el-input>
        </el-form-item>
        <el-form-item label="文件编号" prop="userName" label-width="120px">
          <el-input v-model="form.userName" clearable></el-input>
        </el-form-item>
        <el-form-item label="文件电子版" prop="userName" label-width="120px">
          <el-button type="text">附件上传</el-button>
        </el-form-item>
        <el-form-item label="内容摘要" prop="userName" label-width="120px">
          <el-textarea-template></el-textarea-template>
        </el-form-item>
        <el-form-item label="发文组织" prop="userName" label-width="120px">
          <query-input></query-input>
        </el-form-item>
        <el-form-item label="发文日期" prop="userName" label-width="120px">
          <el-data-picker-template></el-data-picker-template>
        </el-form-item>
        <el-form-item label="盖章文件扫描件" prop="userName" label-width="120px">
          <el-button type="text">附件上传</el-button>
        </el-form-item>
      </el-form>
      <dialog-button resetBtn="false" :cancelBtn="{show:false}"  @okBtn="submitFormData" @cancelBtn="dialogClose()"></dialog-button>
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
          {id:1,name:'规章制度'},
          {id:2,name:'活动通知'},
          {id:3,name:'培训通知'},
          {id:4,name:'奖励通知'},
          {id:5,name:'处罚通知'},
          {id:6,name:'其他文件'},
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
