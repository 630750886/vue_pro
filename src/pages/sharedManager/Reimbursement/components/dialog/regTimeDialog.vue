<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" @close="dialogClose"
    :close-on-click-modal="false">
      <el-form :model="form" ref="formRef"  label-width="180px">       
         <el-form-item label="审核完成时间">
             <el-date-picker v-model="form.auditTime" value-format="yyyy/MM/dd" type="date" placeholder="请选择日期">
				</el-date-picker>
        </el-form-item>
      </el-form>
      <dialog-button reset-btn="false" :cancelBtn="{show:false}" ok-btn="登 记" @okBtn="submitFormData"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {
      
    },
    props: {
      title:'',
      width:{
        type:String,
        default:'30%'
      }
    },
    watch: {},
    //数据节点
    data() {
      const number=(rule, value, cb)=>{
        const regNumber=/^[1-9]\d{0,2}$/
        if (regNumber.test(value)) {
          return cb()
        }
        cb(new Error('至多输入除0开始的3位数'))
      }
      return {
        dialogVisible:false,
        form:{                
        },
        formRules:{
          k1:[
            {
              required: true,
              message: '请输入',
              trigger: 'blur'
            },
            { validator: number, trigger: 'blur' }
          ]
        }
      }
    },
    //生命周期函数节点
    created() {
    },
   
    //自定义函数节点
    methods: {
     
      openDialog(){
        this.dialogVisible=true;
        this.$nextTick(()=>{
            this.form={};
        });
      },
      dialogClose(){
        this.dialogVisible=false
        this.$refs.formRef.resetFields()
      },    
      submitFormData(){
        this.$emit('getFormData',this.$myfunction.copyData(this.form))
        this.dialogClose()
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
