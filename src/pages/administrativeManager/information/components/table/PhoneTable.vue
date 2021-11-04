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
        <el-table-column prop="phonePersonName" label="机主" width="80"></el-table-column>
        <el-table-column
          prop="phoneCode"
          label="手机号"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="phoneManager"
          label="手机管理人"
          width="90"
        ></el-table-column>
        <el-table-column
          prop="phoneDepartment"
          label="手机管理门"
          width="90"
        ></el-table-column>
        <el-table-column
          prop="phoneDescInfo"
          label="使用范围"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" align="center" width="150px">
          <template slot-scope="scope">
            <el-row>
              <el-col :span="12"><table-button v-if="btnListIndexOf('SHI3YONG4ZHONG')" :scope="scope.row" @click="tableButtonClick"></table-button></el-col>
              <el-col :span="12" ><el-button v-if="btnListIndexOf('SHAN1CHU')" type="primary" plain size="mini" @click="delPhone(scope.row)">删除</el-button></el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <information-dialog
        title="修改手机号信息"
        ref="upRef"
        @getFormData="upmodle"
      ></information-dialog>
    </div>
    <!--分页 -->
    <pagination
        :pageTotal="dataList.totalElements"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
    >
    </pagination>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TableButton from "../button/PhoneTableButton.vue";
import InformationDialog from "../dialog/InformationDialog.vue";
import * as MessagePhone from "@/api/administration/MessagePhone.js"
export default {
  inject: ["reload"],
  data () {
    return {

    }
  },
  components: {
    TableButton,
    InformationDialog
  },
  props: {
    dataList: {
      type: Object,
      default: () => {
        return {};
      }
    },
    pageShow:{
      type:Object ,
      default: () => {
        return {};
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.pageShow.pageInfo.page = val;
      this.$emit("pageInfoChange", this.pageShow);
    },
    handleSizeChange(val) {
      this.pageShow.pageInfo.limit = val;
      this.$emit("pageInfoChange", this.pageShow);
    },
    delPhone(data){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => {
        console.log(res);
        MessagePhone.deletes_object({keyid:data.keyid}).then(res => {
          console.log(res);
          this.$emit('updataPhone');
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(err => {
          console.log(err);
        })

      }).catch(res => {
        console.log(res);
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    upmodle(pdata)
    {
        MessagePhone.edits_object(pdata).then(item=>{
                if (item.code === 200) {
                  this.$message.success("修改完成!");
                }
              });
        },
    tableButtonClick(btn,tdata) {
      switch (btn) {
        case 1:
          // this.$refs.upRef.openDialog(tdata);
          break;
        case 2:
          this.$confirm('此操作将改变结果, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          MessagePhone.edits_object(tdata).then(item=>{
                if (item.code === 200) {
                  this.$message.success("修改完成!");
                  this.reload();
                }
              });
          }).catch(() => {
            tdata.allstatuscode=(tdata.allstatuscode=="0")?2:0,
            this.$message({
              type: 'info',
              message: '已取消'
            });
            this.reload();
          });

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
  color: #000;
}
</style>
