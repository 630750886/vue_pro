<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" v-if="dialogVisible" width="30%" @close="dialogClose()" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="90px">
        <el-form-item label="活动类型"  prop="activityTypeName">
          <el-select-template :data="activityType"  @getData="setactivitytype" :vselect="vseleceted"></el-select-template>
        </el-form-item>
        <el-form-item label="活动名称"  prop="activityName">
          <el-input v-model="form.activityName" clearable></el-input>
        </el-form-item>

      </el-form>
      <dialog-button resetBtn="false" :cancelBtn="{show:false}" @okBtn="submitFormData" ok-btn="新建" @cancelBtn="dialogClose()"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import DialogButton from '../../../acomponents/DialogButton.vue'
  import ElSelectTemplate from '../../../acomponents/ElSelectTemplate.vue'

  export default {
    components: {
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
          activityName:"",
          activityTypeName:"",
          activityTypeKeyId:""
        },
        //表单验证规则
        formRules: {
          activityName:[{ required: true, message: '请输入必填项', trigger: 'blur' }],
          activityTypeName:[{ required: true, message: '请输入必填项', trigger: 'blur' }]
        },
        vseleceted:{
          id:7,name:'公益'
        },
        activityType:[
          {id:1,name:'年会'},
          {id:2,name:'旅游'},
          {id:3,name:'拓展'},
          {id:4,name:'节日'},
          {id:5,name:'协会'},
          {id:6,name:'文体'},
          {id:7,name:'公益'},
          {id:8,name:'其他'},
        ]
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      setactivitytype(data)
      {
         this.form.activityTypeName=data.name;
         this.form.activityTypeKeyId=data.id;
      },
      dialogClose() {
        this.dialogVisible = false
        this.$refs.formRef.resetFields()
      },
      submitFormData() {
        console.log(this.form);
        this.$refs.formRef.validate(valid => {
          if (valid) {
          this.$emit('getFormData', this.$myfunction.copyData(this.form))
          this.dialogClose()
          }else
          {
            this.$message.success("数据录入完不完整!请确认!")
          }
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
