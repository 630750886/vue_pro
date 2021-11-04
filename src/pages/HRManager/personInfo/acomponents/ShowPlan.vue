<template>
  <div class="logContainer">
    <div class="button">
      <head-button @click="headBtnClick" :json_data="json_data" :json_fields="json_fields"></head-button>
    </div>
    <div class="box-card">
      <el-tabs v-model="activeName" @tab-click="tabclick">
        <el-tab-pane name="1">
          <span slot="label">在职人员</span>
        </el-tab-pane>
        <el-tab-pane name="3">
          <span slot="label">离职人员</span>
        </el-tab-pane>
      </el-tabs>
       <div class="table">
            <table-template
              :data-list="allPerson.dataList"
              :total="allPerson.total"
              :table-height="tableHeight"
              @getPageInfo="getPageInfo"
              @getstatus="getstatus"
            ></table-template>
       </div>
    </div>

    <div class="dialog">
      <!--添加人员信息-->
      <add-person-info-dialog
        title=""
        ref="addDialogRef"
        @getFormData="getAddFormData"
      ></add-person-info-dialog>
      <!--高级查询-->
      <query-person-info-dialog
        title=""
        width="70%"
        ref="queryDialogRef"
        @getFormData="getQueryFormData"
      ></query-person-info-dialog>

      <!--社保公积金导入-->
      <social-fund-dialog
        title="社保公积金导入"
        ref="socialDialogRef"
        @getFormData="getSocialFormData"
      ></social-fund-dialog>

      <!--社保公积金扫描件导入-->
      <social-fund-dialog
        title="社保公积金扫描件导入"
        ref="socialFileDialogRef"
        @getFormData="getScanFileFormData"
      ></social-fund-dialog>
      <!--工资信息导入-->
      <salary-info-dialog
        title="工资信息导入"
        ref="salaryDialogRef"
        @getFormData="getSalaryFormData"
      ></salary-info-dialog>
      <echartperson ref="echartpersonRef"></echartperson>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TableTemplate from "./TableTemplate.vue";
import HeadButton from "./button/HeadButton.vue";
import AddPersonInfoDialog from "./dialog/AddPersonInfoDialog.vue";
import QueryPersonInfoDialog from "./dialog/QueryPersonInfoDialog.vue";
import SocialFundDialog from "./dialog/SocialFundDialog.vue";
import SalaryInfoDialog from "./dialog/SalaryInfoDialog.vue";
import StationDialog from "./dialog/StationDialog.vue";
import echartperson from "./dialog/echartperson.vue";
import {getAllPersondoc} from '../../../../api/webapi-hr.js'
import { createNamespacedHelpers } from "vuex";

