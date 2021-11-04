<template>
  <div class="body">
    <div class="head-button">
      <head-button @click="headButtonClick"></head-button>
    </div>

    <div class="table">
       <invoice-table
            :mytableData="dl"
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            types="noRecive"
          ></invoice-table>
      <!-- <el-tabs v-model="activeName">
        <el-tab-pane name="1">
          <span slot="label">开票信息</span>
          <invoice-table
            :mytableData="dl"
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            types="noRecive"
          ></invoice-table>
        </el-tab-pane>
        <el-tab-pane name="2">
          <span slot="label">未回款完整</span>
          <invoice-table
            :mytableData="dl.noReciveEnoughData"
            types="noReciveEnough"
          ></invoice-table>
        </el-tab-pane>
        <el-tab-pane name="3">
          <span slot="label">已回款</span>
          <invoice-table
            :mytableData="dl.ReciveData"
            types="Recive"
          ></invoice-table>
        </el-tab-pane>
        <el-tab-pane name="4">
          <span slot="label">已作废</span>
          <invoice-table
            :mytableData="dl.cancelData"
            types="cancel"
          ></invoice-table>
        </el-tab-pane>
      </el-tabs> -->
    </div>
    <div class="dialog">
      <add-invoice-dialog
        title1="发票信息"
        ref="addRef"
        @getFormData="add"
      ></add-invoice-dialog>
      <apply-invocie-dialog
        title1="申请开票"
        ref="applyRef"
        @getFormData="apply"
      ></apply-invocie-dialog>
      <query-invoice-dialog
        title1="高级查询"
        ref="queryRef"
        @getFormData="queryForm"
      ></query-invoice-dialog>
      <display-invoice-dialog
        title1="数据展示"
        ref="displayRef"
        @getFormData="display"
      ></display-invoice-dialog>
      <invlid-dialog title="test" ref="invalidRef"></invlid-dialog>
    </div>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import HeadButton from './button/HeadButton.vue';
import InvoiceTable from './table/InvoiceTable.vue';
import AddInvoiceDialog from './dialog/AddInvoiceDialog.vue';
import ApplyInvocieDialog from './dialog/ApplyInvocieDialog.vue';
import QueryInvoiceDialog from './dialog/QueryInvoiceDialog.vue';
import DisplayInvoiceDialog from './dialog/DisplayInvoiceDialog.vue';
import noInvoiceTale from './table/noInvoiceTable.vue';
import invlidDialog from './dialog/InvalidInoviceDialog.vue';

import { mapState, mapActions } from 'vuex';
import { startFlow, getIns } from '../../../../api/webapi-flow.js';
import { addBill, getAllBill } from '../../../../api/webapi-fin.js';

