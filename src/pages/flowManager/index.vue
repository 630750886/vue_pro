<template>
  <div>
    <!-- <el-button type="text" @click="getuser()">得到当前用户ID</el-button>
    <el-button type="text" @click="uploadAttach()">钉钉附件上传</el-button>
    <el-button type="text" @click="showtime()">发送工作提醒</el-button> -->
    <all-version
      :mydata="dataList"
      @viewFlowExecute="viewFlowExecute"
    ></all-version>
    <flowexecute
      v-if="flowExecuteShow"
      :isShow="flowExecuteShow"
      @closeDialog="flowExecuteShow = false"
      :mydata="flowExecutelist"
      @modifyFlowExecute="modifyFlowExecuteClick"
      @Add="flowExecuteAddClick"
    ></flowexecute>

    <nodeshow
      v-if="nodeVisibleshow"
      :isShow="nodeVisibleshow"
      @closeDialog="nodeVisibleshow = false"
      @onSubmit="nodeSubmit"
      :mydata="modifyFlowExecuteData"
    ></nodeshow>
    <!-- <flow-control :formData="dataList"></flow-control> -->
    <!-- <flowshow :mydata="dataList" @VersionShow="verclick"></flowshow>
    <version-show v-if="versionDialogShow" :isShow="versionDialogShow" :mydata="vershowData" @closeDialog="versionDialogShow=false" ></version-show>-->
  </div>
</template>
<script>
import {
  getAllVersion,
  sendMsg1,
  getSpaceid,
  writelog,
  getFlowExecute,
  modifyFlowExecute,
  delNode
} from "../../api/webapi-flow";
import allVersion from "./components/allVersion.vue";
import flowexecute from "./components/flowExecuteShow.vue";
import nodeshow from "./components/nodeshow.vue";
import * as dd from "dingtalk-jsapi";
import { mapState } from "vuex";
// import versionShow from "./components/versionshow.vue";//versionShow
// import flowshow from "./components/flowshow.vue";
// import flowControl from "../../components/flowControl/index.vue";
export default {
  name: "flowIndex",
  data() {
    return {
      dataList: [],
      flowExecutelist: [],
      flowExecuteShow: false,
      vershowData: [],
      modifyFlowExecuteData: {},
      nodeVisibleshow: false,
      nodeType: "",
      versionID: "",
      rowIndex: 0
    };
  },
  computed: {
    ...mapState({
      cu: "currentUser"
    })
  },
  components: {
    // versionShow,
    // flowshow,
    // flowControl
    allVersion,
    flowexecute,
    nodeshow
  },
  mounted() {
    this.getFlow();
    // this.getsignbyDing();
    // this.dataList=[{controlID:'input_sign',html_name:'合同编号',allowNull:1,html_id:''},{controlID:'input_sign',html_name:'合同名称',allowNull:1,html_id:''},{controlID:'input_date',html_name:'申请时间',allowNull:0,html_id:''},{controlID:'input_attachment',html_name:'合同审核附件',allowNull:0,html_id:''}];
  },
  methods: {
    getFlow() {
      getAllVersion().then(res => {
        this.dataList = res;
      });
      // getFlowList("hd").then(res=>{
      //     this.dataList=res;
      // })
    },
    viewFlowExecute(index) {
      this.rowIndex = index;
      let rows = this.dataList[index];
      this.versionID = rows.keyid;
      getFlowExecute(this.versionID).then(res => {
        this.flowExecutelist = res;
        this.flowExecuteShow = true;
      });
    },
    flowExecuteAddClick(row) {
      this.modifyFlowExecuteData = row;
      this.nodeVisibleshow = true;
      this.nodeType = "add";
    },
    modifyFlowExecuteClick(btn, row) {
      switch (btn) {
        case 1:
          this.modifyFlowExecuteData = row;
          this.nodeVisibleshow = true;
          this.nodeType = "modify";
          break;
        case 2:
          let pa = {
            jsonData: JSON.stringify(row)
          };
          delNode(pa).then(res => {
            if (res.success) {
              this.$message.info("删除成功");
              this.viewFlowExecute(this.rowIndex);
            }
          });
          break;
      }

      // console.log(this.modifyFlowExecuteData);
    },
    async nodeSubmit() {
      this.nodeVisibleshow = false;
      if (this.nodeType == "add") {
        this.modifyFlowExecuteData.versionId = this.versionID;
      }
      let pa = {
        type: this.nodeType,
        rows: JSON.stringify(this.modifyFlowExecuteData)
      };
      const ref = await modifyFlowExecute(pa);
      if (ref.success) {
        this.$message.info(`项目${this.nodeType}!成功`);
        let pa = { msg: this.cu.userName + "添加了流程执行环节数据！！" };
        writelog(pa);
        this.viewFlowExecute(this.rowIndex);
      } else {
        this.$message.warning(`项目${this.nodeType}!失败`);
      }
      //console.log( this.modifyFlowExecuteData);//通过这里可以体现出VUE以数据为驱动的特点，因为数据在nodeshow.vue当中的改变导致了this.modifyFlowExecuteData的改变，这就是地址引用。通过这个办法可以在不同的VUE当中使用数据作为载体
    },
    getuser() {
      let that = this;
      dd.ready(function() {
        dd.biz.user.get({
          corpId: that.$configs.CorpId,
          onSuccess: function(info) {
            console.log(info.emplId);
          }
        });
      });
    },
    uploadAttach() {
      getSpaceid().then(res => {
        let spaceid = res.spaceid;
        spaceid = spaceid + "";
        dd.ready(function() {
          dd.biz.util.uploadAttachment({
            file: { spaceId: spaceid, max: 1 },
            types: ["file"],
            onSuccess: function(result) {
              console.log(res, JSON.stringify(result));
            },
            onFail: function(err) {
              alert("error:" + JSON.stringify(err));
            }
          });
        });
      });
    },
    verclick(index) {
      let row = this.dataList[index];
    },
    handleClick(index) {
      let row = this.dataList[index];
    },
    showtime() {
      let pa = {
        loginname: "cgh",
        msg: "这是我的一个测试哦"
      };
      sendMsg1(pa).then(res => {
        console.log(res);
      });
    }
  }
};
</script>
