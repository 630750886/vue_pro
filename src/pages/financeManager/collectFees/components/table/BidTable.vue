<template>
  <!--保证金缴纳台账-->
  <div class="body">
    <div class="table">
      <el-table
        :data="dataList"
        align="left"
        height="7.5rem"
        highlight-current-row
        :header-cell-style="{ fontSize: '14px' }"
        border
      >
        <el-table-column
          label="项目编号"
          align="left"
        ></el-table-column>
        <el-table-column
          label="项目名称"
          align="left"
        ></el-table-column>
        <el-table-column
          label="所属组织"
          align="left"
        ></el-table-column>
        <el-table-column
          label="文件费收取时间"
          align="left"
          width="120"
        ></el-table-column>
        <el-table-column
          label="文件费收取金额(元)"
          align="left"
          width="120"
        ></el-table-column>
        <el-table-column
          label="保证金收取时间"
          align="left"
          width="120"
        ></el-table-column>
        <el-table-column
          label="保证金收取金额(元)"
          align="left"
          width="120"
        ></el-table-column>
        <!--上面合并行-->
        <el-table-column
          label="单位名称"
          align="left"
        ></el-table-column>
        <el-table-column
          label="文件费收取时间"
          align="left"
          width="120"
        ></el-table-column>
        <el-table-column
          label="文件费收取类型"
          align="left"
          width="120"
        ></el-table-column>
        <el-table-column
          label="保证金收取时间"
          align="left"
          width="120"
        ></el-table-column>
        <el-table-column
          label="保证金收取类型"
          align="left"
          width="120"
        ></el-table-column>
        <el-table-column
          label="保证金退还时间"
          align="left"
          width="120"
        ></el-table-column>

        <el-table-column
          label="操作"
          align="left"
          width="100"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="$refs.receiptRef.openDialog()"
              >登记信息</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <update-info-dialog
        ref="receiptRef"
        title="登记信息"
      ></update-info-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import UploadReceiptDialog from "../dialog/UploadReceiptDialog.vue";
import updateInfoDialog from "../dialog/updateInfoDialog.vue";
export default {
  components: {
    UploadReceiptDialog,
    updateInfoDialog
  },
  props: {
    dataList: []
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
    receiptOpen() {
      this.$refs.receiptRef.openDialog();
    }
  }
};
</script>
<style lang="less" scoped></style>
