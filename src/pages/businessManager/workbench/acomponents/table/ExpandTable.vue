<template>
  <el-table
          ref="tableRef"
          :data="dataList"
          style="width: 100%"
          align="center"
          highlight-current-row
          :header-cell-style="{fontSize:'10px'}" border>
    <el-table-column prop="updateddateTime" label="变更时间" align="center"></el-table-column>
    <el-table-column prop="projectPersonName" label="变更前" align="center"></el-table-column>
    <el-table-column label="变更后" align="center">
      <template slot-scope="scope">
        {{findSubordinateData(scope.row.keyid)}}
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import {mapActions} from 'vuex'
  export default {
    components: {},
    props: {
      pkeyid:[String]
    },
    //生命周期函数节点
    created() {

    },
    mounted() {
      this.networkHistoryWorkGroupInfo({pkeyid:this.pkeyid}).then(item=>{
        this.dataList=this.$myfunction.copyData(item)
        this.dataList.splice(0,1)
        this.copeDataList=item
      })
    },
    watch: {},
    //数据节点
    data() {
      return {
        dataList:[],
        copeDataList:[],
      }
    },

    //自定义函数节点
    methods: {
        ...mapActions('workbench/aStage',{
          networkHistoryWorkGroupInfo: 'networkHistoryWorkGroupInfo',
        }),
      findSubordinateData(keyid){
          let ref=this.copeDataList.find(item=>{
            return keyid===item.pkeyid
          })
        if (ref) {
          return ref.projectPersonName
        }
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
