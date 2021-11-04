<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible"  v-if="dialogVisible" :width="width"
               @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="150px" size="mini">
        <el-row :gutter="2">
          <el-col :span="11">
            <el-form-item label="分包名称">
              <el-input v-model="form.bidsectionname"></el-input>
            </el-form-item>
            <el-form-item label="开标时间">
              <rea-datepicker v-model="form.bidopeningdateTime"  type="datetime"></rea-datepicker>
            </el-form-item>
            <el-form-item label="保证金(元)">        
              <el-input-number v-model="form.proCautionMoney" :max="99999999" :controls="false"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="现场图片上传">
              <upload-button v-model="form.sceneimagefile" size="max" module-type="tb" file-name="开标现场图片" :base-id="item.keyid"></upload-button>
              </el-form-item>
              <el-form-item label="投标/报价资料">
              <upload-button v-model="form.bidsectionfile" size="max" module-type="tb" file-name="投标/报价资料" :base-id="item.keyid"></upload-button>
              </el-form-item>
              <el-form-item label="投标家数">
                <el-input-number v-model="form.tendernumber"  :max="99999999" :controls="false"></el-input-number>
              </el-form-item>
          </el-col>
        </el-row>
        <rea-divider title="公司报价"></rea-divider>
        <el-form-item label="第一次报价">
          <el-input v-model="form.companyquotationsum1" type="textarea" :rows="1"></el-input>
        </el-form-item>
        <el-form-item label="第二次报价">
          <el-input v-model="form.companyquotationsum2" type="textarea" :rows="1"></el-input>
        </el-form-item>
        <el-form-item label="第三次报价">
          <el-input v-model="form.companyquotationsum3" type="textarea" :rows="1"></el-input>
        </el-form-item>
        <rea-divider title="其他公司报价"></rea-divider>
        <offer-template v-model="form.otherlist" @delData="deleteOtherData"></offer-template>
      </el-form>
      <dialog-button reset-btn="false" ok-btn="确 定"  :cancelBtn="{show:false}"
                     @okBtn="submitForm" @cancelBtn="dialogClose"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import OfferTemplate from '../acomponents/OfferTemplate.vue'
  import {mapState} from 'vuex'
  export default {
    components: {
      OfferTemplate
    },
    props: {
      title: '',
      width: '',
      labelWidth: {
        type: String,
        default: '130px'
      }
    },
    //watch: {
    //  'form.otherlist':function(newValue){
    //    this.form.tendernumber=newValue.length+1
    //  }
    // },
    computed:{
        ...mapState('bidManager',{
          item:'item'
        })
    },
    //数据节点
    data() {
      return {
        index:1,
        dialogVisible: false,
        delOtherData:[],
        form:{
          bidsectionname:'',
          bidopeningdateTime:'',
          delaydateTime:'',
          sceneimagefile:'',
          companyquotationsum1:'',
          companyquotationsum2:'',
          companyquotationsum3:'',
          otherlist:[],
          tendernumber:'',
        },
        formRules:{},
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      openDialog(data) {
        if (!this.$myfunction.isEmpty(data)) {
          this.form=this.$myfunction.copyData(data)
        }
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
        this.form=this.$options.data().form
        this.delOtherData=[]
      },
      submitForm() {
        this.$emit('getFormData',this.$myfunction.copyData(this.form))
        this.$emit('delOtherCom',this.$myfunction.copyData(this.delOtherData))
        this.dialogClose()
      },
      deleteOtherData(data){
        if (data.keyid) {
          this.delOtherData.push(data)
        }
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
