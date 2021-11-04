<template>
  <div class="body">
    <div class="button">
      <head-button @click="headBtnClick"></head-button>
    </div>
    <div class="table">
      <el-table
        :data="recruitData.dataList"
        style="width: 100%"
        align="left"
        height="7.5rem"
        highlight-current-row
        :header-cell-style="{ fontSize: '14px' }"
        border
      >
        <el-table-column
          label="申请时间"
          prop="createddateTime"
          align="left"
        ><template slot-scope="scope">{{scope.row.createddateTime|datefmt('YYYY/MM/DD')}}</template></el-table-column>
        <el-table-column
          label="申请组织"
          prop="sysorgadminname"
          align="left"
        ></el-table-column>
        <el-table-column
          label="申请人"
          prop="syscreatepersonname"
          align="left"
        ></el-table-column>
        <el-table-column label="办理事项" prop="applytypename" align="left">
          <template slot-scope="scope">
            {{ showApplytypename(scope.row.applytypeid) }}
          </template>
        </el-table-column>
        <el-table-column
          label="审核完成时间"
          prop="approvedate"
          align="left"
        ></el-table-column>
        <el-table-column label="附件" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="downloadFile(scope.row)"
              >下载</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <table-button
              :scope="scope.row"
              @btnClick="tableBtnClick"
            ></table-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <!--分页-->
      <pagination
        :pageTotal="recruitData.total"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      >
      </pagination>
    </div>
    <div class="dialog">
      <subsidy-apply-dialog
        title="补助申请"
        ref="subsidyRef"
        width="45%"
        @getFormData="submitSubsidyForm"
      ></subsidy-apply-dialog>
      <!--查看对话框-->
      <ShowDialog ref="showRef"></ShowDialog>
      <!--附件对话框-->
      <attach-dialog
        ref="attachRef"
        @getFormData="attachSubForm"
      ></attach-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import HeadButton from "./button/HeadButton.vue";
import TableButton from "./button/TableButton.vue";
import SubsidyApplyDialog from "./dialog/SubsidyApplyDialog.vue";

import ShowDialog from "./dialog/ShowDialog.vue";
import attachDialog from "./dialog/attachDialog.vue";
import Pagination from "../../../../components/pagination/index.vue";

import { startFlow } from "../../../../api/webapi-flow.js";
import { mapState, mapMutations, mapActions } from "vuex";

