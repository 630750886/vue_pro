<template>
  <div>
    <div class="table">
      <el-table
        ref="tableRef"
        :data="itemList.dataList"
        style="width: 100%"
        align="left"
        height="7rem"
        highlight-current-row
        :header-cell-style="{ fontSize: '14px' }"
        border
      >
        <el-table-column
          label="创建日期"
          align="left"
          width="100px"
          fixed="left"
        >
        <template slot-scope="scope">
          <el-button type="text" @click="tableBtnClick(1, scope.row)" >{{scope.row.createddateTime|datefmt('YYYY/MM/DD')}}</el-button>
        </template>
        </el-table-column>
         <el-table-column
          prop="projectname"
          label="项目名称"
          align="left"
          width="260px"
          show-overflow-tooltip
          fixed="left"
        ></el-table-column>
        <el-table-column
          prop="syscreatepersonname"
          label="创建人"
          align="left"
          width="80px"
        ></el-table-column>
        <el-table-column prop="tenderee" label="甲方信息" align="center">
          <template slot-scope="scope">
            <com-popover
              data-type="obj"
              :label-prop="partyAObject"
              :data="scope.row"
            ></com-popover>
          </template>
        </el-table-column>
        <el-table-column prop="vocationaltypename" width="100px" label="业务类型" align="left" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="accesstradingcentre"
          label="是否进交易中心"
          align="left"
          width="100px"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.accesstradingcentre">
              <com-popover
                title="是"
                data-type="obj"
                :label-prop="biddingAddress"
                :data="scope.row"
              ></com-popover>
            </template>
            <template v-else>
              否
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="applicantdatetime"
          label="报名时间"
          align="left"
          width="250px"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.applicantdelaydateTime !== ''">
              {{ scope.row.applicantbegindatetime }}-{{
                scope.row.applicantdelaydateTime
              }}
            </template>
            <template v-else>
              <template v-if="scope.row.applicantbegindatetime !== ''">
                {{ scope.row.applicantbegindatetime }}-{{
                  scope.row.applicantenddatetime
                }}
              </template>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="bidopeningdateTime"
          label="开标时间"
          align="left"
          width="130px"
        ></el-table-column>

        <el-table-column
          prop="formtendername"
          label="投标形式"
          align="left"
          width="100px"
        >
        </el-table-column>
        <el-table-column
          prop="tenderername"
          label="投标主体"
          align="left"
          show-overflow-tooltip
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="biddingleading"
          label="负责人"
          align="left"
          width="80px"
        ></el-table-column>
        <el-table-column
          prop="istenderbond"
          label="是否缴纳保证金"
          align="left"
          width="110px"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.istenderbond">
              <com-popover
                title="是"
                data-type="obj"
                :label-prop="depositInfo"
                :data="scope.row"
              ></com-popover>
            </template>
            <template v-else>
              否
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="iswinbidding"
          label="中标情况"
          align="left"
          width="80px"
        >
          <template slot-scope="scope">
            <com-popover
              :label-prop="winBid"
              :data="scope.row.winBid"
            ></com-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="left" width="160px" fixed="right">
          <template slot-scope="scope">
            <table-button
              :scope="scope.row"
              @click="tableBtnClick"
            ></table-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <!--分页-->
      <pagination
        :pageTotal="itemList.total"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      ></pagination>
    </div>
    <div class="dialog">
      <!--指定负责人-->
      <set-head-dialog
        ref="setHeadRef"
        title=""
        width="30%"
        @getFormData="networkUpData"
      ></set-head-dialog>
      <!--投标确定-->
      <bid-define-dialog
        ref="bidDefineRef"
        title=""
        width="30%"
        @getFormData="bidIsOk"
      ></bid-define-dialog>
      <!--报名登记-->
      <sign-up-registration
        ref="signUpRef"
        title=""
        width="45%"
        @getFormData="networkUpData"
      ></sign-up-registration>
      <!--项目情况登记-->
      <item-registration
        ref="itemRef"
        title=""
        @getFormData="networkUpData"
      ></item-registration>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TableButton from "../button/TableButton.vue";
