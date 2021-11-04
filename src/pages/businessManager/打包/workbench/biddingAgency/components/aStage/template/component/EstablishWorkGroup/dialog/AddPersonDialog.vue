<template>
  <el-dialog
    :visible.sync="dialogVisible"
     v-if="dialogVisible"
    :append-to-body="true"
    width="300px"
    @close="dialogClose"
    :close-on-click-modal="false"
  >
    <el-form :model="form" ref="formRef" :rules="formRules" label-width="75px">
      <el-form-item label="职务名称" prop="workItemContext">
        <rea-select
          v-model="form.projectJobKeyid"
          :data="workGroup"
          @getObject="
            item => {
              form.projectJobName = item.listname;
              form.projectJobNumber = parseInt(item.staticsCode);
              isContent = item.isplanitemtime;
            }
          "
        ></rea-select>
      </el-form-item>
      <el-form-item label="人员名称">
        <rea-query-input
          v-model="form.projectPersonName"
          url="hr/basicinfo/autofindwhere"
          filter-obj="{}"
          filter-key="contextname"
          @getObject="
            item => {
              form.projectPersonKeyid = item.keyid;
            }
          "
        ></rea-query-input>
      </el-form-item>
      <el-form-item
        v-if="isContent"
        :label="form.projectJobName === '其他人员' ? '工作备注' : '专业备注'"
        prop="workItemContext"
      >
        <rea-textarea v-model="form.jobDesc"></rea-textarea>
      </el-form-item>
    </el-form>
    <dialog-button
      :reset-btn="{ show: false }" :cancelBtn="{show:false}"
      @cancelBtn="dialogClose"
      @okBtn="submitFormData"
    ></dialog-button>
  </el-dialog>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
export default {
  components: {},
  props: {},
  //生命周期函数节点
  created() {},
  mounted() {},
  watch: {},
  //数据节点
  data() {
    return {
      workInfo: [],
      dialogVisible: false,
      isContent: false,
      workGroup: [],
      form: {
        projectJobKeyid: "",
        projectJobName: "",
        projectJobNumber: 1,
        projectPersonKeyid: "",
        projectPersonName: "",
        projectPersonPhone: "",
        currStatus: "",
        jobDesc: ""
      },
      formRules: {}
    };
  },

  //自定义函数节点
  methods: {
    openDialog(workInfo) {
      this.getSelectByCode("TYPE-082").then(({ data: workGroup }) => {
        if (workInfo) {
          workInfo.forEach(item => {
            let index = this.workInfo.findIndex((jobKeyid, index) => {
              return jobKeyid === item.projectJobKeyid;
            });
            if (index === -1) {
              if (
                item.projectJobKeyid ===
                  workGroup[workGroup.length - 1].keyid ||
                item.projectJobKeyid === workGroup[workGroup.length - 2].keyid
              ) {
              } else {
                this.workInfo.push(item.projectJobKeyid);
              }
            }
          });
          workGroup.forEach(item => {
            if (this.workInfo.indexOf(item.keyid) === -1) {
              this.workGroup.push(item);
            }
          });
        } else {
          this.workGroup = workGroup;
        }
      });

      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
      this.resetForm();
    },
    submitFormData() {
      this.$emit("getFormData", this.$myfunction.copyData(this.form));
      this.dialogClose();
    },
    resetForm() {
      this.form = this.$options.data().form;
      this.workInfo = this.$options.data().workInfo;
      this.isContent = this.$options.data().isContent;
      this.workGroup = this.$options.data().workGroup;
    }
  }
};
</script>
<style lang="less" scoped></style>
