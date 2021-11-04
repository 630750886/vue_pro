<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible"  v-if="dialogVisible" :width="width"
               @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="120px">
        <el-form-item label="报告名称" prop="reportsName">
					<el-input v-model="form.reportsName"></el-input>
				</el-form-item>
				<el-form-item label="报告附件" prop="reportsAttachFile">
          <upload-button v-model="form.reportsAttachFile" module-type="xm" file-name="报告附件" :base-id="currentItem.keyid"></upload-button>
				</el-form-item>
      </el-form>
      <dialog-button reset-btn="false" :cancelBtn="{show:false}"
                     @okBtn="submitForm" @cancelBtn="dialogClose"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import {mapState} from 'vuex'
  export default {
    components: {

    },
    props: {
      title: '',
      width: '',
      labelWidth: {
        type: String,
        default: '130px'
      }
    },
    watch: {},
    computed:{
      ...mapState('workbench', {
        currentItem: 'currentItem'
      })
    },
    //数据节点
    data() {
      return {
        dialogVisible: false,
        form:{
          reportsName:'',
          reportsAttachFile:'',
        },
        formRules:{
          reportsName:[
            { required: true, message: '请输入必填项', trigger: 'blur' }
          ],
          reportsAttachFile:[
            { required: true, message: '请输入必填项', trigger: 'blur' }
          ]
      }
    }
  },
    //自定义函数节点
    methods: {
      openDialog() {
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
        this.form=this.$options.data().form
      },
      submitForm() {
        this.$refs.formRef.validate((valid) => {
          if (valid) {
            this.$emit('getFormData',this.$myfunction.copyData(this.form))
            this.dialogClose()
          }else
          {
            this.$message.success("数据录入完不完整!请确认!")
          }
        });

      },
    }
  }
</script>
<style lang='less' scoped>

</style>
