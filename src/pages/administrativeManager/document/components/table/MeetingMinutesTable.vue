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
        <el-table-column prop="documentName" label="名称" width="210" show-overflow-tooltip fixed="left"></el-table-column>
        <el-table-column prop="documentCode" label="编号" show-overflow-tooltip width="172"></el-table-column>
        <el-table-column
          prop="fileTypeName"
          label="会议类型"
          show-overflow-tooltip width="80"
        ></el-table-column>
        <el-table-column
          prop="documentDesc"
          label="内容摘要"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="conferenceOrganizers"
          label="会议主办单位"
          width="100"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="meetingBeginDate"
          label="会议时间"
          width="85"
        ></el-table-column>
        <el-table-column
          prop="meetingAddress"
          label="会议地点"
          show-overflow-tooltip
          width="50"
        ></el-table-column>
        <el-table-column
            label="参会"
            width="45"
        >
          <template slot-scope="scope">
            <download-button :value="scope.row.meetingSignAttachFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column label="纪要" width="45">
          <template slot-scope="scope">
            <download-button :value="scope.row.documentAttachFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="meetingAllAttachFile" label="图片" width="45">
         <template slot-scope="scope">
          <download-button :value="scope.row.meetingAllAttachFile"></download-button>
      </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="120px" fixed="right">
          <template slot-scope="scope">
            <el-button v-if="btnListIndexOf('DENG1JI')" size="mini" type="primary" plain @click="$refs.upRef.openDialog(scope.row)">登记</el-button>
            <el-button v-if="btnListIndexOf('SHAN1CHU')" size="mini" type="primary" plain @click="delMeet(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <meeting-minutes-dialog
        title=""
        ref="upRef"
        @getFormData="updatameeting"
      ></meeting-minutes-dialog>
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
import MeetingMinutesDialog from "../dialog/MeetingMinutesDialog.vue";
import TextButton from "../../../acomponents/TextButton.vue";
import * as document from "@/api/administration/DocumentInfo.js"
export default {
  components: {
    TableButton,
    MeetingMinutesDialog,
    TextButton
  },
  props: {
    dataList: {
      type: Object,
      default: () => {
        // [
        //   {
        //     type: "新增"
        //   },
        //   {
        //     type: "申请"
        //   }
        // ]
        return {};
      }
    },
    pageShow:{
      type: Object
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
    //分页
    handleCurrentChange(val) {
      this.pageShow.pageInfo.page = val;
      this.$emit("pageInfoChange", this.pageShow);
    },
    handleSizeChange(val) {
      this.pageShow.pageInfo.limit = val;
      this.$emit("pageInfoChange", this.pageShow);
    },
    //delMeet删除
    delMeet(data){
      this.$confirm(`删除${data.documentName}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        document.deletes_object({keyid:data.keyid}).then(res =>{
          this.$emit("updataGo");
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(err =>{console.log(err);})

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    updatameeting(data)
    {
      document.edits_object(data).then(item=>{
        this.$emit("updataGo");
         if (item.code === 200) {
           this.$message.success("修改完成!");
         }
      });
    },
    tableButtonClick(btn, data) {
      switch (btn) {
        case 1:
          // this.$refs.upRef.openDialog(data);
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
