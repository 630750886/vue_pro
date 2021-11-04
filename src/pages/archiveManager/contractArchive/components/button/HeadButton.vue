<template>
  <div>
    <el-row :gutter="20">
      <div class="btn-left">
<!--        <el-button class="btn_color" type="primary" size="mini" @click="$emit('click',1)">非业务合同档案</el-button>-->
<!--        <el-button class="btn_color" type="primary" size="mini" @click="$emit('click',2)">业务合同档案</el-button>-->
<!--        <el-button class="btn_color" type="primary" size="mini" @click="$emit('click',3)">合同查询</el-button>-->
<!--        <el-button class="btn_color" type="primary" size="mini" @click="$emit('click',4)">授权管理</el-button>-->
      </div>
      <div class="btn-right">
        <el-button class="btn_color" icon='el-icon-search' type="primary" size="mini" @click="$emit('click',1)">查询</el-button>
        <el-button type="primary" icon="el-icon-refresh-right" size="mini" @click="$emit('click', 2)">刷新</el-button>
      </div>
    </el-row>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    //数据节点
    data() {
      return {}
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      handleCommand(command) {
        this.$emit('click', parseInt(command))
      }
    }
  }
</script>
<style lang='less' scoped>
  .btn-left {
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
