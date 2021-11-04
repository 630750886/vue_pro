<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="dialogWidth" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="1.718rem">
        <el-form-item label="学历" prop="nameid">
          <rea-select v-model="form.nameid" :data="education.list" @getLabel="item=>{
            form.name=item}" @getObject="item=>{ form.max=item.staticsCode}"></rea-select>
        </el-form-item>
        <el-form-item label="学历类型" prop="type">
          <rea-select v-model="form.type" prop="listname" :data="allEducationType"></rea-select>
        </el-form-item>
        <el-form-item label="毕业院校" prop="school">
          <el-input v-model="form.school"></el-input>
        </el-form-item>
        <el-form-item label="毕业时间" prop="graduateTime">
          <rea-datepicker v-model="form.graduateTime"></rea-datepicker>
        </el-form-item>
        <el-form-item label="所学专业" prop="major">
          <el-input v-model="form.major"></el-input>
        </el-form-item>
        <el-form-item label="毕业证书扫描件" prop="file">
          <upload-button v-model="form.file"
                         file-name="毕业证书扫描件"
                         :base-id="currentPersonId"
                         module-type="hr"></upload-button>
        </el-form-item>
      </el-form>
      <dialog-button reset-btn="false" :cancelBtn="{show:false}" @okBtn="submitFormData" @cancelBtn="dialogClose" :okBtn="{title:'新建'}"></dialog-button>
    </el-dialog>

  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  export default {
    components: {
    },
    props: {
      title:'',
      dialogWidth:'',
    },
    watch: {
    },
    computed:{
        ...mapState('loadType',{
          education:'education'
        }),
      ...mapState('hrStore',{
        currentPersonId:'currentPersonId'
      })
    },
    //数据节点
    data() {
      return {
        dialogVisible:false,
        form: {
          nameid: '',
          name: '',
          type: '',
          school: '',
          graduateTime: '',
          major: '',
          max:'',
          file:''
        },
        formRules: {
          nameid: [
            {
              required: true,
              message:'必填',
              change: 'blur'
            }
          ],
        },
        allEducationType: []
      }
    },
    //生命周期函数节点
    created() {
      this.getSelectByCode(140).then(item=>{
        this.allEducationType=item.data
      })
    },
    //自定义函数节点
    methods: {
      submitFormData: function () {
        this.$refs.formRef.validate(valid => {
          if (!valid) return
          this.$emit('getFormData', this.$myfunction.copyData(this.form))
          this.dialogClose()
        })
      },
      dialogClose() {
        this.dialogVisible=false
        this.$refs.formRef.resetFields()
      },
      openDialog(data){
        if (!this.$myfunction.isEmpty(data)){
          this.form=this.$myfunction.copyData(data)
        }
        this.dialogVisible=true
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
