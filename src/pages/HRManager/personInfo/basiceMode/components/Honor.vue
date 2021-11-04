<template>
  <div class="body">
    <div class="button">
      <public-button name="XIN1JIAN" icon="el-icon-plus" title="新建" @click="$refs.addRef.openDialog()"></public-button>
    </div>
    <div class="table">
      <el-table :data="honor.dataList" height="6.8rem" align="left" border>
        <el-table-column label="荣誉名称" prop="honorName" ></el-table-column>
        <el-table-column label="获取时间" prop="obtainTime" ></el-table-column>
        <el-table-column label="附件">
          <template slot-scope="scope">
            <download-button :value="scope.row.file"></download-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">

            <public-button name="SHAN1CHU" classhd="hd" :plain="true" type="primary" title="删除"  @click="submitdeleteForm(scope.row)"></public-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <!--分页-->
      <pagination :pageTotal="honor.total"
                  @handleCurrentChange="handleCurrentChange"
                  @handleSizeChange="handleSizeChange"></pagination>
    </div>
    <div class="dialog">
      <honor-dialog ref="addRef" title="" width="30%"
                    @getFormData="submitAddFormData"></honor-dialog>
      <honor-dialog ref="updateRef" title="修改荣誉信息" width="30%"
                    @getFormData="submitUpdateFormData"></honor-dialog>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import HonorDialog from './dialog/HonorDialog.vue'
  import pagination from '../../../../../components/pagination/index.vue'
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapGetters, mapMutations, mapActions} = createNamespacedHelpers('hrStore')
  export default {
    components: {
      HonorDialog,
      pagination
    },
    props: {},
    watch: {},
    computed: {
      ...mapGetters({
        honor: 'honor'
      })
    },//数据节点
    data() {
      return {
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
      ...mapActions({
        networkAddHonor: 'networkAddHonor',
        networkUpdateHonor: 'networkUpdateHonor',
        networkdeletesHonor:'networkdeletesHonor'
      }),
      submitdeleteForm(data){
        this.$confirm(
        "此操作将删除相关数据,是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
         this.networkdeletesHonor(data);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });

      },
      handleCurrentChange(val) {
        this.pageShow.page = val;
      },
      handleSizeChange(val) {
        this.pageShow.limit = val;
      },
      submitAddFormData(data) {
        this.networkAddHonor(data)
      },
      submitUpdateFormData(data) {
        this.networkUpdateHonor(data)
      }
    }
  }
</script>
<style lang='less' scoped>
  .body {
    width: 100%;
    height: 100%;
  }

  .button {
    height: 25px;
    padding: 10px 15px;
    .el-button {
      float: right;
    }
  }
</style>
