<template>
  <!--发票管理台账-->
  <div class="body">
    <div class="table">
      <el-table
        :data="cudata"
        align="left"
        height="7.5rem"
        highlight-current-row
        :header-cell-style="{ fontSize: '14px' }"
        :default-sort="{ prop: 'createTime', order: 'descending' }"
        border
      >
        <el-table-column label="状态" align="center" width="40">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>蓝色:未回款</p>
              <p>绿色:未回款完整</p>
              <p>橙色:已回款</p>
              <p>灰色:已作废</p>
              <div slot="reference" class="name-wrapper">
                <i :class="checkstat(scope.row)"></i>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="orgName"
          label="创建组织"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="createBy_name"
          label="创建人"
          align="left"
        ></el-table-column>
        <el-table-column
          :formatter="TypeShow"
          label="类型"
          align="left"
        ></el-table-column>

        <el-table-column
          prop="payer"
          label="付款单位全称"
          align="left"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="sumMoney"
          label="开票金额(元)"
          align="left"
        ></el-table-column>

        <!-- <el-table-column prop="" label="所属组织" align="center"></el-table-column> -->

        <el-table-column label="发票构成" align="left">
          <template slot-scope="scope">
            <el-popover placement="bottom" width="600" trigger="click">
              <el-table :data="scope.row.structData">
                <el-table-column
                  label="开票类型"
                  prop="categoryType"
                  :formatter="showCollType"
                ></el-table-column>
                <el-table-column
                  label="开票金额(元)"
                  prop="money"
                ></el-table-column>
                <el-table-column
                  label="组织名称"
                  prop="orgName"
                ></el-table-column>
                <el-table-column
                  label="编号"
                  prop="contractId"
                  width="120px"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  label="名称"
                  prop="contractName"
                  width="150px"
                  show-overflow-tooltip
                ></el-table-column>

                <!-- <el-table-column label="" prop="enclosure">
                  <template slot-scope="scope2">
                    <el-button type="text">下载</el-button>
                  </template>
                </el-table-column> -->
              </el-table>
              <el-button slot="reference" type="text">详细</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="" label="项目情况" align="center">
					<template slot-scope="scope">
						<el-popover-template  type="m" :label-prop="itemInfo" :data="scope.row.itemInfo"></el-popover-template>
					</template>
				</el-table-column> -->

        <el-table-column
          prop="billTime"
          label="开票日期"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="billNo"
          label="发票号"
          align="left"
        ></el-table-column>
        <el-table-column label="附件" align="left">
          <template slot-scope="scope">
            <download-button :value="scope.row.billAttach"></download-button>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="" label="回款情况" align="center">
          <template slot-scope="scope">
             <el-popover placement="bottom" width="600" trigger="click">
              <el-table :data="scope.row.receivableData">
                <el-table-column
                  label="收款金额"
                  prop="total"
                ></el-table-column>
                <el-table-column
                  label="收款时间"
                  prop="collTime"
                ></el-table-column>
              </el-table>
              <el-button slot="reference" type="text">详细</el-button>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column
          prop="receiveMoney"
          label="回款总额"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="sumMoney"
          label="应收账款"
          align="center"
        ></el-table-column> -->
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <span v-show="scope.row.billType == 0">审核中</span>
            <span v-show="scope.row.billType == 2">已作废</span>
            <table-button
              :scope="scope.row"
              @click="tableClick"
              v-show="scope.row.billType == 1"
            ></table-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination
      :pageTotal="mytableData.length"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    ></pagination>
    <div class="dialog">
      <!-- <update-invoice-dialog
        title="发票登记"
        ref="updateRef"
        @getFormData="addBill"
      ></update-invoice-dialog> -->
      <invalid-inovice-dialog
        title="申请作废"
        ref="invalidRef"
        @getFormData="invalidClick"
      ></invalid-inovice-dialog>
      <update-invoice-dialog
        title="发票完善"
        ref="updateBillRef"
        @getFormData="updatesBill"
      ></update-invoice-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TableButton from '../button/TableButton.vue';
