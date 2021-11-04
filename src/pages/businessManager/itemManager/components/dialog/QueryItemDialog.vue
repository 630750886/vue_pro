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
                    '402880fa74c3492d0174d45f82380019'
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
                    '402880fa74c3492d0174d45f82380019'
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
                    '402880fa74c3492d0174d45f82380019'
                }"
                @getObject="
                  item => {
                    form.projectCode = item.projectCode;
                  }
                "
              ></rea-query-input>
            </el-form-item>
            <el-form-item label="专业工程分类" prop="projectMajorCode">
              <rea-select
                v-model="form.projectMajorCode"
                :data="majorProject"
              ></rea-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户名称" prop="contractBurchaser">
              <rea-query-input
                v-model="form.contractBurchaser"
                url="crm/consumer/autofindwhere"
                filter-key="contextname"
              ></rea-query-input>
            </el-form-item>

            <el-form-item label="项目经理" prop="projectPersonName">
              <rea-query-input
                v-model="projectManager.projectPersonName"
                url="pro/cmgroupwork/findwhere"
                filter-key="projectPersonName"
                :filter-obj="{
                  projectJobKeyid: '402880fa75637a16017564cfdbb20018'
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
                  projectJobKeyid: '402880fa75637a16017564d022a40019'
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
            <el-form-item label="项目总投资(万元)" prop="projectSum">
              <com-numberscope v-model="form.projectSum"></com-numberscope>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <dialog-button
        reset-btn="true"
        ok-btn="筛 选" :cancelBtn="{show:false}"
        @okBtn="submitForm"
        @cancelBtn="dialogClose"
      ></dialog-button>
    </el-dialog>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件

import { mapState, mapActions, mapMutations } from "vuex";
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
        projectMajorCode: "", //专业工程分类
        contractBurchaser: "", //客户名称
        groupWorks: [], //工作组成员 列:[{projectJobName:'职务名称: 项目经理  专员...',projectPersonName:'人员名称'}]
        projectSum: [] //项目总投资
      },
      formRules: {},
      majorProject: []
    };
  },
  //生命周期函数节点
  created() {
    this.networkGetSelectByCode("TYPE-057").then(item => {
      this.majorProject = item;
    });
  },
  //自定义函数节点
  methods: {
    ...mapActions("loadType", {
      networkGetSelectByCode: "networkGetSelectByCode"
    }),
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
