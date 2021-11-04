<template>
  <div class="body">
    <div class="head-button">
      <head-button @click="headButtonClick"></head-button>
    </div>
    <div class="table">
      <el-tabs  v-model="activeName">
        <template v-for="item in typeData">
          <el-tab-pane :name="item.staticsCode" :key="item.keyid">
            <span slot="label">{{ item.listname }}</span>
          </el-tab-pane>
        </template>
      </el-tabs>
      <non-contract-table v-if="activeName=='0'" :my-data="contracts.dataList"></non-contract-table>
      <table-template v-else @pageInfoChange="getPageInfo" :pageShow="pageShow" :data-base="{type:itemType,dataList:contracts2.dataList,total:contracts2.total}" ></table-template>
    </div>
    <div class="dialog">
      <el-dialog
          :visible.sync="dialogVisible"
          width="30%">
        <el-form ref="contractRef" :model="contractForm" label-width="80px">
          <el-form-item label="合同名称">
            <el-input v-model="contractForm.contractName"></el-input>
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
  import TableTemplate from './table/TableTemplate.vue'
  import NonContractTable from './table/NonContractTable.vue'
  import {getNonBusContract,getBusContract} from "@/api/webapi-contract.js";
  import {getTypeListByCode} from "@/api/webapi-sys.js";

  export default {
    components: {
      HeadButton,
      TableTemplate,
      NonContractTable,

    },
    props: {},
    watch: {
      activeName(newVal){
        this.pageShow.advancedQuery={}
        this.pageShow.pageInfo = {
          page: 1,
          limit: 30},
        this.networkGetContacts()
        if(newVal=="0"){
          this.networkGetNoContacts(this.pageShow)
        }
      }

    },
    //数据节点
    data() {
      return {
        dialogVisible:false,
        activeName: '0',
        contracts:{
          dataList: [],
          total: 0
        },
        contractForm:{
          contractName:''
      },
        contracts2: {
          dataList: [],
          total: 0
        },
        pageShow: {
          pageInfo: {
            page: 1,
            limit: 30
          },
          advancedQuery: {}
        },
        typeData:[]
      }
    },
    //生命周期函数节点
    created() {
      this.networkGetNoContacts(this.pageShow)
      this.networkGetContacts()
      getTypeListByCode({code:'TYPE-307'}).then(res => {
        this.typeData=res.data
        console.log(res.data);
      })
    },
    //自定义函数节点
    methods: {
      queryGo(){
        if(this.contractForm.contractName!==''){
          switch (this.activeName) {
            case "0":
              this.pageShow.advancedQuery=this.contractForm
              this.networkGetNoContacts(this.pageShow)
              break
            default:
              this.pageShow.advancedQuery=this.contractForm
              this.networkGetContacts()
              break
          }
        }
        this.contractForm={}
        this.dialogVisible=false
      },
      headButtonClick(btn){
        switch (btn) {
          case 1:
            this.dialogVisible=true
            break
          case 2:
            this.networkGetContacts()
            break
        }
      },
      getPageInfo(pageShow) {
        this.pageShow = pageShow;
        this.networkGetContacts();
      },
      networkGetNoContacts(pageShow){
        getNonBusContract(pageShow).then(item => {
          let ref = {
            dataList: item.data.content,
            total: item.data.totalElements
          };
          //context.commit("updateContracts", ref);
          this.contracts=ref;
          console.log(this.contracts)
        });
      },
      networkGetContacts(){
        if(this.activeName !=="0"){
          this.pageShow.advancedQuery.contractTypeKeyId = this.activeName
        }
        getBusContract(this.pageShow).then(item => {
          this.contracts2.dataList=item.data.content;
          this.contracts2.total=item.data.totalElements;
        }).catch((errorinfo)=>{
          this.$message.error(errorinfo);
        });
      },
    },
    computed:{
      itemType(){
        switch (this.activeName) {
          case "1":
            return "框架或入库";
            break
          case "2":
            return "综合业务";
            break
          case "3":
            return "全过程工程咨询";
            break
          case "4":
            return "项目管理";
            break
          case "5":
            return "工程监理";
            break
          case "6":
            return "招标代理";
            break
          case "7":
            return "造价咨询";
            break
          case "8":
            return "工程咨询";
            break
        }
      }
    }
  }
</script>
<style lang='less' scoped>
  .head-button {
    height: 50px;
    line-height: 50px;
    padding:0px 20px;
  }
  .table{
    margin:0 7px;
  }
  /deep/ .el-table__fixed-right-patch {
    background-color: transparent;
    height: 0;
  }
</style>