// import StatusTag from "../../../../../components/StatusTag.vue";
import UpdateInvoiceDialog from '../dialog/UpdateInvoiceDialog.vue';
import InvalidInoviceDialog from '../dialog/InvalidInoviceDialog.vue';
import pagination from '@c/pagination/index.vue';
import { updateBill } from '../../../../../api/webapi-fin.js';
import { mapState } from 'vuex';
import { startFlow, getIns } from '../../../../../api/webapi-flow.js';
export default {
  components: {
    TableButton,
    UpdateInvoiceDialog,
    InvalidInoviceDialog,
    pagination,
  },
  props: {
    mytableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    title: { Type: String },
    types: { Type: String },
  },
  watch: {
    types (newvalue) {
      this.mytype = types;
    },
    // mytableData(newvalue){
    //   this.currentData=this.$myfunction.getPageData(this.mytableData,this.pageShow);
    // }
  },
  // 数据节点
  data () {
    return {
      currentRow: '',
      mytype: '',
      currentData: [],
      pageShow: { page: 1, limit: 30 },
    };
  },
  computed: {
    ...mapState({
      currentUser: 'currentUser',
    }),
    cudata () {
      return this.$myfunction.getPageData(this.mytableData, this.pageShow);
    }
  },
  // 生命周期函数节点
  created () {
    // this.currentData=this.$myfunction.getPageData(this.mytableData,this.pageShow);
  },
  // 自定义函数节点
  methods: {
    // 点击页码
    handleCurrentChange (val) {
      this.pageShow = Object.assign(this.pageShow, { page: val });
    },
    // 点击页数
    handleSizeChange (val) {
      this.pageShow = Object.assign(this.pageShow, { limit: val });
    },
    showCollType (row, col) {
      let result = '';
      switch (row.categoryType) {
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
    TypeShow (row, col) {
      let result = '登记';
      if (row.instanceId) {
        result = '申请';
      }
      return result;
    },
    tableClick (index, data) {
      this.currentRow = data;
      switch (index) {
        case 1:
          this.$refs.updateBillRef.openDialog();
          break;
        case 2:
          if (data.receivableData.length > 0) {
            this.$message.warning("绑定开票信息不能删除！请先解除发票绑定！");
          } else {
           this.$confirm('此操作将删除相关的所有数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
            .then(() => {
                this.$refs.invalidRef.openDialog();
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除',
              });
            });
          
          }

          break;
      }
    },
    // 发票登记（更新）
    updatesBill (data) {
      data = Object.assign(this.currentRow, data);
      const pa = { jsondata: JSON.stringify(data) };
      updateBill(pa).then((res) => {
        if (res.code == 200) {
          this.$message.success('添加成功');
        }
      });
    },
    // 作废申请
    async invalidClick (data) {
      const _this = this;
      if (_this.$myfunction.isEmpty(_this.currentRow.billAttach)) {
        this.$message.warning('发票扫描件还未上传，不能发起作废流程');
        return;
      }
      if (!_this.$myfunction.isEmpty(_this.currentRow.cancelInstaceId)) {
        this.$message.warning('已发起作废申请，请等待执行结果！');
        return;
      }

      data = Object.assign(data, this.currentRow);
      data = Object.assign(data, { billType: 2 });
      const pa = { jsondata: JSON.stringify(data) };
      updateBill(pa)
        .then((re11) => {
          if (re11.code == 200) {
            this.$message.success('修改成功');
            this.$parent.$parent.$parent.getAll();
          }
        })
        .catch(() => {
          console.log('开票作废发起异常');
        });
      // const flowData = [
      //   { name: '申请时间', controlType: 'input_sign', value: '' },
      //   { name: '申请组织', controlType: 'input_sign', value: '' },
      //   { name: '申请人', controlType: 'input_sign', value: '' },
      //   { name: '作废情况说明', controlType: 'input_sign', value: '' },
      //   { name: '作废发票', controlType: 'input_attachment', value: '' }
      // ];
      // const dateNow = new Date();
      // flowData[0].value = dateNow.Format("yyyy-MM-dd");
      // flowData[1].value = this.currentUser.orgName; // 应根据发起人所在部门决定
      // flowData[2].value = this.currentUser.userName;
      // flowData[3].value = data.cacelDetail;
      // flowData[4].value = await this.getfile(this.currentRow.billAttach);
      // const attachmentValue = JSON.stringify(flowData); // 这里一定要转换成字符串
      // const passa = {
      //   startPerson: this.currentUser.dinCode,
      //   versionID: 'v_2020_cwgl_fbzfsq',
      //   jsonData: attachmentValue,
      // };
      // await startFlow(passa).then((res) => {
      //   if (res.success) {
      //     this.$message.success("开票作废发起成功");
      //     data = Object.assign(data, {
      //       cancelInstaceId: res.msg
      //     });

      //     data = Object.assign(_this.currentRow, data);
      //     console.log("开票作废发起成功");
      //     console.log(data);
      //     const pa = { jsondata: JSON.stringify(data) };
      //     updateBill(pa)
      //       .then((re11) => {
      //         if (re11.code == 200) {
      //           this.$message.success("添加成功");
      //         }
      //       })
      //       .catch(() => {
      //         console.log("开票作废发起异常");
      //       });
      //   }
      // });
    },
    checkstat (e) {
      let result = '';
      if (e.costType=="1") {
        result = 'el-icon-coin noReciveData';
      }
      if (e.costType=="2") {
        result = 'el-icon-coin noReciveEnoughData';
      }
      if (e.costType=="3") {
        result = 'el-icon-coin ReciveData';
      }
      if (e.costType=="0") {
        result = 'el-icon-coin cancelData';
      }
      // console.log(result);
      return result;
    },
  },
};
</script>
<style lang="less">
.noReciveData {
  color: #409eff;
  font-size: 30px;
}
.noReciveEnoughData {
  color: #50e016;
  font-size: 30px;
}
.ReciveData {
  color: #f88e05;
  font-size: 30px;
}
.cancelData {
  color: #4b4947e7;
  font-size: 30px;
}
</style>
