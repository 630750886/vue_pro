<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible"  v-if="dialogVisible" :width="width"
               @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="75px">
        <el-form-item label="平台名称" prop="tpname">
					<el-input v-model="form.tpname"></el-input>
				</el-form-item>
        <el-form-item label="平台网址" prop="tpurl">
					<el-input v-model="form.tpurl"></el-input>
				</el-form-item>
        <el-form-item v-if="addType" label="地址" prop="tpaddress">
          <el-input v-model="form.tpaddress"></el-input>
				</el-form-item>
        <el-form-item v-if="addType" label="电话" prop="tpphone">
          <el-input v-model="form.tpphone"></el-input>
				</el-form-item>
        <el-form-item v-if="addType" label="办事流程图" prop="tpFlowFile">
          <upload-button v-model="form.tpFlowFile"></upload-button>
        </el-form-item>
        <el-form-item v-if="addType" label="开户行" prop="tpBankName">
          <el-input v-model="form.tpBankName"></el-input>
				</el-form-item>
        <el-form-item v-if="addType" label="账号" prop="tpAccountCode">
          <el-input v-model="form.tpAccountCode"></el-input>
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
        dialogVisible: false,
        addType:false,
        form: {
          tpname:'',
          tpurl:'',
          tpaddress:'',
          tpphone:'',
          tpFlowFile:'',
          tpBankName:'',
          tpAccountCode:'',

        },
        formRules: {
          tpname:[{ required: true, message: '名称不能为空', trigger: 'blur' }],
          tpurl:[{  pattern:/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/|www\.)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/, required: true, message: '请输入正确的网站，格式http://或https://', trigger: 'blur' }],
          tpaddress:[],
          tpphone:[],
          tpFlowFile:[],
          tpBankName:[],
          tpAccountCode:[]

        },
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      openDialog(data,addType) {
        if (!this.$myfunction.isEmpty(data)) {
          this.form=this.$myfunction.copyData(data)
        }
        this.addType=addType
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
