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
        label-width="130px"
      >
        <el-form-item label="是否投标" prop="isBid">
          <com-truefalse
            v-model="form.isbidding"
            value-format="bol"
            true-title="投"
            false-title="不投"
          ></com-truefalse>
        </el-form-item>
        <el-form-item
          v-if="form.isbidding === false"
          label="放弃投标理由"
        >
          <rea-textarea v-model="form.giveupbiddingdesc"></rea-textarea>
        </el-form-item>
      </el-form>
      <dialog-button
        reset-btn="false"
        ok-btn="确 定"
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
  watch: {
    "form.isbidding": function(newValue) {
      if (newValue === true) {
        this.form.tenderstatuskeyid = "2";
        this.form.giveupbiddingdesc = "";
      } else if (newValue === false) {
        this.form.tenderstatuskeyid = "5";
      }
    }
  },
  //数据节点
  data() {
    return {
      dialogVisible: false,
      form: {
        isbidding: "",
        giveupbiddingdesc: ""
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
    },
    submitForm() {
      this.$emit("getFormData", this.$myfunction.copyData(this.form));
      this.dialogClose();
    }
  }
};
</script>
<style lang="less" scoped></style>
