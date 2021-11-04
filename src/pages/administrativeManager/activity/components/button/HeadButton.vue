<template>
  <div>
    <el-row :gutter="20">
      <div class="btn-left">
        <public-button name="XIN1JIAN" class="btn_color" title="新建" icon='el-icon-plus' type="primary" size="mini" @click="$emit('click',1)"></public-button>
      </div>
      <div class="btn-right">
        <public-button name="CHA2XUN" class="btn_color" title="查询" icon='el-icon-search' type="primary" size="mini" @click="$emit('click',2)"></public-button>
        <public-button name="FREE" type="primary" icon="el-icon-refresh-right" title="刷新" size="mini" @click="$emit('click', 9)"></public-button>
      </div>
    </el-row>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    //数据节点
    data () {
      return {}
    },
    //生命周期函数节点
    created () {
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
