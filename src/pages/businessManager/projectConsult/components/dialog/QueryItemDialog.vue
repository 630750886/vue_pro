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
                    '402880fa74c3492d0174d45ebe360015'
                }"
                filter-key="contractCode"
              ></rea-query-input>
            </el-form-item>
            <el-form-item label="项目编号" prop="projectCode">
              <rea-query-input
                v-model="form.projectCode"
                url="pro/cmbaseproject/findwhere"
                :filter-obj="{
                  contractVocationalTypeKeyId:
                    '402880fa74c3492d0174d45ebe360015'
                }"
                filter-key="projectCode"
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
                    '402880fa74c3492d0174d45ebe360015'
                }"
                @getObject="
                  item => {
                    form.projectCode = item.projectCode;
                  }
                "
              ></rea-query-input>
            </el-form-item>
            <el-form-item label="项目类型" prop="projectTypeCode">
              <rea-cascader
                v-model="form.projectTypeCode"
                :data="projectConsultItemType.list"
                @getLabel="
                  item => {
                    form.projectTypeName = item;
                  }
                "
              ></rea-cascader>
            </el-form-item>
            <el-form-item label="专业工程分类" prop="projectMajorCode">
              <rea-select
                v-model="form.projectMajorCode"
                :data="projectConsultMajorProject.list"
              ></rea-select>
            </el-form-item>
            <el-form-item label="决策类型" prop="projectPolicyCode">
              <rea-select
                v-model="form.projectPolicyCode"
                :data="projectConsultDecisionType.list"
              ></rea-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户名称" prop="contractBurchaser">
              <rea-query-input
                v-model="form.contractBurchaser"
                url="crm/consumer/autofindwhere"
                filter-obj="{}"
                filter-key="contextname"
              ></rea-query-input>
            </el-form-item>
            <el-form-item label="项目经理" prop="projectPersonName">
              <rea-query-input
                v-model="projectManager.projectPersonName"
                url="pro/cmgroupwork/findwhere"
                filter-key="projectPersonName"
                filter-obj="{
                  projectJobKeyid: '402880fa752b700001752fc1d5680009'
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
                :filter-obj="{
                  projectJobKeyid: '402880fa752b700001752fc20c82000a'
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
            <el-form-item label="咨询工程师" prop="engineerName">
              <rea-query-input
                v-model="form.engineerName"
                url="/hr/basicinfo/findbyeng"
                filter-key="personName"
                :filter-obj="{
                  practiceTypeid: '402880fa7490da3c01749bcd74ee0030'
                }"
                @getObject="
                  item => {
                    form.engineerKeyid = item.keyid;
                  }
                "
              ></rea-query-input>
            </el-form-item>
            <el-form-item label="项目总投资(万元)" prop="projectSum">
              <com-numberscope v-model="form.projectSum"></com-numberscope>
            </el-form-item>
            <el-form-item label="报告编制时间" prop="outPutdateTime">
              <rea-datescope
                v-model="form.outPutdateTime"
                value-type="array"
              ></rea-datescope>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <dialog-button
        reset-btn="true" :cancelBtn="{show:false}"
        okBtn="筛 选"
        @resetBtn="formReset"
        @okBtn="submitForm"
        @cancelBtn="dialogClose"
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
  watch: {},
  computed: {
    ...mapState({
      projectConsultItemType: "projectConsultItemType",
      projectConsultMajorProject: "projectConsultMajorProject",
      projectConsultDecisionType: "projectConsultDecisionType"
    })
  },
  //数据节点
  data() {
    return {
      dialogVisible: false,
      //项目经理
      projectManager: {
        projectJobKeyid: "",
        projectJobName: "",
        projectPersonKeyid: "",
        projectPersonName: ""
      },
      //专员
      majorPerson: {
        projectJobKeyid: "",
        projectJobName: "",
        projectPersonKeyid: "",
        projectPersonName: ""
      },
      form: {
        contractVocationalTypeKeyId: "402880fa74c3492d0174d45ebe360015", //业务类型编号
        contractVocationalTypeName: "工程咨询", //业务类型名称
        projectStatusKeyId: "", //项目状态

        contractCode: "", //合同编号
        projectCode: "", //项目编号
        projectName: "", //项目名称
        projectTypeCode: "", //项目类型
        projectMajorCode: "", //专业工程分类
        projectPolicyCode: "", //决策类型
        engineerKeyid: "", //工程师id
        engineerName: "", //工程师名称
        contractBurchaser: "", //客户名称
        groupWorks: [], //工作组成员 列:[{projectJobName:'职务名称: 项目经理  专员...',projectPersonName:'人员名称'}]
        projectSum: [], //项目总投资

        outPutdateTime: [] //报告编制时间
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
    },
    formReset() {
      this.projectManager = this.$options.data().projectManager;
      this.majorPerson = this.$options.data().majorPerson;
      this.form = this.$options.data().form;
    }
  }
};
</script>
<style lang="less" scoped></style>
