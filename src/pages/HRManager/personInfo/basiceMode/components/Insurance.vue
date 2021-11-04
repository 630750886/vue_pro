<template>
  <div class="body">
    <div class="button">
      <public-button name="XIN1JIAN" icon="el-icon-plus" title="新建" @click="$refs.addRef.openDialog()"></public-button>
    </div>
    <div class="table">
      <el-table :data="insurance.dataList" height="6.8rem" align="left" border>
        <el-table-column label="保险名称" prop="insuranceName"></el-table-column>
        <el-table-column label="保险公司" prop="company"></el-table-column>
        <el-table-column label="被保险人" prop="insuredName" ></el-table-column>
        <el-table-column label="受益人" prop="beneficiary" ></el-table-column>
        <el-table-column label="购买时间" prop="buyTime" ></el-table-column>
        <el-table-column label="附件" >
          <template slot-scope="scope">
            <download-button :value="scope.row.file"></download-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <public-button name="SHAN1CHU" title="删除" classhd="hd" :plain="true" type="primary"  @click="submitdeleteForm(scope.row)"></public-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <!--分页-->
      <pagination :pageTotal="insurance.total"
                  @handleCurrentChange="handleCurrentChange"
                  @handleSizeChange="handleSizeChange"></pagination>
    </div>
    <div class="dialog">
      <insurance-dialog ref="addRef" title="" dialog-width="30%"
                        @getFormData="submitAddFormData"></insurance-dialog>
      <insurance-dialog ref="updateRef" title="修改保险信息" dialog-width="30%"
                        @getFormData="submitUpdateFormData"></insurance-dialog>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import InsuranceDialog from './dialog/InsuranceDialog.vue'
  import pagination from '../../../../../components/pagination/index.vue'
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapGetters, mapMutations, mapActions} = createNamespacedHelpers('hrStore')
  export default {
    components: {
      InsuranceDialog,
      pagination
    },
    props: {},

    watch: {},
    computed: {
      ...mapGetters({
        insurance: 'insurance'
      })

    },
    //数据节点
    data() {
      return {
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
      ...mapActions({
        networkAddInsurance: 'networkAddInsurance',
        networkUpdateInsurance: 'networkUpdateInsurance',
        networkdeletesInsurance:'networkdeletesInsurance'
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
         this.networkdeletesInsurance(data);
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
        this.networkAddInsurance(data)
      },
      submitUpdateFormData(data) {
        this.networkUpdateInsurance(data)
      },
    }
  }
</script>
<style lang='less' scoped>
  .body {
    width: 100%;
    height: 100%;
    .button {
      height: 25px;
      padding: 10px 15px;
      .el-button {
        float: right;
      }
    }
  }

</style>
