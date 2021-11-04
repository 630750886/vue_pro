<template>
  <div class="body">
    <div class="table">
      <el-table
        ref="tableRef"
        :data="items.dataList"
        style="width: 100%"
        align="center"
        height="6.8rem"
        highlight-current-row
        :header-cell-style="{ fontSize: '14px' }"
        border
      >
        <el-table-column
          prop="projectCode"
          label="项目编号"
          align="center"
          fixed="left"
          width="130"
        ><template slot-scope="scope">
            <el-button type="text" @click="tableBtnClick(7, scope.row)" >{{scope.row.projectCode }}</el-button>
          </template></el-table-column>
        <el-table-column
          prop="projectName"
          label="项目名称"
          align="center"
          fixed="left"
          width="220"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="createddateTime"
          :show-overflow-tooltip="true"
          label="创建时间"
          align="center"
          width="95"
        ><template slot-scope="scope">{{scope.row.createddateTime|datefmt('YYYY/MM/DD')}}</template></el-table-column>
        <el-table-column
          prop="syscreatepersonname"
          label="创建人"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="projectOrgName"
          label="归属"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="contractbase.contractBurchaser"
          :show-overflow-tooltip="true"
          label="客户方名称"
          align="center"
          width="230"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.contractbase.contractBurchaser !== ''">
              <el-popover trigger="click" placement="top">
                <!--<p>客户方名称: {{ scope.row.contractBurchaser }}</p>-->
                <p>第三方名称: {{ scope.row.contractbase.thirdparty }}</p>
                <div slot="reference">
                  <el-tag size="medium">{{
                    scope.row.contractbase.contractBurchaser
                  }}</el-tag>
                </div>
              </el-popover>
            </template>
          </template>
        </el-table-column>
        <el-table-column
            prop="contractbase.projectSum"
            label="项目总投资(万元)"
            align="center"
            width="150"
          ></el-table-column>
        <el-table-column
          prop="contractbase.contractSum"
          label="合同酬金(元)"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="outputValueSum"
          label="累计产值(元)"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="proBegindateTime"
          label="计划开始时间"
          align="center"
          width="130"
        ></el-table-column>
        <el-table-column
          prop="proEnddateTime"
          label="计划完成时间"
          align="center"
          width="130"
        ></el-table-column>
        <el-table-column
          prop="accomplishdateTime"
          label="完成时间"
          align="center"
          width="130"
        ></el-table-column>
        <el-table-column
          prop="placeonfiledateTime"
          label="归档时间"
          align="center"
          width="130"
        ></el-table-column>
        <el-table-column prop="groupWorks" label="工作组" align="center">
          <template slot-scope="scope">
            <com-popover
              data-type="ky"
              :data="scope.row.groupWorks"
              label="projectJobName"
              prop="projectPersonName"
            ></com-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="contractbase.contractallfile"
          label="合同"
          align="center"
          width="50"
        >
         <template slot-scope="scope">
              <download-button :value="scope.row.contractbase.contractallfile"></download-button>
            </template>
        </el-table-column>
        <el-table-column
          prop="projectMajorName"
          label="专业工程分类"
          align="center"
          width="130"
        ></el-table-column>
        <!--        加·-->
        <el-table-column
            prop=bidTypeName"
            label="招标方式"
            align="center"
            width="130"
        ></el-table-column>
        <!--        -->
        <el-table-column
          prop="projectTypeName"
          :show-overflow-tooltip="true"
          label="项目类型"
          align="center"
        ></el-table-column>
        <el-table-column prop="projectcontact" label="委托联系人" align="center">
          <template slot-scope="scope">
            <com-popover
              :data="scope.row.projectcontact"
              :label-prop="clientTemplate"
            ></com-popover>
          </template>
        </el-table-column>
        <!--        加 -->
        <el-table-column
            prop=""
            label="公告情况"
            align="center"
            width="100"
        >
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <div>
                <el-table :data="scope.row.agencyPullist" style="width: 542px" border>
                  <el-table-column
                      prop="pulCount"
                      label="发布次数"
                      align="left"
                      width="150px"
                  ></el-table-column>
                  <el-table-column
                      prop="pubDate"
                      label="发布日期"
                      align="left"
                      width="150px"
                  ></el-table-column>
                  <el-table-column
                      prop="pubWeb"
                      label="发布网站"
                      align="left"
                  ></el-table-column>
                </el-table>
              </div>
              <div slot="reference">
                <el-tag size="medium">详细</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
            prop=""
            label="开标情况"
            align="center"
            width="100"
        >
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <div>
                <el-table :data="scope.row.agencybidopenlist" style="width: 542px" border>
                  <el-table-column
                      prop="bidopenPackageName"
                      label="开标包名"
                      align="left"
                      width="150px"
                  ></el-table-column>
                  <el-table-column
                      prop="bidopenCount"
                      label="开标次数"
                      align="left"
                      width="150px"
                  ></el-table-column>
                  <el-table-column
                      prop="bidopenDate"
                      label="开标日期"
                      align="left"
                  ></el-table-column>
                </el-table>
              </div>
              <div slot="reference">
                <el-tag size="medium">详细</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <!--        结束-->
        <el-table-column
          prop="datajson"
          label="中标情况"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <div>
                <el-table :data="scope.row.agencybidResultlist" style="width: 542px" border>
                  <el-table-column
                      prop="bidPackageName"
                      label="包名"
                      align="left"
                      width="150px"
                  ></el-table-column>
                  <el-table-column
                      prop="bidEntpriceName"
                      label="中标企业"
                      align="left"
                      width="150px"
                  ></el-table-column>
                  <el-table-column
                      prop="bidMoncy"
                      label="中标价"
                      align="left"
                      width="80px"
                  ></el-table-column>
                  <el-table-column
                      prop="bidOpenDate"
                      label="开标日期"
                      align="left"
                      width="80px"
                  ></el-table-column>
                  <el-table-column
                      prop="bidOutDate"
                      label="发出日期"
                      align="left"
                  ></el-table-column>
                </el-table>
              </div>
              <div slot="reference">
                <el-tag size="medium">详细</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="原件情况"
          align="center"
        >
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200" fixed="right">
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
        :pageTotal="items.total"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      ></pagination>
    </div>

    <div class="dialog">
      <projectprework
      ref="projectpre"
      title=""
      width="90%"
      @getFormData="changeproject"
      ></projectprework>
      <transfer-file-dialog
        ref="transferRef"
        title="原件移交"
        @getFormData="submitTransferForm"
      ></transfer-file-dialog>
      <cancel-project-dialog
        ref="cancelRef"
        width="30%"
        title="项目取消登记"
        @getFormData="submitCancelForm"
      ></cancel-project-dialog>
      <cancel-project-dialog
        ref="cancelInfoRef"
        width="30%"
        title="项目取消信息"
      ></cancel-project-dialog>
      <contractexecutedialog
        title="合同执行情况"
        width="90%"
        ref="contractRef"
      ></contractexecutedialog>
      <changprojectname
        title="修改项目名称"
        width="90%"
        ref="projectRef"
        @getFormData="changnameOK">
      </changprojectname>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TableButton from "../button/TableButton.vue";
