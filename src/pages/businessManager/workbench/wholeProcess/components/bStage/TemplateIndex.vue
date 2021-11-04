<template>
  <div class="column">
    <el-tabs v-model="activeName" tab-position="left" style="height: 600px;">
      <el-tab-pane label="各业务板块工作情况" name="1">
       <working-info-table></working-info-table>
      </el-tab-pane>

      <el-tab-pane label="其他服务" name="2">
        <other-services></other-services>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件

  import OtherServices from './template/OtherServices.vue'
  import WorkingInfoTable from './template/WorkingInfoTable.vue'
  export default {
    components: {
  WorkingInfoTable,
      OtherServices,
    },
    props: {},
    watch: {},
    //数据节点
    data() {
      return {
        activeName:"1"
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

</style>
