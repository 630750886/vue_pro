<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" v-if="dialogVisible" :width="width"
               @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="120px">
<!--				<el-form-item label="公告附件">-->
<!--          <upload-button v-model="form.attachFile"></upload-button>-->
<!--				</el-form-item>-->
<!--				<el-form-item label="盖章扫描件">-->
<!--          <upload-button v-model="form.needAttachFile"></upload-button>-->
<!--				</el-form-item>-->
        <el-form-item label="发布次数" prop="publicityCount">
          <el-input v-model="form.publicityCount"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" prop="publicitydateTime">
          <el-date-picker
              v-model="form.publicitydateTime"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy/MM/dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="发布网站" prop="publicityWebName">
          <rea-query-input
              v-model="form.publicityWebName"
              url="/pro/tawebsite/findall"
              filter-obj="{}"
              filter-key="webSiteName"
          ></rea-query-input>
        </el-form-item>
        <el-form-item label="网站截图" prop="publicityImageFile">
          <upload-button v-model="form.publicityImageFile"></upload-button>
        </el-form-item>
      </el-form>
      <dialog-button reset-btn="false" :cancelBtn="{show:false}"
                     @okBtn="submitForm" @cancelBtn="dialogClose"></dialog-button>
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
      },
			data:{},
    },
    watch: {},
    //数据节点
    data() {
      return {
        dialogVisible: false,
        form:{
          publicitydateTime:'',
          publicityWebName:'',
          publicityImageFile:'',
          publicityCount:'',
        },
        formRules:{
          publicitydateTime:[ { required: true, message: '请选择时间', trigger: 'blur' }],
          publicityWebName:[ { required: true, message: '请输入网站名称', trigger: 'blur' }],
          publicityImageFile:[{ required: true, message: '请上传网站截图', trigger: 'change' }],
          publicityCount: { required: true, message: '请输入网站名称', trigger: 'blur' },
        },

      }
    },
    //生命周期函数节点
    created() {

			},
    //自定义函数节点
    methods: {
      openDialog(data) {
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
        this.$refs.formRef.validate(valid=>{
          if(!valid) return;
          this.$emit('getFormData',this.$myfunction.copyData(this.form))
          this.dialogClose()
        })

      },
    }
  }
</script>
<style lang='less' scoped>

</style>
