<template>
  <!--合同取消-->
  <div>
    <el-dialog title="" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="120px">
        <el-form-item label="合同酬金(元)" prop="contractSum">
          <rea-number-input v-model="form.contractSum" readonly="true" disabled="true"></rea-number-input>
        </el-form-item>
        <el-form-item label="实际收入(元)" prop="officialReceipts">
          <rea-number-input v-model="form.officialReceipts" readonly="true" disabled="true"></rea-number-input>
        </el-form-item>
        <el-form-item v-if="form.contractSum!=form.officialReceipts" label="差异描述" prop="differenceDesc">
          <rea-textarea v-model="form.differenceDesc"></rea-textarea>
        </el-form-item>
      </el-form>
      <dialog-button :reset-btn="{show:false}" :cancelBtn="{show:false}" :okBtn="{title:'申请'}" @cancelBtn="dialogClose" @okBtn="submitFormData"></dialog-button>
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
        default:'50%'
      }
    },
    watch: {},
    //数据节点
    data() {
      return {
        dialogVisible:false,
        form:{
          contractSum:'',
          officialReceipts:'',
          differenceDesc:'',
        },
        formRules:{
          contractSum:[
            {
              required: true,
              message: '请输入合同金额(元)',
              trigger: 'blur'
            }
          ],
          officialReceipts:[
            {
              required: true,
              message: '请输入实际金额(元)',
              trigger: 'blur'
            }
          ],
          differenceDesc:[
            {
              required: true,
              message: '请填写差异原因',
              trigger: 'blur'
            }
          ]
        },
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      openDialog(data){
        if (!this.$myfunction.isEmpty(data)) {
          this.form=this.$myfunction.copyData(data)
        }
        this.dialogVisible=true
      },
      dialogClose(){
        this.dialogVisible=false
        this.resetForm()
      },
      submitFormData(){
        this.$refs.formRef.validate(valid => {
          if (!valid) return
          this.$emit('getFormData', this.$myfunction.copyData(this.form))
          this.dialogClose()
        })
      },
      resetForm(){
        this.$refs.formRef.resetFields()
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
