<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :width="width"
      @close="dialogClose"
      :close-on-click-modal="false"
    >
      <el-form
        :model="form"
        ref="formRef"
        :rules="formRules"
        label-width="120px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="回访客户名称" prop="name">
              <el-input v-model="form.customerName" clearable></el-input>
            </el-form-item>
            <el-form-item label="回访时间" prop="returnTime">
              <rea-datepicker v-model="form.returnTime"></rea-datepicker>
            </el-form-item>
            <el-form-item label="回访类型" prop="types">
              <rea-select
                v-model="form.types"
                prop="listname"
                :data="returnTypes.list"
              ></rea-select>
            </el-form-item>
            <template v-if="form.types === '项目回访'">
              <el-form-item label="合同编号" prop="contractId">
                <rea-query-input
                  v-model="form.contractId"
                  url="agr/busicontractbase/findall"
                  filter-obj="{}"
                  filter-key="contractCode"
                  @getObject="
                    item => {
                      form.contractName = item.contractName;
                      form.contractKeyid = item.keyid;
                    }
                  "
                ></rea-query-input>
              </el-form-item>
              <el-form-item label="合同名称" prop="contractName">
                <el-input v-model="form.contractName" readonly></el-input>
              </el-form-item>
              <el-form-item label="项目编号" prop="projectId">
                <rea-query-input
                  v-model="form.projectId"
                  url="pro/cmbaseproject/findwhere"
                  :filter-obj="{ contractKeyid: form.contractKeyid }"
                  filter-key="projectCode"
                  @getObject="
                    item => {
                      form.projectName = item.projectName;
                    }
                  "
                ></rea-query-input>
              </el-form-item>
              <el-form-item label="项目名称" prop="projectName">
                <el-input v-model="form.projectName" readonly></el-input>
              </el-form-item>
            </template>
            <el-form-item label="回访涉及业务类型" prop="business">
              <template v-if="form.types !== '项目回访'">
                <rea-select
                  v-model="form.business"
                  prop="listname"
                  :data="serviceBusiness.list"
                  multiple
                ></rea-select>
              </template>
              <template v-if="form.types === '项目回访'">
                <rea-select
                  v-model="form.business"
                  prop="listname"
                  :data="serviceBusiness.list"
                  multiple
                ></rea-select>
              </template>
            </el-form-item>
            <el-form-item label="回访事件相关部门" prop="relationDepartment">
              <rea-cascader
                v-model="form.relationDepartment"
                :data="organizeList"
                value-format="label"
                prop="label"
                label="label"
                checkStrictly
              ></rea-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="回访方式" prop="way">
              <rea-select
                v-model="form.way"
                prop="listname"
                :data="returnWay.list"
              ></rea-select>
            </el-form-item>
            <el-form-item label="被访人姓名" prop="userName">
              <el-input v-model="form.userName" clearable></el-input>
            </el-form-item>
            <el-form-item label="被访人职位" prop="userDuty">
              <el-input v-model="form.userDuty" clearable></el-input>
            </el-form-item>
            <el-form-item label="被访人部门" prop="userDepartment">
              <el-input v-model="form.userDepartment" clearable></el-input>
            </el-form-item>
            <el-form-item label="被访人电话" prop="userPhone">
              <el-input v-model="form.userPhone" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="服务质量评价等级" prop="serverQuality">
              <rea-select
                v-model="form.serverQuality"
                prop="listname"
                :data="serviceLevel.list"
              ></rea-select>
            </el-form-item>
            <el-form-item label="服务质量评价内容" prop="serverQualityContent">
              <rea-textarea v-model="form.serverQualityContent"></rea-textarea>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="技术质量评价等级" prop="technologyQuality">
              <rea-select
                v-model="form.technologyQuality"
                prop="listname"
                :data="serviceLevel.list"
              ></rea-select>
            </el-form-item>
            <el-form-item
              label="技术质量评价内容"
              prop="technologyQualityContent"
            >
              <rea-textarea
                v-model="form.technologyQualityContent"
              ></rea-textarea>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="回访记录" prop="returnRecord">
          <rea-textarea v-model="form.returnRecord"></rea-textarea>
        </el-form-item>
        <el-form-item label="客户意见及建议" prop="customerProposal">
          <rea-textarea v-model="form.customerProposal"></rea-textarea>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="是否有投诉" prop="complaints">
              <com-truefalse v-model="form.complaints"></com-truefalse>
            </el-form-item>
            <template v-if="form.complaints">
              <el-form-item label="被投诉人" prop="complaintsMan">
                <el-input v-model="form.complaintsMan" clearable></el-input>
              </el-form-item>
            </template>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否有表扬" prop="praise">
              <com-truefalse v-model="form.praise"></com-truefalse>
            </el-form-item>
            <template v-if="form.praise">
              <el-form-item label="被表扬人" prop="praiseMan">
                <el-input v-model="form.praiseMan" clearable></el-input>
              </el-form-item>
            </template>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="相关回访资料上传">
              <upload-button
                v-model="form.returnvisitinformation_file"
              ></upload-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="处理人" prop="dealt">
              <rea-query-input
                v-model="form.dealt"
                url="hr/basicinfo/autofindwhere"
                filter-obj="{}"
                filter-key="contextname"
                @getObject="
                  item => {
                    form.dealtid = item.keyid;
                  }
                "
              ></rea-query-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <dialog-button
        reset-btn="false"
        ok-btn="确 定"
        :cancelBtn="{show:false}"
        @cancelBtn="dialogClose"
        @okBtn="submitFormData"
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
    title: { Type: String },
    width: {
      type: String,
      default: "50%"
    }
  },
  watch: {
    "form.complaints": function(newValue) {
      if (!newValue) {
        this.form.complaintsMan = "";
      }
    },
    "form.praise": function(newValue) {
      if (!newValue) {
        this.form.praiseMan = "";
      }
    }
  },
  computed: {
    ...mapState({
      returnTypes: "returnTypes",
      returnWay: "returnWay",
      serviceBusiness: "serviceBusiness",
      organizeList: "organizeList",
      serviceLevel: "serviceLevel"
    })
  },
  //数据节点
  data() {
    return {
      dataInfo: this.dataBase,
      dialogVisible: false,
      form: {
        name: "",
        returnTime: "",
        relationDepartment: "",
        way: "",
        types: "",
        contractId: "",
        contractName: "",
        projectId: "",
        projectName: "",
        business: "",
        userName: "",
        userDepartment: "",
        userDuty: "",
        userPhone: "",
        technologyQuality: "",
        technologyQualityContent: "",
        serverQuality: "",
        serverQualityContent: "",
        returnRecord: "",
        customerProposal: "",
        complaints: "",
        complaintsMan: "",
        praise: "",
        praiseMan: "",
        dealt: "",
        dealtid: "",
        reviewer: "",
        returnvisitinformation_file: ""
      },
      formRules: {},
      corpType: []
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    openDialog(data) {
      if (!this.$myfunction.isEmpty(data)) {
        this.form = this.$myfunction.copyData(data);
      }
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
      this.resetForm();
    },
    submitFormData() {
      let aree = this.form.relationDepartment.split("/");
      this.form.relationDepartment = aree[aree.length - 1];
      this.$emit("getFormData", this.$myfunction.copyData(this.form));
      this.dialogClose();
    },
    resetForm() {
      this.$refs.formRef.resetFields();
    }
  }
};
</script>
<style lang="less" scoped></style>
