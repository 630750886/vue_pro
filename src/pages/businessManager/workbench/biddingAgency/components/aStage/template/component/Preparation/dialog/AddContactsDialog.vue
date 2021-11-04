<template>
  <!--框架或入库合同备案对话框-->
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
        label-width="90px"
      >
        <el-form-item v-if="isUnit" label="联系人类型" prop="name">
          <com-truefalse
            v-if="isUnit"
            v-model="contactType"
            true-title="客户方"
            false-title="公司方"
          ></com-truefalse>
        </el-form-item>

        <el-form-item v-if="isUnit" label="单位名称" prop="enterprisename">
          <template v-if="contactType === '客户方'">
            <rea-query-input
              v-model="form.enterprisename"
              filter-key="customerName"
              @getObject="
                item => {
                  form.enterprisenameKeyid = item.keyid;
                }
              "
            ></rea-query-input>
          </template>
          <template v-else>
            <el-input v-model="form.enterprisename"></el-input>
          </template>
        </el-form-item>
        <el-form-item label="客户联系人" prop="contactname">
          <template v-if="contactType === '客户方'">
            <rea-query-input
              v-model="form.contactname"
              filter-key="personName"
              @getObject="item => {}"
            ></rea-query-input>
          </template>
          <template v-else>
            <el-input v-model="form.contactname" clearable></el-input>
          </template>
        </el-form-item>
        <el-form-item label="联系人电话" prop="contactphone">
          <el-input v-model="form.contactphone" clearable></el-input>
        </el-form-item>
        <el-form-item label="联系人部门" prop="contactdepartment">
          <el-input v-model="form.contactdepartment" clearable></el-input>
        </el-form-item>
        <el-form-item label="联系人职务" prop="contactpost">
          <el-input v-model="form.contactpost" clearable></el-input>
        </el-form-item>
      </el-form>
      <dialog-button
        :reset-btn="{ show: false }" :cancelBtn="{show:false}"
        @cancelBtn="dialogClose"
        @okBtn="submitFormData"
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
    width: {
      type: String,
      default: "50%"
    },
    updateData: {},
    isUnit: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    updateData(newValue) {
      this.form = this.$myfunction.copyData(newValue);
    },
    contactType(newValue) {
      if (newValue === "客户方") {
        this.form.contactTypeKeyId = "402880fa754607d00175461090680004";
        this.form.contactTypeKeyId = "客户方联系人";
      } else if (newValue === "公司方") {
        this.form.contactTypeKeyId = "402880fa754607d001754610aeaa0005";
        this.form.contactTypeKeyId = "公司联系人";
        this.enterprisenameKeyid = "";
        this.enterprisename = "";
      }
    }
  },
  //数据节点
  data() {
    return {
      contactType: "",
      dialogVisible: false,
      form: {
        enterprisenameKeyid: "",
        enterprisename: "",
        contactname: "",
        contactphone: "",
        contactdepartment: "",
        contactpost: "",
        contactTypeKeyId: "402880fa754607d00175461061300003",
        contactTypeName: "委托联系人"
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
<style lang="less" scoped></style>
