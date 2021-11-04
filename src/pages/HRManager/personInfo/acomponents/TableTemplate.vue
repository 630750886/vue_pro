<template>
  <div>
    <div class="table">
      <el-table
        :data="data"
        style="width: 100%"
        align="left"
        :height="height"
        highlight-current-row
        :header-cell-style="{ fontSize: '14px' }"
        border
      >
        <el-table-column label="账号" align="left" width="40px" fixed="left">
          <template slot-scope="scope">
            <i
              :class="
                scope.row.isuserflage ? 'el-icon-user-solid' : 'el-icon-user'
              "
              :style="{
                color: scope.row.isuserflage ? '#409EFF' : '',
                cursor: 'pointer'
              }"
              @click="establishUser(scope.row)"
            ></i>
          </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          align="left"
          width="80px"
          fixed="left"
        >
       <template slot-scope="scope">
          <public-button
              classhd="hd" :plain="true" type="text"
              name="FREE"
              :title="scope.row.personName"
              @click="tableBtnClick(4, scope.row)"
             ></public-button>
        </template>
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          align="left"
          width="40px"
        ></el-table-column>
        <el-table-column
          prop="idCard"
          label="身份证号"
          align="left"
          width="150px"
        ></el-table-column>
        <el-table-column
          prop="birthday"
          label="出生年月"
          align="left"
          width="95px"
        ></el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          align="left"
          width="40px"
        ></el-table-column>
        <el-table-column
          prop="entryTime"
          label="入职时间"
          align="left"
          width="95px"
        ></el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          width="100px"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="personType"
          label="人员分类"
          align="left"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="orgName"
          label="所属组织"
          align="left"
          width="170px"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="posName"
          label="岗位名称"
          align="left"
          width="200px"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="highesteducation"
          label="最高学历"
          align="left"
          width="90px"
        ></el-table-column>
        <el-table-column
          prop="education"
          label="学历情况"
          align="left"
          width="80px"
        >
        <template slot-scope="scope">
            <com-popover
              :data="scope.row.education"
              :label-prop="labelProp.educations"
            ></com-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="honors"
          label="荣誉情况"
          align="left"
          min-width="80px"
        >
          <template slot-scope="scope">
            <com-popover
              :data="scope.row.honors"
              :label-prop="labelProp.honors"
            ></com-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="titles"
          label="职称情况"
          align="left"
          width="80px"
        >
          <template slot-scope="scope">
            <com-popover
              :data="scope.row.titles"
              :label-prop="labelProp.titles"
            ></com-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="practices"
          label="执业情况"
          align="left"
          width="80px"
        >
          <template slot-scope="scope">
            <com-popover
              :data="scope.row.practices"
              :label-prop="labelProp.practices"
            ></com-popover>
          </template>
        </el-table-column>
         <el-table-column
          prop="insuranceInfos"
          label="其它保险"
          align="left"
          width="80px"
        >
          <template slot-scope="scope">
            <com-popover
              :data="scope.row.insuranceInfos"
              :label-prop="labelProp.insuranceInfo"
            ></com-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="isLaborContractEffective"
          label="劳动合同"
          align="left"
          width="160px"
        >
          <template slot-scope="scope">
            {{ scope.row.laborContractExpiryDate}}
          </template>
        </el-table-column>
        <el-table-column
          prop="isLabourServiceContractEffective"
          label="劳务合同"
          align="left"
          width="160px"
        >
          <template slot-scope="scope">
            {{
              scope.row.labourServiceContractDate
            }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="left"
          header-align="center"
          min-width="130px"
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
      <!--分页 retirementFile--> 
      <pagination
        :pageTotal="total"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      >
      </pagination>
    </div>
    <div class="dialog">
      <!--离职类型-->
      <quit-type-dialog
        ref="quitTypeRef"
        @getFormData="submitQuitForm"
      ></quit-type-dialog>
      <!--工作提醒-->
      <work-remind-dialog ref="workRef"></work-remind-dialog>
       <!--修改人员岗位-->
      <changPosinfoDialog
      ref="changpos"
      title=""
      @getFormData="changposinfo"
      >
      </changPosinfoDialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TableButton from "./button/TableButton.vue";
import pagination from "../../../../components/pagination/index.vue";
import QuitTypeDialog from "./dialog/QuitTypeDialog.vue";
import changPosinfoDialog from "./dialog/changePosinfoDialog.vue";
import WorkRemindDialog from "./dialog/WorkRemindDialog.vue";
import { createNamespacedHelpers } from "vuex";
import { GetHttp } from "../../../../utils/http";

const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} = createNamespacedHelpers("hrStore");