export default {
  inject: ['reload'],
  components: {
    HeadButton,
    InvoiceTable,
    noInvoiceTale,
    AddInvoiceDialog,
    ApplyInvocieDialog,
    QueryInvoiceDialog,
    DisplayInvoiceDialog,
    invlidDialog,
  },
  props: {},
  watch: {},
  // 数据节点
  data () {
    return {
      activeName: '1',
      dl: [],
      back_dl:[],
      noReciveData: [],
      loading: false,
    };
  },
  computed: {
    ...mapState({
      currentUser: 'currentUser',
    }),
  },
  // 生命周期函数节点
  created () {
    this.networkGetOrgAndPost();
    this.getAll();
  },
  // 自定义函数节点
  methods: {
    ...mapActions({
      networkGetOrgAndPost: 'loadType/networkGetOrgAndPost',
    }),
    headButtonClick (btn) {
      switch (btn) {
        case 1: // 发票登记
          this.$refs.addRef.openDialog({ billload: 'reg' });
          break;
        case 2: // 申请开票
          // this.$confirm(`确定移除`+JSON.stringify(this.currentUser));
          console.log(JSON.stringify(this.currentUser));
          this.$refs.addRef.openDialog({ billload: 'app' });
          break;
        case 3: // 高级查询
        // let bs="g",ags="27";
        // let allData=[{name:'cgh',age:29},{name:'tfg',age:12},{name:'bbd',age:56},{name:'ttt',age:99},{name:'ggo',age:120},{name:'tes',age:112}];
        // let ps = allData.filter(s=>{
        //   let isbs=bs.length>0?s.name.indexOf(bs)>-1:true;
        //   let isage=ags.length>0?s.age>parseInt(ags):true;
        //   return isbs&&isage;
        // })
        // console.log(ps);
          //this.$refs.invalidRef.openDialog();
          // getIns("26c0d2aa-79ca-4afd-b2d9-e96d19058070").then(res=>{
          //   console.log(res);
          // })
           this.$refs.queryRef.openDialog();
          break;
        case 4: // 数据展示
          this.$refs.displayRef.openDialog();
          break;
        case 9:
          this.reload();
          break;
      }
    },
    getAll () {
      let pa = { page: 1, limit: 30, where: '' };
      pa = { jsondata: JSON.stringify(pa) };
      this.loading = true;
      getAllBill(pa).then((res) => {
        console.log(res.data);      
        // let noReciveData = res.data.filter(e => {
        //   return e.receiveMoney == 0 && e.billType != 2;
        // });
        // let noReciveEnoughData = res.data.filter(e => {
        //   return (
        //     e.sumMoney > e.receiveMoney &&
        //     e.receiveMoney != 0 &&
        //     e.billType != 2
        //   );
        // });
        // let ReciveData = res.data.filter(e => {
        //   return e.sumMoney == e.receiveMoney && e.billType != 2;
        // });
        // let cancelData = res.data.filter(e => {
        //   return e.billType == 2;
        // });
        // this.dl = {
        //   noReciveData: noReciveData,
        //   noReciveEnoughData: noReciveEnoughData,
        //   ReciveData: ReciveData,
        //   cancelData: cancelData
        // };
        this.dl = res.data;
       this.back_dl= res.data.map(s=>{
         s.contractId = s.structData
              .map((t) => {
                return t.contractId;
              })
              .filter((ttt) => {
                return ttt != "";
              })
              .join(",");

              s.contractName = s.structData
              .map((t) => {
                return t.contractName;
              })
              .filter((ttt) => {
                return ttt != "";
              })
              .join(",");
              return s;
        })
       console.log(this.back_dl);
        this.loading = false;
      });
    },

    // 开票登记
    async add (data) {
      console.log(data);
      if (data.billload == 'app') {
        // 开票申请
        this.$configs.myLoad = this.$loading({
          fullscreen: true,
          text: '流程执行中.....',
        });
        const flowJson = [
          { name: "申请时间", controlType: "input_sign", value: "" },
          { name: "申请组织", controlType: "input_sign", value: "" },
          { name: "申请人", controlType: "input_sign", value: "" },
          { name: "开票信息", controlType: "input_attachment", value: "" },
          { name: "支付证明", controlType: "input_attachment", value: "" },
        ];

        const dateNow = new Date();
        flowJson[0].value = dateNow.Format('yyyy-MM-dd');
        flowJson[1].value = this.currentUser.orgName; // 这里应该是发起人所在的组织
        flowJson[2].value = this.currentUser.userName;
        flowJson[3].value = await this.getfile(data.openBillAttach);
        flowJson[4].value = await this.getfile(data.payProveAttach);

        const attachmentValue = JSON.stringify(flowJson); // 这里一定要转换成字符串
        const passa = {
          startPerson: this.currentUser.dinCode,
          versionID: "v_2020_cwgl_fbkbsq",
          jsonData: attachmentValue
        };
        await startFlow(passa).then((res) => {
          if (res.success) {
            this.$configs.myLoad.close();
            this.$message.success('开票申请发起成功');
            data = Object.assign(data, {
              billType: 0,
              instanceId: res.msg,
              orgName: this.currentUser.orgName,
              createBy: this.currentUser.dinCode,
              createBy_name: this.currentUser.userName,
              orgId: this.currentUser.orgId,
            });
          }
        });
      } else {
        // 开票登记
        data = Object.assign(data, {
          createBy: this.currentUser.dinCode,
          createBy_name: this.currentUser.userName,
          orgName: this.currentUser.orgName,
          orgId: this.currentUser.orgId,
        });
      }
      const pa = { jsondata: JSON.stringify(data) };
      addBill(pa).then((res) => {
        if (res.code == 200) {
          this.$message.success('数据添加成功');
          this.getAll();
        }
      });
    },
    // 开票申请
    apply (data) {},
    // 高级查询
    queryForm (data) {
   
     let redata = this.$myfunction.queryData(data,this.back_dl);
    this.dl=redata;    
      // console.log(data[0]["createBy_name"]);
    },
    // 数据展示
    display (data) {}
  },
};
</script>
<style lang="less" scoped>
.head-button {
  height: 50px;
  line-height: 50px;
  padding: 10px 20px;
}
</style>
