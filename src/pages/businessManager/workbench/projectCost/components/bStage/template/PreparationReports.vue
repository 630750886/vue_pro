<template>
  <div class="body">
    <el-tabs>
      <el-tab-pane label="报告">
        <report-table :title="title?title+'/报告':'报告'"></report-table>
      </el-tab-pane>
      <el-tab-pane label="定案表">
        <preparation-table :title="title?title+'/定案表':'定案表'"></preparation-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import PreparationTable from './table/PreparationTable.vue'
  import ReportTable from './table/ReportTable.vue'
  export default {
    components: {
      PreparationTable,
      ReportTable
    },
    props: {
      title:[String]
    },
    watch: {},
    //数据节点
    data() {
      return {
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {}
  }
</script>
<style lang='less' scoped>
.body{
  .button{
    .column{
      height: 45px;
      width: 50%;
      float: left;
    }
  }
}
</style>
