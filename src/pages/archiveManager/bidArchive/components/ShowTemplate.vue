<template>
  <div class="body">
    <div class="head-button">
      <head-button @click="headButtonClick"></head-button>
    </div>
    <div class="table">
      <el-tabs  v-model="activeName">
<!--        <el-tab-pane name="0" label="备案中"></el-tab-pane>-->
<!--        <el-tab-pane name="2">-->
<!--          <span  slot="label">已报名</span>-->
<!--          <bid-table :data-list="dataList"></bid-table>-->
<!--        </el-tab-pane>-->
<!--        <el-tab-pane name="2" label="投标中"></el-tab-pane>-->
        <el-tab-pane name="3" label="中标项目"> </el-tab-pane>
        <el-tab-pane name="4" label="未中标项目"></el-tab-pane>
<!--        <el-tab-pane name="5" label="不投标项目"></el-tab-pane>-->
      </el-tabs>
      <bid-table :data-list="itemList" @getPageInfo="changePage"></bid-table>
    </div>
    <div class="dialog">
      <el-dialog
          :visible.sync="dialogVisible"
          width="30%">
        <el-form ref="bidRef" :model="bidForm" label-width="80px">
          <el-form-item label="项目名称">
            <el-input v-model="bidForm.projectname"></el-input>
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
  import BidTable from './table/BidTable.vue'
  import { mapState, mapActions, mapMutations } from "vuex";

  export default {
    components: {
      HeadButton,
      BidTable,
    },
    props: {},
    watch: {
      activeName(newVal){
        this.pageShow.pageInfo = {
          page: 1,
          limit: 30},
          this.pageShow.advancedQuery={

          }
        this.pageShow.advancedQuery.tenderstatuskeyid=newVal;
        this.networkGetDataList(this.pageShow)
      }
    },
    //数据节点
    data() {
      return {
        dialogVisible:false,
        activeName: '3',
        activeName2: '1',
        bidForm:{
          projectname:'',
        },
        pageShow: {
          pageInfo: {
            page: 1,
            limit: 30
          },
          advancedQuery: {
            tenderstatuskeyid: "0"
          }
        },
      }
    },
    //生命周期函数节点
    created() {
      this.networkGetDataList(this.pageShow)
    },
    mounted() {
      console.log(this.itemList);
    },
    //自定义函数节点
    methods: {
      queryGo(){
        this.pageShow.advancedQuery = this.bidForm;
        this.pageShow.advancedQuery.tenderstatuskeyid=this.activeName
        this.networkGetDataList(this.pageShow);
        this.bidForm={}
        this.dialogVisible=false

      },
      headButtonClick(btn){
        switch (btn) {
          case 1:
            this.dialogVisible=true
            break
          case 2:
            this.networkGetDataList(this.pageShow)
            break
        }
      },
      changePage(pageInfo) {
        this.pageShow.pageInfo = pageInfo;
        this.networkGetDataList(this.pageShow);
      },
      ...mapActions("bidManager", {
        networkGetDataList: "networkGetDataList",
      }),
    },
    computed:{
      ...mapState("bidManager", {
        itemList: "itemList",
      })
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
    margin:0 7px;
  }
</style>
