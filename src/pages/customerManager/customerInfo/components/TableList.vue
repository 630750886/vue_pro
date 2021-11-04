<template>
  <div class="logContainer">
    <div class="button">
      <head-button @click="headBtnClick"  :json_data="outexceldata" :json_fields="jsonfields"></head-button>
    </div>
    <div class="box-card">
      <el-table
        :data="hdcustomerInfo.dataList"
        border
        style="width: 100%"
        :row-style="{ height: '30px' }"
        height="405px"
        :header-cell-style="{ fontSize: '14px' }"
        highlight-current-row
      >
        <!--15换行-->
        <el-table-column
          prop="customerName"
          label="客户名称"
          align="left"
          width="280"
          fixed="left"
          show-overflow-tooltip
          header-align="center"
        ></el-table-column>
        <el-table-column
          prop="createddateTime"
          label="创建时间"
          align="left"
          width="160"
          header-align="center"
        ><template slot-scope="scope">{{scope.row.createddateTime|datefmt('YYYY/MM/DD')}}</template></el-table-column>
        <el-table-column
          prop="syscreatepersonname"
          label="创建人"
          align="left"
          width="150"
          header-align="center"
        ></el-table-column>
        <el-table-column
          prop="region"
          label="所属省/市/区"
          align="left"
          width="260"
          show-overflow-tooltip
          header-align="center"
        ></el-table-column>
        <el-table-column
          prop="unitNature"
          label="单位性质"
          align="left"
          width="150"
          header-align="center"
        ></el-table-column>
        
        <el-table-column
          prop="earlyStageContacts"
          label="前期联系人"
          align="left"
          width="200"
          header-align="left"
        >
          <template slot-scope="scope">
            <el-popover trigger="click" placement="right-start">
              <el-table
                :data="scope.row.earlyStageContacts"
                style="width: 100%"
                align="left"
                height="230px"
                highlight-current-row
                :header-cell-style="{ fontSize: '12px' }"
                border
              >
                <el-table-column
                  prop="name"
                  label="联系人"
                  align="left"
                  width="70"
                  header-align="center"
                ></el-table-column>
                <el-table-column
                  prop="phone"
                  label="电话"
                  align="left"
                  width="100"
                  header-align="center"
                ></el-table-column>
                <el-table-column
                  prop="department"
                  label="部门"
                  align="left"
                  width="160"
                  header-align="center"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="post"
                  label="职务"
                  align="left"
                  width="120"
                  header-align="center"
                ></el-table-column>
              </el-table>
              <div slot="reference">
                <el-tag size="medium" ><span style="color:#000">详细</span></el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right">
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
        :pageTotal="hdcustomerInfo.total"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      >
      </pagination>
    </div>
    <!--添加客户-->
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
      width="30%"
      @getFormData="submitQueryForm"
    ></query-dialog>
    <!--客户信息查询-->
    <show-website-dialog
      ref="webRef"
      title=""
    ></show-website-dialog>
    <add-website-dialog
      ref="addWebRef"
      title=""
    ></add-website-dialog>
    <!--工作提醒-->
    <work-remind-dialog
      ref="workRef"
      title=""
      @getFormData="submitWorkForm"
    ></work-remind-dialog>
    <echartcustomer
      ref="echartcustomer"
      title=""
      >
    </echartcustomer>
    <outputexcel
     ref="outexcel"
     :json_data="hdcustomerInfo.dataList"
     :json_fields="jsonfields"
     width="30%"
     ></outputexcel>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import pagination from "../../../../components/pagination/index.vue";
import HeadButton from "./button/HeadButton.vue";
import TableButton from "./button/TableButton.vue";
import addDialog from "./dialog/AddDialog.vue";
import QueryDialog from "./dialog/QueryDialog.vue";
import AddWebsiteDialog from "./dialog/AddWebsiteDialog.vue";
import ShowWebsiteDialog from "./dialog/ShowWebsiteDialog.vue";
import echartcustomer from "./dialog/echart_customer.vue";
import outputexcel from "./dialog/output_excel.vue";
import WorkRemindDialog from "./dialog/WorkRemindDialog.vue";
import { createNamespacedHelpers } from "vuex";

import {
  getAllCustomer,
  AllOutCustomer,
  AlljsonCustomer
} from "@/api/webapi-customer.js";

