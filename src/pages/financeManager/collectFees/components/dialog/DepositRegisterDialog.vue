<template>
  <el-dialog :visible.sync="dialogVisible" width="40%" :title="title1" :close-on-click-modal="false">
    <el-form :model="form" ref="formRef" :rules="formRules" label-width="220px">
      <el-form-item label="缴纳类型" prop="collType">
        <el-select v-model="form.collType">
          <el-option
            v-for="item in paymentTypeOptions"
            :label="item.name"
            :key="item.id"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <div v-if="form.collType == 5">
        <el-form-item label="类型" prop="riskType">
          <el-select-template
            :data="[
              { id: '项目', name: '项目' },
              { id: '非项目', name: '非项目' }
            ]"
            v-model="form.riskType"
          ></el-select-template>
        </el-form-item>
        <el-form-item label="合同编号" prop="contractId">
          <rea-query-input
            v-model="form.contractId"
            url="agr/busicontractbase/findall"
            filter-obj="{}"
            filter-key="contractCode"
            @getObject="
              item => {
                //form.agreementkeyid = item.keyid;
                //form.contractItem=item;
                form.contract_name = item.contractName;
                form.contractId = item.contractCode;
              }
            "
          ></rea-query-input>
        </el-form-item>

        <el-form-item label="合同名称" prop="contract_name">
          <el-input v-model="form.contract_name" readonly></el-input>
        </el-form-item>
      </div>

      <div v-if="form.collType == 6">
        <el-form-item label="项目编号" prop="projectId">
          <rea-query-input
            v-model="form.projectId"
            url="pro/cmbaseproject/findall"
            filter-key="projectCode"
            :filter-obj="form.contractItem"
            @getObject="
              item => {
                form.project_name = item.projectName;
              }
            "
          ></rea-query-input>
        </el-form-item>
      </div>

      <div v-if="form.collType == 7">
        <el-form-item label="所属组织" prop="organization">
          <rea-cascader
            v-model="form.orgId"
            :data="orgList"
            prop="keyid"
            label="label"
            emitPath="false"
            checkStrictly
          ></rea-cascader>
        </el-form-item>
      </div>
      <el-form-item label="如为总公司代缴纳请上传保证金支付证明">
        <upload-button></upload-button>
      </el-form-item>
      <divider></divider>
      <span style="margin-left: 50px">填写保证金缴纳信息：</span>
      <el-form-item label="保证金收款账户名" prop="bankAccout">
        <el-input v-model="form.bankAccout"></el-input>
      </el-form-item>
      <el-form-item label="保证金收款账户开户行" prop="bank">
        <el-input v-model="form.bank"></el-input>
      </el-form-item>
      <el-form-item label="保证金收款账户号" prop="bankAccoutId">
        <el-input v-model="form.bankAccoutId"></el-input>
      </el-form-item>
      <el-form-item label="缴纳金额(元)" prop="collMoney">
        <el-input v-model="form.collMoney"></el-input>
      </el-form-item>
      <!-- <el-form-item label="递交截至时间" prop="cutoffTime">
					<el-data-picker-template type="datetime" v-model="form.cutoffTime" value-type="yyyy/MM/DD HH:mm" format="yyyy/MM/DD HH:mm"></el-data-picker-template>
				</el-form-item>
				<el-form-item label="附言或用途" prop="remark">
					<el-textarea-template v-model="form.remark"></el-textarea-template>
				</el-form-item> -->
    </el-form>

    <dialog-button
      :resetBtn="{ show: false }"
      :cancelBtn="{show:false}"
      okBtn="确 定"
      @okBtn="submitFormData"
      @cancelBtn="dialogClose"
    ></dialog-button>
  </el-dialog>
</template>

<script>
import DialogButton from "../../../acomponents/DialogButton.vue";
import ElSelectTemplate from "../../../acomponents/ElSelectTemplate.vue";
import ElDataPickerTemplate from "../../../acomponents/ElDataPickerTemplate.vue";
import ElTextareaTemplate from "../../../acomponents/ElTextareaTemplate.vue";
import UploadButton from "../../../acomponents/UploadButton.vue";
import Station from "../../../acomponents/Station.vue";
import Divider from "../../../acomponents/Divider.vue";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    DialogButton,
    ElSelectTemplate,
    ElDataPickerTemplate,
    UploadButton,
    Station,
    Divider,
    ElTextareaTemplate
  },
  props: {
    title: {
      type: String,
      dealt: ""
    }
  },
  watch: {
    title(newValue) {
      this.title = newValue;
    }
  },
  mounted() {},
  data: function() {
    return {
      //父窗口传递的弹窗标题
      title1: this.title,
      //弹窗显示控制
      dialogVisible: false,

      //缴纳类型
      paymentTypeOptions: [
        //风险（履约）保证金、投标保证金、其他往来款
        {
          id: 5,
          name: "风险（履约）保证金"
        },
        {
          id: 6,
          name: "投标保证金"
        },
        {
          id: 7,
          name: "其他往来款"
        }
      ],
      //合同编号集
      contractNumOptions: [],
      //上传按钮显示控制
      showUpload: false,
      //文件列表
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],

      fileList2: [],
      //系统表单对象
      form: {},
      //表单验证规则
      formRules: {}
    };
  },
  computed: {
    ...mapState({
      orgList: "loadType/organizeList"
    })
  },
  methods: {
    //文件上传相关
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    //设置弹窗显示
    openDialog() {
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
      this.$refs.formRef.resetFields();
    }
  }
};
</script>

<style scoped></style>
