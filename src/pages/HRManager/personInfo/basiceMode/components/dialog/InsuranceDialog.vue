<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="dialogWidth" @close="close" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="1.314rem">
        <el-form-item label="保险名称" prop="insuranceName">
          <el-input v-model="form.insuranceName"></el-input>
        </el-form-item>
        <el-form-item label="保险公司" prop="company">
          <el-input v-model="form.company"></el-input>
        </el-form-item>
        <el-form-item label="被保险人" prop="insuredName">
          <el-input v-model="form.insuredName"></el-input>
        </el-form-item>
        <el-form-item label="受益人" prop="beneficiary">
          <el-input v-model="form.beneficiary"></el-input>
        </el-form-item>
        <el-form-item label="购买时间" prop="buyTime">
          <rea-datepicker v-model="form.buyTime"></rea-datepicker>
        </el-form-item>
        <el-form-item label="保险扫描件" prop="file">
          <upload-button v-model="form.file" module-type="hr" file-name="保险扫描件" :base-id="currentPersonId"></upload-button>
        </el-form-item>
      </el-form>
      <dialog-button reset-btn="false" :cancelBtn="{show:false}" @okBtn="submitFormData" @cancelBtn="close" :okBtn="{title:'新建'}"></dialog-button>
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
      title:'',
      dialogWidth:'',
    },
    watch:{
    },
    computed:{
      ...mapState('hrStore',{
        currentPersonId:'currentPersonId'
      })
    },
    //数据节点
    data () {
      return {
        dialogVisible:false,
        form: {
          insuranceName: '',
          company: '',
          insuredName: '',
          beneficiary: '',
          buyTime: '',
          file: '',
        },
        formRules: {
          insuranceName: [
            {
              required: true,
              message:'必填',
              trigger: 'blur'
            }
          ],
        },
      }
    },
    //生命周期函数节点
    created () {
    },
    //自定义函数节点
    methods: {
      submitFormData () {
        this.$refs.formRef.validate(valid => {
          if (!valid) return
          this.$emit('getFormData', this.$myfunction.copyData(this.form))
          this.close()
        })
      },
      close(){
        this.dialogVisible=false
        this.$refs.formRef.resetFields()
      },
      openDialog(data){
        if (!this.$myfunction.isEmpty(data)) {
          this.form=this.$myfunction.copyData(data)
        }
        this.dialogVisible=true
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
