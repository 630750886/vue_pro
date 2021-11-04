<template>
  <div class="body">
    <el-tabs>
      <el-tab-pane label="计量">
        <measure-and-valuation-table :title="title?title+'/计量':'计量'"></measure-and-valuation-table>
      </el-tab-pane>
      <el-tab-pane label="计价">
        <measure-and-valuation-table :title="title?title+'/计价':'计价'"></measure-and-valuation-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import MeasureAndValuationTable from './table/GBQTable.vue'
  export default {
    components: {
      MeasureAndValuationTable
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
    methods: {
    }
  }
</script>
<style lang='less' scoped>

</style>
