<template>
  <div>
    <el-dialog :title="title" :visible.sync="salaryDialogVisible" width="30%" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="salaryForm" ref="salaryFormRef" :rules="salaryFormRules" label-width="100px">
        <el-form-item label="上传数据月份" prop="uploadTime">
          <el-date-picker
                  v-model="salaryForm.uploadTime"
                  type="month"
                  placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="附件">
          <el-button type="text">附件上传</el-button>
        </el-form-item>
      </el-form>
      <dialog-button :resetBtn="{show:false}" :cancelBtn="{show:false}" okBtn="确 定" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>
    </el-dialog>

  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components:{
    },
    props:{
      title:'',
    },
    //数据节点
    data () {
      return {
        salaryDialogVisible:false,
        salaryForm:{
          uploadTime:'',
        },
        salaryFormRules:{

        }
      }
    },
    //生命周期函数节点
    created () {
    },
    //自定义函数节点
    methods: {
      dialogClose(){
        this.$refs.salaryFormRef.resetFields()
      },
      submitFormData(){
        this.$emit('getFormData',this.salaryForm)
        this.dialogClose()
      },
      openDialog(){
        this.salaryDialogVisible=true
      }
    }
  }
</script>
<style lang='less' scoped>
  .btn-right {
    float: right;
    margin-right: 0px !important;
  }
</style>
