<template>
<div class="btndiv">
  <el-button
    v-if="!$myfunction.isEmpty(value)"
    type="text"
    @click="downloadFile"
    :loading="down_loading"
    >下载</el-button>
</div>
</template>
<script>
//import __ from '__' // __是需要手动引入的文件
//import 'file-saver'
import { GetHttp } from "../../../utils/http";

export default {
  components: {},
  props: {
    value: [String],
    baseId: [String],
    flowType: [String]
  },
  //生命周期函数节点
  created() {},
  mounted() {
  },
  watch: {},
  //数据节点
  data() {
    return {
      down_loading:false
    };
  },
  //自定义函数节点
  methods: {
    async downloadFile() {
      this.down_loading=true;
      let { data: fileName } = await GetHttp(
        "java_post",
        "/mobile_uploader/fileDownname?filekeyid=" + this.value
      );
      this.$http({
        method: "get",
        url: "/mobile_uploader/fileDown?filekeyid=" + this.value,
        responseType: "blob"
      }).then(res => {
        this.down_loading=false;
        const link = document.createElement("a");
        let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
        console.log("fileName_", fileName);
        //return
        link.style.display = "none";
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error=>{
        this.down_loading=false;
        console.log(error);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.btndiv{
  display: inline;
  line-height: 30px;
}
</style>
