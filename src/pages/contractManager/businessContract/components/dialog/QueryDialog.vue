<template>
  <!--高级查询对话框-->
  <div>
    <el-dialog  title="" :visible.sync="dialogVisible" :v-if="dialogVisible"  :width="width" :close-on-click-modal="false" @close="handleClose">
      <el-form
        :model="form"
         ref="formRef"
        :rules="formRules"
        label-width="120px"
      >
      <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="合同状态:">
              <el-checkbox-group v-model="statuscode">
                <el-checkbox label="0,1">备案</el-checkbox>
                <el-checkbox label="2">完成</el-checkbox>
                <el-checkbox label="3">取消</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="合同名称:" prop="contractName">
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
            <el-form-item label="创建人:" prop="createPerson">
              <el-input v-model="form.createPerson" clearable></el-input>
            </el-form-item>
            <el-form-item label="客户名称:" prop="customerName">
              <el-autocomplete
            class="inline-input"
            v-model="form.customerName"
            :fetch-suggestions="querySearch"
            placeholder="请输入客户名称"
            :trigger-on-focus="false"
            @select="handleSelect"
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
            <el-form-item label="建安工程费(万元):" prop="installsum">
              <com-numberscope v-model="form.installsum"></com-numberscope>
            </el-form-item>
            <el-form-item :inline="true" label="签订时间:" prop="concludesigndateTime">
                  <el-date-picker type="date" placeholder="选择开始日期" format="yyyy/MM/dd" value-format="yyyy-MM-dd" v-model="form.concludesigndateTime[0]" style="width: 100%;"></el-date-picker>
                  <el-date-picker type="date"  placeholder="选择结束日期" format="yyyy/MM/dd" value-format="yyyy-MM-dd" v-model="form.concludesigndateTime[1]" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="是否缴纳保证金:" prop="isgather">
               <el-radio v-model="form.isgather" label="true">是</el-radio>
            </el-form-item>
             <el-form-item
              label="是否有原件:"
              prop="isoriginal">
              <com-truefalse v-model="form.isoriginal"></com-truefalse>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同编号:" prop="contractCode">
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
            <el-form-item label="归属:" prop="createOrgcode">
              <el-cascader
                ref="vestinref"
                :options="roleOrgTree"
                :props="{checkStrictly:true,value:'keyid',label:'label',children:'children'}"
                clearable
                :show-all-levels="false"
                @change="getorginfo"></el-cascader>
            </el-form-item>
            <el-form-item label="项目总投资(万元):" prop="projectSum">
              <com-numberscope v-model="form.projectSum"></com-numberscope>
            </el-form-item>
            <el-form-item label="合同酬金(元):" prop="contractSum">
              <com-numberscope v-model="form.contractSum"></com-numberscope>
            </el-form-item>
            <el-form-item label="监理工期(天):" prop="proTimeLimit">
              <com-numberscope v-model="form.proTimeLimit"></com-numberscope>
            </el-form-item>
             <el-form-item label="总监理工程师:" prop="enPersonName">
              <el-input v-model="form.enPersonName" clearable></el-input>
            </el-form-item>
           
          </el-col>
        </el-row>
      </el-form>
      <dialog-button
        ok-btn="筛 选"
        @resetBtn="resetForm"
        @cancelBtn="dialogClose"
        :cancelBtn="{show:false}" 
        @okBtn="submitFormData"
      ></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
export default {
  components: {},
  props: {
    title: { type: String },
    width: {
      type: String,
      default: "50%"
    }
  },
  watch: {},
  //数据节点
  data() {
    return {
      dialogVisible: false,
      form: {
        contractName: "",
        customerName: "",
        installsum: [],
        concludesigndateTime: [],
        isgather: "",
        isoriginal:"",
        createPerson:"",
        createOrgcode:"",
        contractCode: "",
        projectSum: [],
        contractSum: [],
        proTimeLimit: [],
        contractSellerPerson: "",
        enPersonName: "",
        allstatuscode:"",
        contractTypeKeyId:""
      },
      dtcontracttype:[
        {keyid:"402880fa74c3492d0174d98785e3003d",listname:"工程咨询合同"},
        {keyid:"402880fa74c3492d0174d98812c0003e",listname:"造价咨询合同"},
        {keyid:"402880fa74c3492d0174d988b0cb003f",listname:"招标代理合同"},
        {keyid:"402880fa74c3492d0174d988f7670040",listname:"工程监理合同"},
        {keyid:"402880fa74c3492d0174d98936d70041",listname:"项目管理合同"},
        {keyid:"402880fa74c3492d0174d9897c370042",listname:"全过程咨询合同"},
        {keyid:"402880fa74c3492d0174d989b38e0043",listname:"综合业务合同"},
        {keyid:"402880fa74c3492d0174d989e5de0044",listname:"框架或入库合同"}],
      formRules: {},
      roleOrgTree: [],
      statuscode:[]
    };
  },
  //生命周期函数节点
  created() {},
  mounted(){
    this.get_orgtreeinfo();
     if (this.session.getItem("auto_consumer")==null)
      {
        this.getallcocoume();
      }
    if (this.session.getItem("auto_contract")==null)
      {
        this.getallcontract();
      }
  },
  //自定义函数节点
  methods: {
    getallcocoume()
      {
          this.javaHttp("crm/consumer/autofindwhere",{customerName:""}).then(reqdata=>{
              this.selectcosume=reqdata.data;
              //console.log(this.selectcosume);
              this.session.setItem("auto_consumer", this.selectcosume);
          });
    },
    getallcontract()
      {
          this.javaHttp("/agr/busicontractbase/autofindwhere",{contractName:""}).then(reqdata=>{
              this.selectcosume=reqdata.data;
              //console.log(this.selectcosume);
              this.session.setItem("auto_contract", this.selectcosume);
          });
    },
    openDialog() {
      this.dialogVisible = true;
      this.statuscode=[];
      this.$refs.formRef.resetFields();
    },
    handleClose(){
      this.statuscode=[];
    },
    dialogClose() {
      this.statuscode=[];
      this.dialogVisible = false;
    },
    submitFormData() {
      this.form.allstatuscode=this.statuscode.toString();
      this.$emit("getFormData", this.$myfunction.copyData(this.form));
      this.dialogClose();
    },
    resetForm() {
      this.$refs.formRef.resetFields();
    },
    handleIconClick(){
    },
     querySearch_contname(queryString, cb) {
        var restaurants=this.session.getItem("auto_contract");
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
        var restaurants=this.session.getItem("auto_contract");
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
      querySearch(queryString, cb) {
        var restaurants=this.session.getItem("auto_consumer");
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
          return (restaurant) => {
            return (restaurant.contextname.toLowerCase().includes(queryString.toLowerCase()));
          };
      },
      handleSelect(item) {
        this.form.customerName=item.contextname;
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
         let mynode=this.$refs.vestinref.getCheckedNodes(false);
         this.form.createOrgcode=mynode[0].value?mynode[0].value:"";
         //this.form.studyOutOrgName=mynode[0].label?mynode[0].label:"";
         //console.log(this.form);
      },
  }
};
</script>
<style lang="less" scoped></style>
