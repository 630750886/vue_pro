<template>
  <div>
    <public-button
      name="YING1SHOU1DENG1JI"
      title="删除"
      classhd="hd"
      :plain="true"
      type="primary"
      @click="$emit('click', 1, scope.row)"
    ></public-button>
    <public-button
      name="YING1SHOU1DENG1JI"
      title="支付登记"
      classhd="hd"
      :plain="true"
      type="primary"
      @click="$emit('click', 2, scope.row)"
    ></public-button>
    <el-tag size="small">{{
      scope.row.PayStatus == 0 ? "未收" : "已收"
    }}</el-tag>
    <!-- <public-button
      name="WAN2SHAN4TUI4KUAN3XIN4XI"
      title="下载申请表"
      classhd="hd"
      :plain="true"
      type="primary"
      @click="$emit('click', 3, scope.row)"
    ></public-button> -->
    <!-- <public-button name="TUI4KUAN3SHEN1QING" title="退款申请" classhd="hd" :plain="true" type="primary" v-show="(!scope.drawback)" @click="$emit('click',4,scope)"></public-button>
<public-button name="WAN2SHAN4TUI4KUAN3XIN4XI" title="完善退款信息" classhd="hd" :plain="true" type="primary" v-show="(scope.drawback&&scope.drawback.state=='2')" @click="$emit('click',5,scope)"></public-button> -->

    <!-- <el-button type="text" size="mini" @click="$emit('click',1,scope)">修改</el-button>
    <el-button type="text" size="mini" @click="$emit('click',2,scope)">删除</el-button>
    <el-button type="text" size="mini" @click="$emit('click',3,scope)">明细登记</el-button>

    <el-button type="text" size="mini" @click="$emit('click',4,scope)" v-show="(!scope.drawback)">退款申请</el-button>

    <el-button type="text" size="mini" @click="$emit('click',5,scope)" v-show="(scope.drawback&&scope.drawback.state=='2')">完善退款信息</el-button> -->
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
export default {
  props: {
    user: {
      type: String,
      default: "admin",
    },
    scope: "",
  },
  // 数据节点
  data() {
    return {
      currentUser: this.user,
      data: this.scope,
    };
  },
  // 生命周期函数节点
  created() {},
  // 自定义函数节点
  methods: {},
};
</script>
<style lang="less" scoped>
.el-tag {
  margin-left: 10px !important;
}
</style>
