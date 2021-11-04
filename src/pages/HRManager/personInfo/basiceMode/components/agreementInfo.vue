<template>
<div class="body">
    <div class="button">
      <public-button name="XIN1JIAN" icon="el-icon-plus" title="新增" @click="$refs.addRef.openDialog()"></public-button>
    </div>
    <div class="table">
      <el-table :data="agreementInfo.dataList" height="6.8rem" align="left" border>
        <el-table-column label="有效期开始时间" prop="agreementBeginDateTime" ></el-table-column>
        <el-table-column label="有效期结束时间" prop="agreementEndDateTime" ></el-table-column>
        <el-table-column label="合同类型" prop="agreementTypeName"></el-table-column>
        <el-table-column label="附件" align="center">
          <template slot-scope="scope">
            <download-button :value="scope.row.agreementFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px" align="center">
          <template slot-scope="scope">
            <public-button name="SHAN1CHU" classhd="hd" :plain="true" type="primary" title="删除" @click="submitdeleteForm(scope.row)"></public-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <!--协议-->
      <agreement-add-dialog ref="addRef" title="" dialog-width="30%"
           @getFormData="submitAddForm"></agreement-add-dialog>
    
    </div>


  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import agreementAddDialog from './dialog/agreementAddDialog.vue'
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapGetters, mapMutations, mapActions} = createNamespacedHelpers('hrStore')
  export default {
    components: {
      agreementAddDialog,
    },
    props: {},
    watch: {},
    computed: {
      ...mapGetters({
        agreementInfo: 'agreementinfo'
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
    },
    mounted()
    {
     // console.log(this.agreementInfo);
    },
    //自定义函数节点
    methods: {
      ...mapActions({
        networkAddagreement: 'networkAddagreement',
        networkUpdateagreement: 'networkUpdateagreement',
        networkDeleteagreement: 'networkDeleteagreement'
      }),
      
      submitdeleteForm(data) {
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
         this.networkDeleteagreement(data)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      },
      submitAddForm(data) {
        this.networkAddagreement(data)
      },
      submitUpdateForm(data) {
        this.networkUpdateagreement(data)
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

  .box-title {
    margin-top: 5px;
    height: 0.405rem;
  }
</style>