import contractexecutedialog from "@/pages/businessManager/acomponents/ContractExecuteDialog.vue";
import TransferFileDialog from "../dialog/TransferFileDialog.vue";
import CancelProjectDialog from "../dialog/CancelProjectDialog.vue";
import projectprework from "@/pages/businessManager/acomponents/projectprework.vue";
import changprojectname from "@/pages/businessManager/acomponents/changProjectName.vue";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  components: {
    TableButton,
    TransferFileDialog,
    CancelProjectDialog,
    contractexecutedialog,
    changprojectname,
    projectprework
  },
  props: {},
  watch: {},
  computed: {
    ...mapState("biddingAgency", {
      items: "items"
    })
  },
  //数据节点
  data() {
    return {
      total: 20,
      pageShow: {
        page: 1,
        limit: 30
      },
      //委托人模板
      clientTemplate: [
        {
          label: "姓名",
          prop: "contactname"
        },
        {
          label: "电话",
          prop: "contactphone"
        },
        {
          label: "部门",
          prop: "contactdepartment"
        },
        {
          label: "职务",
          prop: "contactpost"
        }
      ],
      //成果文件
      outcomeDocumentTemplate: [
        {
          label: "报告名称",
          prop: "reportName"
        },
        {
          label: "报告出具时间",
          prop: "reportTime"
        },
        {
          label: "造价工程师执业章",
          prop: "seal"
        },
        {
          label: "编制金额(元)",
          prop: "examineMoney"
        },
        {
          label: "送审金额(元)",
          prop: "inspectMoney"
        },
        {
          label: "审定金额(元)",
          prop: "defineMoney"
        },
        {
          label: "审减(增)金额(元)",
          prop: "IncreaseOrDecreaseMoney"
        },
        {
          label: "审减(增)率",
          prop: "IncreaseOrDecreaseRate"
        }
      ],
      //中标情况
      bidInfo: [
        { label: "分包/分标段名称", prop: "filesalename" },
        { label: "开标时间", prop: "openingbidddateTime" },
        { label: "中标金额(元)", prop: "projectsum" },
        { label: "中标单位", prop: "orgName" },
        { label: "通知书发出时间", prop: "disdateTime" }
      ]
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    ...mapMutations("workbench", {
      updateWorkbenchKeyid: "updateWorkbenchKeyid",
      workbenchCurrentItem: "updateCurrentItem",
      aStageCurrentItem: "aStage/updateCurrentItem",
      cStageCurrentItem: "cStage/updateCurrentItem"
    }),
    ...mapActions("biddingAgency", {
      networkUpItem: "networkUpItem",
      networkGetItemByKeyId: "networkGetItemByKeyId",
      networkGetItems: "networkGetItems"
    }),
    ...mapActions("originalScript", {
      //原件移交
      networkAddTransfer: "networkAddTransfer"
    }),
    handleCurrentChange(val) {
      this.pageShow.page = val;
      this.$emit("getPageInfo", this.pageShow);
    },
    handleSizeChange(val) {
      this.pageShow.limit = val;
      this.$emit("getPageInfo", this.pageShow);
    },
    tableBtnClick(btn, data) {
      switch (btn) {
        case 1:
          break;
        case 2:
          //跳转哪个工作台
          this.updateWorkbenchKeyid("402880fa75fcce490175fea4ffe70070");
          //更新工作组的项目
          this.workbenchCurrentItem(data);
          this.aStageCurrentItem(data);
          this.cStageCurrentItem(data);
          this.$router.push({ path: "workbench" });
          break;
        case 3:
          this.$refs.transferRef.openDialog();
          break;
        case 4:
          this.cancelOpenDialog(data);
          break;
        case 5:
          this.$refs.contractRef.openDialog();
          break;
        case 6:
          this.$refs.cancelInfoRef.openDialog(data, false);
          break;
        case 7:
          this.$refs.projectpre.openDialog(data, false);
          break;
        case 11:
          this.$refs.projectRef.openDialog(data);
          break;
      }
    },
    changnameOK(data){
      this.$message.success(data);
    },
    cancelOpenDialog(data) {
      this.networkGetItemByKeyId(data.keyid).then(item => {
        this.$refs.cancelRef.openDialog(item);
      });
    },
    submitCancelForm(formData) {
      this.networkUpItem(formData);
    },
    submitTransferForm(formList) {
      formList.forEach(item => {
        this.networkAddTransfer(item);
      });
    },
    changeproject()
    {
      this.$emit("workplanhandle", "");
    }
  }
};
</script>
<style lang="less" scoped>
.el-table {
  .el-tag {
    cursor: pointer;
  }
}
</style>
