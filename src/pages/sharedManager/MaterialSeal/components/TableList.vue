<template>
  <div class="body">
    <div class="button">
      <head-button @click="headBtnClick"></head-button>
    </div>
    <div class="table">
      <el-table
        :row-style="{ height: '75px' }"
        :data="myData"
        stripe
        style="width: 100%"
        align="left"
        height="7.5rem"
        highlight-current-row
        :header-cell-style="{ fontSize: '14px' }"
        ref="refTable"
        :default-sort = "{prop: 'createddate_time', order: 'descending'}"
        border
      >
        <el-table-column
          prop="createddate_time"
          label="申请时间"
          align="left"
        ></el-table-column>
        <el-table-column prop="org_name" label="申请组织" align="left">
        </el-table-column>
        <el-table-column prop="person_name" label="申请人" align="left">
        </el-table-column>
        <el-table-column prop="document_name" label="资料名称" align="left">
        </el-table-column>
        <el-table-column
          prop="content_desc"
          label="申请说明"
          align="left"
          width="120px"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <!-- <i class="el-icon-time"></i> -->
            <span>{{ scope.row.content_desc }}</span>
          </template>
        </el-table-column>
        <el-table-column label="附件" align="left">
          <template slot-scope="scope">
            <download-button
              :value="scope.row.document_file_path"
            ></download-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="passTime"
          label="审核完成时间"
          align="left"
          :formatter="showTime"
        >
        </el-table-column>

        <el-table-column label="盖章申请明细" align="left">
          <template slot-scope="scope">
            <el-popover placement="bottom" width="600" trigger="click">
              <el-table :data="scope.row.childrens" border>
                <el-table-column
                  label="申请时间"
                  prop="createTime"
                ></el-table-column>
                <el-table-column
                  label="申请人"
                  prop="createBy_name"
                ></el-table-column>
                <el-table-column label="份数" prop="stampNum"></el-table-column>
                <el-table-column
                  label="状态"
                  :formatter="showStatus"
                ></el-table-column>
              </el-table>
              <el-button slot="reference" type="text">详细</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          min-width="200px"
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
        :pageTotal="total"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      >
      </pagination>
    </div>

    <div class="dialog">
      <!--盖章申请-->
      <seal-apply-dialog
        ref="sealRef"
        title="盖章申请"
        width="30%"
        @getFormData="sealApplyFormData"
      ></seal-apply-dialog>
      <!--高级查询-->
      <query-dialog
        ref="queryRef"
        :load-data="loadData"
        title="高级查询"
        width="25%"
        @getFormData="queryFormData"
      ></query-dialog>
      <!--办理盖章-->
      <submit-seal-dialog
        ref="submitSealRef"
        title="办理盖章"
        width="30%"
        @getFormData="sumitSeal"
      ></submit-seal-dialog>
      <!--附件查看-->
      <pre-view-dialog
        ref="previewRef"
        :title="previewData.title"
        :data="previewData.data"
      ></pre-view-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import pagination from "../../../../components/pagination/index.vue";
import TableButton from "./button/TableButton.vue";
import SealApplyDialog from "./dialog/SealApplyDialog.vue";
import HeadButton from "./button/HeadButton.vue";
import QueryDialog from "./dialog/QueryDialog.vue";
import SubmitSealDialog from "./dialog/SubmitSealDialog.vue";
import preViewDialog from "../../../../components/flowControl/preView.vue";

import { preView } from "../../../../api/webapi-flow.js";
import { startFlow } from "../../../../api/webapi-flow.js";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  inject: ["reload"],
  components: {
    pagination,
    TableButton,
    SealApplyDialog,
    HeadButton,
    QueryDialog,
    SubmitSealDialog,
    preViewDialog
  },
  props: {
    myData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    pageTotal: {
      type: Number,
      default: 20
    },
    loadData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    myData() {
      this.dataList = this.myData;
    },
    pageTotal() {
      this.total = this.pageTotal;
    }
  },
  //数据节点
  data() {
    return {
      //展示数据
      dataList: this.myData,
      //总条数
      total: this.pageTotal,
      pageShow: {
        page: 1,
        limit: 30,
        filter: {}
      },
      previewData: {
        title: "",
        insId: "",
        data: []
      },
      currentRow: ""
    };
  },
  computed: {
    ...mapState({
      currentUser: "currentUser"
    })
  },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 500) {
        return value.slice(0, 500) + "...";
      }
      return value;
    }
  },
  //生命周期函数节点
  created() {},
  mounted() {},
  //自定义函数节点
  methods: {
    ...mapMutations({
      updateAttachStr: "flowManager/updateAttachment"
    }),
    handleCurrentChange(val) {
      this.pageShow.page = val;
    },
    handleSizeChange(val) {
      this.pageShow.limit = val;
    },
    //头部按钮
    headBtnClick(btn) {
      switch (btn) {
        case 1:
          this.$refs.sealRef.openDialog();
          let obj = Object.assign({});
          this.updateAttachStr(obj);
          break;
        case 2:
          this.$refs.queryRef.openDialog();
          break;
        case 9:
          this.reload();
          break;
      }
    },
    //表格按钮
    tableBtnClick(btn, data) {
      this.currentRow = data;
      switch (btn) {
        case 1:
          // this.previewData.insId = data.instanceId;
          // this.previewData.data.title = data.documentName;
          // preView(data.instanceId).then(res => {
          //   //console.log(res);
          //   this.previewData.data = res;
          //   this.$refs.previewRef.openDialog();
          // });
          //console.log(data);
          break;
        case 2:
          this.$refs.submitSealRef.openDialog();
          break;
      }
    },

    sealApplyFormData(data) {
      this.$emit("function", "sealApplyForm", data);
      this.$refs.sealRef.dialogClose();
    },
    queryFormData(data) {
      const where = this.$myfunction.sqlSplicing(data);
      this.$emit("function", "queryForm", where);
      this.$refs.queryRef.dialogClose();
    },
    sumitSeal(data) {
      let dateNow = new Date();
      let pa = Object.assign(data, {
        pkeyid: this.currentRow.keyid,
        fj: this.currentRow.document_file_path
      });
      this.$emit("function", "sumitSeal", pa);
    },
    showStatus(row) {
      let result = "审核中";
      switch (row.flowstatus) {
        case "agree":
          result = "审核通过";
          break;
        case "refuse":
          result = "审核未通过";
          break;
      }
      return result;
    },
    showTime(row) {
      let day = "无";
      if (row.passTime != "无")
        day = new Date(row.passTime).Format("yyyy-MM-dd");
      return day;
    }
  }
};
</script>
<style lang="less" scoped>
.body {
  .button {
    height: 50px;
    line-height: 50px;
    margin: 0 10px;
  }
}
</style>
