<template>
  <!--单合同备案对话框-->
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" :close-on-click-modal="false">
      <el-form :model="form" ref="formRef" :rules="formRules" label-width="100px">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="合同类型" prop="contractType">
              <rea-cascader v-model="form.contractType" :data="nonBusConType.list"></rea-cascader>
            </el-form-item>
            <el-form-item label="合同编号" prop="contractCode">
                <el-autocomplete
                  class="inline-input"
                  v-model="form.contractCode"
                  :fetch-suggestions="querySearch_contcode"
                  placeholder="请输入合同名称"
                  :trigger-on-focus="false"
                  @select="handleSelect_contcode"
                >
                <i
                  class="el-icon-edit el-input__icon"
                  slot="suffix"
                  @click="handleIconClick">
                </i>
                <template slot-scope="{ item }">
                  <div class="name">{{ item.contextcode }}</div>
                </template>
          </el-autocomplete>
            </el-form-item>
            <el-form-item label="创建人" prop="createPerson">
              <el-input v-model="form.createPerson" clearable></el-input>
            </el-form-item>
             <el-form-item :inline="true" label="签订时间" prop="">
                  <el-date-picker type="date" placeholder="选择开始日期" format="yyyy/MM/dd" value-format="yyyy/MM/dd" v-model="form.contractBdate" style="width: 100%;"></el-date-picker>
                  <el-date-picker type="date"  placeholder="选择结束日期" format="yyyy/MM/dd" value-format="yyyy/MM/dd" v-model="form.contractEdate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item label="合同名称" prop="contractName">
              <el-autocomplete
                  class="inline-input"
                  v-model="form.contractName"
                  :fetch-suggestions="querySearch_contname"
                  placeholder="请输入合同名称"
                  :trigger-on-focus="false"
                  @select="handleSelect_contname"
                >
                <i
                  class="el-icon-edit el-input__icon"
                  slot="suffix"
                  @click="handleIconClick">
                </i>
                <template slot-scope="{ item }">
                  <div class="name">{{ item.contextname }}</div>
                </template>
            </el-autocomplete>
            </el-form-item>
            <el-form-item label="签订部门" prop="contractOrg">
              <el-cascader
                ref="nonvestinref"
                :options="roleOrgTree"
                :props="{checkStrictly:true,value:'keyid',label:'label',children:'children'}"
                clearable
                :show-all-levels="false"
                @change="getorginfo"></el-cascader>
            </el-form-item>
            <el-form-item label="客户各方" prop="contractthirty">
              <el-input v-model="form.contractthirty" clearable></el-input>
            </el-form-item>
            <el-form-item label="是否缴纳保证金" prop="isplay">
              <el-radio v-model="form.isplay" label=true>是</el-radio>
            </el-form-item>
            <el-form-item label="是否收取保证金" prop="isgather">
              <el-radio v-model="form.isgather" label=true>是</el-radio>
            </el-form-item>
               <el-form-item label="是否原件" prop="isoriginal">
              <com-truefalse v-model="form.isoriginal"></com-truefalse>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <dialog-button ok-btn="筛 选" :cancelBtn="{show:false}"  @resetBtn="resetForm" @cancelBtn="dialogClose" @okBtn="submitFormData"></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
  //import __ from '__' // __是需要手动引入的文件
  import {createNamespacedHelpers} from 'vuex'

  const {mapState} = createNamespacedHelpers('loadType')

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
          nonBusConType:'nonBusConType',
          isSecurity:'',
          isExpiryDate:'',
          contractSeller:'',
          isgather:'',
          isdeposit:'',
        })
    },
    //数据节点
    data() {
      return {
        dialogVisible: false,
        form: {
          contractName:"",
          contractCode:"",
          createPerson:"",
          contractType:"",
          contractOrg:"",
          contractthirty:"",
          contractBdate:"",
          contractEdate:"",
          isgather:"",
          isplay:"",
          isoriginal:""
        },
        formRules: {},
        roleOrgTree: [],

      }
    },
    //生命周期函数节点
    created() {
    },
    mounted(){
      this.get_orgtreeinfo();
      if (this.session.getItem("auto_noncontract")==null)
      {
        this.getallcontract();
      }
    },
    //自定义函数节点
    methods: {
      openDialog() {
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
      },
      submitFormData() {
        this.$emit('getFormData', this.$myfunction.copyData(this.form))
        this.dialogClose()
      },
      resetForm() {
        this.$refs.formRef.resetFields()
      },
      getallcontract()
      {
          this.javaHttp("/nonagr/contractbaseInfo/autofindwhere",{contractName:""}).then(reqdata=>{
              let selectcosume=reqdata.data;
              //console.log(this.selectcosume);
              this.session.setItem("auto_noncontract", selectcosume);
      });
    },
    handleIconClick(){
    },
     querySearch_contname(queryString, cb) {
        var restaurants=this.session.getItem("auto_noncontract");
        var results = queryString ? restaurants.filter(this.createFilter_contname(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter_contname(queryString) {
          return (restaurant) => {
            return (restaurant.contextname.toLowerCase().includes(queryString.toLowerCase()));
          };
      },
      handleSelect_contname(item) {
        this.form.contractName=item.contextname;
      },
    querySearch_contcode(queryString, cb) {
        var restaurants=this.session.getItem("auto_noncontract");
        var results = queryString ? restaurants.filter(this.createFilter_contcode(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter_contcode(queryString) {
          return (restaurant) => {
            return (restaurant.contextcode.toLowerCase().includes(queryString.toLowerCase()));
          };
      },
      handleSelect_contcode(item) {
        this.form.contractCode=item.contextcode;
      },
      get_orgtreeinfo()
      {
        this.javaHttp("/sysorgs/findtree", {keyid:"0000"}).then(item => {
        if (item.code === 200) {
          this.roleOrgTree = item.data;
        } else {
          this.$message.success(item.message);
        }
      });
      },
       getorginfo(orgnode)
      {
         let mynode=this.$refs.nonvestinref.getCheckedNodes(false);
         this.form.contractOrg=mynode[0].value?mynode[0].value:"";
         //this.form.studyOutOrgName=mynode[0].label?mynode[0].label:"";
         //console.log(this.form);
      },
    }
  }
</script>
<style lang='less' scoped>

</style>
