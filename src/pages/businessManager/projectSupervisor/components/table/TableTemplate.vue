<template>
  <div class="body">
    <div class="table">
      <el-table
        ref="tableRef"
        :data="items.dataList"
        style="width: 100%"
        align="left"
        height="6.8rem"
        highlight-current-row
        :header-cell-style="{ fontSize: '14px' }"
        border
      >
        <el-table-column
          prop="projectCode"
          label="项目编号"
          align="left"
          fixed="left"
          width="130"
        >
        <template slot-scope="scope">
            <el-button type="text" @click="tableBtnClick(7, scope.row)" >{{scope.row.projectCode }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="projectName"
          label="项目名称"
          align="left"
          fixed="left"
          width="220"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="createddateTime"
          label="创建时间"
          :show-overflow-tooltip="true"
          align="left"
          width="95"
        ><template slot-scope="scope">{{scope.row.createddateTime|datefmt('YYYY/MM/DD')}}</template></el-table-column>
        <el-table-column
          prop="syscreatepersonname"
          label="创建人"
          align="left"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="projectOrgName"
          label="归属"
          align="left"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="contractbase.contractBurchaser"
          :show-overflow-tooltip="true"
          label="客户方名称"
          align="left"
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
            align="left"
            width="150"
          ></el-table-column>
        <el-table-column
          prop="contractbase.contractSum"
          label="合同酬金(元)"
          align="left"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="outputValueSum"
          label="累计产值(元)"
          align="left"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="proBegindateTime"
          label="计划开始时间"
          align="left"
          width="130"
        ></el-table-column> 
        <el-table-column
          prop="proEnddateTime"
          label="计划完成时间"
          align="left"
          width="130"
        ></el-table-column> 
        <el-table-column
          prop="accomplishdateTime"
          label="完成时间"
          align="left"
          width="130"
        ></el-table-column> 
        <el-table-column
          prop="placeonfiledateTime"
          label="归档时间"
          align="left"
          width="130"
        ></el-table-column> 
        <el-table-column prop="groupWorks" label="工作组" align="left">
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
          align="left"
          width="50"
        >
         <template slot-scope="scope">
              <download-button :value="scope.row.contractbase.contractallfile"></download-button>
            </template>
        </el-table-column> 
        <el-table-column
          prop="projectMajorName"
          label="专业工程分类"
          align="left"
          width="130"
        ></el-table-column>
        <el-table-column
          prop="projectTypeName"
          label="项目类型"
          align="left"
          width="130"
        ></el-table-column>
        <!--
           <el-table-column prop="projectcontact" label="委托联系人" align="left">
          <template slot-scope="scope">
            <com-popover
              :data="scope.row.projectcontact"
              :label-prop="clientTemplate"
            ></com-popover>
          </template>
        </el-table-column>
        -->
        <el-table-column
          prop=""
          label="原件情况"
          align="left"
        >
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="195px"
          fixed="right"
        >
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
      <contract-execute-dialog
        title="合同执行情况"
        width="90%"
        ref="contractRef"
      ></contract-execute-dialog>
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
import ContractExecuteDialog from "../../../acomponents/ContractExecuteDialog.vue";
import TransferFileDialog from "../dialog/TransferFileDialog.vue";
import projectprework from "@/pages/businessManager/acomponents/projectprework.vue";
import CancelProjectDialog from "../dialog/CancelProjectDialog.vue";
import { mapState, mapActions, mapMutations } from "vuex";
import changprojectname from "@/pages/businessManager/acomponents/changProjectName.vue";
export default {
  components: {
    TableButton,
    TransferFileDialog,
    CancelProjectDialog,
    ContractExecuteDialog,
    changprojectname,
    projectprework
  },
  props: {},
  watch: {},
  computed: {
    ...mapState("projectSupervisor", {
      items: "items"
    })
  },
  //数据节点
  data() {
    return {
      total: 20,
      pageShow: {
        page: 1,
        limit: 30,
        filter: "1=1"
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
      BidInfoTemplate: [
        { label: "开标时间", prop: "startTime" },
        { label: "中标金额(元)", prop: "bidMoney" },
        { label: "中标单位", prop: "company" },
        { label: "中标通知书发出时间", prop: "sendTime" }
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
    ...mapActions("projectSupervisor", {
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
          this.updateWorkbenchKeyid("402880fa75fcce490175fea539420072");
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
