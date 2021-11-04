<template>
  <!--接收-->
  <div class="logContainer">
    <div class="table">
      <el-table
              :data="originalScriptList.dataList"
              style="width: 100%"
              align="center"
              height="530px"
              highlight-current-row
              :header-cell-style="{fontSize:'14px'}"
              border>
        <el-table-column label="序号" type="index" align="center" ></el-table-column>
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
            <template v-if="scope.row.isInResult!==''">
              <status-button :title="scope.row.trunoverstatus"></status-button>
              <delete-button :data="scope.row" @click="delTransfer"></delete-button>
            </template>
            <template v-else>
              <el-button type="text" @click="receiveOriginalScript(scope.row)">接收</el-button>
              <el-button type="text" @click="rejectionOriginalScript(scope.row)">拒收</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <!--分页-->
      <pagination
              :pageTotal="originalScriptList.total"
              @handleCurrentChange="handleCurrentChange"
              @handleSizeChange="handleSizeChange">
      </pagination>
    </div>
    <div class="dialog">
      <rejection-dialog ref="rejectionRef" title="拒收原因" width="30%" @getFormData="getRejectionForm"></rejection-dialog>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import RejectionDialog from './dialog/RejectionDialog.vue'
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapGetters, mapMutations, mapActions} = createNamespacedHelpers('originalScript')
  export default {
    components: {
      RejectionDialog,
    },
    props: {
    },
    watch: {

    },
    computed: {
      ...mapState({
        originalScriptList: 'originalScriptList',
      })
    },
    //数据节点
    data() {
      return {
        pageShow: {
          pageInfo: {
            page: 1,
            limit: 30,
          },
          advancedQuery: {
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
        networkGetReceive: 'networkGetReceive',
        networkReceiveOriginalScript: 'networkReceiveOriginalScript',
        networkRejectionOriginalScript: 'networkRejectionOriginalScript',
        networkDelReceive:'networkDelReceive'
      }),
      handleCurrentChange(val) {
        this.pageShow.page = val;
        this.networkGetReceive(this.pageShow)
      },
      handleSizeChange(val) {
        this.pageShow.limit = val;
        this.networkGetReceive(this.pageShow)
      },
      //接收
      receiveOriginalScript(oldData) {
        let data = this.$myfunction.copyData(oldData)
        this.$msgbox.confirm('是否确认接收？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.networkReceiveOriginalScript(data).then(item => {
            if (item) this.networkGetReceive(this.pageShow)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        })
      },
      //拒收
      rejectionOriginalScript(data) {
        this.$refs.rejectionRef.openDialog(data)
      },
      getRejectionForm(formData){
        this.networkRejectionOriginalScript(formData).then(item => {
          if (item) this.networkGetReceive(this.pageShow)
        })
      },
      delTransfer(data){
        this.networkDelReceive(data).then(item=>{
          console.log(item)
          if (item) this.networkGetReceive(this.pageShow)
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
