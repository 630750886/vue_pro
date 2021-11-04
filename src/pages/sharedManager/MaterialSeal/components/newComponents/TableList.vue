<template>
  <div class="body">
    <div class="button">
      <head-button @click="headBtnClick"></head-button>
    </div>
    <div class="table">
      <el-table
              :row-style="{height:'75px'}"
              :data="dataList"
              style="width: 100%"
              align="center"
              height="7.5rem"
              highlight-current-row
              :header-cell-style="{fontSize:'14px'}"
              ref="refTable"
              border>
        <el-table-column prop="k1" label="申请时间" align="center" width="100px"></el-table-column>
        <el-table-column prop="k4" label="申请组织" align="center" width="250px">
          总经办/经营管理中心/行政部/总经办/经
        </el-table-column>
        <el-table-column prop="k2" label="申请人" align="center" width="100px">
          反对反对的
        </el-table-column>
        <el-table-column prop="k3" label="资料名称" align="center" width="250px">
          和的也辅，后进生不一定是对的四定是对的四
        </el-table-column>
        <el-table-column prop="k5" label="审核完成时间" align="center" width="150px"></el-table-column>
        <el-table-column label="操作" align="center" fixed="right" min-width="200px">
          <template slot-scope="scope">
            <table-button :scope="scope.row" @click="tableBtnClick"></table-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <!--分页-->
      <pagination
              :pageTotal="total"
              @handleCurrentChange="handleCurrentChange"
              @handleSizeChange="handleSizeChange"> </pagination>
    </div>

   <div class="dialog">
     <!--盖章申请-->
     <seal-apply-dialog ref="sealRef" title="盖章申请" width="30%" @getFormData="sealApplyFormData"></seal-apply-dialog>
     <!--高级查询-->
     <query-dialog ref="queryRef" :load-data="loadData" title="高级查询" width="25%"
                   @getFormData="queryFormData"></query-dialog>
     <!--办理盖章-->
     <submit-seal-dialog ref="submitSealRef" title="办理盖章" width="30%"></submit-seal-dialog>
   </div>

  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import pagination from '../../../../components/pagination/index.vue'
  import TableButton from './button/TableButton.vue'
  import SealApplyDialog from './dialog/SealApplyDialog.vue'
  import HeadButton from './button/HeadButton.vue'
  import QueryDialog from './dialog/QueryDialog.vue'
  import SubmitSealDialog from './dialog/SubmitSealDialog.vue'

  export default {
    components: {
      pagination,
      TableButton,
      SealApplyDialog,
      HeadButton,
      QueryDialog,
      SubmitSealDialog
    },
    props: {
      myData: {
        type: Array,
        default: () => {
          return [

          ]
        }
      },
      pageTotal: {
        type: Number,
        default: 20
      },
      loadData: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    watch: {
      myData() {
        this.dataList = this.myData
      },
      pageTotal() {
        this.total = this.pageTotal
      }
    },
    //数据节点
    data() {
      return {
        //展示数据
        dataList: this.myData,
        //总条数
        total: this.pageTotal,
        pageShow: {
          page: 1,
          limit: 30,
          filter: {}
        },
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      handleCurrentChange(val) {
        this.pageShow.page = val;
      },
      handleSizeChange(val) {
        this.pageShow.limit = val;
      },
      //头部按钮
      headBtnClick(btn) {
        switch (btn) {
          case 1:
            this.$refs.sealRef.openDialog()
            break
          case 2:
            this.$refs.queryRef.openDialog()
            break
        }
      },
      //表格按钮
      tableBtnClick(btn, data) {
        switch (btn) {
          case 1:
            break
          case 2:
            this.$refs.submitSealRef.openDialog()
            break
        }
      },

      sealApplyFormData(data) {
        this.$emit('function', 'sealApplyForm', data)
      },
      queryFormData(data) {
        const where = this.$myfunction.sqlSplicing(data)
        this.$emit('function', 'queryForm', where)
      }
    }
  }
</script>
<style lang='less' scoped>
  .body{
    .button{
      height: 50px;
      line-height: 50px;
      margin: 0 10px;
    }
  }
</style>
