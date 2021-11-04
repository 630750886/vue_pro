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
                    '402880fa74c3492d0174d45f629c0018'
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
            <el-form-item label="安全监理员" prop="projectManager">
              <rea-query-input
                v-model="workPerson1.projectPersonName"
                url="pro/cmgroupwork/findwhere"
                filter-key="projectPersonName"
                :filter-obj="{
                  projectJobKeyid: '402880fa75637a16017564cd1e050011'
                }"
                @getObject="
                  item => {
                    workPerson1.projectPersonKeyid = item.projectPersonKeyid;
                    workPerson1.projectJobKeyid = item.projectJobKeyid;
                    workPerson1.projectJobName = item.projectJobName;
                  }
                "
              ></rea-query-input>
            </el-form-item>
            <el-form-item label="监理员" prop="majorPerson">
              <rea-query-input
                v-model="workPerson2.projectPersonName"
                url="pro/cmgroupwork/findwhere"
                filter-key="projectPersonName"
                :filter-obj="{
                  projectJobKeyid: '402880fa75637a16017564cd44080012'
                }"
                @getObject="
                  item => {
                    workPerson2.projectPersonKeyid = item.projectPersonKeyid;
                    workPerson2.projectJobKeyid = item.projectJobKeyid;
                    workPerson2.projectJobName = item.projectJobName;
                  }
                "
              ></rea-query-input>
            </el-form-item>
            <el-form-item label="项目总投资(万元)">
              <com-numberscope v-model="form.projectSum"></com-numberscope>
            </el-form-item>
            <el-form-item label="工期(天)">
              <com-numberscope v-model="form.workDays"></com-numberscope>
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
            <el-form-item label="总监理工程师">
              <rea-query-input
                v-model="workPerson3.projectPersonName"
                url="pro/cmgroupwork/findwhere"
                filter-key="projectPersonName"
                :filter-obj="{
                  projectJobKeyid: '402880fa75637a16017564cca144000e'
                }"
                @getObject="
                  item => {
                    workPerson3.projectPersonKeyid = item.projectPersonKeyid;
                    workPerson3.projectJobKeyid = item.projectJobKeyid;
                    workPerson3.projectJobName = item.projectJobName;
                  }
                "
              ></rea-query-input>
            </el-form-item>
            <el-form-item label="总监理工程师代表">
              <rea-query-input
                v-model="workPerson4.projectPersonName"
                url="pro/cmgroupwork/findwhere"
                filter-key="projectPersonName"
                :filter-obj="{
                  projectJobKeyid: '402880fa75637a16017564cccc8e000f'
                }"
                @getObject="
                  item => {
                    workPerson4.projectPersonKeyid = item.projectPersonKeyid;
                    workPerson4.projectJobKeyid = item.projectJobKeyid;
                    workPerson4.projectJobName = item.projectJobName;
                  }
                "
              ></rea-query-input>
            </el-form-item>
            <el-form-item label="专业监理工程师">
              <rea-query-input
                v-model="workPerson5.projectPersonName"
                url="pro/cmgroupwork/findwhere"
                filter-key="projectPersonName"
                :filter-obj="{
                  projectJobKeyid: '402880fa75637a16017564ccfd240010'
                }"
                @getObject="
                  item => {
                    workPerson5.projectPersonKeyid = item.projectPersonKeyid;
                    workPerson5.projectJobKeyid = item.projectJobKeyid;
                    workPerson5.projectJobName = item.projectJobName;
                  }
                "
              ></rea-query-input>
            </el-form-item>
            <el-form-item label="专业工程分类" prop="projectMajorCode">
              <rea-select
                v-model="form.projectMajorCode"
                :data="projectSupervisorMajorProject.list"
              ></rea-select>
            </el-form-item>
            <el-form-item label="建筑安装工程费(万元)">
              <com-numberscope v-model="form.installSum"></com-numberscope>
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
      projectSupervisorMajorProject: "projectSupervisorMajorProject"
    })
  },
  //数据节点
  data() {
    return {
      dialogVisible: false,
      workPerson1: {
        //
        projectJobKeyid: "",
        projectJobName: "",
        projectPersonKeyid: "",
        projectPersonName: ""
      },
      workPerson2: {
        //
        projectJobKeyid: "",
        projectJobName: "",
        projectPersonKeyid: "",
        projectPersonName: ""
      },
      workPerson3: {
        //
        projectJobKeyid: "",
        projectJobName: "",
        projectPersonKeyid: "",
        projectPersonName: ""
      },
      workPerson4: {
        //
        projectJobKeyid: "",
        projectJobName: "",
        projectPersonKeyid: "",
        projectPersonName: ""
      },
      workPerson5: {
        //
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
        projectMajorCode: "", //专业工程分类
        contractBurchaser: "", //客户名称
        groupWorks: [], //工作组成员 列:[{projectJobName:'职务名称: 项目经理  专员...',projectPersonName:'人员名称'}]
        projectSum: [], //项目总投资

        //工程监理独立查询条件
        installSum: [], //安装费
        workDays: [] //工期
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
      if (this.workPerson1.projectPersonKeyid !== "") {
        this.form.groupWorks.push(this.workPerson1);
      }
      if (this.workPerson2.projectPersonKeyid !== "") {
        this.form.groupWorks.push(this.workPerson2);
      }
      if (this.workPerson3.projectPersonKeyid !== "") {
        this.form.groupWorks.push(this.workPerson3);
      }
      if (this.workPerson4.projectPersonKeyid !== "") {
        this.form.groupWorks.push(this.workPerson4);
      }
      if (this.workPerson5.projectPersonKeyid !== "") {
        this.form.groupWorks.push(this.workPerson5);
      }

      this.$emit("getFormData", this.$myfunction.copyData(this.form));
      this.dialogClose();
    }
  }
};
</script>
<style lang="less" scoped></style>