const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} = createNamespacedHelpers("customerInfo");
export default {
  inject: ["reload"],
  components: {
    pagination,
    HeadButton,
    TableButton,
    addDialog,
    QueryDialog,
    AddWebsiteDialog,
    ShowWebsiteDialog,
    WorkRemindDialog,
    echartcustomer,
    outputexcel
  },
  props: {},
  watch: {},
  computed: {
    ...mapState({
      advancedQuery: "advancedQuery"
    })
  },
  //数据节点
  data() {
    return {
      outexceldata:[],
      outexcelflag:0,
      hdcustomerInfo: {
      dataList: [],
      total: 0
      },
      pageShow: {
        pageInfo: {
          page: 1,
          limit: 30
        },
        advancedQuery: {}
      },
      remindCustomer: "",
      jsonfields:{
        客户名称:"customerName",
        创建时间:"createddateTime",
        创建人:"syscreatepersonname",
        "所属省/市/区":"region",
        单位性质:"unitNature",
        "前期联系人[联系人 电话 部门 职务]":{
          field: "earlyStageContacts",
          callback: value => {
            let dataresult="";
            value.forEach(element => {
              dataresult=dataresult+"["+element.name+" "+element.phone+" "+element.department+" "+element.post+"]";
            });
            return dataresult;
          }
        }
      }
    };
  },
  //生命周期函数节点
  created() {
    this.networkGetCustomer(this.pageShow);
  },
  //自定义函数节点
  methods: {
    getjsondata(){
      //getjsondata  AlljsonCustomer
      console.log("生成下载数据！！");
      if (this.outexcelflag==0)
      {
          AllOutCustomer({})
                  .then(item => {
                    this.outexceldata=item.data;
                  })
                  .catch(() => {
                    console.log("customerInfo：获取客户台账信息异常");
             });
      }
      else{
         AlljsonCustomer(this.pageShow)
                  .then(item => {
                    this.outexceldata=item.data;
                  })
                  .catch(() => {
                    console.log("customerInfo：获取客户台账信息异常");
             });
      }
      },
    ...mapMutations({
      updateCustomerId: "updateCustomerId",
      updateAdvancedQuery: "updateAdvancedQuery"
    }),
    ...mapActions({
      networkAddCustomer: "networkAddCustomer"
    }),
    networkGetCustomer(formData){
      this.getjsondata();
      getAllCustomer(formData)
        .then(item => {
          this.hdcustomerInfo.dataList= item.data.content;
          this.hdcustomerInfo.total=item.data.totalElements;
        })
        .catch(() => {
          console.log("customerInfo：获取客户台账信息异常");
        });
    },
    handleCurrentChange(val) {
      this.pageShow.pageInfo.page = val;
      this.pageShow.advancedQuery = this.advancedQuery;
      this.networkGetCustomer(this.pageShow);
    },
    handleSizeChange(val) {
      this.pageShow.pageInfo.limit = val;
      this.pageShow.advancedQuery = this.advancedQuery;
      this.networkGetCustomer(this.pageShow);
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
          //统计显示数据信息
          this.$refs.echartcustomer.openDialog();
          break;
        case 4:
          //导出电子表格 并显示控件提醒
          //this.$refs.outexcel.openDialog();
          break;
        case 5:
          this.reload();
          break;
      }
    },
    tableBtnClick(btn, data) {
      switch (btn) {
        case 1:
          this.updateCustomerId(data.keyid);
          this.$router.push({ path: "basicManager" });
          break;
        case 2:
          this.$refs.workRef.openDialog();
          this.remindCustomer = data;
          break;
        case 3:
          break;
      }
    },
    submitAddForm(data) {
      this.networkAddCustomer(data);
      this.networkGetCustomer(this.pageShow);
    },
    submitQueryForm(data) {
      this.updateAdvancedQuery(data);
      this.pageShow.advancedQuery = data;
      this.outexcelflag=1;
      this.networkGetCustomer(this.pageShow);
    },
    submitWorkForm(data) {
      this.sendOutRemind({
        userList: [this.remindCustomer.syscreatepersonid],
        message: data.workRequirement
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../../style/ScrollBarExposure";
.button {
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
}

.el-tag {
  cursor: pointer;
}

.el-tooltip__popper {
width: 80%;/*修改宽度*/
background: #000 !important;/*背景色  !important优先级*/
opacity: 0.5 !important;/*背景色透明度*/
color: #FFFFFF !important;/*字体颜色*/
}
</style>
