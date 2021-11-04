<template>
  <el-upload
    class="upload-demo"
    ref="upload"
    action="cunstomer"
    name="org_files"
    :multiple="true"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="fileList"
    :auto-upload="true"
    :http-request="uploadFile"
  >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button
      style="margin-left: 10px;"
      size="small"
      type="success"
      @click="submitUpload"
      >上传</el-button
    >
  </el-upload>
</template>
<script>
export default {
  props: {
    data: [Object]
  },
  watch: {},
  data() {
    return {
      value: "",
      fileList: [],
      formDate: new FormData(),
      isUpload: false,
      api: ""
    };
  },
  mounted() {
    if (process.env.NODE_ENV === "production") {
      //生产环境
      this.api = "";
    } else {
      //开发环境
      this.api = "";
    }
  },
  methods: {
    uploadFile(file) {
      this.isUpload = true;
      this.formDate.append("files", file.file, file.file.name);
    },
    submitUpload() {
      if (this.isUpload) {
        this.formDate.append("proinfo", JSON.stringify(this.data));
        this.$http
          .post(this.api + "/mobile_uploader/fileUpload", this.formDate, {
            headers: { "Content-Type": "multipart/form-data" }
          })
          .then(({ data: item }) => {
            this.$message.success(item.message);
            this.$emit("getValue", item.data.keyid);
            this.$refs.upload.clearFiles();
          });
      } else {
        this.$message.info("请选择文件");
      }
    },
    handleRemove(file, fileList) {
      if (fileList.length <= 0) {
        this.isUpload = false;
      }
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
};
</script>
