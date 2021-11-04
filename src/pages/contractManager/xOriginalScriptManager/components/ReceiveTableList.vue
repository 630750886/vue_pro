<template>
  <div class="logContainer">
    <!--合同接收-->
    <el-table
            :data="originalScriptList.dataList"
            style="width: 100%"
            align="left"
            height="330px"
            highlight-current-row
            :header-cell-style="{fontSize:'14px'}"
            empty-text="现无移交资料数据！！！"
            border>
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column prop="contracttypename" label="类型"  width="110px"></el-table-column>
      <el-table-column prop="resourcename" label="资料名称"  width="100px"></el-table-column>
      <el-table-column prop="contractcode" label="合同编号"  width="120px"></el-table-column>
      <el-table-column prop="contractname" label="合同名称" width="260px" show-overflow-tooltip></el-table-column>
      <el-table-column prop="copies" label="份数"  width="40px"></el-table-column>
      <el-table-column prop="outperson" label="移交人" width="60px"></el-table-column>
      <el-table-column prop="createddateTime" label="移交申请时间"><template slot-scope="scope">{{scope.row.createddateTime|datefmt('YYYY/MM/DD')}}</template></el-table-column>
      <el-table-column prop="descinfo" label="备注" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" min-width="120px">
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
    <!--分页-->
    <pagination
            :pageTotal="originalScriptList.total"
            @handleCurrentChange="handleCurrentChange"
            @handleSizeChange="handleSizeChange">
    </pagination>
    <rejection-dialog ref="rejectionRef" title="拒收原因" width="30%" @getFormData="getRejectionForm"></rejection-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import RejectionDialog from './dialog/RejectionDialog.vue'
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapActions} = createNamespacedHelpers('originalScript')
  export default {
    components: {
      RejectionDialog
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
            turnOverFileTypeKeyId:'0',
            turnOverFileTypeName:'合同'
          }
        },
      }
    },
    //生命周期函数节点
    created() {
      this.networkGetReceive(this.pageShow);
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
        this.$msgbox.confirm('是否确认接收?', '提示', {
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
           this.networkGetReceive(this.pageShow)
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
