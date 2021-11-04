<template>
  <div class="logContainer">
    <div class="search_container searchArea">
      <head-button @click="headBtnClick"></head-button>
    </div>
    <el-table
      :data="registerList.dataList"
      style="width: 100%"
      align="left"
      height="7.5rem"
      highlight-current-row
      border
      :header-cell-style="{ fontSize: '14px' }"
    >
      <el-table-column
        prop="syscreatepersonname"
        label="创建人"
        align="left"
        width="100"
        header-align="center"
      ></el-table-column>
      <el-table-column
        prop="createddateTime"
        label="创建时间"
        align="left"
        width="100"
        header-align="center"
      ><template slot-scope="scope">{{scope.row.createddateTime|datefmt('YYYY/MM/DD')}}</template></el-table-column>
      <el-table-column
        prop="customerName"
        label="回访客户名称"
        align="left"
        width="200"
        fixed="left"
        header-align="center"
        show-overflow-tooltip
      ></el-table-column>
      <!--20字换行-->
      <el-table-column
        prop="relationDepartment"
        label="回访事件相关部门"
        align="left"
        width="250"
        header-align="center"
      ></el-table-column>
      <el-table-column
        prop="returnTime"
        label="回访时间"
        align="left"
        width="100"
        header-align="center"
      ></el-table-column>
      <el-table-column
        prop="way"
        label="回访方式"
        align="left"
        width="100"
        header-align="center"
      ></el-table-column>
      <el-table-column
        prop="types"
        label="回访类型"
        align="left"
        width="100"
        header-align="center"
      ></el-table-column>
      <el-table-column label="被访人信息" align="center" width="100" header-align="center">
        <template slot-scope="scope">
          <el-popover trigger="click" placement="top">
            <p>姓名: {{ scope.row.userName }}</p>
            <p>部门: {{ scope.row.userDepartment }}</p>
            <p>职位: {{ scope.row.userDuty }}</p>
            <p>电话: {{ scope.row.userPhone }}</p>
            <div slot="reference">
              <el-tag size="medium">详细</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="business"
        label="回访涉及业务类型"
        align="left"
        width="150"
        header-align="center"
      ></el-table-column>
      <el-table-column
        prop="technologyQuality"
        label="技术评价"
        align="left"
        width="100"
        header-align="center"
      ></el-table-column>
      <el-table-column
        prop="serverQuality"
        label="服务评价"
        align="left"
        width="100"
        header-align="center"
      ></el-table-column>
      <el-table-column
        prop="complaints"
        label="是否有投诉"
        align="left"
        width="100"
        header-align="center"
      >
        <template slot-scope="scope">
          <template v-if="scope.row.complaints.bool()">
            <el-popover trigger="click" placement="top">
              <p>被投诉人：{{ scope.row.complaintsMan }}</p>
              <div slot="reference">
                <el-tag size="medium">是</el-tag>
              </div>
            </el-popover>
          </template>
          <template v-else>
            <span>否</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        prop="praise"
        label="是否有表扬"
        align="left"
        width="100"
        header-align="center"
      >
        <template slot-scope="scope">
          <template v-if="scope.row.praise.bool()">
            <el-popover trigger="click" placement="top">
              <p>被表扬人：{{ scope.row.complaintsMan }}</p>
              <div slot="reference">
                <el-tag size="medium">是</el-tag>
              </div>
            </el-popover>
          </template>
          <template v-else>
            <span>否</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        prop="dealt"
        label="处理人"
        align="left"
        width="100"
        header-align="center"
      ></el-table-column>
      <el-table-column
        prop="auditor"
        label="审核人"
        align="left"
        width="100"
        header-align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center" width="200px" fixed="right" header-align="center">
        <template slot-scope="scope">
          <table-button
            :scope="scope.row"
            @click="tableBtnClick"
          ></table-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <pagination
      :pageTotal="registerList.total"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    >
    </pagination>
    <!--添加客户回访-->
    <add-dialog
      ref="addRef"
      title=""
      width="35%"
      @getFormData="submitAddForm"
    ></add-dialog>
    <!--高级查询-->
    <query-dialog
      ref="queryRef"
      title=""
      width="42%"
      @getFormData="submitQueryForm"
    ></query-dialog>
    <!--提交处理-->
    <handle-dialog
      ref="handleRef"
      title=""
      width="45%"
      @getFormData="submitHandleForm"
    ></handle-dialog>
    <outputexcel
     ref="outexcel"
     :json_data="registerList.dataList"
     :json_fields="jsonfields"
     ></outputexcel>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import pagination from "../../../../components/pagination/index.vue";
import HeadButton from "./button/HeadButton.vue";
import TableButton from "./button/TableButton.vue";
import QueryDialog from "./dialog/QueryDialog.vue";
import AddDialog from "./dialog/AddDialog.vue";
import HandleDialog from "./dialog/HandleDialog.vue";
import outputexcel from "./dialog/outputexcel.vue";
import { mapMutations } from "vuex";
import { createNamespacedHelpers } from "vuex";