export default {
  components: {
    TableButton,
    pagination,
    QuitTypeDialog,
    WorkRemindDialog,
    changPosinfoDialog
  },
  props: {
    dataList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    tableHeight: { type: String },
    total: { type: Number }
  },
  watch: {
    dataList(newValue) {
      this.data = newValue;
    },
    total(newValue) {
      this.total = newValue;
    }
  },
  //数据节点
  data() {
    return {
      data: this.dataList,
      height: "7rem", //window.innerHeight - 250,
      pageShow: {
        page: 1,
        limit: 30
      },
      labelProp: {
        educations: [
          { label: "学历名称", prop: "name" },
          { label: "毕业院校", prop: "school" },
          { label: "毕业时间", prop: "graduateTime" },
          { label: "所学专业", prop: "major" }
        ],
        honors: [
          { label: "荣誉名称", prop: "honorName" },
          { label: "获取时间", prop: "obtainTime" }
        ],
        titles: [
          { label: "职称类别", prop: "titleType" },
          { label: "职称级别", prop: "titleLevel" },
          { label: "职称专业", prop: "titleMajor" },
          { label: "获取时间", prop: "obtainTime" }
        ],
        practices: [
          { label: "执业类型", prop: "practiceType" },
          { label: "专业一", prop: "majorA" },
          { label: "专业二", prop: "majorB" },
          { label: "有效期开始时间", prop: "startTime" },
          { label: "有效期结束时间", prop: "endTime" }
        ],
        insuranceInfo:[
          { label: "保险名称",prop: "insuranceName" },
          { label: "保险公司",prop: "company" },
          { label: "被保险人",prop: "insuredName" },
          { label: "受益人",prop: "beneficiary" },
          { label: "购买时间",prop: "buyTime" }
        ]
      },
      eType: []
    };
  },
  //生命周期函数节点
  created() {
    this.getSelectByCode("002").then(item => {
      this.eType = item.data;
    });
  },
  //自定义函数节点
  methods: {
    ...mapActions({
      networkUpdateStatus: "networkUpdateStatus",
      networkUpdateBasicInfo: "networkUpdateBasicInfo",
      networkChangePerson:"networkChangePerson"
    }),
    ...mapMutations({
      updatePersonId: "updatePersonId",
      updateAdvancedQuery:"updateAdvancedQuery"
    }),
    establishUser(data) {
      if (!data.isuserflage) {
        this.$msgbox
          .confirm("是否将该人员添加为系统账户？", "创建系统账户", {})
          .then(() => {
            let copeData = this.$myfunction.copyData(data);
            copeData.isuserflage = true;
            let ref = {
              accountcode: data.phone,
              accountpassword: "12345678",
              persionKeyId: data.keyid,
              persionName: data.personName,
              duserphone: data.phone
            };
            this.javaHttp("/sys/sysuser/adds", ref).then(item => {
              if (!this.$myfunction.isEmpty(item.data)) {
                this.networkUpdateBasicInfo(copeData);
                this.$emit("getPageInfo", this.pageShow);
                let ref = {
                  userkeyid: item.data.keyid,
                  jobkeyid: data.posId
                };
                //添加岗位
                this.javaHttp("/sys/userjob/adds", ref);
              }
            });
          });
      }
      else{
        this.$msgbox
          .confirm("是否确认要删除系统账户？", "这将删除与帐户相关的功能信息(职务与角色)！", 
          {confirmButtonText: "确定",
           cancelButtonText: "取消",
           type: "warning"})
          .then(() => {
            let copeData = this.$myfunction.copyData(data);
            copeData.isuserflage = false;
            let ref = {
              accountcode: data.phone,
              accountpassword: "12345678",
              persionKeyId: data.keyid,
              persionName: data.personName,
              duserphone: data.phone
            };
            this.javaHttp("/sys/sysuser/deletes", ref).then(item => {
              if (!this.$myfunction.isEmpty(item.data)) {
                this.networkUpdateBasicInfo(copeData);
                this.$emit("getPageInfo", this.pageShow);
              }
            });
          });
      }
    },
    getMaxEducations(array) {
      if (Array.isArray(array) && array.length > 0) {
        let indexs = [];

        array.forEach(item => {
          let index = this.eType.findIndex(ref => {
            return (item.nameid = ref.keyid);
          });
          indexs.push(index);
        });

        for (let i = 0; i < indexs.length; i++) {
          for (let j = 0; j < indexs.length - 1 - i; j++) {
            let temp = indexs[j];
            if (indexs[j] > indexs[j + 1]) {
              indexs[j] = indexs[j + 1];
              indexs[j + 1] = temp;
            }
          }
        }
        let name = "";
        if (indexs.length > 0) {
          name = this.eType[indexs[indexs.length - 1]].listname;
        }

        return name;
      }
    },
    handleCurrentChange(val) {
      this.pageShow.page = val;
      this.$emit("getPageInfo", this.pageShow);
    },
    handleSizeChange(val) {
      this.pageShow.limit = val;
      this.$emit("getPageInfo", this.pageShow);
    },
    tableBtnClick(val, data) {
      switch (val) {
        case 1:
          this.$msgbox
            .confirm("是否复职该人员?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
            .then(() => {
              data.statusid = "0";
              this.$emit("getstatus", "1");
              this.updateAdvancedQuery({statusid:'0'});
              data.statusname = "在职中";
              this.networkUpdateStatus(data);
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消"
              });
            });
          break;
        case 2:
          this.$msgbox
            .confirm("是否离职该人员?", "提示", {
              showCancelButton: true,
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
            .then(() => {
              data.statusid = "2";
              data.statusname = "已离职";
              this.$emit("getstatus", "3");
              this.updateAdvancedQuery({statusid:'2'});
              this.networkUpdateStatus(data);
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消"
              });
            });
          break;
        case 3:
          this.$refs.quitTypeRef.openDialog(data);
          break;
        case 4:
          this.updatePersonId(data.keyid);
          this.$router.push({ path: "/HR/base_personInfo" });
          break;
        case 5:
          this.$refs.workRef.openDialog(data.keyid);
          break;
        case 6:
          this.openAddSocialDialog(data);
          break;
        case 7:
          this.$refs.changpos.openDialog(data);
          break;
      }
    },
    submitQuitForm(formData) {
      const name = formData.personName;
      const reason = formData.separationcausesname;
      this.$msgbox
        .confirm(
          '请确认  <span style="color: #409EFF">' +
            name +
            '</span>  是否离职,离职原因：<span style="color: #FF5366">' +
            reason +
            "</span>。确认后将不可更改",
          "提示",
          {
            dangerouslyUseHTMLString: true,
            showCancelButton: true,
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
        .then(() => {
          formData.statusid = "2";
          formData.statusname = "离职-" + formData.separationcausesname;
          this.networkUpdateStatus(formData);
          this.javaHttp("/sys/sysuser/findwhere", {
            duserphone: formData.phone,
            persionKeyId: formData.keyid
          }).then(sysUser => {
            if (sysUser.data[0]) {
              this.javaHttp("/sys/sysuser/deletes", sysUser.data[0]);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    changposinfo(formData){
      //console.log(formData);
      this.networkChangePerson(formData);
    }
  }
};
</script>
<style lang="less" scoped>
.el-tag {
  cursor: pointer;
}
</style>
