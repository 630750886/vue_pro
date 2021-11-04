<template>
  <section class="data_section" ref="data_section">
    <el-row :gutter="20">
      <el-col>
        <table-list
          :load-data="loadData"
          :page-total="total"
          :my-data="dataList"
          @function="submitForm"
        ></table-list>
      </el-col>
    </el-row>
  </section>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TableList from "./components/TableList.vue";
import { getAll, add, addSummit } from "../../../api/webapi-share.js";
import { startFlow } from "../../../api/webapi-flow.js";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    TableList
  },
  computed: {
    ...mapState({
      currentUser: "currentUser"
    })
  },
  props: {},
  watch: {},
  //数据节点
  data() {
    return {
      dataList: [],
      total: 20,
      loadData: {
        titleLevelList: "",
        personTypeList: "",
        educationList: "",
        majorList: "",
        titleTypeList: "",
        titleMajorList: "",
        practiceList: "",
        practiceTypeList: "",
        practiceMajorList: "",
        organizeList: "",
        posList: ""
      }
    };
  },
  //生命周期函数节点
  created() {},
  mounted() {
    let pa = {
      page: 1,
      limit: 30,
      filter: {}
    };

    this.getTableList();
    //let urls = location.href;
    //this.getsign(urls);
    // let urls = location.href;
    // this.getsign(urls);
    //this.loadTypes();
  },
  //自定义函数节点
  methods: {
    ...mapActions({
      //getsign: "flowManager/newworkGetSign",
      loadTypes: "loadType/networkGetCascaderLoadData"
      //startFlow: "flowManager/startFlow",
      //getStamp: "shareManager/getAllData"
    }),
    async getTableList() {
      let pa = {
        page: 1,
        limit: 30,
        where: "",
        phone: this.currentUser.userId
      };
      pa = { jsondata: JSON.stringify(pa) };
      getAll(pa).then(res => {
        // console.log(res);
        this.dataList = res;
      });
      //console.log(res);
    },
    async submitForm(formName, data) {
      switch (formName) {
        case "sealApplyForm": //盖章申请
          var days = new Date();
          let dp = Object.assign(data, {
            org_name: this.currentUser.orgName,
            org_key_id: this.currentUser.orgId,
            person_key_id: this.currentUser.dinCode,
            person_name: this.currentUser.userName,
            auditing_static: "审核中",
            createddate_time: days.Format("yyyy-MM-dd")
          });

          let jsondata = [
            { name: "申请时间", controlType: "input_sign", value: "" },
            { name: "申请组织", controlType: "input_sign", value: "" },
            { name: "申请人", controlType: "input_sign", value: "" },
            { name: "资料名称", controlType: "input_sign", value: "" },
            { name: "盖章申请说明", controlType: "input_muit", value: "" },
            { name: "审核附件", controlType: "input_attachment", value: [] }
          ];
          jsondata[0].value = dp.createddate_time;
          jsondata[1].value = dp.org_name;
          jsondata[2].value = dp.person_name;
          jsondata[3].value = dp.document_name;
          jsondata[4].value = dp.content_desc;
          jsondata[5].value = await this.getfile(dp.document_file_path);

          let attachmentValue = JSON.stringify(jsondata); //这里一定要转换成字符串
          let pa = {
            startPerson: this.currentUser.dinCode,
            versionID: "v_2020_gxgl_gzsq",
            jsonData: attachmentValue
          };

          startFlow(pa).then(res => {
            if (res.success) {
              let others = Object.assign(dp, {
                instance_id: res.msg
              });
              let pa = { jsondata: JSON.stringify(others) };
              add(pa).then(res => {
                this.getTableList();
              });
            }
          });
          break;
        case "queryForm": //高级查询
          console.log(this.bid.List);
          // console.log(data);
          break;
        case "sumitSeal": //办理盖章
          let dateNow = new Date();
          let pa1 = Object.assign(data, {
            createTime: dateNow.Format("yyyy-MM-dd"),
            createBy_name: this.currentUser.userName,
            createBy: this.currentUser.dinCode,
            orgName: this.currentUser.orgName,
            orgId: this.currentUser.orgId
          });
          let jsondata1 = [
            { name: "申请时间", controlType: "input_sign", value: "" },
            { name: "申请组织", controlType: "input_sign", value: "" },
            { name: "申请人", controlType: "input_sign", value: "" },
            { name: "盖章附件", controlType: "input_attachment", value: "" },
            { name: "份数", controlType: "input_num", value: "" }
          ];
          jsondata1[0].value = pa1.createTime;
          jsondata1[1].value = pa1.orgName;
          jsondata1[2].value = pa1.createBy_name;
          jsondata1[3].value = await this.getfile(pa1.fj);
          jsondata1[4].value = pa1.stampNum;

          let attachmentValue1 = JSON.stringify(jsondata1); //这里一定要转换成字符串
          let flowjson = {
            startPerson: this.currentUser.dinCode,
            versionID: "v_2020_gxgl_tjgz",
            jsonData: attachmentValue1
          };

          startFlow(flowjson).then(res => {
            if (res.success) {
              let others1 = Object.assign(pa1, {
                instanceId: res.msg
              });
              let pa2 = { jsondata: JSON.stringify(others1) };
              addSummit(pa2).then(res => {
                this.getTableList();
              });
            }
          });
          break;
      }
    },
    //获得加载数据
    async getLoadData() {}
  }
};
</script>
<style lang="less" scoped>
.search_container {
  margin-bottom: 20px;
}

.searchArea {
  background: #e1dfdf;
  border-radius: 2px;
  padding: 18px 18px 0;
}

.row_list {
  margin-bottom: 20px;
  .row_base {
    padding: 10px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 6px;
    height: 1.618rem;
  }
}

.order_list {
  .orderArea {
    width: 100%;
    height: 4.989rem;
    background: #fff !important;
    border-radius: 6px;
    box-sizing: border-box;
    padding: 10px;
    padding-top: 40px;
    overflow: hidden;
  }
  .orderbarArea {
    height: 4.989rem;
  }
}

.data_list {
  text-align: center;
  font-size: 14px;
  border-radius: 6px;
  padding: 10px;
  color: #fff;
  height: 1.079rem;
  .leftItem {
    align-items: start;
    justify-content: space-between;
    text-align: left;
  }
  .rightItem {
    width: 0.836rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .svg-icon {
      font-size: 30px;
    }
  }
  .number {
    font-size: 0.297rem;
    font-weight: bold;
    .perTitle {
      font-size: 0.175rem;
      margin-left: 5px;
    }
  }
}

.pay {
  .leftItem {
    justify-content: space-around;
  }
}
</style>
