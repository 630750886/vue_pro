<template>
  <div class="body">
    <div class="button">     
      <head-button @click="headBtnClick"></head-button>
    </div>
    <el-tabs v-model="activeName" id="mytabs">
      <el-tab-pane name="1">
        <span slot="label">业务费用台账</span>
        <reimburse-table :dataList="data_yw" @click="tableBtnClick"></reimburse-table>
      </el-tab-pane>
       <el-tab-pane name="2">
        <span slot="label">管理费用台账</span>
        <reimburse-table :dataList="data_gl" @click="tableBtnClick"></reimburse-table>
      </el-tab-pane>
    </el-tabs>
   

    <div class="dialog">
      <!---->
      <!-- <seal-apply-dialog-new
        ref="sealRef"
        title="报销申请"
        width="50%"
        @getFormData="sealApplyFormData"
      ></seal-apply-dialog-new> -->
      <!--报销申请-->
      <!-- <seal-apply-dialog
        ref="sealRef123"
        title="报销申请"
        width="50%"
        @getFormData="sealApplyFormData"
      ></seal-apply-dialog> -->
      <!--高级查询-->
      <!-- <query-dialog
        ref="queryRef"
        title="高级查询"
        width="25%"
        @getFormData="queryFormData"
      ></query-dialog> -->
      <!--发起钉钉-->
      <!-- <SubmitSealDialog
        ref="submitSealRef"
        title="发起钉钉"
        width="50%"
        @getFormData="submitFormData"
      ></SubmitSealDialog> -->
      <!--附件查看-->
      <!-- <pre-view-dialog
        ref="previewRef"
        :data="previewData.data"
      ></pre-view-dialog> -->
      <expense-dialog ref="expenseRef" title="录入信息" :category="myCategory" @getFormData="addReimeburse"></expense-dialog>
      <query-dialog ref="queryRef" title="查询" @getFormData="querySubmit"></query-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import pagination from "../../../../components/pagination/index.vue";
import TableButton from "./button/TableButton.vue";
// import SealApplyDialog from "./dialog/SealApplyDialog.vue";
// import SealApplyDialogNew from "./dialog/sealApplyDialog_new.vue";
 import HeadButton from "./button/HeadButton.vue";
// import QueryDialog from "./dialog/QueryDialog.vue";
// import SubmitSealDialog from "./dialog/SubmitSealDialog.vue";
// import preViewDialog from "../../../../components/flowControl/preView.vue";
import ReimburseTable from "./table/ReimburseTable.vue";
import expenseDialog from "./dialog/expenseDialog.vue";
import queryDialog from "./dialog/QueryDialog.vue";
import DownloadButton from "../../../../components/myTemplate/button/DownloadButton.vue";
import { mapState, mapActions } from "vuex";

export default {
  inject: ["reload"],
  components: {
    pagination,
    TableButton,  
    DownloadButton,
    expenseDialog,
    ReimburseTable,
    HeadButton,
    queryDialog
  },
  props: {
    myData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    pageTotal: {
      type: Number,
      default: 20,
    },
  },   
  //数据节点
  data() {
    return {
      //展示数据    
      flowdatas: "",
      pageShow: {
        page: 1,
        limit: 30,
        filter: {},
      },
      mylist:[],
      activeName:"1",
      myCategory:"0",
      myStatus:"0",
      queryForm_yw:[],
      queryForm_gl:[],
      typeList123: [
        {
          keyid: "402880fa74dd23350174e1f3ff0d0009",
          pkeyid: "0000",
          code: "TYPE-024",
          label: "投标费用",
          children: "",
        },
        {
          keyid: "402880fa74dd23350174e1f44e86000a",
          pkeyid: "0000",
          code: "TYPE-025",
          label: "业务费用",
          children: "",
        },
        {
          keyid: "402880fa74dd23350174e1f496f5000b",
          pkeyid: "0000",
          code: "TYPE-026",
          label: "部门费用",
          children: "",
        },
        {
          keyid: "402880fa74dd23350174e1f4d64e000c",
          pkeyid: "0000",
          code: "TYPE-027",
          label: "公司费用",
          children: "",
        },
        {
          keyid: "402880fa74dd23350174e1f52617000d",
          pkeyid: "0000",
          code: "TYPE-028",
          label: "刘总费用",
          children: "",
        },
        {
          keyid: "402880fa762249280176225523a60000",
          pkeyid: "0000",
          code: "TYPE-029",
          label: "陈总费用",
          children: "",
        },
      ],
      previewData: {
        title: "",
        insId: "",
        data: [],
      },

      clickRow: {},
    };
  },
  computed: {
    ...mapState({     
      currentUser: "currentUser"
    }),
    data_yw(){     
      return this.$myfunction.queryData(this.queryForm_yw,this.myData.filter(s=>{return s.Category=='0'}));
    },
    data_gl(){
      return this.$myfunction.queryData(this.queryForm_gl,this.myData.filter(s=>{return s.Category=='1'}));
       
    }
  },  
  //生命周期函数节点
  created() {  
    this.networkGetOrgAndPost();
    
  },
  //自定义函数节点
  methods: {
    ...mapActions({     
      networkGetOrgAndPost: "loadType/networkGetOrgAndPost"
    }),       
    //头部按钮
    headBtnClick(btn) {
      switch (btn) {
        case 1:
          this.myCategory="0";//0为业务1为管理
          this.myStatus="0";  //0为申请1为登记          
          this.$refs.expenseRef.openDialog();         
          break;
        case 2:
          this.myCategory="0"; 
           this.myStatus="1";   
          this.$refs.expenseRef.openDialog();
        break;
        case 3:
          this.myCategory="1"; 
           this.myStatus="0";   
          this.$refs.expenseRef.openDialog();
        break;
        case 4:
          this.myCategory="1"; 
           this.myStatus="1";   
          this.$refs.expenseRef.openDialog();
        break;
        case 5:
          this.$refs.queryRef.openDialog();
          break;
        case 9:
        this.reload();
        break;
      }
    },
    addReimeburse(val){
      val.category=this.myCategory;
      val.status=this.myStatus;
      
      this.$emit("function",'addData',this.$myfunction.copyData(val));
    },
    querySubmit(data){
      console.log(data);
      
      //1是业务窗口
      if(this.activeName==="1"){
        
        this.queryForm_yw=data;
      }else{
        this.queryForm_gl=data;
      }
    },
    //表格按钮
   
    tableBtnClick(btn, data) {
      this.$emit('tabClick',btn,data);
    }
  },
};
</script>
<style lang='less' scoped>
.body {
  .button {
    height: 50px;
    line-height: 50px;
    margin: 0 10px;
  }
}
</style>
