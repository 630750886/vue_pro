<template>
  <div>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <el-tag>{{pdata.allstatusname==""?"无":pdata.allstatusname}}</el-tag>
      </span>
      <el-dropdown-menu slot="dropdown">
         <el-dropdown-item command="0">已缴纳</el-dropdown-item>
         <el-dropdown-item command="1">未缴纳</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
  export default {
    props: {
      data: {},
    },
    //数据节点
    data() {
      return {
        pdata: this.data,
        vcheck:true
      }
    },
    //自定义函数节点
    methods: {
      handleCommand(command) {
        this.pdata.cashstatus=command;
        if (command==="0"){
          this.pdata.allstatusname="";
        }else
        {this.pdata.allstatusname="未缴纳";}
        this.$emit('click', 2, this.pdata)
      }
    }
  }
</script>
<style lang='less' scoped>
  .el-tag {
    cursor: pointer;
    margin-left: 10px !important;
  }
</style>
