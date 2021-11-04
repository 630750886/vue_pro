<template>
  <!--移交合同-->
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible"  v-if="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="90px">
        <com-original-transfer v-model="addReceiveList" :checkbox-list="transferType"></com-original-transfer>
      </el-form>
      <dialog-button :reset-btn="{show:false}" @cancelBtn="dialogClose" :cancelBtn="{show:false}" @okBtn="submitFormData"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件

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
    watch: {
    },
    //数据节点
    data() {
      return {
        dialogVisible: false,
        form: {
          contracttypecode: '',//类型编号
          contracttypename: '',//类型名称
          contractkeyid: '',//合同id
          contractcode: '',//合同编号
          contractname: '',//合同名称
          projectkeyid:'',//项目id
          projectcode:'',//项目编号
          projectname:'',//项目名称
          outpersonkeyid: '',//移交人id
          outperson: '',//移交人
          outOrgkeyid:'',//移交组织id
          outOrgName:'',//移交组织名称
          descinfo: '',//备注，
          turnOverFileTypeKeyId: '1',//文档id
          turnOverFileTypeName: '项目',//文档名称
          trunoverstatus:'移交中'
        },
        formRules: {},
        transferType: ['监理业务手册'],
        addReceiveList: [],
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      openDialog(data) {
        if (!this.$myfunction.isEmpty(data)) {
          let ref=this.$myfunction.copyData(data)
          this.form.contracttypecode=ref.contractVocationalTypeKeyId
          this.form.contracttypename=ref.contractVocationalTypeName
          this.form.contractcode=ref.contractCode
          this.form.contractname=ref.contractName
          this.form.projectkeyid=ref.keyid
          this.form.projectcode=ref.projectCode
          this.form.projectname=ref.projectName
        }
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
        this.resetForm()
      },
      submitFormData() {
        this.addReceiveList.forEach(item=>{
          Object.assign(item,this.$myfunction.copyData(this.form))
        })
        this.$emit('getFormData', this.$myfunction.copyData(this.addReceiveList))
        this.dialogClose()
      },
      resetForm() {
        this.addReceiveList = this.$options.data().addReceiveList
        this.$refs.formRef.resetFields()
      },
      addReceive() {
        this.addReceiveList.push({transferType: '', number: '', receiveMan: '',})
      },
      removeReceiveList(key) {
        this.addReceiveList.splice(key, 1)
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
