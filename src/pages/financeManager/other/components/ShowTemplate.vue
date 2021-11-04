<template>
  <div class="body">
    <div class="head-button">
      <head-button></head-button>
    </div>
    <div class="table">
      <el-tabs v-model="activeName">
        <el-tab-pane name="1">
          <span slot="label">税务/银行信息台账</span>
          <tax-and-bank-table :dataList="taxDataList"></tax-and-bank-table>
        </el-tab-pane>
        <el-tab-pane name="2">
          <span slot="label">审计报告</span>
          <tax-info-table
            :mydataList="taxAttachAudit"
            types="Audit"
            table_label="审计年份"
          ></tax-info-table>
        </el-tab-pane>
        <el-tab-pane name="3">
          <span slot="label">完税凭证</span>
          <tax-info-table
            :mydataList="taxAttachTax"
            types="Tax"
            table_label="完税时间"
          ></tax-info-table>
        </el-tab-pane>
        <el-tab-pane name="4">
          <span slot="label">社保缴纳凭证</span>
          <tax-info-table
            :mydataList="taxAttachSecurity"
            types="Security"
            table_label="缴纳时间"
          ></tax-info-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import HeadButton from "./button/HeadButton.vue";
import TaxAndBankTable from "./table/TaxAndBankTable.vue";
import TaxInfoTable from "./table/TaxInfoTable.vue";
import { getTax, getTaxAttach } from "../../../../api/webapi-fin.js";
import { groupBy_Name } from "../../../../utils/auth.js";
import { mapActions } from "vuex";
export default {
  inject: ["reload"],
  components: {
    HeadButton,
    TaxAndBankTable,
    TaxInfoTable
    //addTaxationDialog,
  },
  props: {},
  watch: {},
  //数据节点
  data() {
    return {
      activeName: "1",
      taxDataList: [],
      taxAttachTax: [],
      taxAttachSecurity: [],
      taxAttachAudit: []
    };
  },
  //生命周期函数节点
  created() {
    this.getallTax();
    //this.getallTaxAttach();
  },

  //自定义函数节点
  methods: {
    ...mapActions({
      networkGetCommpany: "loadType/networkGetCommpany"
    }),
    getallTax() {
      let pa = { page: 1, limit: 30, where: "" };
      pa = { jsondata: JSON.stringify(pa) };
      this.networkGetCommpany();
      getTax(pa)
        .then(res => {
          this.taxDataList = res;
          //得到所有附件信息
          getTaxAttach(pa).then(res => {
            let taxdata = res.filter(item => {
              return item.attach_Type === "tax";
            });
            let securitydata = res.filter(item => {
              return item.attach_Type === "security";
            });
            let auditdata = res.filter(item => {
              return item.attach_Type === "audit";
            });
            this.taxAttachTax = groupBy_Name(taxdata, s => {
              return s["commpanyName"];
            });
            this.taxAttachSecurity = groupBy_Name(securitydata, s => {
              return s["commpanyName"];
            });
            this.taxAttachAudit = groupBy_Name(auditdata, s => {
              return s["commpanyName"];
            });
            //console.log(this.taxAttachAudit);
          });
        })
        .catch(() => {
          console.log("获取getTax信息异常");
        });
    }
  }
};
</script>
<style lang="less" scoped>
.head-button {
  height: 50px;
  line-height: 50px;
  padding: 10px 20px;
}
</style>
