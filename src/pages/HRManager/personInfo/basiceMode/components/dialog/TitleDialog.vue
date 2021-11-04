<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="dialogWidth" @close="close" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="1.314rem">
        <el-form-item label="职称类别" prop="titleTypeid">
          <rea-select v-model="form.titleTypeid" :data="titleType.list" @getLabel="item=>{form.titleType=item}"></rea-select>
        </el-form-item>
        <el-form-item label="职称级别" prop="titleLevelid">
          <rea-select v-model="form.titleLevelid" :data="titleLevel.list" @getLabel="item=>{form.titleLevel=item}"></rea-select>
        </el-form-item>
        <el-form-item label="职称专业" prop="titleMajor">
          <el-input v-model="form.titleMajor"></el-input>
        </el-form-item>
        <el-form-item label="获取时间" prop="obtainTime">
          <el-date-picker
                  v-model="form.obtainTime"
                  type="date"
                  value-format="yyyy/MM/dd"
                  placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="职称扫描件" prop="file">
         <upload-button v-model="form.file" module-type="hr" file-name="职称扫描件" :base-id="currentPersonId"></upload-button>
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
    components:{
    },
    props:{
      title:'',
      dialogWidth:'',
    },
    watch:{
    },
    computed:{
        ...mapState('loadType',{
          titleLevel:'titleLevel',
          titleType:'titleType'
        }),
      ...mapState('hrStore',{
        currentPersonId:'currentPersonId'
      })
    },
    //数据节点
    data () {
      return {
        dialogVisible:false,
        form:{
          titleTypeid:'',
          titleType:'',
          titleLevelid:'',
          titleLevel:'',
          titleMajor:'',
          obtainTime:'',
        },
        formRules:{
          titleTypeid:[
            {
              required: true,
              message:'必填',
              change: 'blur'
            }
          ],
        },
      }
    },
    //生命周期函数节点
    created () {
      // console.log()
    },
    //自定义函数节点
    methods: {
      submitFormData(){
        this.$refs.formRef.validate(valid=>{
          if (!valid) return
          this.$emit('getFormData',this.$myfunction.copyData(this.form))
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
