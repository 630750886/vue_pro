<template>
  <el-dialog :visible.sync="dialogVisible" width="30%" :title="title1" :close-on-click-modal="false">
    <el-form :model="form" ref="formRef" :rules="formRules" label-width="30%">
      <el-form-item label="退款金额(元)">
        <el-input
          v-model="form.drawbackMoney"
          placeholder="请输入金额"
        ></el-input>
      </el-form-item>

      <el-form-item label="退款申请说明">
        <!-- <el-input v-model="form.drawbackDetail" type="textarea"></el-input> -->
        <upload-button v-model="form.drawbackAttach"></upload-button>
      </el-form-item>
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

import Station from "../../../acomponents/Station.vue";

export default {
  components: {
    DialogButton,   
    Station
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

      //文件列表
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      form: {},
      //表单验证规则
      formRules: {}
    };
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
      
      //   this.$confirm("此操作将会发起钉钉流程, 是否继续?", "提示", {
      //     confirmButtonText: "确定",
      //     cancelButtonText: "取消",
      //     type: "warning"
      //   })
      //     .then(() => {
      //       this.$emit("getFormData", this.$myfunction.copyData(this.form));
      //       this.dialogClose();
      //     })
      //     .catch(() => {});
    },
    resetForm() {
      this.$refs.formRef.resetFields();
    }
  }
};
</script>

<style scoped>
</style>
