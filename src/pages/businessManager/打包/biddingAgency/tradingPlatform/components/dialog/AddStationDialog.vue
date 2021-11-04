<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible"  v-if="dialogVisible" :width="width"
               @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="110px">
        <el-form-item label="网站名称" prop="webSiteName">
					<el-input v-model="form.webSiteName"></el-input>
				</el-form-item>
        <el-form-item label="网站网址" prop="webSiteUrl">
          <el-input v-model="form.webSiteUrl"></el-input>
				</el-form-item>
        <el-form-item v-if="addType" label="用户" prop="webSiteUserName">
          <el-input v-model="form.webSiteUserName" ></el-input>
				</el-form-item>
        <el-form-item v-if="addType" label="密码" prop="webSitePassWord">
          <el-input v-model="form.webSitePassWord"></el-input>
				</el-form-item>
        <el-form-item v-if="addType" label="发布程序流程图">
          <upload-button v-model="form.webSiteOparationFlowFile"></upload-button>
        </el-form-item>
      </el-form>
      <dialog-button reset-btn="false"  :cancelBtn="{show:false}" :okBtn="addType?'保存':'新建'" @okBtn="submitForm" @cancelBtn="dialogClose"></dialog-button>
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
      width: '',
      labelWidth: {
        type: String,
        default: '130px'
      }
    },
    watch: {},
    //数据节点
    data() {
      return {
        addType:false,
        dialogVisible: false,
        form: {
          webSiteName:'',
          webSiteUrl:'',
          webSiteUserName:'',
          webSitePassWord:'',
          webSiteOparationFlowFile:'',

        },
        formRules: {
          webSiteName:[{ required: true, message: '名称不能为空', trigger: 'blur' }],
          webSiteUrl:[{  pattern:/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/|www\.)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/, required: true, message: '请输入正确的网站，格式http://或https://', trigger: 'blur' }],
          webSiteUserName:[],
          webSitePassWord:[]
        },
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      itemTypeChange(value) {

      },
      openDialog(data,addType) {
        this.addType=addType
        if (!this.$myfunction.isEmpty(data)) {
          this.form=this.$myfunction.copyData(data)
        }
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
        this.form=this.$options.data().form
      },
      submitForm() {
        this.$emit('getFormData', this.$myfunction.copyData(this.form))
        this.dialogClose()
      },
    }
  }
</script>
<style lang='less' scoped>

</style>
