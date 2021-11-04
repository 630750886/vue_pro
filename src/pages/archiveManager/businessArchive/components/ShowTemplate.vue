<template>
  <div class="body">
    <div class="head-button">
      <head-button @click="headButtonClick"></head-button>
    </div>
    <div class="table">
        <el-tabs v-model="activeName">
          <el-tab-pane name="1" label="工程咨询项目档案">
            <el-tabs v-model="activeName2" tab-position="left">
              <el-tab-pane name="1" label="已归档"> <project-consult-table @handlePageInfo="getConsultPageInfo" :pageShow="pageShow"></project-consult-table></el-tab-pane>
              <el-tab-pane name="2" label="已取消"> <project-consult-table @handlePageInfo="getConsultPageInfo" :pageShow="pageShow"></project-consult-table></el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane name="2" label="造价咨询项目档案">
            <el-tabs v-model="activeName2" tab-position="left">
              <el-tab-pane name="1" label="已归档">  <project-cost-table @handlePageInfo="getCostPageInfo" :pageShow="pageShow"></project-cost-table></el-tab-pane>
              <el-tab-pane name="2" label="已取消">  <project-cost-table @handlePageInfo="getCostPageInfo" :pageShow="pageShow"></project-cost-table></el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane name="3" label="招标代理项目档案">
            <el-tabs v-model="activeName2" tab-position="left">
              <el-tab-pane name="1" label="已归档"><bidding-agency-table @handlePageInfo="getBiddingPageInfo" :pageShow="pageShow"></bidding-agency-table></el-tab-pane>
              <el-tab-pane name="2" label="已取消"> <bidding-agency-table @handlePageInfo="getBiddingPageInfo" :pageShow="pageShow"></bidding-agency-table></el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane name="4" label="工程监理项目档案">
            <el-tabs v-model="activeName2" tab-position="left">
              <el-tab-pane name="1" label="已归档"><project-supervisor-table @handlePageInfo="getSupervisorPageInfo" :pageShow="pageShow"></project-supervisor-table></el-tab-pane>
              <el-tab-pane name="2" label="已取消"><project-supervisor-table @handlePageInfo="getSupervisorPageInfo" :pageShow="pageShow"></project-supervisor-table></el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane name="5" label="项目管理项目档案">
            <el-tabs v-model="activeName2" tab-position="left">
              <el-tab-pane name="1" label="已归档"> <item-table @handlePageInfo="getManagerPageInfo"  :pageShow="pageShow"></item-table></el-tab-pane>
              <el-tab-pane name="2" label="已取消"> <item-table @handlePageInfo="getManagerPageInfo"  :pageShow="pageShow"></item-table></el-tab-pane>
            </el-tabs>
          </el-tab-pane>