const { mapState, mapGetters, mapActions } = createNamespacedHelpers(
  "maintenance"
);
export default {
  inject: ["reload"],
  components: {
    pagination,
    HeadButton,
    TableButton,
    QueryDialog,
    AddDialog,
    HandleDialog,
    outputexcel
  },
  props: {},
  watch: {},
  computed: {
    ...mapState({
      advancedQuery: "advancedQuery",
      registerList: "registerList"
    })
  },
  //数据节点
  data() {
    return {
      //数据源
      dataList: this.myData,
      //条数
      total: this.pageTotal,
      pageShow: {
        pageInfo: {
          page: 1,
          limit: 30
        },
        advancedQuery: {}
      },
      jsonfields:{
        创建人:"syscreatepersonname",
        创建时间:"createddateTime",
        回访客户名称:"customerName",
        回访事件相关部门:"relationDepartment",
        回访时间:"returnTime",
        回访方式:"way",
        回访类型:"types",
        被访人信息:"userName",
        回访涉及业务类型:"business",
        技术评价:"technologyQuality",
        服务评价:"serverQuality",
        是否有投诉:"complaints",
        是否有表扬:"praise",
        处理人:"dealt",
        审核人:"auditor"
      }
    };
  },
  //生命周期函数节点
  created() {
    this.networkGetRegisterList(this.pageShow);
  },
  //自定义函数节点
  methods: {
    ...mapMutations({
      updateAdvancedQuery: "maintenance/updateAdvancedQuery",
      updateModel: "template/updateModel",
      updateRegisterBase: "maintenance/updateRegisterBase"
    }),
    ...mapActions({
      networkGetRegisterList: "networkGetRegisterList",
      networkAddRegisterInfo: "networkAddRegisterInfo",
      networkGetRegisterByKeyId: "networkGetRegisterByKeyId",
      networkAddExamineResult: "networkAddExamineResult",
      networkUpRegisterInfo: "networkUpRegisterInfo"
    }),
    handleCurrentChange(val) {
      this.pageShow.pageInfo.page = val;
      this.pageShow.advancedQuery = this.advancedQuery;
      this.networkGetRegisterList(this.pageShow);
    },
    handleSizeChange(val) {
      this.pageShow.pageInfo.limit = val;
      this.pageShow.advancedQuery = this.advancedQuery;
      this.networkGetRegisterList(this.pageShow);
    },
    headBtnClick(btn) {
      switch (btn) {
        case 1:
          this.$refs.addRef.openDialog();
          break;
        case 2:
          this.$refs.queryRef.openDialog();
          break;
        case 3:
          break;
        case 4:
          const ref = {
            code: "402880fa74e735230174ec6d1a42000b",
            name: "客户模块/客户回访"
          };
          this.updateModel(ref);
          this.$router.push({ path: "original_template" });
          break;
        case 5:
          this.$refs.outexcel.openDialog();
          break;
        case 9:
          this.reload();
          break;
      }
    },
    tableBtnClick(btn, data) {
      switch (btn) {
        case 1:
          this.updateRegisterBase(data);
          this.$router.push({ path: "custMainManager" });
          break;
        case 2:
          this.$refs.handleRef.openDialog(data);
          break;
      }
    },
    //提交数据
    submitAddForm(data) {
      this.networkAddRegisterInfo(data);
    },
    submitQueryForm(data) {
      this.updateAdvancedQuery(data);
      this.pageShow.advancedQuery = data;
      this.networkGetRegisterList(this.pageShow);
    },
    submitHandleForm(data) {
    this.$confirm("是否确定发起流程审批?","提示！",
        {confirmButtonText: "确定",cancelButtonText: "取消",type: "warning"}).then(async () => 
          {
            this.ddform("v_2020_khwh_hfcl", {
                fileList: [
                  {
                    title: "相关处理资料",
                    file: await this.getfile(data.handleMaterialFile)
                  },
                  {
                    title: "客户回访调查表",
                    file: await this.getfile(data.handleTableFile)
                  }
                ],
                muitList: [
                  { name: "整体提升措施", value: data.rectification },
                  { name: "处理结果", value: data.handleResults }
                ]
              }).then(flowId => {
                this.networkGetRegisterByKeyId(data.sumerserveid).then(
                  ({ data: refs }) => {
                    let cus = refs[0];
                    cus.allstatuscode = "4";
                    this.networkUpRegisterInfo(cus).then(upCus => {
                      if (upCus.code === 200) {
                        //新增处理记录
                        data.allstatuscode = "1";
                        this.networkAddExamineResult(data).then(item => {
                          this.ddflow(2, 3, {
                            baseId: item.keyid,
                            baseUrl: "crm/auditresult",
                            baseColumn: "allstatuscode",
                            flowId: flowId,
                            fType: "回访处理"
                          });
                        });
                        //备案客户回访处理流程
                        this.ddflow(5, 6, {
                          baseId: cus.keyid,
                          baseUrl: "crm/consumerserves",
                          baseColumn: "allstatuscode",
                          flowId: flowId,
                          fType: "回访处理"
                        });
                      }
                    });
                  }
                );
              });
          }).catch(() => {this.$message({type: "info",message: "已取消发起流程！"});});
     
    }
  }
};
</script>
<style lang="less" scoped>
.search_container {
  margin-bottom:10px;
}

.searchArea {
  background: #e1dfdf;
  border-radius: 2px;
}

.el-tag {
  cursor: pointer;
}
</style>
