<template>
  <!--单合同备案对话框-->
  <div>
    <el-dialog   title="" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="200px">
        <el-form-item label="合同名称" prop="contractName" label-width="90px">
          <el-input v-model="form.contractName" clearable></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="14">
            <el-form-item label="合同类型" prop="contractTypeKeyId" label-width="90px">
              <rea-select v-model="form.contractTypeKeyId"
                          :data="singleConType"
                          @getLabel="item=>{form.contractTypeName=item}"></rea-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <template v-if="form.contractTypeKeyId==='402880fa74c3492d0174d989b38e0043'">
              <rea-select v-model="form.contractVocationalTypeKeyId"
                          :data="singleBusType"
                          @getLabel="item=>{form.contractVocationalTypeName=item}"
                          max-num="4"
                          multiple></rea-select>
            </template>
          </el-col>
        </el-row>
      </el-form>
      <dialog-button :reset-btn="false" @cancelBtn="dialogClose" :cancelBtn="{show:false}" :okBtn="{title:'新建'}"  @okBtn="submitFormData"></dialog-button>
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
      loadData:'',
    },
    watch: {
      'form.contractTypeKeyId':function (newValue) {
        this.form.contractVocationalTypeKeyId=''
        this.form.contractVocationalTypeName=''
        let ref={}
        switch (newValue) {
          case '402880fa74c3492d0174d98785e3003d':
            ref=this.singleBusType.find((item,index)=>{
              if (index === 0) {
                return item
              }
            })
            this.form.contractVocationalTypeKeyId=ref.keyid
            this.form.contractVocationalTypeName=ref.listname
            break
          case '402880fa74c3492d0174d98812c0003e':
            ref=this.singleBusType.find((item,index)=>{
              if (index === 1) {
                return item
              }
            })
            this.form.contractVocationalTypeKeyId=ref.keyid
            this.form.contractVocationalTypeName=ref.listname
            break
          case '402880fa74c3492d0174d988b0cb003f':
            ref=this.singleBusType.find((item,index)=>{
              if (index === 2) {
                return item
              }
            })
            this.form.contractVocationalTypeKeyId=ref.keyid
            this.form.contractVocationalTypeName=ref.listname
            break
          case '402880fa74c3492d0174d988f7670040':
            ref=this.singleBusType.find((item,index)=>{
              if (index === 3) {
                return item
              }
            })
            this.form.contractVocationalTypeKeyId=ref.keyid
            this.form.contractVocationalTypeName=ref.listname
            break
          case '402880fa74c3492d0174d98936d70041':
            ref=this.singleBusType.find((item,index)=>{
              if (index === 4) {
                return item
              }
            })
            this.form.contractVocationalTypeKeyId=ref.keyid
            this.form.contractVocationalTypeName=ref.listname
            break
          case '402880fa74c3492d0174d9897c370042':
            let array={
              keyid:[],
              name:[]
            }
            this.singleBusType.forEach((item,index)=>{
              array.keyid.push(item.keyid)
              array.name.push(item.listname)
            })
            this.form.contractVocationalTypeKeyId=array.keyid.join(',')
            this.form.contractVocationalTypeName=array.name.join(',')
            break
        }
      }
    },
    computed:{
        ...mapState({
        }),
        ...mapGetters({
          singleConType:'singleConType',
          singleBusType:'singleBusType',
        })
    },
    //数据节点
    data() {
      return {
        dialogVisible: false,
        form: {
          contractTypeKeyId:'',
          contractTypeName:'',
          contractName:'',
          allstatuscode:'0',
          contractVocationalTypeKeyId: '',
          contractVocationalTypeName:'',
          isgather:false,
          isdeposit:false
        },
        formRules: {
           contractName: [
            { required: true, message: '请输入合同名称', trigger: 'blur' }
          ],
          contractTypeKeyId: [
            { required: true, message: '请选择合同类型', trigger: 'blur' }
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
        this.$refs.formRef.validate(valid=>{
          if (valid){
          this.$emit('getFormData', this.$myfunction.copyData(this.form))
          this.dialogClose()
          }else
          {
            this.$message.success("数据录入完不完整!请确认!")
          }
         
        })
      },
      resetForm() {
        this.$refs.formRef.resetFields()
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
