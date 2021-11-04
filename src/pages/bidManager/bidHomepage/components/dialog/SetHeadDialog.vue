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
        label-width="100px"
      >
        <el-row :gutter="10">
          <el-col :span="18">
            <el-form-item label="投标负责人" prop="biddingleading">
              <rea-query-input v-model="form.biddingleading"
                               url="hr/basicinfo/autofindwhere"
                               filter-obj="{}"
                               filter-key="contextname"
                               @getObject="item=>{form.biddingleadingkeyid=item.keyid,form.biddingleadingorgid=item.orgid}" :readonly="updateHead"></rea-query-input>
              <!--<el-input
                v-model="form.biddingleading"
                :readonly="updateHead"
              ></el-input>-->
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button v-if="updateHead" type="text" @click="updateHead = false"
              >变更</el-button
            >
          </el-col>
        </el-row>
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
  watch: {},
  //数据节点
  data() {
    return {
      dialogVisible: false,
      form: {
        biddingleading: "",
        biddingleadingkeyid: "",
        biddingleadingorgid:""
      },
      formRules: {},
      updateHead: true
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    openDialog(data) {
      if (!this.$myfunction.isEmpty(data)) {
        this.form = this.$myfunction.copyData(data);
        if (this.$myfunction.isEmpty(data.biddingleading)) {
          this.updateHead = false;
        }
      }
      this.dialogVisible = true;
    },
    dialogClose() {
      this.dialogVisible = false;
      this.form = this.$options.data().form;
      this.updateHead = true;
    },
    submitForm() {
      this.$emit("getFormData", this.$myfunction.copyData(this.form));
      this.dialogClose();
    }
  }
};
</script>
<style lang="less" scoped></style>
