<template>
  <div class="body">
    <div class="table">
      <el-table
        :data="dataList"
        align="center"
        height="7.5rem"
        highlight-current-row
        :header-cell-style="{ fontSize: '14px' }"
        border
      >
        <el-table-column
          prop="stamperName"
          label="印章名称"
          align="center"
        ></el-table-column>
        <el-table-column prop="stamperTypeName" label="印章类型" align="center">
        </el-table-column>
         <el-table-column
          prop="engineerName"
          label="工程师"
          align="center"
        ></el-table-column>
        <el-table-column prop="stamperImageFile" label="印章取样" align="center">
          <template slot-scope="scope">
            <download-button :value="scope.row.stamperImageFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="stamperManager"
          label="印章管理人"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="stamperBeginDate"
          label="印章启用时间"
          align="center"
        ></el-table-column>
        <el-table-column prop="stamperBeginDocumentFile" label="启用相关证明材料" align="center">
          <template slot-scope="scope">
            <download-button :value="scope.row.stamperBeginDocumentFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="stamperEndDate"
          label="印章停用时间"
          align="center"
        ></el-table-column>
        <el-table-column prop="stamperEndDocumentFile" label="停用相关证明材料" align="center">
          <template slot-scope="scope">
            <download-button :value="scope.row.stamperEndDocumentFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="iscost" label="是否产生使用费" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.iscost">
              <el-popover trigger="click" placement="top">
                <p>使用费/元: {{scope.row.caCostSum}}</p>
                <div slot="reference">
                  <el-tag size="medium">是</el-tag>
                </div>
              </el-popover>
            </template>
            <template v-else>
              否
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="EndDate"
          label="印章使用有效期"
          align="center"
        >
        <template slot-scope="scope">
          {{scope.row.beginDate}}-{{scope.row.endDate}}
        </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150px">
          <template slot-scope="scope">
            <table-button
              :scope="scope.row"
              @click="tableButtonClick"
            ></table-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <seal-dialog ref="upRef" title="修改印章信息" @getFormData="editdata"></seal-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TableButton from "../button/TableButton.vue";
import TextButton from "../../../acomponents/TextButton.vue";
import SealDialog from "../dialog/SealDialog.vue";
import * as AigStamper from "@/api/administration/AigStamper.js"
export default {
  components: {
    TableButton,
    TextButton,
    SealDialog
  },
  props: {
    dataList: {
      type: Array,
      default: () => {
        return [];
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
    editdata(data)
    {
      AigStamper.edits_object(data).then(item=>{
        if (item.code === 200) {
          this.$message.success("编辑成功!");
        }
      });
    },
    tableButtonClick(btn,data) {
      switch (btn) {
        case 1:
          this.$refs.upRef.openDialog(data);
          break;
        case 2:
          this.editdata(data);
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
