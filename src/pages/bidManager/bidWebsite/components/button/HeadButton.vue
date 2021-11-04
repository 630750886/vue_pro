<template>
  <div class="button-box">
    <el-row :gutter="20">
      <div class="btn-left">
        <public-button name="WANG3ZHAN4XIN1JIAN4XIU1GAI3SHAN1CHU" icon="el-icon-plus" title="新增浏览网站" @click="$emit('click',1)"></public-button>
        <public-button name="WANG3ZHAN4XIN1JIAN4XIU1GAI3SHAN1CHU" icon="el-icon-plus" title="新增交易平台" @click="$emit('click',2)"></public-button>
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
    methods: {
      handleCommand (command) {
        this.$emit('click', parseInt(command))
      }
    }
  }
</script>
<style lang='less' scoped>
  .button-box{
    background: #e2e0e0;
    border-radius: 2px;
    padding: 18px 20px;
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
