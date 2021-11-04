<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
       v-if="dialogVisible"
      :width="width"
      @close="dialogClose"
      :close-on-click-modal="false"
    >
      <el-form
        :model="form"
        ref="formRef"
        :rules="formRules"
        label-width="80px"
      >
       <el-form-item label="合同编号" prop="contractCode">
          <el-autocomplete
            class="inline-input"
            v-model="form.contractCode"
            style="width:290px"
            :fetch-suggestions="querySearch"
            placeholder="请输入合同编号"
            :trigger-on-focus="false"
            @select="handleSelect"
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
        <el-form-item label="合同名称" prop="contractName">
          <el-input v-model="form.contractName" disabled style="width:290px"></el-input>
        </el-form-item>

        <el-form-item label="项目名称" prop="projectName">
          <el-autocomplete
            class="inline-input"
            v-model="form.projectName"
            :fetch-suggestions="prquerySearch"
            placeholder="请输入项目名称"
            style="width:290px"
            :trigger-on-focus="false"
            @select="prhandleSelect"
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
      </el-form>
      <dialog-button
        reset-btn="false" :cancelBtn="{show:false}"
        @okBtn="submitForm"
        @cancelBtn="dialogClose"
        :okBtn="{title:'新建'}"
      ></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import { createNamespacedHelpers } from "vuex";

const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} = createNamespacedHelpers("loadType");
export default {
  components: {},
  props: {
    title: { type: String },
    width: { type: String },
    labelWidth: {
      type: String,
      default: "130px"
    }
  },
  watch: {
  },
  computed: {
  },
  //数据节点 ,"造价咨询合同"
  data() {
    return {
      dialogVisible: false,
      scontractType:["402880fa74c3492d0174d98812c0003e","402880fa74c3492d0174d9897c370042","402880fa74c3492d0174d989b38e0043"],
      form: {
        contractTypeCode: "",
        contractTypeName: "",
        contractKeyid: "",
        contractCode: "",
        contractName: "",
        projectCode: "",
        projectName: "",
        projectOrgCode: "",
        projectOrgName: "",
        projectStatusKeyId: "0",
        projectStatusName: "备案中",
        serviceCode: "",
        contractVocationalTypeKeyId: "402880fa74c3492d0174d45ef5b80016", //业务类型编号
        contractVocationalTypeName: "造价咨询", //业务类型名称
        contractVocationalTypeCode:"TYPE-070"
      },
      formRules:{
          contractCode: [{ required: true, message: '请输入必填项', trigger: 'blur' }
          ],
          contractName: [
            { required: true, message: '请输入必填项', trigger: 'blur' }
          ],
           projectName: [
            { required: true, message: '请输入必填项', trigger: 'blur' }
          ]
        }
    };
  },
  //生命周期函数节点
  created() {
    if (this.session.getItem("auto_cost")==null)
      {
        this.getallcontract();
      }
  },
  //自定义函数节点
  methods: {
    getallcontract()
      {
          this.javaHttp("agr/busicontractbase/autofindofproject",{datatype:this.scontractType}).then(reqdata=>{
              this.selectcosume=reqdata.data;
              this.session.setItem("auto_cost", this.selectcosume);
          });
    },
    querySearch(queryString, cb) {
        var restaurants=this.session.getItem("auto_cost");
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
          return (restaurant) => {
            return (restaurant.contextcode.toLowerCase().includes(queryString.toLowerCase()));
          };
      },
      handleSelect(item) {
        this.form.contractKeyid=item.keyid
        this.form.contractCode=item.contextcode;
        this.form.contractName=item.contextname;
        this.form.contractTypeCode=item.datatypekeyid;
        this.form.contractTypeName=item.datatypename;
        this.form.projectOrgCode=item.studyOutOrgKeyid;
        this.form.projectOrgName=item.studyOutOrgName;
        this.getallproject();
      },
      handleIconClick(ev) {
        console.log(ev);
      },
    openDialog() {
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
      this.form = this.$options.data().form;
      this.$refs.formRef.resetFields();
    },
    submitForm() {
      this.$refs.formRef.validate(valid => {
        if (!valid) return;
        this.$emit("getFormData", this.$myfunction.copyData(this.form));
        this.dialogClose();
      });
    },
    getallproject()
      {
          this.javaHttp("pro/cmbaseproject/autofindbycontractcode",{contractcode:this.form.contractCode}).then(reqdata=>{
              this.selectcosume=reqdata.data;
              this.session.setItem("auto_projectname", this.selectcosume);
          });
    },
    prquerySearch(queryString, cb) {
        var restaurants=this.session.getItem("auto_projectname");
        var results = queryString ? restaurants.filter(this.prcreateFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
    prcreateFilter(queryString) {
          return (restaurant) => {
            return (restaurant.contextname.toLowerCase().includes(queryString.toLowerCase()));
          };
      },
    prhandleSelect(item) {
        this.form.projectName=item.contextname;
      }

  }
};
</script>
<style lang="less" scoped></style>
