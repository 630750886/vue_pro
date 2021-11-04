<template>
  <div>
    <el-row :gutter="20">
      
        <div class="btn-left">
          <public-button name="YE4WU4FEI4YONG4SHEN1QING" title="业务费用申请"  @click="$emit('click',1)"></public-button>
          <public-button name="YE4WU4FEI4YONG4DENG1JI" title="业务费用登记"  @click="$emit('click',2)"></public-button>
         <public-button name="GUAN3LI3FEI4YONG4SHEN1QING" title="管理费用申请"  @click="$emit('click',3)"></public-button>
          <public-button name="GUAN3LI3FEI4YONG4DENG1JI" title="管理费用登记"  @click="$emit('click',4)"></public-button>
          <!-- <el-button class="btn_color" type="primary" size="mini" @click="$emit('click',1)">报销申请</el-button>
          <el-button class="btn_color" type="primary" size="mini" @click="$emit('click',2)">高级查询</el-button> -->
        </div>
      <div class="btn-right bushead-container">
        <public-button
          name="CHA2XUN"
          icon="el-icon-search"
          title="查询"
          @click="$emit('click', 5)"
        ></public-button>
        <public-button
          name="TONG3JI"
          icon="el-icon-s-data"
          title="统计"
          @click="$emit('click', 6)"
        ></public-button>
        <el-button
          type="primary"
          icon="el-icon-refresh-right"
          size="mini"
          @click="$emit('click', 7)"
          >刷新</el-button
        >
        <public-button
          name="DAO3CHU"
          icon="el-icon-share"
          title="导出"
          @click="$emit('click', 8)"
        ></public-button>
      </div>
    </el-row>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {},
    watch: {},
    //数据节点
    data() {
      return {}
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {}
  }
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
