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
        <el-form-item label="是否已报名" prop="isenlist">
          <com-truefalse v-model="form.isenlist"></com-truefalse>
        </el-form-item>
        <template v-if="form.isenlist">
          <el-form-item label="报名人">
            <el-input v-model="form.applicant"></el-input>
          </el-form-item>
          <el-form-item label="报名时间" prop="applicantdatetime">
            <rea-datepicker
              v-model="form.applicantdatetime"
              type="datetime"
            ></rea-datepicker>
          </el-form-item>
          <el-form-item label="报名费(元)">
            <el-row :gutter="5">
              <el-col :span="15">
                <rea-number-input
                  v-model="form.applicantsum"
                ></rea-number-input>
              </el-col>
              <el-col :span="3">
                <el-button v-if="form.applicantsum >0 "  type="text" size="mini" @click="AppopenDialog">报销申请</el-button>
              </el-col>
              <el-col :span="5">
                <status-button :title="form.applicantstatus"></status-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="招标文件">
            <upload-button v-model="form.tenderfile"></upload-button>
          </el-form-item>
          <rea-divider title="招标文件澄清及修改"></rea-divider>
          <files-table-template
            v-model="form.tenderfileclarification"
          ></files-table-template>
          <rea-divider></rea-divider>
          <rea-divider title="招标文件分析"></rea-divider>
          <el-form-item label="人员分析">
            <rea-textarea v-model="form.personanalyse"></rea-textarea>
          </el-form-item>
          <el-form-item label="业绩分析">
            <rea-textarea v-model="form.achievementanalyse"></rea-textarea>
          </el-form-item>
          <el-form-item label="行政分析">
            <rea-textarea v-model="form.administrationanalyse"></rea-textarea>
          </el-form-item>
          <el-form-item label="重点分析">
            <rea-textarea v-model="form.keypointanalyse"></rea-textarea>
          </el-form-item>
          <rea-divider></rea-divider>
          <el-form-item label="是否需要答辩">
            <com-truefalse v-model="form.isrejoin"></com-truefalse>
          </el-form-item>
          <el-form-item v-if="form.isrejoin" label="答辩人员">
            <rea-query-input
              v-model="form.rejoinperson"
              url="hr/basicinfo/autofindwhere"
              filter-obj="{}"
              unmatched
              filter-key="contextname"
            ></rea-query-input>
          </el-form-item>
        </template>
      </el-form>
      <dialog-button
        reset-btn="false"
        ok-btn="确 定"
        :cancelBtn="{show:false}"
        @okBtn="submitForm"
        @cancelBtn="dialogClose"
      ></dialog-button>
    </el-dialog>
    <expenseAppDialog
    ref="expenseappdialog"
    title="报销申请"
    width="50%"
    >
    </expenseAppDialog>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import FilesTableTemplate from "../../../acomponents/FilesTableTemplate.vue";
import expenseAppDialog from "./expenseAppDialog.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    FilesTableTemplate,
    expenseAppDialog
  },
  props: {
    title: { type: String },
    width: { type: String },
    labelWidth: {
      type: String,
      default: "130px"
    }
  },
  watch: {
    "form.isenlist": function(newValue) {
      if (newValue === false) {
        if (parseInt(this.form.tenderstatuskeyid) <= 1) {
          this.form.tenderstatuskeyid = "0";
        }
        this.form.applicantdatetime = "";
        this.form.applicant = "";
        this.form.applicantsum = "";
        this.form.applicant_instanceid = "";
      } else if (newValue === true) {
        if (parseInt(this.form.tenderstatuskeyid) <= 1) {
          this.form.tenderstatuskeyid = "1";
        }
      }
    },
    "form.isrejoin": function(newValue) {
      if (newValue === false) {
        this.form.rejoinperson = "";
      }
    }
  },
  //数据节点
  data() {
    return {
      dialogVisible: false,
      form: {
        isenlist: "",
        applicant: "",
        applicantsum: "",
        applicantdatetime: "",
        applicant_instanceid: "",
        applicantstatus: "",
        tenderfile: "",
        tenderfileclarification: [],
        achievementanalyse: "",
        administrationanalyse: "",
        personanalyse: "",
        keypointanalyse: "",
        isrejoin: "",
        rejoinperson: ""
      },
      formRules: {},
      typeList123: [
        {
          keyid: "402880fa74dd23350174e1f3ff0d0009",
          pkeyid: "0000",
          code: "TYPE-024",
          label: "投标费用",
          children: "",
        },
        {
          keyid: "402880fa74dd23350174e1f44e86000a",
          pkeyid: "0000",
          code: "TYPE-025",
          label: "业务费用",
          children: "",
        },
        {
          keyid: "402880fa74dd23350174e1f496f5000b",
          pkeyid: "0000",
          code: "TYPE-026",
          label: "部门费用",
          children: "",
        },
        {
          keyid: "402880fa74dd23350174e1f4d64e000c",
          pkeyid: "0000",
          code: "TYPE-027",
          label: "公司费用",
          children: "",
        },
        {
          keyid: "402880fa74dd23350174e1f52617000d",
          pkeyid: "0000",
          code: "TYPE-028",
          label: "刘总费用",
          children: "",
        },
        {
          keyid: "402880fa762249280176225523a60000",
          pkeyid: "0000",
          code: "TYPE-029",
          label: "陈总费用",
          children: "",
        },
      ],
    };
  },
  //生命周期函数节点
  created() {
    this.getallType(this.typeList123);
    this.networkGetOrgAndPost();
  },
  //自定义函数节点
  methods: {
    ...mapActions({
      getallType: "shareManager/getTypeList",
      networkGetOrgAndPost: "loadType/networkGetOrgAndPost",
    }),
    openDialog(data) {
      if (!this.$myfunction.isEmpty(data)) {
        this.form = this.$myfunction.copyData(data);
        if (data.tenderfileclarification.indexOf(",") !== -1) {
          this.form.tenderfileclarification = data.tenderfileclarification.split(
            ","
          );
        } else if (!this.$myfunction.isEmpty(data.tenderfileclarification)) {
          this.form.tenderfileclarification = [];
          this.form.tenderfileclarification.push(data.tenderfileclarification);
        } else {
          this.form.tenderfileclarification = [];
        }
      }
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
      this.form = this.$options.data().form;
      this.dateScope = [];
    },
    submitForm() {
      this.form.applicant_instanceid = "1";
      this.form.applicantstatus = "审核中";
      this.form.tenderfileclarification = this.form.tenderfileclarification.join(
        ","
      );
      this.$emit("getFormData", this.$myfunction.copyData(this.form));
      this.dialogClose();
    },
    AppopenDialog()
    {
      let newform = Object.assign({}, { tables: [] });
      this.$refs.expenseappdialog.openDialog(newform);
    }

  }
};
</script>
<style lang="less" scoped></style>
