<template>
  <div>
    <el-button @click="getCode">获取授权码</el-button>
    <el-table :data="dataList" style="width: 100%" align="center" highlight-current-row :header-cell-style="{fontSize:'14px'}">
      <el-table-column prop="projectCode" label="项目编号" align="center"></el-table-column>
      <el-table-column prop="projectName" label="项目名称" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="projectProgress" label="项目进度" align="center">
        <template slot-scope="scope">

        </template>
      </el-table-column>
      <el-table-column prop="allstatuscode" label="项目状态" align="center">
        <template slot-scope="scope">
          <status-button code="066" :status="scope.row.allstatuscode"></status-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      dataList:[Array]
    },
    //生命周期函数节点
    created() {
    },
    mounted() {
    },
    watch: {},
    //数据节点
    data() {
      return {
        //dataList:[]
      }
    },
    //自定义函数节点
    methods: {
      async getCode(){
        this.$msgbox.confirm(await this.ddPowerCode())
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
