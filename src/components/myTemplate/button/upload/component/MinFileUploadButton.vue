<template>
  <!--:http-request="uploadFile"-->
  <el-upload
    class="upload-demo"
    action="/mobile_uploader/fileUpload"
    :data="data"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :http-request="uploadFile"
    :on-success="handleSuccess"
    :on-exceed="handleExceed"
    :on-change="handleChange"
    :show-file-list="false"
    :auto-upload="true"
    :file-list="fileList"
  >
    <el-tooltip
      :disabled="$myfunction.isEmpty(message)"
      :content="message"
      placement="top"
      :open-delay="200"
      :enterable="false"
      effect="light"
    >
      <el-button :class="clazz" type="text"
        ><i class="el-icon-upload"></i
        >{{ btnTitle ? btnTitle : showTitle }}</el-button
      >
    </el-tooltip>
  </el-upload>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import { GetHttp } from "@/utils/http";

export default {
  components: {},
  props: {
    message: { type: String }, //提示信息
    replace: {
      type: Boolean,
      default: false
    },
    model: { type: String },
    data: [Object], //上传附带参数
    btnTitle: [String]
  },
  model: {
    prop: "model",
    event: "getValue"
  },
  //生命周期函数节点
  created() {},
  mounted() {
    if (process.env.NODE_ENV === "production") {
      //生产环境
      this.api = "";
    } else {
      //开发环境
      this.api = "";
    }
  },
  watch: {
    model(newValue) {
      this.value = newValue;
    },
    value(newValue) {
      if (!this.$myfunction.isEmpty(newValue)) {
        this.showTitle = "重新上传";
        this.clazz = "waring";
        if (this.replace) {
          this.delFile(newValue);
        }
      } else {
        this.showTitle = "附件上传";
        this.clazz = "primary";
      }
    }
  },
  //数据节点
  data() {
    return {
      value: "",
      clazz: "primary",
      showTitle: "附件上传",
      fileList: [],
      api: "",
      ETfileList: []
    };
  },

  //自定义函数节点
  methods: {
    handleSuccess(response, file, fileList) {
      console.log(response, file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleChange(file, fileList) {},
    uploadFile({ file, data }) {
      //{file,data}
      let ref = new FormData();
      ref.append("files", file);
      ref.append("proinfo", JSON.stringify(data));
      this.$http
        .post("/mobile_uploader/fileUpload", ref, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(({ data: item }) => {
          if (item.code === 200) {
            this.$message.success(item.message);
            this.$emit("getValue", item.data.keyid);
            this.value = item.data.keyid;
          }
        });
    },
    delFile(fileId) {}
  }
};
</script>
<style lang="less" scoped>
.primary {
  color: #409eff;
  i {
    font-size: 16px;
  }
}

.waring {
  color: #ffcf10;
  i {
    font-size: 16px;
  }
}
</style>
