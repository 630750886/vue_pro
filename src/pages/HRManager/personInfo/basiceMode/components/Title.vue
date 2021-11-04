<template>
  <div class="body">
    <div class="button">
      <public-button name="XIN1JIAN" icon="el-icon-plus" title="新建" @click="$refs.addRef.openDialog()"></public-button>
    </div>
    <div class="table">
      <el-table :data="titles.dataList" height="6.8rem" align="left" border>
        <el-table-column label="职称类别" prop="titleType" ></el-table-column>
        <el-table-column label="职称级别" prop="titleLevel" ></el-table-column>
        <el-table-column label="职称专业" prop="titleMajor"></el-table-column>
        <el-table-column label="获取时间" prop="obtainTime" >
          <template slot-scope="scope">
            {{$myfunction.addDayToDate(scope.row.obtainTime,0)}}
          </template>
        </el-table-column>
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
      <pagination :pageTotal="titles.total"
                  @handleCurrentChange="handleCurrentChange"
                  @handleSizeChange="handleSizeChange"></pagination>
    </div>
    <div class="dialog">
      <add-title ref="addRef" title="" dialog-width="30%"
                 @getFormData="submitAddFormData"></add-title>
      <add-title ref="updateRef" title="修改职称信息" dialog-width="30%"
                 @getFormData="submitUpdateFormData"></add-title>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import AddTitle from './dialog/TitleDialog.vue'
  import UpdateTitle from './dialog/TitleDialog.vue'
  import pagination from '../../../../../components/pagination/index.vue'
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapGetters, mapMutations, mapActions} = createNamespacedHelpers('hrStore')
  export default {
    components: {
      AddTitle,
      UpdateTitle,
      pagination
    },
    props: {

    },
    watch: {

    },
    computed:{
        ...mapGetters({
          titles:'title'
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
          networkAddTitle:'networkAddTitle',
          networkUpdateTitle:'networkUpdateTitle',
          networkdeletesTitle:'networkdeletesTitle'
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
      ).then(() => {
         this.networkdeletesTitle(data);
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
        this.networkAddTitle(data)
      },
      submitUpdateFormData(data) {
          this.networkUpdateTitle(data)
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
