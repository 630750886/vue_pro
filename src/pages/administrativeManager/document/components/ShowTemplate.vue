<template>
  <div class="body">
    <div class="head-button">
      <head-button @click="headButtonClick"></head-button>
    </div>
    <div class="table">
      <el-tabs v-model="activeName">
        <el-tab-pane name="1">
          <span slot="label">红头文件</span>
          <document-table :pageShow="pageShow" @pageInfoChange="getPageInfo"  @updataGo="updataGo" :type="true" :dataList="dataListHT"></document-table>
        </el-tab-pane>
        <el-tab-pane name="2">
          <span slot="label">普通文件</span>
          <document-table :pageShow="pageShow" @pageInfoChange="getPageInfo"  @updataGo="updataGo" :type="false" :dataList="dataListPT"></document-table>
        </el-tab-pane>
        <el-tab-pane name="3">
          <span slot="label">会议管理</span>
          <meeting-minutes-table :pageShow="pageShow" @pageInfoChange="getPageInfo" @updataGo="updataGo" :dataList="dataListmeet"></meeting-minutes-table>
        </el-tab-pane>
        <el-tab-pane name="4">
          <span slot="label">规章制度</span>
          <regulations-table :pageShow="pageShow" @pageInfoChange="getPageInfo" @updataGo="updataGo" :dataList="dataListFG"></regulations-table>
        </el-tab-pane>

      </el-tabs>
    </div>
    <div class="dialog">
      <add-document-dialog title="" ref="addRef" @getFormData="adddocumentbase"></add-document-dialog>
      <query-document-dialog :activeName="activeName" title="" ref="queryRef" @SearchFormData="searchData"></query-document-dialog>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import HeadButton from './button/HeadButton.vue'
  import DocumentTable from './table/DocumentTable.vue'
  import MeetingMinutesTable from './table/MeetingMinutesTable.vue'
  import RegulationsTable from './table/RegulationsTable.vue'
  import AddDocumentDialog from './dialog/AddDocumentDialog.vue'
  import QueryDocumentDialog from './dialog/QueryDocumentDialog.vue'
  import * as document from "@/api/administration/DocumentInfo.js"

  export default {
    inject: ["reload"],
    components: {
      HeadButton,
      DocumentTable,
      MeetingMinutesTable,
      RegulationsTable,
      AddDocumentDialog,
      QueryDocumentDialog
    },
    props: {},
    watch: {
      activeName(newVal){
        this.dataListHT={},
        this.dataListPT= {},
        this.dataListmeet= {},
        this.dataListFG= {},
        this.pageShow={
          pageInfo: {
            page: 1,
            limit: 30
          },
          advancedQuery: {
          }
        };
        this.getAllData(newVal+"")
      }
    },
    //数据节点
    data() {
      return {
        activeName: '1',
        dataListHT: {},
        dataListPT: {},
        dataListmeet: {},
        dataListFG: {},
        pageShow: {
          pageInfo: {
            page: 1,
            limit: 30
          },
          advancedQuery: {
            documentTypeKeyId:"1"
          }
        },
      }

    },
    //生命周期函数节点
    created() {
      // document.advancedquery_object(this.pageShow).then(res => {
      //   console.log(res);
      // }).catch(err => {
      //   console.log(err);
      // })
      this.getAllData(this.activeName)
    },
    //自定义函数节点
    methods: {
      searchData(data){
        this.pageShow.advancedQuery=data
        this.getAllData(this.activeName)
      },
      //分页
      getPageInfo(data){
        this.pageShow.pageInfo=data.pageInfo
        this.pageShow.advancedQuery.documentTypeKeyId=this.activeName+""
        this.getAllData(this.activeName)
      },
      //更新数据
      updataGo(){
        this.getAllData(this.activeName+"")
      },
      adddocumentbase(formdata){
        document.adds_object(formdata).then(item => {
          if (item.code === 200) {
            this.getAllData(formdata.documentTypeKeyId+"")
            this.$message.success("增加成功!")
          }
        });
      },
      //获取文件信息
      getAllData(parameter){
        this.pageShow.advancedQuery.documentTypeKeyId=parameter
        document.advancedquery_object(this.pageShow).then(item=>{
          if (item.code === 200) {
            switch (parameter) {
              case "1":
                this.dataListHT={}
                this.dataListHT=item.data;
                console.log(item.data);
                break;
              case "2":
                this.dataListPT={}
                this.dataListPT=item.data;
                break;
              case "3":
                this.dataListmeet={}
                this.dataListmeet=item.data;
                break;
              case "4":
                this.dataListmeet={}
                this.dataListFG=item.data;
                break;
            }

          }
        });
      },
      headButtonClick(btn){
        switch (btn) {
          case 1:
            this.$refs.addRef.openDialog()
            break
          case 2:
            this.$refs.queryRef.openDialog()
            break
          case 9:
          this.reload();
          break;
        }
      }
    }
  }
</script>
<style lang='less' scoped>
  .head-button {
    margin-left:8px;
    height: 35px;
    line-height: 35px;
    padding: 0px 10px;
  }
  .el-tabs{
    padding-left: 5px;
  }
</style>