const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} = createNamespacedHelpers("hrStore");
export default {
  inject: ["reload"],
  components: {
    HeadButton,
    AddPersonInfoDialog,
    QueryPersonInfoDialog,
    SocialFundDialog,
    SalaryInfoDialog,
    StationDialog,
    TableTemplate,
    echartperson
  },
  computed: {
    ...mapState({
      allPerson: "allPerson",
      pageShow: "pageShow"
    })
  },
  watch: {
  },
  //数据节点
  data() {
    return {
      activeName: "1",
      //数据表格高度
      tableHeight: "7.5rem",
      //条数
      total: this.pageTotal,
      personId: "",
      json_fields:{
            姓名:"personName",
            性别:"gender",
            身份证号码:{field: "idCard",
               callback: value =>{return "'"+value;}
            },
            出生年月:"birthday",
            年龄:"age",
            入职时间:"entryTime",
            手机号:"phone",
            人员分类:"personType",
            所属组织:"orgName",
            岗位名称:"posName",
            最高学历:"highesteducation",
            学历情况:{
              field: "education",
              callback: value => {
                let dataresult="";
                value.forEach(element => {
                  dataresult= dataresult + "学历名称：" + element.name + "[" +
                    "毕业学校："+element.school + "/" +
                    "毕业时间："+element.graduateTime + "/" +
                     "所属专业："+element.major + "]"
                })
                return dataresult
              }
            },
            荣誉情况:{
              field: "honors",
              callback: value => {
                let dataresult="";
                value.forEach(element=>{
                  dataresult= dataresult + "[荣誉名称:" + element.honorName+
                    "获取时间: "+element.obtainTime +"]"
                });
                return dataresult
              }
            },
            职称情况:{
              field: "titles",
              callback: value => {
                let dataresult="";
                value.forEach(element =>{
                  dataresult = dataresult + "[" + "职称类别：" + element.titleType + "/" +"职称级别:" + element.titleLevel + "/" +
                    "职称专业:" + element.titleMajor + "获取时间"+element.obtainTime+"]"
                })
                return dataresult
              }
            },
            执业情况:{
              field: "practices",
              callback: value => {
                let praresult="";
                value.forEach(practic =>{
                  praresult = praresult +"[执业类型"+practic.practiceType+"/专业一"+practic.majorA+"/专业二"+practic.majorB+"/有效期开始时间"+practic.startTime+"/有效期结束时间"+practic.endTime+"]"
                });
                return praresult
              }
            },
            其它保险:{
              field: "insuranceInfos",
              callback: value => {
                let insresult="";
                value.forEach(ins =>{
                  insresult = insresult+"[保险名称:"+ins.insuranceName+"保险公司"+ins.company+"被保险人"+ins.insuredName+"受益人"+ins.beneficiary+"购买时间"+ins.buyTime+"]"
                })
                return insresult
              }
            },
            劳动合同:"laborContractExpiryDate",
            劳务合同:"labourServiceContractDate"
      },
      json_data:[]
    };
  },
  mounted() {},
  //生命周期函数节点
  created() {
    this.networkGetAllPerson();
    this.getexceldata();
  },
  //自定义函数节点
  methods: {
    getstatus(active_value){
      this.activeName=active_value;
       switch (active_value) {
        case "1":
          this.pageShow.advancedQuery.statusid = "0";
          break;
        case "3":
           this.pageShow.advancedQuery.statusid = "2";
          break;
      }
      this.networkGetAllPerson(this.pageShow);
      this.getexceldata();
    },
    tabclick()
    {
      switch (this.activeName) {
        case "1":
          this.pageShow.advancedQuery.statusid = "0";
          break;
        case "3":
           this.pageShow.advancedQuery.statusid = "2";
          break;
      }
      this.networkGetAllPerson(this.pageShow);
      this.getexceldata();
    },

    getexceldata()
    {
      getAllPersondoc(this.pageShow).then(item => {
      this.json_data=item.data;
      //console.log(this.json_data);
      //console.log('取得导出数据');
      }).catch(() => {
        //console.log('HRManager:获得人员出错')
      });
    },
    ...mapMutations({
      updatePageShow: "updatePageShow",
      updateAdvancedQuery: "updateAdvancedQuery"
    }),
    ...mapActions({
      networkGetAllPerson: "networkGetAllPerson",
      networkAddPerson: "networkAddPerson"
    }),
    getPageInfo(pageInfo) {
      let pageShow = this.$myfunction.copyData(this.pageShow);
      pageShow.pageInfo = pageInfo;
      this.networkGetAllPerson(pageShow);
    },
    headBtnClick(btnId) {
      switch (btnId) {
        case 1:
          this.$refs.addDialogRef.openDialog();
          break;
        case 2:
          this.$refs.queryDialogRef.openDialog();
          break;
        case 3:
          //this.$router.push({ path: "/HR/dataInfo_manager" });
          this.$refs.echartpersonRef.openDialog();
          break;
        case 4:
          break;
        case 5:
          this.$refs.socialDialogRef.openDialog();

          break;
        case 6:
          this.$refs.socialFileDialogRef.openDialog();

          break;
        case 7:
          this.$refs.salaryDialogRef.openDialog();
          break;
        case 9:
          this.reload();
          break;
      }
    },
    getAddFormData(data) {
      this.activeName = "1";
      this.networkAddPerson(data);
    },
    getQueryFormData(data) {
      switch (this.activeName) {
        case "1":
          data.statusid = "0";
          break;
        case "2":
          data.statusid = "1";
          break;
        case "3":
          data.statusid = "2";
          break;
      }
      this.updateAdvancedQuery(data);
      this.networkGetAllPerson();
    },
    getSocialFormData(data) {
      this.$emit("submitFormData", "socialForm", data);
    },
    //
    getScanFileFormData(data) {
      this.$emit("submitFormData", "scanFileForm", data);
    },
    getSalaryFormData(data) {
      //this.$emit('submitFormData', 'salaryForm', data)
    },
    openAddSocialDialog(data) {
      this.$refs.stationDialogRef.openDialog();
      this.personId = data.id;
    }
  }
};
</script>
<style lang="less" scoped>
.button {
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
}
</style>
