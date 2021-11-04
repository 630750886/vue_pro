<template>
<div class="body">
    <div class="button">
      <public-button name="XIN1JIAN" icon="el-icon-plus" title="新建" @click="$refs.addRef.openDialog()"></public-button>
    </div>
    <div class="table">
      <el-table :data="CredentialsInfo.dataList" height="6.8rem" align="left" border>
        <el-table-column label="有效期开始时间" prop="periodBeginDateTime"></el-table-column>
        <el-table-column label="有效期结束时间" prop="periodEndDateTime"></el-table-column>
        <el-table-column label="附件">
          <template slot-scope="scope">
            <download-button :value="scope.row.credentialsFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <public-button name="SHAN1CHU" title="删除" classhd="hd" :plain="true" type="primary" @click="submitDeleteForm(scope.row)"></public-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <credentials-add-dialog ref="addRef" title="" dialog-width="25%"
          @getFormData="submitAddForm"></credentials-add-dialog>
    </div>


  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import credentialsAddDialog from './dialog/credentialsAddDialog.vue'
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapGetters, mapMutations, mapActions} = createNamespacedHelpers('hrStore')
  export default {
    components: {
      credentialsAddDialog,
    },
    props: {},
    watch: {},
    computed: {
      ...mapGetters({
        CredentialsInfo: 'credentialsinfo'
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
      //(this.CredentialsInfo);
    },
    //自定义函数节点
    methods: {
      ...mapActions({
        networkAddCredentials: 'networkAddCredentials',
        networkDeleteCredentials: 'networkDeleteCredentials',
        networkUpdateCredentials: 'networkUpdateCredentials'
      }),
      submitAddForm(data) {
        this.networkAddCredentials(data)
      },
      submitUpdateForm(data) {
        this.networkUpdateCredentials(data)
      },
      submitDeleteForm(data) {
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
          this.networkDeleteCredentials(data)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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