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
            <el-form-item label="项目名称" prop="projectName">
              <el-input v-model="form.projectName"></el-input>
            </el-form-item>
            <el-form-item label="客户名称" prop="contractBurchaser">
              <rea-query-input
                v-model="form.contractBurchaser"
                url="crm/consumer/autofindwhere"
                filter-obj="{}"
                filter-key="contextname"
              ></rea-query-input>
            </el-form-item>
            <el-form-item
              label="专业工程分类"
              prop="projectMajorCode"
              label-width="100px"
            >
              <rea-select
                v-model="form.projectMajorCode"
                :data="projectConsultMajorProject"
              ></rea-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目编号" prop="projectCode">
              <rea-query-input
                v-model="form.projectCode"
                url="pro/cmbaseproject/findwhere"
                :filter-obj="{
                  contractTypeCode: '402880fa74c3492d0174d989b38e0043'
                }"
                filter-key="projectCode"
              ></rea-query-input>
            </el-form-item>
            <el-form-item label="合同编号" prop="contractCode">
              <rea-query-input
                v-model="form.contractCode"
                url="agr/busicontractbase/findwhere"
                :filter-obj="{
                  contractTypeKeyId: '402880fa74c3492d0174d989b38e0043'
                }"
                filter-key="contractCode"
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
        :cancelBtn="{show:false}"
        okBtn="筛 选"
        @okBtn="submitForm"
        @cancelBtn="dialogClose"
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
      form: {
        projectName: "",
        contractBurchaser: "",
        projectMajorCode: "",
        projectCode: "",
        contractCode: "",
        projectSum: "",
        contractTypeCode: "402880fa74c3492d0174d989b38e0043"
      },
      formRules: {},
      itemManager: [],
      projectConsultMajorProject: []
    };
  },
  //生命周期函数节点
  created() {
    this.getSelectByCode("057").then(item => {
      this.projectConsultMajorProject = item.data;
    });
  },
  //自定义函数节点
  methods: {
    openDialog() {
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
    },
    submitForm() {
      this.$emit("getFormData", this.$myfunction.copyData(this.form));
      this.dialogClose();
    }
  }
};
</script>
<style lang="less" scoped></style>
