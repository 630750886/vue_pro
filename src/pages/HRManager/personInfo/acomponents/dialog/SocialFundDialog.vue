<template>
  <div>
    <el-dialog :title="title" :visible.sync="socialDialogVisible" width="30%" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="socialForm" ref="socialFormRef" :rules="socialFormRules" label-width="100px">
        <el-form-item label="上传类型" prop="uploadType">
          <el-select v-model="socialForm.uploadType" placeholder="请选择" value="">
            <el-option
                    v-for="item in type"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传数据月份" prop="uploadTime">
          <el-date-picker
                  v-model="socialForm.uploadTime"
                  type="month"
                  placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="附件">
          <el-button type="text">附件上传</el-button>
        </el-form-item>
      </el-form>
      <el-row>
        <dialog-button :resetBtn="{show:false}" :cancelBtn="{show:false}" okBtn="确 定" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>
      </el-row>
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
        socialDialogVisible:false,
        socialForm:{
          uploadType:'',
          uploadTime:'',
        },
        socialFormRules:{

        },
        type:[
          {id:1,name:'社保'},
          {id:2,name:'公积金'}
        ]
      }
    },
    //生命周期函数节点
    created () {
    },
    //自定义函数节点
    methods: {
      dialogClose(){
        this.socialDialogVisible=false
        this.$refs.socialFormRef.resetFields()
      },
      submitFormData(){
        this.$refs.socialFormRef.validate(valid=>{
          if (!valid) return
          this.$emit('getFormData',this.socialForm)
          this.dialogClose()
        })
      },
      openDialog(){
        this.socialDialogVisible=true
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
