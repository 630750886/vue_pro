<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" v-if="dialogVisible" width="30%" @close="dialogClose()" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="90px">
        <el-form-item label="社会角色名称"  prop="socialRoleName">
          <el-input v-model="form.socialRoleName" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="任职单位"  prop="socialRoleOrg">
          <el-input v-model="form.socialRoleOrg" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="证明材料">
          <upload-button
                v-model="form.socialRoleAttachFile"
                :data="{
                  documentTypeName: '相关证明材料',
                  documentTypeListName: '相关证明材料',
                  entityKeyid: form.keyid
                }"
              ></upload-button>
        </el-form-item>
      </el-form>
      <dialog-button resetBtn="false" :cancelBtn="{show:false}" ok-btn="新建" @okBtn="submitFormData" @cancelBtn="dialogClose()"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import DialogButton from '../../../acomponents/DialogButton.vue'
  import ElSelectTemplate from '../../../acomponents/ElSelectTemplate.vue'
  import QueryInput from "../../../acomponents/QueryInput.vue";
  import ElTextareaTemplate from "../../../acomponents/ElTextareaTemplate.vue";

  export default {
    components: {
      QueryInput,
      DialogButton,
      ElSelectTemplate,
      ElTextareaTemplate,
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
          keyid:'',
          socialRoleName:'',
          socialRoleOrg:'',
          socialRoleAttachFile:''
        },
        //表单验证规则
        formRules: {
          socialRoleName:[{ required: true, message: '请输入必填项', trigger: 'blur' }],
          socialRoleOrg:[{ required: true, message: '请输入必填项', trigger: 'blur' }]
        }
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
        //this.$refs.formRef.validate(valid => {
         // if (!valid) return
          this.$refs.formRef.validate((valid) => {
          if (valid) {
          this.$emit('getFormData', this.$myfunction.copyData(this.form))
          this.dialogClose()
          }else
          {
            this.$message.success("数据录入不完整!请确认!")
          }
         });

       // })
      },
      openDialog(data) {
				if(data!==undefined){
					this.form=data
				}
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
