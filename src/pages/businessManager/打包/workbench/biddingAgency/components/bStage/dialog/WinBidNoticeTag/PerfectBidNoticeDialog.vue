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
        <el-form-item label="分包名称">
          <rea-query-input
              v-model="form.filesalename"
              url="/pro/tabiddingfilesale/findwhere"
              filter-key="filesalename"
              :filter-obj="{
              projectKeyid: currentItem.keyid,
              typecode: 'noticeandinvitation'
            }"
              @getObject="
              item => {
                form.filesalekeyid = item.keyid;
              }
            "
          ></rea-query-input>
        </el-form-item>
        <el-form-item label="是否为最终稿">
<!--          <el-switch-->
<!--              v-model="form.finalresult"-->
<!--              active-text="是"-->
<!--              inactive-text="否"></el-switch>-->
          <el-radio v-model="form.finalresult" :label="false">否</el-radio>
          <el-radio v-model="form.finalresult" :label="true">是</el-radio>
        </el-form-item>
        <el-form-item label="开标时间">
          <rea-datepicker v-model="form.openingbidddateTime"></rea-datepicker>
        </el-form-item>
        <el-form-item label="中标单位">
          <rea-query-input
            v-model="form.orgName"
            url="/pro/tabiddingfilesalelist/findwhere"
            filter-key="companyname"
            :filter-obj="{ fileSalekeyid: form.filesalekeyid }"
          ></rea-query-input>
        </el-form-item>

        <el-form-item label="中标金额(元)">
          <el-input v-model="form.projectsum"></el-input>
        </el-form-item>

        <el-form-item label="通知书发出时间">
          <rea-datepicker v-model="form.disdateTime"></rea-datepicker>
        </el-form-item>

        <el-form-item label="盖章扫描件">
          <upload-button v-model="form.signNoticeFile"></upload-button>
        </el-form-item>
      </el-form>
      <dialog-button
        reset-btn="false"
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
  computed:{
    ...mapState("workbench", {
      currentItem: "currentItem"
    })
  },
  props: {
    title: { type: String },
    width: { type: String },
    labelWidth: {
      type: String,
      default: "130px"
    },
    data: {}
  },
  watch: {},
  //数据节点
  data() {
    return {
      isProjectSum: "",
      dialogVisible: false,
      form: {
        openingbidddateTime: "",
        orgName: "",
        disdateTime: "",
        signNoticeFile: "",
        projectsum: "",
        filesalename:'',
        finalresult:''
      },
      formRules: {}
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
      this.form = this.$options.data().form;
      this.isProjectSum = this.$options.data().isProjectSum;
    },
    submitForm() {
      this.$emit("getFormData", this.$myfunction.copyData(this.form));
      this.dialogClose();
    }
  }
};
</script>
<style lang="less" scoped></style>
