<template>
  <div class="body">
    <div class="button">
      <public-button name="XIN1JIAN" icon="el-icon-plus" title="新建" @click="$refs.addRef.openDialog()"></public-button>
    </div>
    <div class="table">
      <el-table :data="practice.dataList" height="6.8rem" align="left" border>
        <el-table-column label="执业类型" prop="practiceType"></el-table-column>
        <el-table-column label="执业名称" prop="practiceTypeName"></el-table-column>
        <el-table-column label="专业一" prop="majorA" ></el-table-column>
        <el-table-column label="专业二" prop="majorB" ></el-table-column>
        <el-table-column label="初次获取时间" prop="obtainTime" ></el-table-column>
        <el-table-column label="有效期开始时间" prop="startTime" ></el-table-column>
        <el-table-column label="有效期结束时间" prop="endTime" ></el-table-column>
        <el-table-column label="附件" >
          <template slot-scope="scope">
            <download-button :value="scope.row.file"></download-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <public-button name="SHAN1CHU" title="删除" classhd="hd" :plain="true" type="primary"  @click="submitdeleteForm(scope.row)"></public-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <!--分页-->
      <pagination :pageTotal="practice.total"
                  @handleCurrentChange="handleCurrentChange"
                  @handleSizeChange="handleSizeChange"></pagination>
    </div>
    <div class="dialog">
      <practice-dialog ref="addRef" title="" dialog-width="30%"
                       @getFormData="submitAddFormData"></practice-dialog>
      <practice-dialog ref="updateRef"
                       title="修改执业信息"
                       dialog-width="30%"
                       @getFormData="submitUpdateFormData"></practice-dialog>
    </div>

  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import PracticeDialog from './dialog/PracticeDialog.vue'
  import pagination from '../../../../../components/pagination/index.vue'
  import {createNamespacedHelpers} from 'vuex'
  const {mapState, mapGetters, mapMutations, mapActions} = createNamespacedHelpers('hrStore')
  export default {
    components: {
      PracticeDialog,
      pagination
    },
    props: {},
    watch: {},
    computed: {
      ...mapGetters({
        practice: 'practice',
      })
    },
    //数据节点
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
        networkAddPractice: 'networkAddPractice',
        networkUpdatePractice: 'networkUpdatePractice',
        networkdeletesPractice:'networkdeletesPractice'
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
         this.networkdeletesPractice(data);
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
        this.networkAddPractice(data)
      },
      submitUpdateFormData(data) {
        this.networkUpdatePractice(data)
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
