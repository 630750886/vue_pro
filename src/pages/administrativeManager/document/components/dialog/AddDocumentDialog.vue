<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" v-if="dialogVisible" width="30%" @close="dialogClose()" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="75px">
        <el-form-item label="新建类型" prop="documentTypeKeyId">
          <el-select-template :data="documentType" @getData="getdata"></el-select-template>
        </el-form-item>
        <el-form-item label="名称" prop="documentName">
          <el-input v-model="form.documentName" clearable></el-input>
        </el-form-item>
      </el-form>
      <dialog-button resetBtn="false" :cancelBtn="{show:false}" @okBtn="submitFormData" ok-btn="新建"   @cancelBtn="dialogClose()"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import DialogButton from '../../../acomponents/DialogButton.vue'
  import ElSelectTemplate from '../../../acomponents/ElSelectTemplate.vue'
  import QueryInput from "../../../acomponents/QueryInput.vue";

  export default {
    components: {
      QueryInput,
      DialogButton,
      ElSelectTemplate
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
          documentTypeKeyId:"",
          documentTypeName:"",
          documentName:""
        },
        //表单验证规则
        formRules: {
          documentTypeKeyId:[{ required: true, message: '请输入必填项', trigger: 'blur' }],
          documentName:[{ required: true, message: '请输入必填项', trigger: 'blur' }]
        },
        documentType:[
          {id:1,name:'红头文件'},
          {id:2,name:'普通文件'},
          {id:3,name:'会议管理'},
          {id:4,name:'规章制度'},
        ]
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      getdata(item)
      {
        this.form.documentTypeKeyId=item.id;
        this.form.documentTypeName=item.name;
      },
      dialogClose() {
        this.dialogVisible = false
        this.$refs.formRef.resetFields()
      },
      submitFormData() {
         this.$refs.formRef.validate((valid) => {
          if (valid) {
          this.$emit('getFormData', this.$myfunction.copyData(this.form))
          this.dialogClose()
          }else
          {
            this.$message.success("数据录入不完整!请确认!")
          }
         });

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
