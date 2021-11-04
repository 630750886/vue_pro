<template>
  <div>
    <el-button type="text" size="mini" @click="$emit('click',4,data)">查看</el-button>
    <el-button type="text" size="mini" @click="$emit('click',5,data)">工作提醒</el-button>
    <el-dropdown @command="handleCommand">
      <el-tag size="small" v-if="data.status===0">启用中<i class="el-icon-arrow-down el-icon--right"></i></el-tag>
      <el-tag size="small" v-if="data.status===1">已停用<i class="el-icon-arrow-down el-icon--right"></i></el-tag>
      <el-tag size="small" v-if="data.status===2">已离职<i class="el-icon-arrow-down el-icon--right"></i></el-tag>
      <el-dropdown-menu v-if="data.status!==3" slot="dropdown">
        <el-dropdown-item v-if="data.status===1 && data.status!==3" command="1">启用</el-dropdown-item>
        <el-dropdown-item v-if="data.status===0 && data.status!==3" command="2">停用</el-dropdown-item>
        <el-dropdown-item command="3">离职</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    props: {
      user: {
        type: String,
        default: "admin"
      },
      scope: '',
    },
    //数据节点
    data() {
      return {
        currentUser: this.user,
        data: this.scope
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      handleCommand (command) {
        this.$emit('click', parseInt(command),this.data)
      }
    }
  }
</script>
<style lang='less' scoped>
  .el-tag {
    margin-left: 10px !important;
  }
</style>
