<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible"  v-if="dialogVisible" :width="width"
               @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="120px">
<!--        新增-->
        <el-form-item label="论证次数" prop="proofcount">
          <el-input v-model="form.proofcount"></el-input>
        </el-form-item>
        <el-form-item label="论证时间" prop="proofdateTime">

          <el-date-picker
              v-model="form.proofdateTime"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy/MM/dd"
              placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
<!--        -->
				<el-form-item label="论证名称" prop="proofName">
					<el-input v-model="form.proofName"></el-input>
				</el-form-item>
				<el-form-item label="论证相关资料" prop="proofFile">
          <upload-button v-model="form.proofFile"></upload-button>
				</el-form-item>

      </el-form>
      <dialog-button reset-btn="false" :cancelBtn="{show:false}"
                     :okBtn="openType==='add'?'新建':'保存'"
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
      openType:{
        type: String,
        default: ''
      },
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
				num:1,
        form:{
          proofName:'',
          proofFile:'',
          proofcount:"",
          proofdateTime:""
        },
        formRules:{
          proofName:{ required: true, message: '请填写论证名称', trigger: 'blur' },
          proofFile:{ required: true, message: '请上传论证相关资料',trigger: 'change' },
          proofcount:{ required: true, message: '请填写论证名称', trigger: 'blur' },
          proofdateTime:{  required: true, message: '请选择日期', trigger: 'change' }
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
        // console.log(this.openType)
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
