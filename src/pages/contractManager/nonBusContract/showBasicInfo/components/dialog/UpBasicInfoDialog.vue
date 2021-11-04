<template>
  <!--单合同备案对话框-->
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="合同名称" prop="contractName">
              <el-input v-model="form.contractName" clearable></el-input>
            </el-form-item>
            <el-form-item label="合同争议方式" prop="methodofdisputecode">
              <rea-select v-model="form.methodofdisputecode"
                          :data="disputeType.list"
                          @getLabel="item=>{form.methodofdisputename=item}"></rea-select>
            </el-form-item>
            <el-form-item v-if="form.methodofdisputecode.bool('402880fa74c3492d0174d4a94ad10039')" label="法院名称">
              <el-input v-model="form.disputename"></el-input>
            </el-form-item>
            <el-form-item v-if="form.methodofdisputecode.bool('402880fa74c3492d0174d4a90e9d0038')" label="仲裁地点" prop="PartyA">
              <el-input v-model="form.disputename"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="甲方名称" prop="PartyA">
              <el-input v-model="form.contractBurchaser" clearable></el-input>
            </el-form-item>
            <el-form-item label="乙方名称" prop="PartyB">
              <el-input v-model="form.contractSeller" clearable></el-input>
            </el-form-item>
            <el-form-item label="签订时间" prop="concludesigndateTime">
              <rea-datepicker v-model="form.concludesigndateTime"></rea-datepicker>
            </el-form-item>
          </el-col>
        </el-row>
        <rea-divider title="第三方"></rea-divider>
        <add-party-c-template v-model="form.thirdparty"></add-party-c-template>
        <rea-divider ></rea-divider>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="是否有担保人" prop="issecurity" label-width="100px">
              <com-truefalse v-model="form.issecurity"></com-truefalse>
            </el-form-item>
            <template v-if="form.issecurity">
              <el-form-item label="担保人" prop="contractSecurityPerson" label-width="70px">
                <el-input v-model="form.contractSecurityPerson" clearable></el-input>
              </el-form-item>
            </template>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否有有效期" prop="isexpiryDate" label-width="100px">
              <com-truefalse v-model="form.isexpiryDate"></com-truefalse>
            </el-form-item>
            <template v-if="form.isexpiryDate">
              <el-form-item label="有效期" prop="expiryDate" label-width="70px">
                <rea-datescope v-model="form.expiryDate"></rea-datescope>
              </el-form-item>
            </template>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否需要缴纳履约（风险）保证金" prop="isPayDeposit" label-width="220px">
              <com-truefalse v-model="form.isgather"></com-truefalse>
            </el-form-item>

          </el-col>
          <el-col :span="12">
            <template v-if="form.isgather">
              <el-form-item label="缴纳金额(元)" prop="deposit" label-width="100px">
                <el-input v-model="form.depositsum"></el-input>
              </el-form-item>
            </template>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否需要收取履约（风险）保证金" prop="isdeposit" label-width="220px">
              <com-truefalse v-model="form.isdeposit"></com-truefalse>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <template v-if="form.isdeposit">
              <el-form-item label="收取金额(元)" prop="depositsum" label-width="100px">
                <el-input v-model="form.depositsum"></el-input>
              </el-form-item>
            </template>
          </el-col>
        </el-row>
        <el-form-item label="合同扫描件" prop="contractallfile">
          <upload-button v-model="form.contractallfile"></upload-button>
        </el-form-item>
      </el-form>
      <dialog-button :reset-btn="false" @cancelBtn="dialogClose" @okBtn="submitFormData" :cancelBtn="{show:false}"  :okBtn="{title:'保存'}"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import AddPartyCTemplate from '../../../../acomponents/AddPartyCTemplate.vue'
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapGetters, mapMutations, mapActions} = createNamespacedHelpers('loadType')
  export default {
    components: {
      AddPartyCTemplate,
    },
    props: {
      title: '',
      width: {
        type: String,
        default: '50%'
      },
    },
    watch: {
      'form.expiryDate':function (newValue){
        if (newValue.indexOf('-') !== -1) {
          let arr=newValue.split('-')
          this.form.expiryStartDate=arr[0]
          this.form.expiryEndDate=arr[1]
        }

      },
      'form.isexpiryDate':function (newValue){
        if (!newValue) {
          this.form.expiryDate=''
          this.form.expiryStartDate=''
          this.form.expiryEndDate=''
        }
      },
      'form.issecurity':function (newValue){
        if (newValue===false) {
          this.form.contractSecurityPerson=''
        }
      },
      'form.isgather':function (newValue){
        if (newValue===false && this.form.isdeposit===false) {
          this.form.depositsum=0
        }
        if (newValue===true && this.form.isdeposit===true) {
          this.form.isdeposit=false
        }
      },
      'form.isdeposit':function (newValue){
        if (newValue===false && this.form.isgather===false) {
          this.form.depositsum=0
        }
        if (newValue===true && this.form.isgather===true) {
          this.form.isgather=false
        }
      }
    },
    computed:{
        ...mapState({
          disputeType:'disputeType',
          nonBusConType:'nonBusConType'
        })
    },
    //数据节点
    data() {
      return {
        dialogVisible: false,
        thirdParty: false,
        form: {
          contractName:'',
          methodofdisputecode:'',
          disputename:'',
          contractBurchaser:'',
          contractSeller:'',
          issecurity:'',
          contractSecurityPerson:'',
          isexpiryDate:'',
          expiryDate:'',
          expiryStartDate:'',
          expiryEndDate:'',
          isgather:'',
          depositsum:'',
          isdeposit:'',
          thirdparty:[]
        },
        formRules: {},
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
          if (!this.$myfunction.isEmpty(ref.thirdparty)) {
            if (data.thirdparty.indexOf(',')!==-1) {
              ref.thirdparty=data.thirdparty.split(',')
            }else if (data.thirdparty!=='') {
              ref.thirdparty=[]
              ref.thirdparty.push(data.thirdparty)
            }else {
              ref.thirdparty=[]
            }
          }else {
            ref.thirdparty=[]
          }
          this.form=ref
        }
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
        this.resetForm()
      },
      submitFormData() {
        if (this.form.expiryDate.length > 0) {
          this.$set(this.form, 'validityBegin', this.form.expiryDate[0])
          this.$set(this.form, 'validityEnd', this.form.expiryDate[1])
        }
        if (this.form.thirdparty) {
          this.form.thirdparty=this.form.thirdparty.join(',')
        }
        this.$emit('getFormData', this.$myfunction.copyData(this.form))
        this.dialogClose()
      },
      resetForm() {
        this.form=this.$options.data().form
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
