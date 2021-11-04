<template>
  <div>
    <el-row>
      <div class="btn-right">
        <el-button @click="$emit('cancelBtn')">取 消</el-button>
        <el-button type="primary" @click="$emit('okBtn')">确 定</el-button>
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
    methods: {}
  }
</script>
<style lang='less' scoped>
  .btn-right {
    float: right;
    margin-right: 0px !important;
  }
</style>
