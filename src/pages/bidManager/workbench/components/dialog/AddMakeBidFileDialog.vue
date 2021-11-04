<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible"  v-if="dialogVisible" :width="width"
               @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="100px">
        <el-form-item label="文件名称" prop="tenderdocumentsname">
          <el-input v-model="form.tenderdocumentsname"></el-input>
        </el-form-item>
        <el-form-item label="文件" prop="tenderdocumentsfile">
          <upload-button v-model="form.tenderdocumentsfile" size="max" module-type="tb" file-name="投标文件" :base-id="item.keyid"></upload-button>
        </el-form-item>
      </el-form>
      <dialog-button reset-btn="false" ok-btn="确 定"  :cancelBtn="{show:false}"
                     @okBtn="submitForm" @cancelBtn="dialogClose"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文
  import {mapState} from 'vuex'
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
    computed:{
      ...mapState('bidManager',{
        item:'item'
      })
    },
    //数据节点
    data() {
      return {
        baseId:'',
        dialogVisible: false,
        form:{
          bidsectionname:'',
          tenderdocumentsfile:'',
          allstatuscode:'2',
          pkeyid:'0000'
        },
        formRules:{
           tenderdocumentsname: [
            { required: true, message: '必须文件名称', trigger: 'blur' }
          ],
          tenderdocumentsfile:[
            { required: true, message: '必须文件名称', trigger: 'blur' }
          ]
        },
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      openDialog(baseId) {
        if (baseId) {
          this.baseId=baseId
        }
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
        this.form=this.$options.data().form
      },
      submitForm() {
         this.$refs.formRef.validate((valid) => {
          if (valid) {
             this.$emit('getFormData',this.$myfunction.copyData(this.form))
             this.dialogClose()
          }
          else
          {
            this.$message.success("数据录入完不完整!请确认!")
          }
         })
      },
    }
  }
</script>
<style lang='less' scoped>

</style>
