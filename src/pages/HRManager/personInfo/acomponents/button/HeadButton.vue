<template>
  <div>
    <el-row :gutter="20">
      <div class="btn-left">
        <public-button name="XIN1JIAN" icon="el-icon-plus" title="新建" @click="$emit('click',1)"></public-button>
       
      </div>
      <div class="btn-right bushead-container">
        <div class="bushead-item">
        <public-button name="CHA2XUN" icon="el-icon-search" title="查询" @click="$emit('click',2)"></public-button></div>
        <div class="bushead-item">
        <public-button name="TONG3JI" icon="el-icon-s-data" title="统计" @click="$emit('click',3)"></public-button></div>
        <div class="bushead-item">
        <public-button name="FREE" type="primary" icon="el-icon-refresh-right" title="刷新" @click="$emit('click', 9)"></public-button></div>
        <div class="bushead-item">
            <download-excel class= "btn" :data="json_data" :fields="json_fields" header="" name="人员基本信息表.xls">
            <public-button name="DAO3CHU"  type="primary" size="mini" title="导出" icon="el-icon-share"></public-button>
         </download-excel>
        </div>
      </div>
    </el-row>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
       props:{
       json_data:{type:Array,default:[]},
       json_fields:{type:Object,default:{}},
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
  .bushead-container {
    display: -webkit-flex;
    display: flex;
    width: 500px!important;
    height: 45px;
    padding-right:20px;
    flex-direction:row!important;
    justify-content:flex-end!important;
    align-items: flex-start;
    align-content:space-between;
    flex-wrap: nowrap!important;
}

.bushead-item {
    width: 100px!important;
    height: 42px!important;
    margin: 2px;
}
.btn-left {
  float: left;
  margin-left: 0 !important;
}
.btn-right {
  float: right;
  margin-right: 0 !important;
  .public-button {
      margin-left: 2px;
      margin-right: 5px;
  }
}
</style>
