<template>
  <el-button v-if="isShow" type="text" @click="showFile">预览</el-button>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import * as dd from "dingtalk-jsapi";
import { GetHttp } from "@/utils/http";
import { getSpaceid } from "@/api/webapi-flow";
import { mapState } from "vuex";
export default {
  components: {},
  props: {
    fileKeyid: [String],
    baseId: [String],
    flowType: [String]
  },
  //生命周期函数节点
  created() {
    if (this.fileKeyid !== "" && this.flowType !== "") {
      this.isShow = true;
    }
  },
  mounted() {},
  computed: {
    ...mapState({
      currentUser: "currentUser"
    })
  },
  watch: {},
  //数据节点
  data() {
    return {
      file: {
        spaceId: "",
        fileId: "",
        fileName: "",
        fileType: "",
        fileSize: ""
      },
      isShow: false
    };
  },

  //自定义函数节点
  methods: {
    async getSpaceId() {
      let { spaceid: spaceId } = getSpaceid(this.currentUser.dinCode);
      this.file.spaceId = spaceId;
    },
    async showFile() {
      let ref = await this.getFlowId();
      if (!this.$myfunction.isEmpty(ref.flowInstance)) {
        let flowId = ref.flowInstance;
      }
      /*dd.ready(function () {
          dd.biz.cspace.preview({
            corpId: "ding8d97ce4fb3a3cc41bc961a6cb783455b",
            spaceId: this.file.spaceId,
            fileId: this.file.fileId,
            fileName: this.file.fileName,
            fileSize: this.file.fileSize,
            fileType: this.file.fileType,
            onSuccess: function () {
              //无，直接在native显示文件详细信息
            },
            onFail: function (err) {
              // 无，直接在native页面显示具体的错误
            }
          })
        })*/
    },
    async getJavaSysFile(fileId) {
      let { data: file } = await this.getfile(fileId);
      this.file = file;
    },
    getFlowId() {
      let ref = {
        entityKeyid: this.baseId,
        typeCode: this.flowType
      };
      return GetHttp(
        "java_post",
        "/flow/flowinstanceinfo/adds",
        "post",
        ref
      ).then(item => {
        return item.data;
      });
    }
  }
};
</script>
<style lang="less" scoped></style>
