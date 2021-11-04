<template>
  <!--收款台账-->
  <div class="body">
    <div class="table">
      <el-table
        :data="cuData"
        align="left"
        height="7.5rem"
        :header-cell-style="{ fontSize: '14px' }"
        border
      >
        <el-table-column label="状态" align="left" width="40">
          <template slot-scope="scope">
            <span>
              <i :class="checkstat(scope.row)"></i>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="collTime"
          label="收款时间"
          align="left"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="collType"
          label="付款类型"
          align="left"
          :formatter="showParentCollType"
          width="80"
        ></el-table-column>
        <el-table-column
          prop="payer"
          label="付款人"
          align="left"
          show-overflow-tooltip
          width="300"
        ></el-table-column>
        <el-table-column
          prop="sumMoney"
          label="收款金额(元)"
          align="left"
        ></el-table-column>
        <el-table-column prop="collAttach" label="收款回执单" align="left">
          <template slot-scope="scope">
            <download-button :value="scope.row.collAttach"></download-button>
          </template>
        </el-table-column>

        <el-table-column label="收款明细" align="left" width="180">
          <template slot-scope="scope">
            <el-popover placement="bottom" trigger="click">
              <el-table :data="scope.row.childrens" border>
                <el-table-column
                  label="收款类型"
                  prop="sumType"
                  :formatter="showCollType"
                  width="100px"
                ></el-table-column>
                <el-table-column
                  label="收款金额(元)"
                  prop="collMoney"
                  width="100px"
                ></el-table-column>
                <el-table-column
                  label="组织名称"
                  prop="orgname"
                  width="120px"
                ></el-table-column>
                <el-table-column
                  label="编号"
                  prop="contractId"
                  width="220px"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  label="名称"
                  prop="contract_name"
                  width="220px"
                  show-overflow-tooltip
                ></el-table-column>
                <!-- <el-table-column
                  label="项目编号"
                  prop="projectId"
                  width="100px"
                ></el-table-column>
                <el-table-column
                  label="项目名称"
                  prop="project_name"
                  width="150px"
                ></el-table-column> -->
                <el-table-column label="操作" width="230px">
                  <template slot-scope="scope2">
                    <el-popover placement="top" trigger="click">
                      <el-table :data="scope2.row.childrens">
                        <el-table-column
                          width="200"
                          prop="bill.billNo"
                          label="发票号"
                        ></el-table-column>
                        <el-table-column
                          width="200"
                          prop="collTime"
                          label="登记时间"
                        ></el-table-column>
                        <el-table-column
                          width="140"
                          prop="total"
                          label="登记金额(元)"
                        ></el-table-column>
                        <el-table-column width="180" label="操作">
                          <template slot-scope="scope3">
                            <public-button
                              type="primary"
                              name="FA1PIAO4GUAN1LIAN"
                              title="解除绑定"
                              classhd="hd"
                              plain
                              @click="delBillCollection(scope3.row)"
                            ></public-button>
                          </template>
                        </el-table-column>
                      </el-table>
                      <public-button
                        slot="reference"
                        type="primary"
                        classhd="hd"
                        plain
                        name="FREE"
                        title="详细"
                        v-show="
                          scope2.row.collType == 1 ||
                          scope2.row.collType == 3 ||
                          scope2.row.collType == 4 ||
                          scope2.row.collType == 8
                        "
                      ></public-button> </el-popover
                    >&nbsp;

                    <public-button
                      name="FA1PIAO4GUAN1LIAN"
                      title="发票登记"
                      classhd="hd"
                      plain
                      type="primary"
                      v-show="
                        scope2.row.collType == 1 ||
                        scope2.row.collType == 3 ||
                        scope2.row.collType == 4 ||
                        scope2.row.collType == 8
                      "
                      @click="RegisterBill(scope2.row)"
                    ></public-button>
                    <span v-if="scope.row.category == 0">
                      <public-button
                        name="SHOU1RU4DENG1JI"
                        title="删除"
                        classhd="hd"
                        plain
                        type="primary"
                        @click="delDetail(scope2.row)"
                      ></public-button>
                    </span>
                    <span v-else-if="scope.row.category == 1">
                      <public-button
                        name="YING1FU4DENG1JI"
                        title="删除"
                        classhd="hd"
                        plain
                        type="primary"
                        @click="delDetail(scope2.row)"
                      ></public-button>
                    </span>
                    <!-- <el-button
                      type="primary"
                      size="mini"
                      plain
                      @click="delDetail(scope2.row)"
                      >删除</el-button
                    > -->
                  </template>
                </el-table-column>

                <!-- <el-table-column
          label="实际收款金额"
          align="center"
          width="120"
        ></el-table-column> -->
              </el-table>
              <el-button slot="reference" type="text">详细</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="退款金额(元)" align="left">
          <template slot-scope="scope">
            {{ scope.row.drawback ? scope.row.drawback.drawbackMoney : "无" }}
          </template>
        </el-table-column>
        <el-table-column label="退款时间" align="left">
          <template slot-scope="scope">
            {{ scope.row.drawback ? scope.row.drawback.creatTime : "无" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="drawback.drawbackReturnAttach"
          label="退款回执单"
          align="left"
          width="100"
        >
          <template slot-scope="scope">
            <download-button
              :value="
                scope.row.drawback
                  ? scope.row.drawback.drawbackReturnAttach
                  : ''
              "
            ></download-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="left" width="220" fixed="right">
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

    <pagination
      :pageTotal="dataList.length"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    ></pagination>
    <div class="dialog">
      <insert-collection-dialog
        ref="updateRef"
        title="修改"
      ></insert-collection-dialog>
      <DetailsReristDialog
        ref="detailsRef"
        @getFormData="detailShow"
        title1="明细登记"
      ></DetailsReristDialog>
      <refund-application-dialog
        ref="refundRef"
        @getFormData="refshow"
        title1="退款申请"
      ></refund-application-dialog>
      <upload-receipt-dialog
        ref="receiptRef"
        title1="上传回执单"
      ></upload-receipt-dialog>
      <perfect-refund-dialog
        ref="perfectRef"
        title1="完善退款信息"
        @getFormData="perfectShow"
      ></perfect-refund-dialog>
      <!-- <invoice-registration-dialog
        ref="invoiceRef"
        title="发票登记"
      ></invoice-registration-dialog> -->
      <reg-bill-dialog
        ref="regBillRef"
        title1="发票登记"
        @getFormData="regBillShow"
      ></reg-bill-dialog>
      <insert-collection-dialog
        ref="insertRef"
        title1="收款管理"
        @getFormData="updateColl"
      ></insert-collection-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import DetailsReristDialog from '../dialog/DetailsReristDialog.vue';
import RefundApplicationDialog from '../dialog/RefundApplicationDialog.vue';
import UploadReceiptDialog from '../dialog/UploadReceiptDialog.vue';
import InvoiceRegistrationDialog from '../dialog/InvoiceRegistrationDialog.vue';
import InsertCollectionDialog from '../dialog/InsertCollectionDialog.vue';
import PerfectRefundDialog from '../dialog/PerfectRefundDialog.vue';
// import StatusTag from "../../../../../components/StatusTag.vue";
import tableButton from '../button/CollectionTableButton.vue';
import regBillDialog from '../dialog/RegisterBill.vue';
import pagination from '@c/pagination/index.vue';
import { mapActions, mapState } from 'vuex';
import {
  addCollectionList,
  getCollData,
  updateCollection,
  updateCollectionList,
  addConllBill,
  complateDrawback,
  unBindBill
} from '../../../../../api/webapi-fin.js';

export default {
  components: {
    DetailsReristDialog,
    RefundApplicationDialog,
    UploadReceiptDialog,
    InvoiceRegistrationDialog,
    InsertCollectionDialog,
    PerfectRefundDialog,
    tableButton,
    regBillDialog,
    pagination
  },
  props: {
    dataList: {
      type: [],
      default: () => {
        return [];
      }
    },
    category: {
      type: String,
      default: () => {
        return '0';
      }
    }
  },
  watch: {},
  // 数据节点
  data () {
    return {
      currentRow: {},
      currentCollListRow: {},
      pageShow: {
        page: 1,
        limit: 30,
        where: 'category=' + this.category
      },
      totalCount: 0
    };
  },
  // 生命周期函数节点
  created () {
    // this.networkGetSelect(['finDetailType']);
    this.networkGetAllOrg();
    // this.pageShow = Object.assign(this.pageShow, {
    //   phone: this.currentUser.userId
    // });
    // this.getData(this.pageShow);
  },
  computed: {
    ...mapState({
      myfilter: (state) => state.loadType,
      currentUser: 'currentUser',
    }),
    cuData () {
      return this.$myfunction.getPageData(this.dataList, this.pageShow);
      // this.pageShow = Object.assign(this.pageShow, {
      //   phone: this.currentUser.userId
      // });
      // this.getData(this.pageShow);
      // return this.dataList;
    }
  },
  // 自定义函数节点
  methods: {
    ...mapActions({
      networkGetAllOrg: 'orgAndPost/networkGetAllOrg',
    }),
    getData (pa) {
      pa = { jsondata: JSON.stringify(pa) };
      getCollData(pa).then((res) => {
        this.dataList = res.dataRow;
        this.totalCount = res.totalCount;
      });
    },
    // 点击页码
    handleCurrentChange (val) {
      this.pageShow = Object.assign(this.pageShow, { page: val });
    },
    // 点击页数
    handleSizeChange (val) {
      this.pageShow = Object.assign(this.pageShow, { limit: val });
    },
    showParentCollType (row) {
      let result = '';
      switch (row.sumType) {
        case 'company':
          result = '公账';
          break;
        case 'cash':
          result = '现金';
          break;
      }
      return result;
    },
    showCollType (row, col) {
      let result = '';
      switch (row.collType) {
        case '1':
          result = '服务费';
          break;
        case '3':
          result = '文件费';
          break;
        case '4':
          result = '管理费';
          break;
        case '5':
          result = '风险（履约）保证金';
          break;
        case '6':
          result = '投标保证金';
          break;
        case '7':
          result = '其他往来款';
          break;
        case '8':
          result = '其他收款';
          break;
      }
      return result;
    },
    // 删除明细
    delDetail (data) {
      if (data.childrens.length > 0) {
        this.$message.warning('存在开票信息不能删除');
      } else {
        data.delSign = 1;
        const pa = { jsondata: JSON.stringify(data) };
        updateCollectionList(pa).then((res) => {
          if (res.code == 200) {
            this.$message.success('删除成功');
            this.$parent.$parent.$parent.getall();
          }
        });
      }
    },
    tableClick (btn, data) {
      this.currentRow = data;
      // console.log('data');
      console.log(data);
      switch (btn) {
        case 1: // 修改
          this.$refs.insertRef.openDialog(data);
          break;
        case 2: // 删除
          this.$confirm('此操作将删除相关的所有数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
            .then(() => {
              if (data.childrens.length > 0) {
                this.$message.warning('存在明细信息不能删除');
              } else {
                data.delSign = 1;
                const pa = { jsondata: JSON.stringify(data) };
                updateCollection(pa).then((res) => {
                  if (res.code == 200) {
                    this.$message.success('删除成功');
                    this.$parent.$parent.$parent.getall();
                  }
                });
              }
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除',
              });
            });
          break;
        case 3: // 明细登记
          this.$refs.detailsRef.openDialog({ category: this.category });
          break;
        case 4: // 退款申请
          this.$refs.refundRef.openDialog();
          break;
        case 5: // 完善退款信息
          this.$refs.perfectRef.openDialog();
          break;
      }
    },
    detailsOpen () {
      this.$refs.detailsRef.openDialog();
    },
    // 更新ROW的CLASS
    tableRowShow ({ row, rowIndex }) {
      let result = 'warning-row';
      let sum = 0;
      row.childrens.forEach((item) => {
        sum += parseFloat(item.collMoney);
      });
      const sumMoney = parseFloat(row.sumMoney);
      if (sumMoney == sum) {
        result = 'success-row';
      }
      return result;
    },
    checkstat (row) {
      const sum = 0;
      let result = 'el-icon-coin hasDetail';
      if (row.detailStatus == "1") {
        result = "el-icon-coin notHasDetail";
      }
      return result;
    },
    // 明细添加
    detailShow (data) {
      // console.log(data);
      let sum = 0;
      sum = parseFloat(this.currentRow.collallmoney);

      const sumMoney = parseFloat(this.currentRow.sumMoney);
      // console.log('111');
      if (sumMoney < sum + parseFloat(data.collMoney)) {
        this.$message.warning('明细金额合计大于总金额！！请进行调整！');
      } else {
        const conmax = Object.assign(data, {
          createBy: this.currentUser.dinCode,
          createBy_name: this.currentUser.userName,
          createBy_orgId: this.currentUser.orgId,
          parentId: this.currentRow.keyid
        });
        const pa = { jsondata: JSON.stringify(conmax) };
        addCollectionList(pa).then((res) => {
          if (res.code == 200) {
            this.$message.success('明细添加成功');
            this.$parent.$parent.$parent.getall();
          }
        });
      }
    },
    // 申请退款
    refshow (data) {
      // this.$confirm('是否确定发起流程审批?', '提示！',
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning",
      // }).then(async () => {
      //   const flows = [
      //           { name: "申请时间", controlType: "input_sign", value: "" },
      //           { name: "申请组织", controlType: "input_sign", value: "" },
      //           { name: "申请人", controlType: "input_sign", value: "" },
      //           { name: "退款金额", controlType: "input_money", value: "" },
      //           { name: "退款申请说明", controlType: "input_attachment", value: "" }
      //         ];
      //   const dateNow = new Date();
      //   flows[0].value = dateNow.Format('yyyy-MM-dd');
      //   flows[1].value = this.currentUser.orgName;
      //   flows[2].value = this.currentUser.userName;
      //   flows[3].value = data.drawbackMoney;
      //   flows[4].value = await this.getfile(data.drawbackAttach); // data.drawbackDetail;
      //   const attachmentValue = JSON.stringify(flows); // 这里一定要转换成字符串
      //   const passa = {
      //           startPerson: this.currentUser.dinCode,
      //           versionID: "v_2020_cwgl_tksq",
      //           jsonData: attachmentValue
      //         };
      //   startFlow(passa).then(res => {
      //     if (res.success) {
      //       let orgData = Object.assign(data, {
      //         drawbackId: res.msg,
      //         parentId: this.currentRow.keyid
      //       });
      //       orgData = { jsondata: JSON.stringify(orgData) };
      //       addDrawback(orgData).then(res => {
      //         if (res.code == 200) {
      //           this.$message.success('申请流程发起成功退款成功！');
      //           this.$parent.$parent.$parent.getall();
      //         }
      //       });
      //     }
      //   });
      // }).catch(() => { this.$message({ type: 'info', message: '已取消发起流程！' }); });
    },
    // 完善退款
    perfectShow (data) {
      console.log(this.currentRow);
      this.$msgbox
        .confirm('是否确定完善，一旦提交后收款总金额将会减少', '标题', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        .then(() => {
          const o = {
            orgName: this.currentUser.orgName,
            orgId: this.currentUser.orgId,
            parentId: this.currentRow.keyid,
            createBy_name: this.currentUser.userName,
            createBy: this.currentUser.userId,
            active: 0
          };
          let pa = Object.assign(o, data); // { keyid: this.currentRow.drawback.keyid };

          pa = { jsondata: JSON.stringify(pa) };

          complateDrawback(pa).then((res) => {
            if (res.code == 200) {
              this.$message.success('退款信息完善成功！');
              this.$parent.$parent.$parent.getall();
            }
          });
          // getByID(pa).then((res) => {
          //   if (res.code == 200) {
          //     let orgData = res.data;
          //     let sum =
          //       orgData.sumMoney - this.currentRow.drawback.drawbackMoney; //完善以后需要减去收款总额
          //     orgData = Object.assign(orgData, { sumMoney: sum});
          //     orgData = Object.assign(orgData, data);
          //     orgData = { jsondata: JSON.stringify(orgData) };
          //     updateCollection(orgData).then((res) => {
          //       if (res.code == 200) {
          //         this.$message.success("退款信息完善成功！");
          //         this.$parent.$parent.$parent.getall();
          //       }
          //     });
          //   }
          // });
        })
        .catch(() => {
          this.$message.success('error');
        });
    },
    refunOpen () {
      this.$refs.refundRef.openDialog();
    },
    receiptOpen () {
      this.$refs.receiptRef.openDialog();
    },
    invoiceOpen () {
      this.$refs.invoiceRef.openDialog();
    },
    // 发票登记
    RegisterBill (rows) {
      this.currentCollListRow = rows;
      let rec = 0;
      if (rows.childrens.length > 0) {
        rows.childrens.forEach((item) => {
          rec += item.total;
        });
      }
      // console.log(this.currentCollListRow);
      const remain = rows.collMoney - rec;
      if (remain == 0) {
        this.$message.warning('该收款已全部完成登记！！');
      } else {
        this.$refs.regBillRef.openDialog();
      }
    },
    // 发票登记
    regBillShow (formData) {
      if (!formData.billId) {
        this.$message.warning('无效的发票号');
        return;
      }

      formData = Object.assign(formData, {
        collectionlistId: this.currentCollListRow.keyid
      });
      const pa = { jsondata: JSON.stringify(formData) };

      addConllBill(pa).then((res) => {
        if (res.code == 200) {
          this.$message.success('发票登记成功');
          this.$parent.$parent.$parent.getall();
        }
      });
    },
    // 解除绑定
    delBillCollection (data) {
      const pa = { jsondata: JSON.stringify(data) };
      this.$msgbox
        .confirm('是否确定解除绑定？', '标题', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        .then(() => {
          unBindBill(pa).then((res) => {
            if (res.success) {
              this.$message.success('解除绑定成功');
            } else {
              this.$message.error('解除绑定失败!请联系管理员');
            }
            this.$parent.$parent.$parent.getall();
          });
        });
    },
    // 更新收款记录
    updateColl (data) {
      const pa = { jsondata: JSON.stringify(data) };
      updateCollection(pa).then((res) => {
        if (res.code == 200) {
          this.$message.success('更新成功！');
          this.$parent.$parent.$parent.getall();
        }
      });
    },
    // 发票删除
    DelBill (rows) {
      const id = rows.keyid;
    },
    updateRow (pa) {},
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
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
<style lang="less">
.el_button_agree {
  color: #0bb27a;
}
.el_button_no_agree {
  color: #f01136;
}

.hasDetail {
  color: #409eff;
  font-size: 30px;
}
.notHasDetail {
  color: #f88e05;
  font-size: 30px;
}
.warning-row {
  background: #409eff !important;
  color: #fff !important;
}

.success-row {
  background: #fff !important;
  //color:#000 !important;
}
</style>
