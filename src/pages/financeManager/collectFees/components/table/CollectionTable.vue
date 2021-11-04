<template>
  <!--收款台账-->
  <div class="body">
    <div class="table">
      <el-table
        :data="dataList"
        align="left"
        height="7.5rem"
        highlight-current-row
        :span-method="objectSpanMethod"
        :header-cell-style="{ fontSize: '14px' }"
        :default-sort = "{prop: 'collectiondateTime', order: 'descending'}"
        border
      >
        <el-table-column
          prop="collectiondateTime"
          label="收款时间"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="collectiontype"
          label="付款类型"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="drawee"
          label="付款人"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="sum"
          label="收款金额(元)"
          align="left"
        ></el-table-column>
        <el-table-column
          label="收款类型"
          align="left"
        ></el-table-column>
        <el-table-column
          label="收款金额(元)"
          align="left"
        ></el-table-column>
        <el-table-column
          label="所属组织"
          align="left"
        ></el-table-column>
        <el-table-column label="类型" align="center"></el-table-column>
        <el-table-column
          label="合同编号"
          align="left"
        ></el-table-column>
        <el-table-column
          label="合同名称"
          align="left"
        ></el-table-column>

        <el-table-column label="项目情况" align="left">
          <template slot-scope="scope">
            <el-popover placement="right" width="300" trigger="click">
              <el-table :data="scope.row.peoject">
                <el-table-column
                  width="150"
                  property="projectNumber"
                  label="项目编号"
                ></el-table-column>
                <el-table-column
                  width="150"
                  property="projectName"
                  label="项目名称"
                ></el-table-column>
              </el-table>
              <el-button slot="reference" type="text">详细</el-button>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="150px">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="invoiceOpen"
              >发票登记</el-button
            >
            <el-button type="text" size="mini" @click="invoiceOpen"
              >删除</el-button
            >
          </template>
        </el-table-column>

        <el-table-column
          label="退款金额(元)"
          align="center"
        ></el-table-column>
        <el-table-column
          label="退款时间"
          align="center"
        ></el-table-column>
        <el-table-column label="收款回执单" align="center" width="100">
          <template slot-scope="scope">
            <el-button type="text">下载</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="实际收款金额(元)"
          align="center"
          width="120"
        ></el-table-column>

        <el-table-column
          label="操作"
          align="center"
          width="200"
          fixed="right"
        >
          <template slot-scope="scope">
            <table-button :scope="scope.row" @click="tableClick"></table-button>

            <!-- <el-button type="text" size="mini" @click="$refs.updateRef.openDialog()">修改</el-button>
            <el-button type="text" size="mini">删除</el-button>
            <el-button type="text" size="mini" @click="detailsOpen">明细登记</el-button>
            <el-button type="text" size="mini" @click="refunOpen">退款申请</el-button>
            <status-tag :data="{id:1,msg:'状态显示'}"></status-tag>
            
            <el-button type="text" size="mini" @click="$refs.perfectRef.openDialog()">完善退款信息</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <insert-collection-dialog
        ref="updateRef"
        title="修改"
      ></insert-collection-dialog>
      <DetailsReristDialog
        ref="detailsRef"
        @getFormData="detailShow"
        title="明细登记"
      ></DetailsReristDialog>
      <refund-application-dialog
        ref="refundRef"
        title="退款申请"
      ></refund-application-dialog>
      <upload-receipt-dialog
        ref="receiptRef"
        title="上传回执单"
      ></upload-receipt-dialog>
      <perfect-refund-dialog
        ref="perfectRef"
        title="完善退款信息"
      ></perfect-refund-dialog>
      <invoice-registration-dialog
        ref="invoiceRef"
        title="发票登记"
      ></invoice-registration-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import DetailsReristDialog from "../dialog/DetailsReristDialog.vue";
import RefundApplicationDialog from "../dialog/RefundApplicationDialog.vue";
import UploadReceiptDialog from "../dialog/UploadReceiptDialog.vue";
import InvoiceRegistrationDialog from "../dialog/InvoiceRegistrationDialog.vue";
import InsertCollectionDialog from "../dialog/InsertCollectionDialog.vue";
import PerfectRefundDialog from "../dialog/PerfectRefundDialog.vue";
//import StatusTag from "../../../../../components/StatusTag.vue";
import tableButton from "../button/CollectionTableButton.vue";

import {mapActions,mapState} from "vuex";
export default {
  components: {
    DetailsReristDialog,
    RefundApplicationDialog,
    UploadReceiptDialog,
    InvoiceRegistrationDialog,
    InsertCollectionDialog,
    PerfectRefundDialog,
    tableButton
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
    return {
      // dataList: [{
      //   peoject: [{
      //     projectNumber: 'sdjljslf-scllas-1sdkav',
      //     projectName: '项目1',
      //   }],
      // },
      //   {
      //     peoject: [{
      //       projectNumber: 'sdjljslf-scllas-1sdkav',
      //       projectName: '项目1',
      //     }],
      //   },
      // ]
    };
  },
  //生命周期函数节点
  created() {
   // this.networkGetSelect(['finDetailType']);
   this.networkGetAllOrg();
  },
  computed:{
     ...mapState({
      myfilter: state => state.loadType
    })
  },
  //自定义函数节点
  methods: {
     ...mapActions({
      networkGetAllOrg:'orgAndPost/networkGetAllOrg'
    }),
    tableClick(btn, data) {
      switch (btn) {
        case 1: //修改
          this.$refs.updateRef.openDialog();
          break;
        case 2: //删除
          this.$refs.updateRef.openDialog();
          break;
        case 3: //明细登记
        console.log(this.myfilter.finDetailType.list);
          this.$refs.detailsRef.openDialog();
          break;
        case 4: //退款申请
          this.$refs.refundRef.openDialog();
          break;
        case 5: //完善退款信息
          this.$refs.perfectRef.openDialog();
          break;
      }
    },
    detailsOpen() {
      this.$refs.detailsRef.openDialog();
    },
    detailShow(data){
     console.log(data);
    },
    refunOpen() {
      this.$refs.refundRef.openDialog();
    },
    receiptOpen() {
      this.$refs.receiptRef.openDialog();
    },
    invoiceOpen() {
      this.$refs.invoiceRef.openDialog();
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex < 4 || columnIndex > 12) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    }
  }
};
</script>
<style lang='less' scoped>
</style>
