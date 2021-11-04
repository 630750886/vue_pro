<template>
  <!--框架或入库合同备案对话框-->
  <div>
    <el-dialog title="" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="90px">
        <el-form-item label="合同名称" prop="contractName">
          <el-input v-model="form.contractName" clearable></el-input>
        </el-form-item>
        <el-form-item label="业务类型" prop="contractVocationalTypeKeyId">
          <rea-select v-model="form.contractVocationalTypeKeyId"
                      :data="frameBusType"
                      multiple
                      @getLabel="item=>{form.contractVocationalTypeName=item}"></rea-select>
        </el-form-item>
      </el-form>
      <dialog-button :reset-btn="{show:false}" @cancelBtn="dialogClose" :cancelBtn="{show:false}" :okBtn="{title:'新建'}"  @okBtn="submitFormData"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapGetters, mapMutations, mapActions} = createNamespacedHelpers('loadType')
  export default {
    components: {
    },
    props: {
      title: '',
      width: {
        type: String,
        default: '50%'
      },
      loadData: '',
    },
    watch: {},
    computed:{
        ...mapGetters({
          frameBusType:'frameBusType'
        })
    },
    //数据节点
    data() {
      return {
        dialogVisible: false,
        form: {
          contractTypeKeyId:'402880fa74c3492d0174d989e5de0044',
          contractTypeName:'框架或入库合同',
          contractName:'',
          contractVocationalTypeKeyId:'',
          contractVocationalTypeName:'',
          isgather:false,
          isdeposit:false
        },
        formRules: {
           contractName: [
            { required: true, message: '请输入合同名称', trigger: 'blur' }
          ],
          contractVocationalTypeKeyId:[
            { required: true, message: '请选择业务类型', trigger: 'blur' }
          ]
        },
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      openDialog() {
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
        this.resetForm()
      },
      submitFormData() {
        this.$refs.formRef.validate((valid) => {
          if (valid) {
            this.$emit('getFormData', this.$myfunction.copyData(this.form))
            this.dialogClose()
          } 
          else
          {
            this.$message.success("数据录入完不完整!请确认!")
          }
        });
      },
      resetForm() {
        this.$refs.formRef.resetFields()
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
