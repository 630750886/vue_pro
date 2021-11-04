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
          prop="webName"
          label="网站名称"
          show-overflow-tooltip
          width="240"
          fixed
        ></el-table-column> 
        <el-table-column show-overflow-tooltip prop="webUrl" label="链接" width="60">
          <template slot-scope="scope"><el-link :href="scope.row.webUrl" target="_blank">{{scope.row.webUrl}}</el-link></template>
        </el-table-column>
        <el-table-column
          prop="webUserName"
          label="用户名"
          show-overflow-tooltip
          width="190"
        ></el-table-column>
        <el-table-column 
        prop="webUserPassword" 
        show-overflow-tooltip 
        label="密码" 
        width="60"></el-table-column>
        <el-table-column
          prop="webDesc"
          label="网站使用简要简介"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="phones" label="手机绑定情况" width="82">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <p>机主：{{scope.row.phonename}}</p>
              <p>手机号：{{scope.row.phonecode}}</p>
              <div slot="reference">
                <el-tag size="medium" style="color:black">详细</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="合同" width="50">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <p>合同编号：{{scope.row.contractBasecode}}</p>
              <p>合同名称：{{scope.row.contractBasename}}</p>
              <div slot="reference">
                <el-tag size="medium">详细</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150" fixed="right">
          <template slot-scope="scope">
              <el-button type="primary" v-if="btnListIndexOf('DENG1JI')" plain size="mini" @click="$refs.upWebsite.openDialog(scope.row)">登记</el-button>
              <el-button type="primary" v-if="btnListIndexOf('SHAN1CHU')" plain size="mini" @click="delWeb(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <!--分页 -->
      <pagination
          :pageTotal="dataList.totalElements"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
      >
      </pagination>
    </div>
    <div class="dialog">
      <website-info-dialog
        title=""
        ref="upWebsite"
        @getFormData="upwebsite"
      ></website-info-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TableButton from "../button/WebsiteInfoTableButton.vue";
import WebsiteInfoDialog from "../dialog/WebsiteInfoDialog.vue";
import ElPopoverTemplate from "../../../acomponents/ElPopoverTemplate.vue";
import * as MessageWeb from "@/api/administration/MessageWeb.js"
export default {
  components: {
    TableButton,
    WebsiteInfoDialog,
    ElPopoverTemplate
  },
  props: {
    dataList: {
      type:Object ,
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
      contractInfo: [
        { label: "合同编号", prop: "" },
        { label: "合同名称", prop: "" },
        { label: "附件", prop: "", type: "file" }
      ],
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
    //删除数据
    delWeb(data){

      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => {
        console.log(data.webName)
        MessageWeb.deletes_object({keyid:data.keyid}).then(() => {
          this.$emit('updataWeb');
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        });
      }).catch(res => {
        console.log(res);
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    upwebsite(data)
    {
       console.log(data);
       MessageWeb.edits_object(data).then(item => {
          if (item.code === 200) {
            this.$message.success("修改成功!")
          }
        });

    },
    tableButtonClick(btn,data) {
      switch (btn) {
        case 1:
          // this.$refs.upWebsite.openDialog(data);
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
  color: #000;
}
</style>