<!--          <el-tab-pane name="6">-->
<!--            <span slot="label">全过程工程咨询项目档案</span>-->
<!--            <whole-process-table :data-list="dataList"></whole-process-table>-->
<!--          </el-tab-pane>-->
<!--          <el-tab-pane name="7">-->
<!--            <span slot="label">综合业务项目档案</span>-->
<!--            <overall-business-table :data-list="dataList"></overall-business-table>-->
<!--          </el-tab-pane>-->
        </el-tabs>
    </div>
    <div class="dialog">
      <el-dialog
          :visible.sync="dialogVisible"
          width="30%">

        <el-form ref="bussinessRef" :model="bussinessForm" label-width="80px">
          <el-form-item label="项目名称">
            <el-input v-model="bussinessForm.projectName"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="queryGo">筛 选</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import HeadButton from './button/HeadButton.vue'
  import BiddingAgencyTable from './table/BiddingAgencyTable.vue'
  import ItemTable from './table/ItemTable.vue'
  import OverallBusinessTable from './table/OverallBusinessTable.vue'
  import ProjectConsultTable from './table/ProjectConsultTable.vue'
  import ProjectCostTable from './table/ProjectCostTable.vue'
  import ProjectSupervisorTable from './table/ProjectSupervisorTable.vue'
  import WholeProcessTable from './table/WholeProcessTable.vue'
  import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

  export default {
    components: {
      HeadButton,
      BiddingAgencyTable,
      ItemTable,
      OverallBusinessTable,
      ProjectConsultTable,
      ProjectCostTable,
      ProjectSupervisorTable,
      WholeProcessTable

    },
    props: {},
    watch: {
      activeName(newVal){
        this.pageShow.pageInfo = {
          page: 1,
          limit: 30}
        this.pageShow.advancedQuery={}
        this.activeName2="1"
        this.getAllData(newVal)
      },
      activeName2(newVal){
        switch (newVal) {
          case "1":
            this.pageShow.advancedQuery.projectStatusKeyId= "5"
            this.getCurrentData()
            break
          case "2":
            this.pageShow.advancedQuery.projectStatusKeyId= "6"
            this.getCurrentData()
            break

        }
      }
    },
    //数据节点
    data() {
      return {
        bussinessForm:{
          projectName:''
        },
        dialogVisible:false,
        activeName: '1',
        activeName2:'1',
        pageShow: {
          pageInfo: {
            page: 1,
            limit: 30
          },
          advancedQuery: {
            contractVocationalTypeKeyId: "402880fa74c3492d0174d45ebe360015",
            projectStatusKeyId: "5",
          }
        },
      }
    },
    //生命周期函数节点
    created() {
      this.networkGetConsultItems(this.pageShow);
    },
    //自定义函数节点
    methods: {
      queryGo(){
        this.getAllData(this.activeName)
        this.bussinessForm={}
        this.dialogVisible=false

      },
      headButtonClick(btn){
        switch (btn) {
          case 1:
            this.dialogVisible=true
            break
          case 2:
            this.getAllData(this.activeName)
            break
        }
      },
      getAllData(data){
        this.pageShow.advancedQuery=this.bussinessForm
        switch (data) {
          case "1":
            this.pageShow.advancedQuery.contractVocationalTypeKeyId= "402880fa74c3492d0174d45ebe360015"
            this.networkGetConsultItems(this.pageShow);
            break
          case "2":
            this.pageShow.advancedQuery.contractVocationalTypeKeyId= "402880fa74c3492d0174d45ef5b80016"
            this.networkGetCostItems(this.pageShow);
            break
          case "3":
            this.pageShow.advancedQuery.contractVocationalTypeKeyId= "402880fa74c3492d0174d45f2e8f0017"
            this.networkGetBidItems(this.pageShow);
            break
          case "4":
            this.pageShow.advancedQuery.contractVocationalTypeKeyId= "402880fa74c3492d0174d45f629c0018"
            this.networkGetSupervisorItems(this.pageShow)
            break
          case "5":
            this.pageShow.advancedQuery.contractVocationalTypeKeyId= "402880fa74c3492d0174d45f82380019"
            this.networkGetManagerItems(this.pageShow)
            break
        }
      },
      getCurrentData(){
        switch (this.activeName) {
          case "1":
            this.networkGetConsultItems(this.pageShow);
            break
          case "2":
            this.networkGetCostItems(this.pageShow);
            break
          case "3":
            this.networkGetBidItems(this.pageShow);
            break
          case "4":
            this.networkGetSupervisorItems(this.pageShow);
            break
          case "5":
            this.networkGetManagerItems(this.pageShow);
            break
        }
      },
      //造价咨询项目档案
      getConsultPageInfo(pageShow) {
        this.pageShow = pageShow;
        this.networkGetConsultItems(this.pageShow);
      },
      // 工程咨询项目档案
      getCostPageInfo(pageShow) {
        this.pageShow = pageShow;
        this.networkGetCostItems(this.pageShow);
      },
      // 招标代理项目档案
      getBiddingPageInfo(pageShow) {
        this.pageShow = pageShow;
        this.networkGetBidItems  (this.pageShow);
      },
      //工程监理项目档案
      getSupervisorPageInfo (pageShow) {
        this.pageShow = pageShow;
        this.networkGetSupervisorItems(this.pageShow);
      },
      // 项目管理项目档案
      getManagerPageInfo(pageShow) {
        this.pageShow = pageShow;
        this.networkGetManagerItems(this.pageShow);
      },
      ...mapActions({
        networkGetConsultItems: "projectConsult/networkGetItems",
        networkGetCostItems: "projectCost/networkGetItems",
        networkGetBidItems: "biddingAgency/networkGetItems",
        networkGetSupervisorItems: "projectSupervisor/networkGetItems",
        networkGetManagerItems: "itemManager/networkGetItems",
      }),
    }
  }
</script>
<style lang='less' scoped>
  .head-button {
    height: 50px;
    line-height: 50px;
    padding: 0px 20px;
  }
  .table{
    margin: 0 7px;
  }
  /deep/ .el-table__fixed-right-patch {
    background-color: transparent;
  }
</style>
