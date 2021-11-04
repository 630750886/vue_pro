<template>
  <div>
    <el-row :gutter="20">
      <div class="btn-left">
        <public-button
          name="FA1PIAO4DENG1JI"
          icon="el-icon-plus"
          title="发票登记"
          @click="$emit('click', 1)"
        ></public-button>
        <public-button
          name="FA1PIAO4SHEN1QING"
          icon="el-icon-plus"
          title="发票申请"
          @click="$emit('click', 2)"
        ></public-button>
      </div>
      <div class="btn-right bushead-container">
        <public-button
          name="CHA2XUN"
          icon="el-icon-search"
          title="查询"
          @click="$emit('click', 3)"
        ></public-button>
        <public-button
          name="TONG3JI"
          icon="el-icon-s-data"
          title="统计"
          @click="$emit('click', 4)"
        ></public-button>
        <el-button
          type="primary"
          icon="el-icon-refresh-right"
          size="mini"
          @click="$emit('click', 9)"
          >刷新</el-button
        >
        <public-button
          name="DAO3CHU"
          icon="el-icon-share"
          title="导出"
          @click="$emit('click', 4)"
        ></public-button>
      </div>
      <!-- <el-button type="primary" @click="$emit('click',100)">加载中</el-button> -->
      <!-- <el-button class="btn_color" type="primary" size="mini" @click="$emit('click',1)">发票登记</el-button>
        <el-button class="btn_color" type="primary" size="mini" @click="$emit('click',2)">申请开票</el-button>
        <el-button class="btn_color" type="primary" size="mini" @click="$emit('click',3)">高级查询</el-button>
        <el-button class="btn_color" type="primary" size="mini" @click="$emit('click',4)">数据展示</el-button> -->

      <!-- <div class="btn-right">
				<el-button class="btn_color" type="primary" size="mini" @click="$emit('click',7)">导出Excel</el-button>
      </div>  -->
    </el-row>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
export default {
  // 数据节点
  data() {
    return {};
  },
  // 生命周期函数节点
  created() {},
  // 自定义函数节点
  methods: {
    handleCommand(command) {
      this.$emit("click", parseInt(command));
    },
  },
};
</script>
<style lang="less" scoped>
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
