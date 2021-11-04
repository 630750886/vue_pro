<template>
  <div class="body">
    <div class="head-button">
      <head-button @click="headButtonClick"></head-button>
    </div>
    <div class="table">
        <el-tabs v-model="activeName">
          <el-tab-pane name="1" label="在职人员">
<!--            <table-list :data-list="allPerson.dataList" :total="allPerson.total" @getPageInfo="getPageInfo"></table-list>-->
          </el-tab-pane>
          <el-tab-pane name="2" label="离职人员">
<!--            <table-list :data-list="allPerson.dataList" :total="allPerson.total" @getPageInfo="getPageInfo"></table-list>-->
          </el-tab-pane>
<!--          <el-tab-pane name="3">-->
<!--            <span slot="label">停用人员</span>-->
<!--            <table-list :data-list="dataList"></table-list>-->
<!--          </el-tab-pane>-->
        </el-tabs>
      <table-list :data-list="allPerson.dataList" :total="allPerson.total" @getPageInfo="getPageInfo"></table-list>
    </div>
    <div class="dialog">
      <el-dialog
          :visible.sync="dialogVisible"
          width="30%">
        <el-form ref="personRef" :model="personForm" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="personForm.personName"></el-input>
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
  import TableList from './table/TableList.vue'
  import {getAllPersondoc} from '@/api/webapi-hr.js'
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
      TableList,

    },
    computed:{
      ...mapState({
        allPerson: "allPerson",
        pageShow: "pageShow"
      })
    },
    props: {},
    watch: {
      activeName(newVal){
        this.getPersonData(newVal)
      }
    },
    //数据节点
    data() {
      return {
        activeName: '1',
        dialogVisible:false,
        personForm:{
          personName:'',
        },

      }
    },
    //生命周期函数节点
    created() {
      this.pageShow.advancedQuery.statusid = "0";
      this.networkGetAllPerson();
    },
    //自定义函数节点
    methods: {
      ...mapMutations({
        updateAdvancedQuery: "updateAdvancedQuery"
      }),
      //查询
      queryGo(){
        // this.pageShow.advancedQuery=this.personForm
        // this.networkGetAllPerson(this.pageShow)
        // this.personForm={}
        switch (this.activeName) {
          case "1":
            this.personForm.statusid = "0";
            break;
          case "2":
            this.personForm.statusid = "1";
            break;
        }
        this.updateAdvancedQuery(this.personForm);
        this.networkGetAllPerson();
        this.dialogVisible=false
      },
      getPersonData(data){
        switch (data) {
          case "1":
            this.pageShow.advancedQuery={}
            this.pageShow.advancedQuery.statusid = "0";
            this.networkGetAllPerson();
            break
          case "2":
            this.pageShow.advancedQuery={}
            this.pageShow.advancedQuery.statusid = "2";
            this.networkGetAllPerson();
            break
        }
      },
      headButtonClick(btn){
        switch (btn) {
          case 1:
            this.dialogVisible=true
            break
          case 2:
            this.getPersonData(this.activeName)
            break
        }
      },
      ...mapActions({
        networkGetAllPerson: "networkGetAllPerson"
      }),
      getPageInfo(pageInfo) {
        let pageShow = this.$myfunction.copyData(this.pageShow);
        pageShow.pageInfo = pageInfo;
        this.networkGetAllPerson(pageShow);
      },
    }
  }
</script>
<style lang='less' scoped>
  .head-button {
    height: 50px;
    line-height: 50px;
    padding: 0px 25px;
  }
  .table{
    margin: 0 7px;

  }
  /deep/ .el-table__fixed-right-patch {
    background-color: transparent;
  }
</style>
