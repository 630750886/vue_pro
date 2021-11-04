<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="1.314rem">
        <el-form-item label="荣誉名称" prop="honorName">
          <el-input v-model="form.honorName"></el-input>
        </el-form-item>
        <el-form-item label="获得时间" prop="obtainTime">
          <rea-datepicker v-model="form.obtainTime"></rea-datepicker>
        </el-form-item>
        <el-form-item label="荣誉扫描件" prop="file">
          <upload-button v-model="form.file" module-type="hr" :base-id="currentPersonId" file-name="荣誉扫描件"></upload-button>
        </el-form-item>
      </el-form>
      <dialog-button reset-btn="false" :cancelBtn="{show:false}" @okBtn="submitFormData" @cancelBtn="dialogClose" :okBtn="{title:'新建'}"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import {mapState} from 'vuex'
  export default {
    components:{
    },
    props:{
      title:'',
      width:'',
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
        form:{
          personid:'',
          honorName:'',
          obtainTime:'',
          file:'',
        },
        formRules:{
          honorName:[
            {
              required: true,
              message:'必填',
              trigger: 'blur'
            }
          ],

        }
      }
    },

    //生命周期函数节点
    created () {
    },
    //自定义函数节点
    methods: {
      submitFormData(){
        this.$refs.formRef.validate(valid=>{
          if (!valid) return
          this.$emit('getFormData',this.$myfunction.copyData(this.form))
          this.dialogClose()
        })
      },
      dialogClose(){
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
