<template>
  <div>
      <div class="btn-left">
        <public-button
          name="XIN1JIAN"
          icon="el-icon-plus"
          title="新建"
          @click="$emit('click', 1)"
        ></public-button>
      </div>
      <div class="btn-right">
        <public-button
          name="CHA2XUN"
          icon="el-icon-search"
          title="查询"
          @click="$emit('click', 2)"
        ></public-button>
        <public-button
          name="TONG3JI"
          icon="el-icon-s-data"
          title="统计"
          @click="$emit('click', 3)"
        ></public-button>
        <public-button
          name="FREE"
          type="primary"
          icon="el-icon-refresh-right"
          size="mini"
          title="刷新"
          @click="$emit('click', 5)"
        ></public-button>
        <download-excel class= "btn" :data="json_data" :fields="json_fields" header="" name="客户信息表.xls">
          <public-button name="DAO3CHU" type="primary" title="导出" size="mini" icon="el-icon-share"></public-button>
        </download-excel>
      </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
export default {
  components: {},
   props:{
       json_data:{type:Array,default:()=>[]},
       json_fields:{type:Object,default:()=>{}},
     },
  //自定义函数节点
  methods: {
    handleCommand(command) {
      this.$emit("click", parseInt(command));
    }
  }
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
  };
  .btn{
    float: right!important;
  }
}
</style>
