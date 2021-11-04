<template>
  <div class="body">

    <div class="button">
      <el-button class="btn_color" type="primary" @click="$refs.addRef.openDialog()" size="mini">增加</el-button>
    </div>
    <div class="table">
      <el-table :data="stationList" height="6.8rem" border> 
        <el-table-column label="所属组织" prop="orgName" align="center"></el-table-column>
        <el-table-column label="岗位名称" prop="posName" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status===1" type="text" @click="enablePos(scope.row.keyid)">启用</el-button>
            <el-button v-if="scope.row.status===0" type="text" @click="stopPos(scope.row.keyid)">停用</el-button>
            <!--<el-button type="text" @click="submitDelPos(scope.row.keyid)">删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <!--新增岗位-->
      <station-dialog title="新增岗位"
                      :load-data="loadData"
                      :user-id="userId"
                      dialog-width="35%"
                      ref="stationRef" @getFormData="submitAddPos"></station-dialog>
      <!--修改岗位-->
      <station-dialog title="修改岗位"
                      :update-data="upData"
                      dialog-width="35%"
                      :load-data="loadData"
                      ref="upStationRef" @getFormData="submitUpPos"></station-dialog>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import StationDialog from './dialog/StationDialog.vue'
  export default {
    components: {
      StationDialog,
    },
    props: {

    },
    watch: {
      stationList(newValue) {
        let array = []
        array = this.$myfunction.copyData(newValue)
        this.total = array.length
      }
    },
    //数据节点
    data() {
      return {
        upData: {},
        total: 0,
        pageShow: {
          page: 1,
          limit: 30,
          filter: '1=1'
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
      enablePos(id) {
        this.$confirm('是否启用该岗位？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('function', 'enablePos', id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消此次操作'
          });
        });
      },
      submitAddPos(data) {
        this.$emit('function', 'addPosForm', data)
      },
      submitUpPos(data) {
        this.$emit('function', 'upPosForm', data)
      },
      stopPos(id) {
        this.$confirm('是否停用该岗位？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('function', 'stopPos', id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消此次操作'
          });
        });
      }
    }
  }
</script>
<style lang='less' scoped>
  .body {
    width: 100%;
    height: 100%;
    background-color: white;
    .button {
      height: 25px;
      padding: 10px 15px;
      .el-button {
        float: right;
      }
    }
  }

</style>
