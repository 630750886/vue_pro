<template>
  <div class="body">
    <el-row :gutter="20">
      <div class="btn-left">
        <public-button name="XIN1ZENG1MO2KUAI" title="新增模块" @click="$emit('click',1)"></public-button>
      </div>
      <div class="btn-right">

      </div>
    </el-row>
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
      return {}
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {}
  }
</script>
<style lang='less' scoped>
  .body{

  }
  .btn-left{
    float: left;
    margin-left: 0 !important;
  }
  .btn-right {
    float: right;
    margin-right: 0 !important;
    .el-button {
      margin-left: 5px;
      margin-right: 5px;
    }
  }
</style>
