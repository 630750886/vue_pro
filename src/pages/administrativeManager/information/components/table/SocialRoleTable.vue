<template>
  <div class="body">
    <div class="table">
      <el-table
        :data="dataList.content"
        align="left"
        height="6.8rem"
        highlight-current-row
        :header-cell-style="{ fontSize: '14px'}"
        border
      >
        <el-table-column
          prop="socialRoleName"
          label="社会角色名称"
          show-overflow-tooltip
          fixed="left"
          width="300"
        ></el-table-column>
        <el-table-column
          prop="socialRoleOrg"
          label="任职单位"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="socialRoleAttachFile" label="证明材料" width="60">
          <template slot-scope="scope">
              <download-button :value="scope.row.socialRoleAttachFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="70px" fixed="right">
          <template slot-scope="scope"><el-button 
            v-if="btnListIndexOf('SHAN1CHU')"
            type="primary"
            plain
            size="mini"
            @click="delSocial(scope.row)">删除</el-button></template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <social-role-dialog
        title="修改社会角色信息"
        ref="upRef"
        @getFormData="getFormData"
      ></social-role-dialog>
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
import SocialRoleDialog from "../dialog/SocialRoleDialog.vue";
import * as MessageSocialRole from "@/api/administration/MessageSocialRole.js"
export default {
  components: {
    TableButton,
    SocialRoleDialog
  },
  props: {
    dataList: {
      type:Object,
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
  watch: {},
  //数据节点
  data() {
    return {
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    handleCurrentChange(val) {
      this.pageShow.pageInfo.page = val;
      this.$emit("pageInfoChange", this.pageShow);
    },
    handleSizeChange(val) {
      this.pageShow.pageInfo.limit = val;
      this.$emit("pageInfoChange", this.pageShow);
    },
    delSocial(data){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        MessageSocialRole.deletes_object({keyid:data.keyid}).then(res => {
          this.$emit('updataListrole');
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
    getFormData(data)
    {
      MessageSocialRole.findall_object(data).then(item=>{
                if (item.code === 200) {
                  this.$message.success("编辑完成!");
                }
              });
    },
    tableButtonClick(btn,data) {
      switch (btn) {
        case 1:
          this.$refs.upRef.openDialog(data);
          break;
        case 2:
          break;
        case 3:
          break;
      }
    }
    }

  }

</script>
<style lang="less" scoped>
.el-tag {
  cursor: pointer;
  color: #000;
}
</style>
