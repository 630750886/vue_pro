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
        label-width="120px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="合同编号" prop="contractCode">
              <rea-query-input
                v-model="form.contractCode"
                url="agr/busicontractbase/vocationaltypequery"
                :filter-obj="{
                  contractVocationalTypeKeyId:
                    '402880fa74c3492d0174d45f2e8f0017'
                }"
                filter-key="contractCode"
                @getObject="
                  item => {
                    form.contractName = item.contractName;
                  }
                "
              ></rea-query-input>
            </el-form-item>
            <el-form-item label="项目编号" prop="projectCode">
              <rea-query-input
                v-model="form.projectCode"
                url="pro/cmbaseproject/findwhere"
                filter-key="projectCode"
                :filter-obj="{
                  contractVocationalTypeKeyId:
                    '402880fa74c3492d0174d45f2e8f0017'
                }"
                @getObject="
                  item => {
                    form.projectName = item.projectName;
                  }
                "
              ></rea-query-input>
            </el-form-item>
            <el-form-item label="项目名称" prop="projectName">
              <rea-query-input
                v-model="form.projectName"
                url="pro/cmbaseproject/findwhere"
                filter-key="projectName"
                :filter-obj="{
                  contractVocationalTypeKeyId:
                    '402880fa74c3492d0174d45f2e8f0017'
                }"
                @getObject="
                  item => {
                    form.projectCode = item.projectCode;
                  }
                "
              ></rea-query-input>
            </el-form-item>
            <el-form-item label="交易平台名称" prop="tradingPlatform">
              <rea-query-input
                v-model="form.tradingPlatform"
                url="pro/tatradingplatform/findall"
                filter-obj="{}"
                filter-key="tpname"
              ></rea-query-input>
            </el-form-item>
            <el-form-item label="开标时间">
              <rea-datescope
                v-model="form.bidStartTime"
                value-type="ary"
              ></rea-datescope>
            </el-form-item>
            <el-form-item label="中标通知书发出时间" prop="disdateTime">
              <rea-datescope
                v-model="form.disdateTime"
                value-type="ary"
              ></rea-datescope>
            </el-form-item>
            <el-form-item label="中标单位" prop="orgName">
              <rea-query-input
                v-model="form.orgName"
                url="pro/cmbaseproject/findall"
                filter-obj="{}"
                filter-key="projectName"
                @getObject="
                  item => {
                    form.projectCode = item.projectCode;
                  }
                "
              ></rea-query-input>
            </el-form-item>
            <el-form-item label="中标金额(元)" prop="bidProjectSum">
              <com-numberscope v-model="form.bidProjectSum"></com-numberscope>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户名称" prop="contractBurchaser">
              <rea-query-input
                v-model="form.contractBurchaser"
                url="hr/basicinfo/autofindwhere"
                filter-obj="{}"
                filter-key="contextname"
              ></rea-query-input>
            </el-form-item>
            <el-form-item label="项目经理" prop="projectManager">
              <rea-query-input
                v-model="projectManager.projectPersonName"
                url="pro/cmgroupwork/findwhere"
                filter-key="projectPersonName"
                :filter-obj="{
                  projectJobKeyid: '402880fa754e0cf401754f753a2c001f'
                }"
                @getObject="
                  item => {
                    projectManager.projectPersonKeyid = item.projectPersonKeyid;
                    projectManager.projectJobKeyid = item.projectJobKeyid;
                    projectManager.projectJobName = item.projectJobName;
                  }
                "
              ></rea-query-input>
            </el-form-item>
            <el-form-item label="专员" prop="majorPerson">
              <rea-query-input
                v-model="majorPerson.projectPersonName"
                url="pro/cmgroupwork/findwhere"
                filter-key="projectPersonName"
                :filter-obj="{ projectJobKeyid: '' }"
                @getObject="
                  item => {
                    majorPerson.projectPersonKeyid = item.projectPersonKeyid;
                    majorPerson.projectJobKeyid = item.projectJobKeyid;
                    majorPerson.projectJobName = item.projectJobName;
                  }
                "
              ></rea-query-input>
            </el-form-item>
            <el-form-item label="招标方式">
              <rea-select
                v-model="form.bidTypeCode"
                :data="biddingAgencyType.list"
              ></rea-select>
            </el-form-item>
            <el-form-item label="项目类型" prop="projectTypeCode">
              <rea-cascader
                v-model="form.projectTypeCode"
                :data="biddingAgencyItemType.list"
              ></rea-cascader>
            </el-form-item>
            <el-form-item label="专业工程分类" prop="projectMajorCode">
              <rea-select
                v-model="form.projectMajorCode"
                :data="biddingAgencyMajorProject.list"
              ></rea-select>
            </el-form-item>
            <el-form-item label="项目总投资(万元)">
              <com-numberscope v-model="form.projectSum"></com-numberscope>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <dialog-button
        reset-btn="true"
        ok-btn="筛 选"
        :cancelBtn="{show:false}"
        @okBtn="submitForm"
        @cancelBtn="dialogClose"
      ></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import { mapState } from "vuex";

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
  watch: {},
  computed: {
    ...mapState("loadType", {
      biddingAgencyMajorProject: "biddingAgencyMajorProject",
      biddingAgencyType: "biddingAgencyType",
      biddingAgencyItemType: "biddingAgencyItemType"
    })
  },
  //数据节点
  data() {
    return {
      dialogVisible: false,
      projectManager: {
        //项目经理
        projectJobKeyid: "",
        projectJobName: "",
        projectPersonKeyid: "",
        projectPersonName: ""
      },

      majorPerson: {
        //专员
        projectJobKeyid: "",
        projectJobName: "",
        projectPersonKeyid: "",
        projectPersonName: ""
      },
      form: {
        contractVocationalTypeKeyId: "402880fa74c3492d0174d45f2e8f0017", //业务类型编号
        contractVocationalTypeName: "", //业务类型名称
        projectStatusKeyId: "", //项目状态
        contractCode: "", //合同编号
        projectCode: "", //项目编号
        projectName: "", //项目名称
        projectTypeCode: "", //项目类型
        projectMajorCode: "", //专业工程分类
        contractBurchaser: "", //客户名称
        groupWorks: [], //工作组成员 列:[{projectJobName:'职务名称: 项目经理  专员...',projectPersonName:'人员名称'}]
        projectSum: [], //项目总投资
        outPutdateTime: [], //报告编制时间

        tradingPlatformKeyid: "", //交易平台
        orgName: "", //中标单位
        bidTypeCode: "", //招标方式
        disdateTime: [], //中标时间
        bidProjectSum: [], //中标金额
        bidStartTime: [] //开标时间
      },
      formRules: {}
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    openDialog() {
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
    },
    submitForm() {
      if (this.projectManager.projectPersonKeyid !== "") {
        this.form.groupWorks.push(this.projectManager);
      }
      if (this.majorPerson.projectPersonKeyid !== "") {
        this.form.groupWorks.push(this.majorPerson);
      }
      this.$emit("getFormData", this.$myfunction.copyData(this.form));
      this.dialogClose();
    }
  }
};
</script>
<style lang="less" scoped></style>
