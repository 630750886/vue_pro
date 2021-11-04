<template>
  <div>
      <div class="btn-left">
        <el-button v-if="btnListIndexOf('XIN1JIAN')" class="btn_color" icon="el-icon-plus" type="primary" size="mini" @click="$emit('click',1)">新建物业</el-button>
        <el-button v-if="btnListIndexOf('XIN1JIAN')" class="btn_color" icon="el-icon-plus" type="primary" size="mini" @click="$emit('click',2)">新建车辆</el-button>
<!--				<el-button class="btn_color" type="primary" size="mini" @click="$emit('click',5)">车位管理</el-button>-->
<!--        <el-button class="btn_color" type="primary" size="mini" @click="$emit('click',3)">用车申请</el-button>-->
      </div>
      <div class="btn-right">
        <el-button type="primary" icon="el-icon-refresh-right" size="mini" @click="$emit('click', 9)">刷新</el-button>
<!--        <el-button class="btn_color" type="primary" size="mini" @click="$emit('click',6)">导出Excel</el-button>-->
      </div>
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
