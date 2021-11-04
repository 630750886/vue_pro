<template>
  <div>
    <el-row :gutter="20">
      <div class="btn-left">
        <public-button name="XIN1JIAN" icon="el-icon-plus" title="新建合同" @click="$emit('click', 1)"></public-button>
        <public-button name="XIN1JIAN" icon="el-icon-plus" title="新建框架合同" @click="$emit('click', 2)"></public-button>
      </div>
      <div class="btn-right bushead-container">
        <div class="bushead-item">
          <public-button name="CHA2XUN"   icon="el-icon-search" title="查询" @click="$emit('click', 3)"></public-button>
        </div>
        <div class="bushead-item">
          <public-button name="TONG3JI"  icon="el-icon-s-data" title="统计" @click="$emit('click', 4)"></public-button>
        </div>
        <div class="bushead-item">
          <public-button name="FREE"  icon="el-icon-refresh-right"  title="刷新"  @click="$emit('click', 9)"></public-button>
        </div>
        <div class="bushead-item">
          <download-excel class= "btn" :data="json_data" :fields="json_fields" header="" :fetch="genjsondata" name="业务合同基本信息表.xls">
          <public-button name="DAO3CHU"     icon="el-icon-share" title="导出"></public-button>
        </download-excel>
        </div>
        <div class="bushead-item">
          <public-button name="YUAN2JIAN4GUAN3LI" icon="el-icon-paperclip" title="原件管理" @click="$emit('click', 5)"></public-button>
        </div>
      </div>
    </el-row>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
export default {
  components: {},
     props:{
       genjsondata:{ type: Function },
       json_data:{type:Array,default: () => []},
       json_fields:{type:Object,default:()=>{}},
     },
  watch: {},
  //数据节点
  data() {
    return {};
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    handleCommand(command) {
      this.$emit("click", parseInt(command));
    }
  }
};
</script>
<style lang="less" scoped>

.bushead-container {
    display: -webkit-flex;
    display: flex;
    width: 520px!important;
    height: 45px;
	  flex-direction: row!important;
	  justify-content: flex-start!important;
    align-content:center;
    flex-wrap: nowrap!important;
}
.bushead-item {
    width: 95px!important;
    height: 30px!important;
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
