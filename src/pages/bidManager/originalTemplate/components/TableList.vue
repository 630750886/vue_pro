<template>
  <div class="body">
    <div class="head-button">
      <head-button @click="headButtonClick"></head-button>
    </div>
    <div class="table">
      <el-table
              ref="tableRef"
              :data="dataList"
              style="width: 100%"
              align="center"
              height="7.5rem"
              highlight-current-row
              :header-cell-style="{fontSize:'14px'}"
              border>
        <el-table-column label="类型" align="center"></el-table-column>
        <el-table-column label="模板名称" align="center"></el-table-column>
        <el-table-column label="创建时间" align="center"></el-table-column>
        <el-table-column label="附件" align="center">
          <template slot-scope="scope">
            <el-button type="text">预览</el-button>
            <el-button type="text">下载</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="300px" fixed="right">
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
              @handleSizeChange="handleSizeChange"></pagination>
    </div>
    <div class="dialog">
      <add-template-dialog ref="addRef" width="30%"></add-template-dialog>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import HeadButton from './button/HeadButton.vue'
  import TableButton from './button/TableButton.vue'
  import AddTemplateDialog from './dialog/AddTemplateDialog.vue'
  export default {
    components: {
      HeadButton,
      TableButton,
      AddTemplateDialog
    },
    props: {
      isHandel:{
        type:Boolean,
        default:false
      }
    },
    watch: {},
    //数据节点
    data() {
      return {
        dataList:[{}],
        total:10,
        pageShow: {
          page: 1,
          limit: 30
        },
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      headButtonClick(btn){
        switch (btn) {
          case 1:
            this.$refs.addRef.openDialog()
            break
        }
      },
      tableBtnClick(btn,data){
        switch (btn) {
          case 1:
            break
        }
      },
      handleCurrentChange(val) {
        this.pageShow.page = val;

      },
      handleSizeChange(val) {
        this.pageShow.limit = val;

      },
    }
  }
</script>
<style lang='less' scoped>


</style>
