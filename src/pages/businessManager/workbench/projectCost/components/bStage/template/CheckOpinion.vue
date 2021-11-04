<template>
  <div class="body">
    <el-tabs>
      <el-tab-pane label="核对">
        <check-table></check-table>
      </el-tab-pane>
      <el-tab-pane label="征询意见">
        <opinion-table></opinion-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import CheckTable from './table/CheckTable.vue'
  import OpinionTable from './table/OpinionTable.vue'
  export default {
    components: {
      CheckTable,
      OpinionTable
    },
    props: {},
    watch: {},
    //数据节点
    data() {
      return {
        value1:'',
        showLeftButton:false,
        dataList:[{name:'合成底稿一',type:'合成底稿'}]
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
