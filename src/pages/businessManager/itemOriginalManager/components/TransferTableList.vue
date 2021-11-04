<template>
  <div class="logContainer">
    <!--移交-->
    <el-table
            :data="originalScriptList.dataList"
            style="width: 100%"
            align="center"
            height="330px"
            highlight-current-row
            :header-cell-style="{fontSize:'14px'}"
            border>
      <el-table-column label="序号" type="index" align="center"></el-table-column>
      <el-table-column prop="resourcename" label="资料名称" align="center" ></el-table-column>
      <el-table-column prop="contractcode" label="合同编号" align="center" width="130"></el-table-column>
      <el-table-column prop="projectcode" label="项目编号" align="center" ></el-table-column>
      <el-table-column prop="projectname" label="项目名称" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="copies" label="份数" align="center" ></el-table-column>
      <el-table-column prop="outperson" label="移交人" align="center" ></el-table-column>
      <el-table-column prop="inperson" label="接收人" align="center" ></el-table-column>
      <el-table-column prop="createddateTime" label="移交申请时间" align="center" ><template slot-scope="scope">{{scope.row.createddateTime|datefmt('YYYY/MM/DD')}}</template></el-table-column>
      <el-table-column prop="descinfo" label="备注" align="center" ></el-table-column>
      <el-table-column label="操作" align="center" min-width="120px">
        <template slot-scope="scope">
          <status-button :title="scope.row.trunoverstatus"></status-button>
          <delete-button :data="scope.row" @click="delTransfer"></delete-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <pagination
            :pageTotal="originalScriptList.total"
            @handleCurrentChange="handleCurrentChange"
            @handleSizeChange="handleSizeChange">
    </pagination>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapGetters, mapMutations, mapActions} = createNamespacedHelpers('originalScript')
  export default {
    components: {

    },
    props: {
    },
    watch: {

    },
    computed:{
      ...mapState({
        originalScriptList:'originalScriptList',
      })
    },
    //数据节点
    data() {
      return {
        pageShow: {
          pageInfo:{
            page: 1,
            limit: 30,
          },
          advancedQuery:{
            turnOverFileTypeKeyId:'1',
            turnOverFileTypeName:'项目'
          }
        },
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      ...mapActions({
        networkGetTransfer:'networkGetTransfer',
        networkDelTransfer:'networkDelTransfer',
      }),
      handleCurrentChange(val) {
        this.pageShow.page = val;
        this.networkGetTransfer(this.pageShow)
      },
      handleSizeChange(val) {
        this.pageShow.limit = val;
        this.networkGetTransfer(this.pageShow)
      },
      delTransfer(data){
        this.networkDelTransfer(data).then(item=>{
          if (item) this.networkGetTransfer(this.pageShow)
        })
      }
    }
  }
</script>
<style lang='less' scoped>
  .search_container {
    margin-bottom: 20px;
  }

  .searchArea {
    background: #e1dfdf;
    border-radius: 2px;
    padding: 18px 18px 0;
  }
</style>
