<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="90px">
        <el-form-item label="合同名称" prop="contractName">
          <el-input v-model="form.contractName" clearable></el-input>
        </el-form-item>
        <el-form-item label="合同类型" prop="contractTypecode">
          <rea-cascader v-model="form.contractTypecode" :data="nonBusConType.list" @getLabel="item=>{form.contractTypename=item}"></rea-cascader>
        </el-form-item>
      </el-form>
      <dialog-button :reset-btn="false" @cancelBtn="dialogClose" :cancelBtn="{show:false}" :okBtn="{title:'新建'}" @okBtn="submitFormData"></dialog-button>
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
      }
    },
    watch: {},
    computed:{
        ...mapState({
          nonBusConType:'nonBusConType'
        })
    },
    //数据节点
    data() {
      return {
        dialogVisible: false,
        form: {
          contractTypecode:'',
          contractTypename:'',
          contractName:'',
          contractStatusKeyId:'0',
          contractStatusName:'备案中',
          isgather:false,
          isdeposit:false
        },
        formRules:typeof this.requiredFormRules==='function'?this.requiredFormRules({trigger:[
            'contractName',
          ],change:[
              "contractTypecode"
          ]}):{},
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
        this.$refs.formRef.validate(valid=>{
          if (!valid) return
          this.$emit('getFormData', this.$myfunction.copyData(this.form))
          this.dialogClose()
        })

      },
      resetForm() {
        this.$refs.formRef.resetFields()
        this.form=this.$options.data().form
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
