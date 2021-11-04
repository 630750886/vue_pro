<template>
  <div class="body">
    <div class="table">
      <el-table
        :data="dataList.content"
        align="left"
        height="6.8rem"
        highlight-current-row
        :header-cell-style="{ fontSize: '14px' }"
        border
      >
        <el-table-column
          prop="honourableName"
          label="荣誉名称"
          fixed="left"
          show-overflow-tooltip
          width="300"
        ></el-table-column>

        <el-table-column
          prop="honourableLevel"
          width="80"
          label="荣誉等级"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="issuanceUnits" label="颁发单位" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="honourableGetDate"
          label="获得日期"
          show-overflow-tooltip
          width="85"
        ></el-table-column>

        <el-table-column
            label="有效期"
            width="155"
            prop="aptitudeBeginDate"
        >
        <template slot-scope="scope">
           {{scope.row.aptitudeBeginDate}}-{{scope.row.aptitudeEndDate}}
          </template>
        </el-table-column>
        <el-table-column prop="honourableAttachFile" label="扫描件" width="60px">
          <template slot-scope="scope">
            <download-button :value="scope.row.honourableAttachFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="120px">
          <template slot-scope="scope">
            <el-button  v-if="btnListIndexOf('DENG1JI')" type="primary" plain size="mini" @click="$refs.honorInfoRef.openDialog(scope.row)">登记</el-button>
            <el-button  v-if="btnListIndexOf('SHAN1CHU')" type="primary" plain size="mini" @click="delHonor(scope.row)"> 删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <honor-info-dialog
        ref="honorInfoRef"
        @getFormData="uphonorInfo"
      ></honor-info-dialog>
    </div>
    <!--分页 -->
    <pagination
        :pageTotal="dataList.totalElements"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
    ></pagination>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TableButton from "../button/TableButton.vue";
import HonorInfoDialog from "../dialog/HonorInfoDialog.vue";
import TextButton from "../../../acomponents/TextButton.vue";
	import * as OrgHonourableInfo from "@/api/administration/OrgHonourableInfo.js"
export default {
  components: {
    TableButton,
    HonorInfoDialog,
    TextButton
  },
  props: {
    dataList: {
      type: Object,
      default: () => {
        return {};
      }
    },
    pageShow:{
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {},
  //数据节点
  data() {
    return {};
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    //删除
    delHonor(data){
      this.$confirm(`此操作将永久删除${data.honourableName}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        OrgHonourableInfo.deletes_object({keyid:data.keyid}).then(res => {
          this.$emit("honorPageInfoChange",this.pageShow);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(err => {
          console.log(err);
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //分页
    handleCurrentChange(val) {
      this.pageShow.pageInfo.page = val;
      this.$emit("honorPageInfoChange", this.pageShow);
    },
    handleSizeChange(val) {
      this.pageShow.pageInfo.limit = val;
      this.$emit("honorPageInfoChange", this.pageShow);
    },
    uphonorInfo(data){
    OrgHonourableInfo.edits_object(data).then(item=>{
				if (item.code === 200) {
				this.$message.success("修改完成!");
				}
			});
    },
    tableButtonClick(btn,data) {
      switch (btn) {
        case 1:
          this.$refs.honorInfoRef.openDialog(data);
          break;
        case 2:
          break;
        case 3:
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.el-tag {
  cursor: pointer;
}
</style>
