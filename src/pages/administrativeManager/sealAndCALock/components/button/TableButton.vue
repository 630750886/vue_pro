<template>
  <div>
    <el-button type="text" size="mini" @click="$emit('click',1,data)">完善信息</el-button>
    <el-dropdown @command="handleCommand">
      <el-tag>{{data.allstatusname}}<i class="el-icon-arrow-down el-icon--right"></i></el-tag>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="1">停用</el-dropdown-item>
        <el-dropdown-item command="0">启用</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import StatusButton from '../../../acomponents/StatusButton.vue'
  export default {
    components:{
      StatusButton
    },
    props: {
      scope: {},
    },
    //数据节点
    data() {
      return {
        data: this.scope
      }
    },
    //生命周期函数节点
    created() {
    },

    //自定义函数节点
    methods: {
      handleCommand(command) {
        if (command==="1")
        {this.data.allstatuscode="1";
        this.data.allstatusname="停用"}
        else
        {
          this.data.allstatuscode="0";
          this.data.allstatusname="启用"
        }
        this.$emit('click', 2, this.data)
      }
    }
  }
</script>
<style lang='less' scoped>
  .el-tag {
    margin-left: 10px !important;
  }
</style>
