<template>
  <!--框架或入库合同备案对话框-->
  <div>
    <el-dialog title="" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="90px">
        <el-form-item label="取消类型" prop="callOffTypeKeyid">
          <rea-select v-model="form.callOffTypeKeyid" :data="cancelType.list"
                      @getLabel="item=>{form.callOffTypeName=item}" :readonly="!isShowBtn"></rea-select>
        </el-form-item>
        <el-form-item label="取消原因" prop="callOffDesc">
          <rea-textarea v-model="form.callOffDesc" :readonly="!isShowBtn"></rea-textarea>
        </el-form-item>
      </el-form>
      <dialog-button v-if="isShowBtn" :reset-btn="{show:false}" @cancelBtn="dialogClose" :cancelBtn="{show:false}" @okBtn="submitFormData"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapGetters, mapMutations, mapActions} = createNamespacedHelpers('loadType')
  export default {
    components: {},
    props: {
      title: '',
      width: {
        type: String,
        default: '50%'
      }
    },
    watch: {},
    computed: {
      ...mapState({
        cancelType: 'cancelType'
      })
    },
    //数据节点
    data() {
      return {
        dialogVisible: false,
        isShowBtn:true,
        form: {
          callOffTypeKeyid: '',
          callOffTypeName: '',
          callOffDesc: '',
          allstatuscode: '3',
        },
        formRules: {
          callOffTypeKeyid: [
            { required: true, message: '请选取消类型', trigger: 'blur' }
          ],
           callOffDesc: [
            { required: true, message: '请输入取消原因', trigger: 'blur' }
          ],
        },
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      openDialog(data,isShowBtn) {
        if (!this.$myfunction.isEmpty(data)) {
          this.form = this.$myfunction.copyData(data)
        }
        if (!this.$myfunction.isEmpty(isShowBtn)) {
          this.isShowBtn=isShowBtn
        }
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
        this.resetForm()
      },
      submitFormData() {
        this.$refs.formRef.validate((valid) => {
          if (valid) {
              this.form.allstatuscode='3'
              this.$emit('getFormData', this.$myfunction.copyData(this.form))
              this.dialogClose()
          }else
          {
            this.$message.success("数据录入完不完整!请确认!")
          }
         });
      },
      resetForm() {
        this.form = this.$options.data().form
        this.isShowBtn=true
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
