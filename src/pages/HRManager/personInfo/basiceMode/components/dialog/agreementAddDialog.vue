<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="dialogWidth" @close="dialogClose" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="1.618rem">
        <el-form-item label="有效期开始" prop="agreementBeginDateTime">
       <el-date-picker
              v-model="form.agreementBeginDateTime"
              type="date"
              value-format="yyyy/MM/dd"
              placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="有效期结束" prop="agreementEndDateTime">
         <el-date-picker
              v-model="form.agreementEndDateTime"
              type="date"
              value-format="yyyy/MM/dd"
              placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="合同类型" prop="agreementTypeKeyid">
           <el-select v-model="form.agreementTypeKeyid" placeholder="请选择" @change="getsealType" style="width: 173px;">
            <el-option
            v-for="item in agreementType"
            :key="item.keyid"
            :label="item.listname"
            :value="item.keyid">
            </el-option>
				</el-select>
        </el-form-item>
        <el-form-item label="附件" prop="agreementFile">
          <upload-button v-model="form.agreementFile"></upload-button>
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
          agreementBeginDateTime:"",
          agreementEndDateTime:"",
          agreementTypeName:"",
          agreementTypeKeyid:"",
          agreementFile:""
        },
        formRules: {
          agreementBeginDateTime: [{required: true,message:'必填',change: 'blur'}],
          agreementEndDateTime: [{required: true,message:'必填',change: 'blur'}],
          agreementTypeName: [{required: true,message:'必填',change: 'blur'}],
          agreementTypeKeyid: [{required: true,message:'必填',change: 'blur'}],
          agreementFile: [{required: true,message:'必填',change: 'blur'}],
        },
        agreementType: []
      }
    },
    //生命周期函数节点
    created() {
      this.getallcocoume();
    },
    //自定义函数节点
    methods: {
      getsealType(data){
      let ditem= this.agreementType.find((item,index)=>{
        if(item.keyid=== data){
        return item;
      }
        })
      this.form.agreementTypeKeyid=ditem.keyid;
      this.form.agreementTypeName=ditem.listname;
      },
      getallcocoume()
      {
          this.javaHttp("systypelist/findbycode",{code:"TYPEH-001"}).then(reqdata=>{
              this.agreementType=reqdata.data;
          });
      },
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
