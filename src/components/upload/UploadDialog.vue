<template>
  <div class="upload-box">
    <el-dialog width="300px" :visible.sync="dialogVisible" v-if="dialogVisible" :show-close="true" :before-close="handleClose" @close="dialogClose"  :close-on-click-modal="false">
      <el-upload
              class="upload-demo"
              drag
              :action="serviceUrl"
              :data="dataInfo"
              :name="fileName"
              :multiple="false">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {},
    watch: {},
    //数据节点
    data() {
      return {
        serviceUrl:'',
        dialogVisible:false,
        dataInfo:{
          sysUser:'',
        },
        fileName:''
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      handleClose(){

      },
      dialogClose(){

      }
    }
  }
</script>
<style lang='less' scoped>
</style>
