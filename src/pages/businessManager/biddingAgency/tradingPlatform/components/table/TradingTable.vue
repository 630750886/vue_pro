<template>
  <div class="body">
    <div class="table">
      <el-table
        :data="platforms.dataList"
        style="width: 100%"
        align="left"
        height="530px"
        highlight-current-row
        :header-cell-style="{ fontSize: '14px' }"
        border
      >
        <el-table-column
          label="序号"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="tpname"
          label="平台名称"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="tpurl"
          label="平台网址"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">
            <a :href="scope.row.tpurl">{{ scope.row.tpurl }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="tpaddress"
          label="地址"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="tpphone"
          label="电话"
          show-overflow-tooltip
          width="200px"
          align="center"
        ></el-table-column>
        <el-table-column prop="tpFlowFile" width="80px" label="办事流程图" align="center">
          <template slot-scope="scope">
            <download-button :value="scope.row.tpFlowFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="tpBankName"
          label="开户行"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="tpAccountCode"
          label="账号"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="150px">
          <template slot-scope="scope">
            <el-button type="primary" plain size="mini" @click="$refs.updateRef.openDialog(scope.row,addType)">登记</el-button>
            <el-button type="primary" plain size="mini"@click="deleteData(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <!--&lt;!&ndash;分页&ndash;&gt;
      <pagination :pageTotal="total"
                  @handleCurrentChange="handleCurrentChange"
                  @handleSizeChange="handleSizeChange"></pagination>-->
    </div>

    <div class="dialog">
      <add-platform-dialog
        ref="updateRef"
        width="30%"
        @getFormData="submitFormData"
      ></add-platform-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import AddPlatformDialog from "../dialog/AddPlatformDialog.vue";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  components: {
    AddPlatformDialog
  },
  props: {},
  watch: {},
  computed: {
    ...mapState("biddingPlatform", {
      platforms: "platforms"
    })
  },
  //数据节点
  data() {
    return {
      addType:true
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    ...mapActions("biddingPlatform", {
      networkDelPlatforms: "networkDelPlatforms",
      networkUpPlatforms: "networkUpPlatforms"
    }),
    handleCurrentChange(val) {
      this.pageShow.page = val;
    },
    handleSizeChange(val) {
      this.pageShow.limit = val;
    },
    submitFormData(formData) {
      this.networkUpPlatforms(formData);
    },
    deleteData(data) {
      this.$msgbox
        .confirm("是否永久删除该记录?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.networkDelPlatforms(data);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style lang="less" scoped>
.body {
  .button {
    margin: 10px 10px;
  }
}
</style>
