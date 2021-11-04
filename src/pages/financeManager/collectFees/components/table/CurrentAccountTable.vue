<template>
  <!--往来款台账-->
  <div class="body">
    <div class="table">
      <el-table
        :data="cuData"
        align="left"
        height="7.5rem"
        highlight-current-row
        :header-cell-style="{ fontSize: '14px' }"
        :default-sort = "{prop: 'collection.collTime', order: 'descending'}"
        border
      >
        <el-table-column
          prop="collection.collTime"
          label="收款时间"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="collection.sumType"
          label="收款类型"
          :formatter="sumTypeShow"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="collection.payer"
          label="付款人"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="collection.sumMoney"
          label="收款金额(元)"
          align="left"
        ></el-table-column>
        <!--上面合并行-->
        <el-table-column
          prop="collType"
          label="收款类型"
          :formatter="collTypeShow"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="collMoney"
          label="收款金额(元)"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="orgname"
          label="所属组织"
          align="left"
        ></el-table-column>
        <!-- <el-table-column prop="" label="类型" align="center"></el-table-column> -->
        <el-table-column
          prop="contractId"
          label="合同编号"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="contract_name"
          label="合同名称"
          align="left"
        ></el-table-column>
        <el-table-column
          width="150"
          property="projectId"
          label="项目编号"
        ></el-table-column>
        <el-table-column
          width="150"
          property="project_name"
          label="项目名称"
        ></el-table-column>
        <!-- <el-table-column prop="" label="项目情况" align="center">
          <template slot-scope="scope">
            <el-popover placement="right" width="300" trigger="click">
              <el-table :data="scope.row.peoject">
                <el-table-column width="150" property="projectNumber" label="项目编号"></el-table-column>
                <el-table-column width="150" property="projectName" label="项目名称"></el-table-column>
              </el-table>
              <el-button slot="reference" type="text">详细</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="" label="退款时间" align="center"></el-table-column>
        <el-table-column prop="" label="退款回执单" align="center" width="100">
          <template slot-scope="scope">
            <el-button type="text">下载</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="" label="往来款金额" align="center" width="100"></el-table-column> -->
        <!-- <el-table-column prop="" label="操作" align="center" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="$refs.perfectRef.openDialog()">完善退款信息</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>

     <pagination 
              :pageTotal="dataList.length"
              @handleCurrentChange="handleCurrentChange"
              @handleSizeChange="handleSizeChange"></pagination>
    <div class="dialog">
      <perfect-refund-dialog
        ref="perfectRef"
        title="完善退款信息"
      ></perfect-refund-dialog>
      <upload-receipt-dialog
        ref="receiptRef"
        title="上传回执单"
      ></upload-receipt-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import UploadReceiptDialog from "../dialog/UploadReceiptDialog.vue";
import PerfectRefundDialog from "../dialog/PerfectRefundDialog.vue";
import pagination from "@c/pagination/index.vue";
export default {
  components: {
    UploadReceiptDialog,
    PerfectRefundDialog,
    pagination
  },
  props: {
     dataList: {
      type:Array,
       default:()=>{return []}
    }
  },
  computed:{
     cuData(){
      return this.$myfunction.getPageData(this.dataList,this.pageShow);
    }
  },
  watch: {},
  //数据节点
  data() {
    return {
      pageShow:{page:1,limit:30}
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
     handleCurrentChange(val){
      this.pageShow=Object.assign(this.pageShow,{page:val});     
    },
   //点击页数
    handleSizeChange(val){
      this.pageShow=Object.assign(this.pageShow,{limit:val});
    },
    detailsOpen() {
      this.$refs.detailsRef.openDialog();
    },
    refunOpen() {
      this.$refs.refundRef.openDialog();
    },
    receiptOpen() {
      this.$refs.receiptRef.openDialog();
    },
    sumTypeShow(row) {
      let result = "";

      if (row.collection.sumType == "company") {
        result = "公账";
      } else {
        result = "现金";
      }
      return result;
    },
    collTypeShow(row, col) {
      let result = "";
      switch (row.collType) {
        case "6":
          result = "投标保证金";
          break;
        case "5":
          result = "风险（履约）保证金";
          break;
        case "7":
          result = "其它往来款";
          break;
      }
      return result;
    }
  }
};
</script>
<style lang="less" scoped></style>
