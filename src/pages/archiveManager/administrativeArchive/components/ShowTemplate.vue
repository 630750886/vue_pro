<template>
  <div class="body">
    <div class="head-button">
      <head-button  @click="headButtonClick"></head-button>
    </div>
    <div class="table">
      <el-tabs v-model="activeName">
        <el-tab-pane name="1">
          <span slot="label">活动档案</span>
          <activity-table :data-list="dataActivityList"  @updataActivity="updataActivity" :pageShow="pageShow" @pageInfoChange="getPageInfo"></activity-table>
        </el-tab-pane>
<!--        <el-tab-pane name="2">-->
<!--          <span slot="label">文件档案</span>-->
<!--          <el-tabs v-model="activeName2" tab-position="left">-->
<!--            <el-tab-pane name="1">-->
<!--              <span slot="label">红头文件</span>-->
<!--              <read-head-document-table :pageShow="pageShow" @pageInfoChange="getFilePageInfo"  @updataGo="updataGo" :dataList="dataListHT"></read-head-document-table>-->
<!--            </el-tab-pane>-->
<!--            <el-tab-pane name="2">-->
<!--              <span slot="label">普通文件</span>-->
<!--              <ordinary-document-table :pageShow="pageShow" @pageInfoChange="getFilePageInfo"  @updataGo="updataGo" :dataList="dataListPT"></ordinary-document-table>-->
<!--            </el-tab-pane>-->
<!--            <el-tab-pane name="3">-->
<!--              <span slot="label">会议纪要</span>-->
<!--              <meeting-minutes-table :pageShow="pageShow" @pageInfoChange="getFilePageInfo"  @updataGo="updataGo" :dataList="dataListmeet"></meeting-minutes-table>-->
<!--            </el-tab-pane>-->
<!--            <el-tab-pane name="4">-->
<!--              <span slot="label" >规章制度</span>-->
<!--              <regulations-table :pageShow="pageShow" @pageInfoChange="getFilePageInfo"  @updataGo="updataGo" :dataList="dataListFG"></regulations-table>-->
<!--            </el-tab-pane>-->
<!--          </el-tabs>-->
<!--        </el-tab-pane>-->
<!--        <el-tab-pane name="3">-->
<!--          <span slot="label">资质档案</span>-->
<!--          <qualification-table  @aptitudePageInfoChange="aptitudePageInfoChange" :pageShow="pageShow"  :dataList="dataListOrgAptitudeInfo"></qualification-table>-->
<!--        </el-tab-pane>-->
<!--        <el-tab-pane name="4">-->
<!--          <span slot="label" >荣誉档案</span>-->
<!--          <honor-table @honorPageInfoChange="honorPageInfoChange" :pageShow="pageShow" :dataList="dataListOrgHonourableInfo"></honor-table>-->
<!--        </el-tab-pane>-->
<!--        <el-tab-pane name="5">-->
<!--          <span slot="label">工商档案</span>-->
<!--          <company-table @companyPageInfoChange="companyPageInfoChange" :pageShow="pageShow" :dataList="dataListOrgCompany"></company-table>-->
<!--        </el-tab-pane>-->
        <el-tab-pane name="6">
          <span slot="label">检查档案</span>
          <AdministrativeInspectionTable @inspectPageInfoChange="inspectPageInfoChange" :pageShow="pageShow" :dataList="dataListOrgLicenceCheck"></AdministrativeInspectionTable>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="dialog">
      <el-dialog
          :visible.sync="dialogVisible"
          width="30%">
        <el-form ref="personRef" :model="Form" label-width="80px">
          <el-form-item :label="activeName=='1'?'活动名称':'检查名称'">
            <el-input v-model="Form.itemName"></el-input>
          </el-form-item>
          <el-form-item v-if="activeName!=='1'" label="检查单位">
            <el-input v-model="Form.licenceCheckUnit"></el-input>
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
  import ActivityTable from './table/ActivityTable.vue'

  import ReadHeadDocumentTable from './table/ReadHeadDocumentTable.vue'
  import OrdinaryDocumentTable from './table/OrdinaryDocumentTable.vue'
  import MeetingMinutesTable from './table/MeetingMinutesTable.vue'
  import RegulationsTable from './table/RegulationsTable.vue'
  import AdministrativeInspectionTable from "./table/AdministrativeInspectionTable.vue";

  import CompanyTable from './table/CompanyTable.vue'
  import HonorTable from './table/HonorTable.vue'
  import QualificationTable from './table/QualificationTable.vue'
  import * as activity from "@/api/administration/ActivityInfo.js"
  import * as document from "@/api/administration/DocumentInfo.js"
  import * as OrgAptitudeInfo from "@/api/administration/OrgAptitudeInfo.js"
  import * as OrgHonourableInfo from "@/api/administration/OrgHonourableInfo.js"
  import * as OrgCompany from "@/api/administration/OrgCompany.js"
  import * as OrgLicenceCheck from "@/api/administration/OrgLicenceCheck.js"

  export default {
    components: {
      HeadButton,
      ActivityTable,
      AdministrativeInspectionTable,
      ReadHeadDocumentTable,
      OrdinaryDocumentTable,
      MeetingMinutesTable,
      RegulationsTable,

      CompanyTable,
      HonorTable,
      QualificationTable,

    },
    props: {},
    watch: {
      activeName(newVal){
        this.getData(newVal)
      },
      activeName2(newVal){
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
        Form:{
          itemName:'',
          licenceCheckUnit:'',
        },
        dialogVisible:false,
        activeName: '1',
        activeName2: '1',
        dataList:[{}],
        dataListHT: {},
        dataListPT: {},
        dataListmeet: {},
        dataListFG: {},
        dataActivityList:{},
        dataListOrgAptitudeInfo:{},
        //荣誉
        dataListOrgHonourableInfo:{},
        //工商
        dataListOrgCompany:{},
        //检查
        dataListOrgLicenceCheck: {},
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
      this.getActivityData(this.pageShow)
      this.getAllData(this.activeName2)

    },
    //自定义函数节点
    methods: {
      queryGo(){
        if(this.Form.itemName!=='' || this.Form.licenceCheckUnit!=='' ){
          let itemForm={}
          switch (this.activeName) {
            case "1":
              itemForm.activityName=this.Form.itemName
              this.pageShow.advancedQuery=itemForm
              this.getActivityData(this.pageShow)
              this.pageShow.advancedQuery={}
              break
            case "6":
              itemForm.licenceCheckName=this.Form.itemName
              itemForm.licenceCheckUnit=this.Form.licenceCheckUnit,
              this.pageShow.advancedQuery=itemForm
              //获取检查数据

              this.getLicenceCheck(this.pageShow)
              this.pageShow.advancedQuery={}
          }
        }
        this.Form={}
        this.dialogVisible = false

      },
      headButtonClick(btn){
        switch (btn) {
          case 1:
            this.dialogVisible = true
            break
          case 2:
            this.getData(this.activeName)
            break
        }
      },
      //获取数据
      getData(data){
        switch (data) {
          case "1":
            this.getActivityData(this.pageShow)
            break
          // case "2":
          //   break
          // case "3":
          //   this.getAptitudeInfo(this.pageShow)
          //   break
          // case "4":
          //   this.getHonourableInfo(this.pageShow);
          //   break
          // case "5":
          //   this.getCompany(this.pageShow);
          //   break
          case "6":
            this.getLicenceCheck(this.pageShow);
            break
        }
      },
      //更新数据
      updataGo(){
        this.getAllData(this.activeName2+"")
      },
      //分页
      getFilePageInfo(data){
        this.pageShow.pageInfo=data.pageInfo
        this.pageShow.advancedQuery.documentTypeKeyId=this.activeName2+""
        this.getAllData(this.activeName2)
      },
      //获取公司数据
      getCompany(data){
        OrgCompany.advancedquery_object(data).then(res => {
          if (res.code === 200) {
            //this.$message.success("查询完成!");
            this.dataListOrgCompany=res.data;
          }
        })
      },
      companyPageInfoChange(data){
        this.getCompany(data)
      },
      //获取检查数据
      getLicenceCheck(data){
        OrgLicenceCheck.advancedquery_object(data).then(res => {
          if (res.code === 200) {
            //this.$message.success("查询完成!");
            this.dataListOrgLicenceCheck=res.data;
            console.log(res.data);
          }
        })
      },
      inspectPageInfoChange(data){
        this.getLicenceCheck(data)
      },
      //获取荣誉数据
      getHonourableInfo(data){
        OrgHonourableInfo.advancedquery_object(data).then(res => {
          if (res.code === 200) {
            //this.$message.success("查询完成!");
            this.dataListOrgHonourableInfo=res.data;
          }
        })
      },
      honorPageInfoChange(data){
        this.getHonourableInfo(data)
      },
      //获取资质数据
      getAptitudeInfo(data){
        OrgAptitudeInfo.advancedquery_object(data).then(res => {
          if (res.code === 200) {
            //this.$message.success("查询完成!");
            this.dataListOrgAptitudeInfo=res.data;
            console.log(res.data);
          }
        })
      },
      aptitudePageInfoChange(data){
        this.getAptitudeInfo(data)
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
      updataActivity(){
        this.getActivityData(this.pageShow)
      },
      getPageInfo(data){
        this.getActivityData(data)
      },
      //获取活动数据
      getActivityData(data){
        activity.advancedquery_object(data).then(item=>{
          if (item.code === 200) {
            this.dataActivityList=item.data;
            console.log(this.dataActivityList)
          }
        });
      },
    }
  }
</script>
<style lang='less' scoped>
  .table{
    margin: 0 7px;
  }
  .head-button {
    height: 50px;
    line-height: 50px;
    padding: 0px 20px;
  }
</style>