import SetHeadDialog from "../dialog/SetHeadDialog.vue";
import BidDefineDialog from "../dialog/BidDefineDialog.vue";
import SignUpRegistration from "../dialog/SignUpRegistration.vue";
import ItemRegistration from "../../showBasic/components/dialog/ItemRegistration.vue";
import { mapState, mapActions, mapMutations } from "vuex";
import {
  getBidItemFile,
  upBidItemFile,
  getSubcontract,
  delSubcontract
} from "../../../../../api/webapi-bidRecord.js";
export default {
  components: {
    TableButton,
    SetHeadDialog,
    BidDefineDialog,
    SignUpRegistration,
    ItemRegistration
  },
  props: {
    statusCode: { Type: String },
  },

  watch: {},
  computed: {
    ...mapState("bidManager", {
      itemList: "itemList"
     })
  },
  //数据节点
  data() {
    return {
      pageInfo: {
        page: 1,
        limit: 30
      },
      partyAObject: [
        { label: "项目业主", prop: "proprietor" },
        { label: "招标人", prop: "tenderee" },
        { label: "负责人", prop: "tendereeleading" },
        { label: "联系电话", prop: "tendereeleadingphone" },
        { label: "招标代理机构", prop: "biddingagency" },
        { label: "负责人", prop: "biddingagencyleading" },
        { label: "联系电话", prop: "biddingagencyleadingphone" }
      ],
      biddingAddress: [
        { label: "交易中心名称", prop: "tradingcentrename" },
        { label: "开标地点", prop: "placebidopening" }
      ],
      biddingFileAnalysis: [
        { label: "人员分析", prop: "personanalyse" },
        { label: "业绩分析", prop: "achievementanalyse" },
        { label: "行政分析", prop: "administrationanalyse" },
        { label: "重点分析", prop: "keypointanalyse" },
        { label: "答辩人员", prop: "rejoinperson" }
      ],
      depositInfo: [
        { label: "保证金(元)", prop: "tenderbondsum" },
        { label: "缴纳时间", prop: "tbbegindateTime" }
      ],
      winBid: [
        { label: "分包编号", prop: "tenderCode",width:'140px'},
        { label: "分包名称", prop: "bidsectionname",width:'200px' },
        { label: "保证金(元)", prop: "proCautionMoney" },
        { label: "中标单位", prop: "companyname" ,width:'100px'},
        { label: "中标价", prop: "winbiddingsum",width:'200px' }
      ]
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    ...mapActions("bidManager", {
      networkUpData: "networkUpData",
      networkGetDataByKeyid: "networkGetDataByKeyid"
    }),
    ...mapMutations("bidManager", {
      updateItem: "updateItem"
    }),
    tableBtnClick(btn, data) {
      switch (btn) {
        case 1:
          this.networkGetDataByKeyid({keyid: data.keyid });
          this.$router.push({ path: "bid_basic" });
          break;
        case 2:
          this.$refs.signUpRef.openDialog(data);
          break;
        case 3:
          this.$refs.bidDefineRef.openDialog(data);
          break;
        case 4:
          this.updateItem(data);
          this.$router.push({ path: "workbench" });
          break;
        case 5:
          this.$refs.setHeadRef.openDialog(data);
          break;
      }
    },
    handleCurrentChange(val) {
      this.pageInfo.page = val;
      this.$emit("getPageInfo", this.pageInfo);
    },
    handleSizeChange(val) {
      this.pageInfo.limit = val;
      this.$emit("getPageInfo", this.pageInfo);
    },
    bidIsOk(formData) {
      this.networkUpData(formData).then(() => {
        getBidItemFile({ keyid: formData.keyid }).then(item => {
          let ref = item.data[0];
          ref.docustatus = "已作废";
          upBidItemFile(ref).then(item => {
            getSubcontract({ tenderDocKeyid: item.keyid }).then(item => {
              delSubcontract(item);
            });
          });
        });
      });
    }
  }
};
</script>
<style lang="less" scoped></style>
