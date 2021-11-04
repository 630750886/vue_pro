<template>
  <div class="body">
    <div class="button">
      <public-button name="XIN1JIAN" icon="el-icon-plus" title="新建" @click="$refs.addRef.openDialog()"></public-button>
    </div>
    <div class="table">
      <el-table :data="education.dataList" height="6.8rem" align="left" border>
        <el-table-column label="学历" prop="name" ></el-table-column>
        <el-table-column label="类型" prop="type" ></el-table-column>
        <el-table-column label="毕业院校" prop="school"></el-table-column>
        <el-table-column label="毕业时间" prop="graduateTime"></el-table-column>
        <el-table-column label="所学专业" prop="major"></el-table-column>
        <el-table-column label="附件">
          <template slot-scope="scope">
            <download-button :value="scope.row.file"></download-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <public-button name="SHAN1CHU" classhd="hd" :plain="true" type="primary" title="删除" @click="submitdeleteForm(scope.row)"></public-button>
            <public-button name="WAN2SHAN4XIN4XI" classhd="hd" :plain="true" type="primary" title="最高学历" @click="submitmaxForm(scope.row)"></public-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <!--分页-->
      <pagination :pageTotal="education.total"
                  @handleCurrentChange="handleCurrentChange"
                  @handleSizeChange="handleSizeChange"></pagination>
    </div>
    <div class="dialog">
      <!--增加学历-->
      <education-dialog ref="addRef" title="" dialog-width="30%"
                        @getFormData="submitAddForm"></education-dialog>
      <!--修改学历-->
      <education-dialog ref="updateRef" title="修改学历" dialog-width="30%" :updateData="upData"
                        @getFormData="submitUpdateForm"></education-dialog>
    </div>


  </div>
</template>
<script>
  //import __ from '__' // __是需要手动引入的文件
  import EducationDialog from './dialog/EducationDialog.vue'
  import pagination from '../../../../../components/pagination/index.vue'
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapGetters, mapMutations, mapActions} = createNamespacedHelpers('hrStore')
  export default {
    components: {
      EducationDialog,
      pagination
    },
    props: {},
    watch: {},
    computed: {
      ...mapGetters({
        education: 'education',
        personInfo: "personInfo"
      })
    },
    //数据节点
    data() {
      return {
        upData: {},
        pageShow: {
          page: 1,
          limit: 30,
          filter: '1=1'
        },

      }
    },
    //生命周期函数节点
    created() {
      this.getPersonInfo();
    },
    //自定义函数节点
    methods: {
      ...mapActions({
        networkAddEducation: 'networkAddEducation',
        networkUpdateEducation: 'networkUpdateEducation',
        networkdeletesEducation: 'networkdeletesEducation',
        networkUpdateBasicInfo: "networkUpdateBasicInfo"
      }),
      handleCurrentChange(val) {
        this.pageShow.page = val;
      },
      handleSizeChange(val) {
        this.pageShow.limit = val;
      },
      submitdeleteForm(data){
        this.$confirm("此操作将删除相关数据,是否继续?","提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
         this.networkdeletesEducation(data);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      },
      submitmaxForm(data){
        this.personInfo.highesteducation=data.name;
        this.$confirm("此操作显示台账最高学历,是否继续?","提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
         this.networkUpdateBasicInfo(this.personInfo);
         this.$message.success("更新学历完成！");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      },
      submitAddForm(data) {
        this.networkAddEducation(data)
      },
      submitUpdateForm(data) {
        this.networkUpdateEducation(data)
      },
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

  .box-title {
    margin-top: 5px;
    height: 0.405rem;
  }
</style>
