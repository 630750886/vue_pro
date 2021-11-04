<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" v-if="dialogVisible" width="30%" @close="dialogClose()" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="90px">
        <el-form-item label="会议类型" prop="userName" label-width="120px">
          <el-select-template :data="documentType"></el-select-template>
        </el-form-item>
        <el-form-item label="会议主题" prop="userName" label-width="120px">
          <el-input v-model="form.userName" clearable></el-input>
        </el-form-item>
        <el-form-item label="会议编号" prop="userName" label-width="120px">
          <el-input v-model="form.userName" clearable></el-input>
        </el-form-item>
        <el-form-item label="会议主办单位" prop="userName" label-width="120px">
          <el-input v-model="form.userName" clearable></el-input>
        </el-form-item>
        <el-form-item label="内容摘要" prop="userName" label-width="120px">
          <el-textarea-template></el-textarea-template>
        </el-form-item>
        <el-form-item label="参会人员" prop="userName" label-width="120px">
          <el-input v-model="form.userName" property="多个人员用','隔开" clearable></el-input>
        </el-form-item>
        <el-form-item label="缺勤人员" prop="userName" label-width="120px">
          <el-input v-model="form.userName" property="多个人员用','隔开" clearable></el-input>
        </el-form-item>
        <el-form-item label="会议时间" prop="userName" label-width="120px">
          <el-data-picker-template></el-data-picker-template>
        </el-form-item>
        <el-form-item label="会议地点" prop="userName" label-width="120px">
          <el-input v-model="form.userName" clearable></el-input>
        </el-form-item>
        <el-form-item label="签到表扫描件" prop="userName" label-width="120px">
          <el-button type="text">附件上传</el-button>
        </el-form-item>
        <el-form-item label="会议相关资料" prop="userName" label-width="120px">
          <el-button type="text">附件上传</el-button>
        </el-form-item>
        <el-form-item label="会议纪要扫描件" prop="userName" label-width="120px">
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
        form: {},
        //表单验证规则
        formRules: {},
        documentType: [
          {id: 1, name: '全体大会'},
          {id: 2, name: '研讨会'},
          {id: 3, name: '论坛'},
          {id: 4, name: '座谈会'},
          {id: 5, name: '专题讨论会'},
          {id: 6, name: '座谈小组'},
          {id: 7, name: '讲座'},
          {id: 8, name: '学术讨论会'},
          {id: 9, name: '辩论会'},
          {id: 10, name: '网络会议'},
          {id: 11, name: '例会'},
          {id: 12, name: '其他会议'},
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
