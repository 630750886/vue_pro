<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="dialogWidth" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="1.618rem">
        <el-form-item label="有效期开始" prop="periodBeginDateTime">
           <el-date-picker
              v-model="form.periodBeginDateTime"
              type="date"
              value-format="yyyy/MM/dd"
              placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="有效期结束" prop="periodEndDateTime">
           <el-date-picker
              v-model="form.periodEndDateTime"
              type="date"
              value-format="yyyy/MM/dd"
              placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="附件" prop="credentialsFile">
          <upload-button v-model="form.credentialsFile"></upload-button>
        </el-form-item>
      </el-form>
      <dialog-button reset-btn="false" :cancelBtn="{show:false}" :okBtn="{title:'新建'}" @okBtn="submitFormData" @cancelBtn="dialogClose"></dialog-button>
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
         periodBeginDateTime:"",
         periodEndDateTime:"",
         credentialsFile:""
        },
        formRules: {
          periodBeginDateTime:[
            {
              required: true,
              message:'必填',
              change: 'blur'
            }
          ],
          periodEndDateTime:[
            {
              required: true,
              message:'必填',
              change: 'blur'
            }
          ],
          credentialsFile: [
            {
              required: true,
              message:'必填',
              change: 'blur'
            }
          ]
        },
        allEducationType: []
      }
    },
    //生命周期函数节点
    created() {
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
