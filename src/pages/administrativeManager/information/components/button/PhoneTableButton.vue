<template>
  <div>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <el-tag>{{pdata.allstatusname==""?"待启用":pdata.allstatusname}}</el-tag>
      </span>
      <el-dropdown-menu slot="dropdown">
         <el-dropdown-item command="0">使用</el-dropdown-item>
         <el-dropdown-item command="1">暂停</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
  export default {
    props: {
      scope: {},
    },
    //数据节点
    data() {
      return {
        pdata: this.scope,
        vcheck:true
      }
    },
    //自定义函数节点
    methods: {
      handleCommand(command) {
        this.pdata.allstatuscode=command;
        if (command==="0"){
          this.pdata.allstatusname="使用中";
        }else
        {this.pdata.allstatusname="已停用";}
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
