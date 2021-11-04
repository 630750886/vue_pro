<template>
  <div class="logContainer">
    <div class="button">
      <head-button @click="headBtnClick" :json_data="exceldataList.dataList" :json_fields="jsonfields"></head-button>
    </div>
    <div class="box-card">
      <el-tabs v-model="activeName" style="margin-left: 5px;">
          <template v-for="item in activeList">
            <el-tab-pane :label="item.listname"  :name="item.staticsCode"  :key="item.keyid">
            </el-tab-pane>
          </template>
      </el-tabs>
      <table-template @getPageInfo="changePage"></table-template>
    </div>
    <div class="dialog">
      <!--高级查询-->
      <query-item-dialog
        ref="queryRef"
        title=""
        width="55%"
        @getFormData="submitQueryForm"
      ></query-item-dialog>
      <!--投标备案-->
      <add-item-dialog
        ref="addRef"
        title=""
        width="30%"
        @getFormData="submitAddForm"
      ></add-item-dialog>
      <echartbid
        ref="echartbid"
      ></echartbid>
    </div>
  </div>
</template>
<script>
//import __ from '__' // __是需要手动引入的文件
import HeadButton from "./button/HeadButton.vue";
import TableTemplate from "./table/TableTemplate.vue";
import QueryItemDialog from "./dialog/QueryItemDialog.vue";
import AddItemDialog from "./dialog/AddItemDialog.vue";
import echartbid from "./dialog/echart_bid.vue"
import {mapState, mapActions, mapMutations } from "vuex";

export default {
  inject: ["reload"],
  components: {
    TableTemplate,
    HeadButton,
    QueryItemDialog,
    AddItemDialog,
    echartbid
  },
  //数据节点
  data() {
    return {
      loading:false,
      activeList: [],
      dataList: [],
      total: 0,
      tenderstatuskeyid:"0",
      pageShow: {
        pageInfo: {
          page: 1,
          limit: 30
        },
        advancedQuery: {
          tenderstatuskeyid: "0"
        }
      },
      jsonfields:{
            创建日期:{
              callback:value=>{
                return this.$moment(value.createddateTime).format("YYYY/MM/DD");
              }
            },
            项目名称:"projectname",
            创建人:"syscreatepersonname",
            "甲方信息":{
              callback:value=>{
                let dataresult="项目业主:";
                return dataresult.concat(value.proprietor+"<br>",
                  "招标人:"+value.tenderee+"<br>",
                  "负责人:"+value.proprietor+"<br>",
                  "联系电话:"+value.tendereeleadingphone+"<br>",
                  "招标代理机构:"+value.biddingagency+"<br>",
                  "负责人:"+value.biddingagencyleading+"<br>",
                  "联系电话:"+value.biddingagencyleadingphone)
              }
            },
            业务类型:"vocationaltypename",
            是否进交易中心:{
              callback: value => {
                if(value.accesstradingcentre)
                {
                  let showtile="";
                 return showtile.concat("交易中心名称:"+value.tradingcentrename+'<br>'+
                   "开标地点:"+value.placebidopening);
                }
                else
                {
                  return "否"
                }
              }
            },
            报名时间:{
              callback:value=>{
                let registrationTime = ""
                 return registrationTime =registrationTime.concat(
                   value.applicantbegindatetime + "-"
                   + value.applicantenddatetime
                 )
                }
            },
            开标时间:"bidopeningdateTime",
            投标形式:"formtendername",
            投标主体:"tenderername",
            负责人:"biddingleading",
            是否缴纳保证金:{
              callback: value =>{
                if(value.istenderbond){
                  let dataResult=""
                  return dataResult=dataResult.concat(
                    "保证金(元):"+value.tenderbondsum+"<br>"+
                    "缴纳时间:"+value.tbbegindateTime)
                }else{
                  return "否"
                }
              }
            },
            "中标情况[分包编号/分包名称/保证金(元)/中标单位/中标价]":{
              field: "winBid",
              callback: value => {
                let dataresult="";
                value.forEach(element => {
                  dataresult=dataresult+"["+"分包编号:"+element.tenderCode+"/分包名称:"+element.bidsectionname+"/保证金(元):"+element.proCautionMoney+"/中标单位:"+element.companyname+"/中标价:"+element.winbiddingsum+"]"
                })
                return dataresult
              }
            }
      }
    };
  },
  watch: {
    activeName(newValue) {
      this.updateState(newValue);
      this.pageShow.advancedQuery = this.advancedQuery;
      this.pageShow.advancedQuery.tenderstatuskeyid = newValue;
      this.networkGetDataList(this.pageShow);
    }
  },
  computed: {
    ...mapState("bidManager", {
      advancedQuery: "advancedQuery",
      xactiveName: "activeName",
      exceldataList:"itemList"
    }),
    activeName:{
      get() {
         return this.xactiveName
            },
      set(val) {
          this.updateState(val);
      }
    }
  },
  
  //生命周期函数节点
  created() {
    this.networkGetSelectByCode("TYPE-128").then(item => {
      this.activeList = item;
      this.activeName = item[0].staticsCode;
    });
    this.networkGetDataList(this.pageShow);
  },
  //自定义函数节点
  methods: {
    handleClick(tab, event) {
        console.log(tab, event);
    },
    ...mapActions("loadType", {
      networkGetSelectByCode: "networkGetSelectByCode"
    }),
    ...mapActions("bidManager", {
      networkGetDataList: "networkGetDataList",
      networkAddData: "networkAddData"
    }),
    ...mapMutations("template", {
      updateModel: "updateModel"
    }),
    ...mapMutations("bidManager", {
      updateState: "updateActiveName",
      updateadvancedQuery:"updateadvancedQuery"
    }),
    headBtnClick(btn, data) {
      switch (btn) {
        case 1:
          this.$refs.addRef.openDialog();
          break;
        case 2:
          this.$refs.queryRef.openDialog();
          break;
        case 3:
          this.$refs.echartbid.openDialog();
          break;
        case 4:
          this.$router.push({ path: "website_manager" });
          break;
        case 5:
          const ref = {
            code: "402880fa74e735230174ec75e81b0012",
            name: "投标模块",
            modelName: "tb"
          };
          this.updateModel(ref);
          this.$router.push({ path: "bid_template" });
          break;
        case 6:
          break;
        case 8:
          break;
        case 9:
          this.reload();
          break;
      }
    },
    submitQueryForm(formData) {
      this.updateadvancedQuery(formData);
      formData.tenderstatuskeyid = this.activeName;
      this.pageShow.advancedQuery = formData;
      this.networkGetDataList(this.pageShow);
    },
    changePage(pageInfo) {
      this.pageShow.pageInfo = pageInfo;
      this.pageShow.advancedQuery = this.advancedQuery;
      this.pageShow.advancedQuery.tenderstatuskeyid = this.activeName;
      this.networkGetDataList(this.pageShow);
    },
    submitAddForm(formData) {
      this.networkAddData(formData);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../../style/ScrollBarExposure";
.button {
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
}
</style>
