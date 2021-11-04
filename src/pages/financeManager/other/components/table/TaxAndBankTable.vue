<template>
  <!--审计及完税信息台账-->
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
          prop="commpanyType"
          label="公司类型"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="commpanyName"
          label="公司名称"
          align="left"
          width="180"
        ></el-table-column>
        <el-table-column label="开票信息" align="left">
          <template slot-scope="scope">
            <el-popover placement="right" width="300" trigger="click">
              <table>
                <tr>
                  <td>纳税人识别号：</td>
                  <td>{{ scope.row.taxNo }}</td>
                </tr>
                <tr>
                  <td>开户行：</td>
                  <td>{{ scope.row.bank }}</td>
                </tr>
                <tr>
                  <td>账号：</td>
                  <td>{{ scope.row.acount }}</td>
                </tr>
                <tr>
                  <td>开票电话：</td>
                  <td>{{ scope.row.taxPhone }}</td>
                </tr>
                <tr>
                  <td>开票地址：</td>
                  <td>{{ scope.row.taxNo_addr }}</td>
                </tr>
              </table>

              <el-button slot="reference" type="text">详细</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="" label="税务评级年份" align="center"></el-table-column> -->
        <el-table-column
          prop="taxCreditRate"
          label="税务信用等级"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="taxRateYear"
          label="评级年份"
          align="left"
        ></el-table-column>
        <el-table-column prop="taxCreditRateAttach" label="附件" align="left">
          <template slot-scope="scope">
            <download-button
              :value="scope.row.taxCreditRateAttach"
            ></download-button>
          </template>
        </el-table-column>
        <el-table-column label="基本账户" align="left">
          <template slot-scope="scope">
            <download-button :value="scope.row.basicAccount"></download-button>
          </template>
        </el-table-column>
        <el-table-column label="一般账户" align="left">
          <template slot-scope="scope">
            <el-popover placement="right" width="300" trigger="click">
              <el-table :data="scope.row.childrens">
                <el-table-column
                  label="银行名称"
                  prop="remark"
                ></el-table-column>
                <el-table-column label="附件">
                  <template slot-scope="socpe2">
                    <download-button
                      :value="socpe2.row.attachId"
                    ></download-button>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="socpe2">
                    <el-button type="mini" @click="delSettle(socpe2.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <el-button slot="reference" type="text">详细</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          min-width="200"
          fixed="right"
        >
          <template slot-scope="scope">
            <table-button :scope="scope.row" @click="tableClick"></table-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <add-taxation-dialog
        title="修改"
        ref="updateTaxaRef"
        @getFormData="sumitTax"
      ></add-taxation-dialog>
      <taxation-info-dialog
        title="完善税务信息"
        ref="TaxaRef"
        @getFormData="complateTax"
      ></taxation-info-dialog>
      <bank-info-dialog
        title="完善银行信息"
        ref="bankRef"
        @getFormData="complateBank"
      ></bank-info-dialog>
      <!-- <bank-info-dialog title="完善结算账户信息" ref="settleRef"></bank-info-dialog> -->
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TableButton from "../button/TableButton.vue";
import addTaxationDialog from "../dialog/addTaxationDialog.vue";
import TaxationInfoDialog from "../dialog/TaxationInfoDialog.vue";
import BankInfoDialog from "../dialog/BankInfoDialog.vue";
import {
  updateTax,
  updateTaxAttach,
  addTaxSettleAcount,
  delTaxSettleAcount
} from "../../../../../api/webapi-fin.js";

export default {
  components: {
    TableButton,
    addTaxationDialog,
    TaxationInfoDialog,
    BankInfoDialog
  },
  props: {
    dataList: {
      type: Array,
      default: []
    }
  },
  watch: {},
  //数据节点
  data() {
    return {
      currentRow: ""
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    tableClick(index, data) {
      this.currentRow = data;
      let pa = Object.assign({}, data);
      switch (index) {
        case 1: //修改
          this.$refs.updateTaxaRef.openDialog(pa);
          break;
        case 2: //完善税务信息
          this.$refs.TaxaRef.openDialog(pa);
          break;
        case 3: //完善银行信息
          this.$refs.bankRef.openDialog(pa);
          break;
      }
    },
    sumitTax(data) {
      this.complate(data);
    },
    complateTax(data) {
      this.complate(data);
    },
    complateBank(data) {
      let pa = Object.assign(this.currentRow, data);
      pa = { jsondata: JSON.stringify(pa) };
      addTaxSettleAcount(pa).then(res => {
        if (res.code == 200) {
          this.$message.info("数据添加成功");
          this.$parent.$parent.$parent.getallTax();
        }
      });
      //console.log(data);
      // this.complate(data);
    },
    delSettle(row) {
      let pa = { jsondata: JSON.stringify(row) };
      delTaxSettleAcount(pa).then(res => {
        if (res.code == 200) {
          this.$parent.$parent.$parent.getallTax();
          this.$message.success("数据更新成功");
        }
      });
    },
    complate(data) {
      let pa = Object.assign({}, data);
      pa = { jsondata: JSON.stringify(pa) };
      updateTax(pa).then(res => {
        if (res.code == 200) {
          this.$parent.$parent.$parent.getallTax();
          this.$message.success("数据更新成功");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped></style>