//const { mapMutations } = createNamespacedHelpers("template");
export default {
  inject: ["reload"],
  components: {
    Pagination,
    HeadButton,
    TableButton,
    SubsidyApplyDialog,
    ShowDialog,
    attachDialog
  },
  props: {},
  watch: {},
  computed: {
    ...mapState({
      recruitData: state => state.recruitDispose.recruitInfo, //"recruitInfo",
      recuritApply: state => state.recruitDispose.applyRef, //"applyRef"
      cu: "currentUser"
    })
  },
  //数据节点
  data() {
    return {
      applyTypeList: [],
      showData: {},
      pageShow: {
        page: 1,
        limit: 30
      },
      mydata: [],
      flowData: {
        jsonData: [],
        versionid: "",
        startPerson: function() {
          return this.cu.dinCode;
        }
      }
    };
  },
  //生命周期函数节点
  created() {
    this.networkGetDataList({ pageInfo: this.pageShow }); //
    setTimeout(() => {}, 2000);
    this.getSelectByCode(167).then(item => {
      this.applyTypeList = item.data;
    });
  },
  //自定义函数节点
  methods: {
    ...mapMutations("template", {
      updateModel: "updateModel"
    }),
    ...mapActions("recruitDispose", {
      networkGetDataList: "networkGetDataList",
      networkAddRecruit: "networkAddRecruit",
      networkAddBecome: "networkAddBecome",
      networkAddQuit: "networkAddQuit",
      networkAddTransfer: "networkAddTransfer",
      networkAddSubsidy: "networkAddSubsidy",
      networkGetApplyList: "networkGetApplyList",
      networkUpData: "networkUpData"
    }),
    handleCurrentChange(val) {
      this.pageShow.page = val;
      this.networkGetDataList({ pageInfo: this.pageShow }); //
    },
    handleSizeChange(val) {
      this.pageShow.limit = val;
      this.networkGetDataList({ pageInfo: this.pageShow });
    },
    showApplytypename(showId) {
      let ref = this.applyTypeList.find(item => {
        return item.keyid === showId;
      });
      if (ref) {
        return ref.listname;
      } else {
        return "";
      }
    },
    startDingTalkFlow(typename) {
      this.flowData.startPerson = this.cu.dinCode;
      switch (typename) {
        case "招聘需求":
          this.flowData.jsonData = [
            { name: "申请时间", controlType: "input_sign", value: "" },
            { name: "申请组织", controlType: "input_sign", value: "" },
            { name: "申请人", controlType: "input_sign", value: "" },
            {
              name: "招聘需求申请表",
              controlType: "input_attachment",
              value: ""
            }
          ];
          this.flowData.versionid = "v_2020_rzgl_zpxq";
          this.flowData.jsonData[0].value = this.recuritApply.applyTime;
          this.flowData.jsonData[1].value = this.recuritApply.applyDepartment;
          this.flowData.jsonData[2].value = this.recuritApply.syscreatepersonname;
          this.$refs.attachRef.openDialog();
          break;
        case "员工转正":
          this.flowData.jsonData = [
            { name: "申请时间", controlType: "input_sign", value: "" },
            { name: "申请组织", controlType: "input_sign", value: "" },
            { name: "申请人", controlType: "input_sign", value: "" },
            {
              name: "试用期员工转正申请表",
              controlType: "input_attachment",
              value: ""
            }
          ];
          this.flowData.versionid = "v_2020_rzgl_zz";
          this.flowData.jsonData[0].value = this.recuritApply.createddateTime;
          this.flowData.jsonData[1].value = this.recuritApply.organize;
          this.flowData.jsonData[2].value = this.recuritApply.syscreatepersonname;
          this.$refs.attachRef.openDialog();
          break;
        case "离职申请":
          this.flowData.jsonData = [
            { name: "申请时间", controlType: "input_sign", value: "" },
            { name: "申请组织", controlType: "input_sign", value: "" },
            { name: "申请人", controlType: "input_sign", value: "" },
            {
              name: "员工离职申请表",
              controlType: "input_attachment",
              value: ""
            }
          ];
          this.flowData.versionid = "v_2020_rzgl_lz";
          this.flowData.jsonData[0].value = this.recuritApply.applyQuitTime;
          this.flowData.jsonData[1].value = this.recuritApply.department;
          this.flowData.jsonData[2].value = this.recuritApply.syscreatepersonname;
          this.$refs.attachRef.openDialog();
          break;
        case "调岗晋级":
          this.flowData.jsonData = [
            { name: "申请时间", controlType: "input_sign", value: "" },
            { name: "申请组织", controlType: "input_sign", value: "" },
            { name: "申请人", controlType: "input_sign", value: "" },
            {
              name: "员工调岗晋级（档）申请表",
              controlType: "input_attachment",
              value: ""
            }
          ];
          this.flowData.versionid = "v_2020_rzgl_dgjj";
          this.flowData.jsonData[0].value = this.recuritApply.createddateTime;
          this.flowData.jsonData[1].value = this.recuritApply.newOrganize;
          this.flowData.jsonData[2].value = this.recuritApply.syscreatepersonname;
          this.$refs.attachRef.openDialog();
          break;
        case "补助申请":
          this.flowData.jsonData = [
            { name: "申请时间", controlType: "input_sign", value: "" },
            { name: "申请组织", controlType: "input_sign", value: "" },
            { name: "申请人", controlType: "input_sign", value: "" },
            { name: "申请金额", controlType: "input_money", value: 0 },
            { name: "申请理由", controlType: "input_muit", value: "" }
          ];
          this.flowData.jsonData[0].value = this.recuritApply.createddateTime;
          this.flowData.jsonData[1].value = this.recuritApply.orgName;
          this.flowData.jsonData[2].value = this.recuritApply.syscreatepersonname;
          this.flowData.jsonData[3].value = this.recuritApply.applyMoney;
          this.flowData.jsonData[4].value = this.recuritApply.applyReason;
          this.flowData.versionid = "v_2020_rzgl_bz";
          this.flowData.jsonData = JSON.stringify(this.flowData.jsonData);

          startFlow(this.flowData).then(res => {
            if (res.success) {
              this.$message.success("流程发起成功！");
            }
          });
          break;
      }
    },

    headBtnClick(btn, typeId) {
      switch (btn) {
        case 1:
          this.$confirm("是否确定发起流程审批?","提示！",
        {confirmButtonText: "确定",cancelButtonText: "取消",type: "warning"}).then(async () => 
	{
    this.ddfile().then(file => {
            this.ddform("v_2020_rzgl_zpxq", {
              fileList: [{ title: "招聘申请表", file: file }]
            }).then(formId => {
              this.networkAddRecruit({ applytypeid: typeId }).then(item => {
                this.ddflow(1, 2, {
                  baseId: item.keyid,
                  baseUrl: "hr/vocational",
                  baseColumn: "allstatuscode",
                  flowId: formId,
                  fType: typeId
                }).then(item => {
                 // console.log(item);
                  this.$msgbox.confirm(123);
                });
              });
            });
          });
	}).catch(() => {this.$message({type: "info",message: "已取消发起流程！"});});
          
          //this.$refs.recruitRef.openDialog();
          break;
        case 2:
          this.$confirm("是否确定发起流程审批?","提示！",
        {confirmButtonText: "确定",cancelButtonText: "取消",type: "warning"}).then(async () => 
	{
    this.ddfile().then(file => {
            this.ddform("v_2020_rzgl_zz", {
              fileList: [{ title: "转正申请表", file: file }]
            }).then(formId => {
              this.networkAddBecome({ applytypeid: typeId }).then(item => {
                this.ddflow(1, 2, {
                  baseId: item.keyid,
                  baseUrl: "hr/vocational",
                  baseColumn: "allstatuscode",
                  flowId: formId,
                  fType: typeId
                });
              });
            });
          });
	}).catch(() => {this.$message({type: "info",message: "已取消发起流程！"});});
          
          //this.$refs.becomeRef.openDialog();
          break;
        case 3:
          this.$confirm("是否确定发起流程审批?","提示！",
        {confirmButtonText: "确定",cancelButtonText: "取消",type: "warning"}).then(async () => 
	{
    this.ddfile().then(file => {
            this.ddform("v_2020_rzgl_lz", {
              fileList: [{ title: "离职申请表", file: file }]
            }).then(formId => {
              this.networkAddQuit({ applytypeid: typeId }).then(item => {
                this.ddflow(1, 2, {
                  baseId: item.keyid,
                  baseUrl: "hr/vocational",
                  baseColumn: "allstatuscode",
                  flowId: formId,
                  fType: typeId
                });
              });
            });
          });
	}).catch(() => {this.$message({type: "info",message: "已取消发起流程！"});});
          
          //this.$refs.quitRef.openDialog();
          break;
        case 4:
          this.$confirm("是否确定发起流程审批?","提示！",
        {confirmButtonText: "确定",cancelButtonText: "取消",type: "warning"}).then(async () => 
	{
	this.ddfile().then(file => {
            this.ddform("v_2020_rzgl_dgjj", {
              fileList: [{ title: "调岗晋级申请表", file: file }]
            }).then(formId => {
              this.networkAddTransfer({ applytypeid: typeId }).then(item => {
                this.ddflow(1, 2, {
                  baseId: item.keyid,
                  baseUrl: "hr/vocational",
                  baseColumn: "allstatuscode",
                  flowId: formId,
                  fType: typeId
                });
              });
            });
          });
	}).catch(() => {this.$message({type: "info",message: "已取消发起流程！"});});
          
          //this.$refs.transferRef.openDialog();
          break;
        case 5:
          this.$refs.subsidyRef.openDialog({ applytypeid: typeId });
          break;
        case 6:
          const ref = {
            code: "402880fa74e735230174ec6b84dd0008",
            name: "人事模块/招聘配置",
            modelName: "hr"
          };
          this.updateModel(ref);
          this.$router.push({ path: "original_template" });
          break;
        case 9:
          this.reload();
          break;
      }
    },
    tableBtnClick(btn, data) {
      this.networkGetApplyList(data);
      switch (btn) {
        case 1:
          this.networkGetApplyList(data);
          this.openShowDialog(data);
          break;
        case 2:
          this.networkUpData(data);
          break;
        case 3:
          break;
        case 9:
          setTimeout(() => {
            this.startDingTalkFlow(data.applytypename);
          }, 800);
          //发起钉钉

          //
          break;
      }
    },
    openShowDialog(data) {
      this.$refs.showRef.openDialog(data);
    },
    /* submitRecruitForm(data) {
        this.networkAddRecruit(data)
      },
      submitBecomeForm(data) {
        this.networkAddBecome(data);
      },
      submitQuitForm(data) {
        this.networkAddQuit(data);
      },
      submitTransferForm(data) {
        this.networkAddTransfer(data);
      },*/
    submitSubsidyForm(data) {
      this.$confirm("是否确定发起流程审批?","提示！",
        {confirmButtonText: "确定",cancelButtonText: "取消",type: "warning"}).then(async () => 
	{
     this.ddform("v_2020_rzgl_bz", {
        muitList: [{ name: "申请理由", value: data.applyReason }],
        moneyList: [{ name: "申请金额", value: data.applyMoney }]
      }).then(formId => {
        this.networkAddSubsidy(data).then(item => {
          this.ddflow(1, 2, {
            baseId: item.keyid,
            baseUrl: "hr/vocational",
            baseColumn: "allstatuscode",
            flowId: formId,
            fType: "员工调岗晋级申请"
          });
        });
      });
	}).catch(() => {this.$message({type: "info",message: "已取消发起流程！"});});
     
    },
    attachSubForm(data) {
      //data.filepath
      //console.log("-----------flowData--------------------");
      //console.log(this.flowData);
      //console.log("-----------flowData--------------------");
      let index = this.flowData.jsonData.length - 1;
      this.flowData.jsonData[index].value = data.filepath;
      this.flowData.jsonData = JSON.stringify(this.flowData.jsonData);
      startFlow(this.flowData).then(res => {
        if (res.success) {
          let instanceId = res.msg; //这就是生成的流程实例ID
          this.$message.success("发起成功！！！！");
        }
      });
    },
    //下载附件
    downloadFile(data) {
      this.getDataFlow(data.keyid, data.applytypeid).then(flowId => {
        this.getFlowFile(flowId).then(file => {
          if (Array.isArray(file)) {
            this.downloadFlowFile(file[0]);
          } else {
            this.downloadFlowFile(file);
          }
        });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.body {
  .button {
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
  }
}
</style>
