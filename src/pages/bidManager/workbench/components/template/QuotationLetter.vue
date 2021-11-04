<template>
  <div>
    <el-tabs v-model="activeName" tab-position="left" style="height: 600px;">
      <el-tab-pane name="1">
        <span slot="label">制作文件</span>
        <div v-if="activeName==='1'" class="pane-main">
          <make-file-table type-code="402880fa750101f90175029c9dc30010"></make-file-table>
        </div>
      </el-tab-pane>
      <el-tab-pane name="2">
        <span slot="label">结果跟踪</span>
        <div v-if="activeName==='2'" class="pane-main">
          <result-track-table type-code="402880fa750101f90175029c9dc30010"></result-track-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import MakeFileTable from '../table/MakeFileTable.vue'
  import ResultTrackTable from '../table/ResultTrackTable.vue'
  export default {
    components: {
      MakeFileTable,
      ResultTrackTable
    },
    props: {},
    watch: {

    },
    //数据节点
    data() {
      return {
        activeName:'1',
        name1:'name1',
        name2:'name2'
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
    .pane-main{
     .head-button{
       height: 25px;
       padding: 15px 10px;
     }
   }

</style>
