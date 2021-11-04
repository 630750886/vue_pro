<template>
  <div>
    <el-row>
      <div class="btn-left">
        <public-button name="XIN1JIAN"
          icon="el-icon-plus"
          title="新建"
          @click="$emit('click',1)"></public-button>
      </div>
      <div class="btn-right  bushead-container">
        <div class="bushead-item">
         <public-button
          icon="el-icon-search"
          name="CHA2XUN"
          title="查询" @click="$emit('click',2)"></public-button></div>
      <div class="bushead-item">
        <public-button
          name="FREE"
          type="primary"
          icon="el-icon-refresh-right"
          size="mini"
          title="刷新"
          @click="$emit('click', 9)"
        ></public-button></div>
        <div class="bushead-item">
         <download-excel class= "btn" :data="json_data" :fields="json_fields" header="" name="招标代理.xls">
            <public-button name="DAO3CHU" icon="el-icon-share" title="导出" @click="$emit('click', 7)"
          ></public-button>
          </download-excel></div>
        <div class="bushead-item" style="width: 125px;margin-right: 60px">
          <public-button name="YUAN2JIAN4GUAN3LI" title="网站平台备案管理" @click="$emit('click',10)"></public-button>
        </div>
        <div class="bushead-item">
				<public-button name="YUAN2JIAN4GUAN3LI" icon="el-icon-link" title="原件管理" @click="$emit('click',4)"></public-button></div>
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
    width: 600px!important;
    height: 45px;
    padding-right:20px;
    flex-direction:row!important;
    justify-content:flex-end!important;
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
  margin-left: 3px !important;
}
.btn-right {
  float: right;
  margin-right: 3px !important;
  .public-button {
      margin-left: 2px;
      margin-right: 5px;
  }
}
</style>
