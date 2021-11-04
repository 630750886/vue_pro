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
        <el-form-item label="网站名称" prop="websiteName">
          <el-input v-model="form.sourceName"></el-input>
        </el-form-item>
        <el-form-item label="网站地址" prop="websiteAddress">
          <el-input v-model="form.sourceUrl"></el-input>
        </el-form-item>
        <el-form-item label="浏览负责人" prop="websiteAddress">
          <rea-query-input
            v-model="form.oparetionPerson"
            url="hr/basicinfo/autofindwhere"
            filter-obj="{}"
            filter-key="contextname"
            @getObject="
              item => {
                form.oparetionPersonKeyId = item.keyid;
              }
            "
          ></rea-query-input>
        </el-form-item>
      </el-form>
      <dialog-button
        reset-btn="false"
        ok-btn="保 存"
        :cancelBtn="{show:false}"
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
        sourceName: "",
        sourceUrl: "",
        oparetionPersonKeyId: "",
        oparetionPerson: ""
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
    },
    submitForm() {
      this.$emit("getFormData", this.$myfunction.copyData(this.form));
      this.dialogClose();
    }
  }
};
</script>
<style lang="less" scoped></style>
