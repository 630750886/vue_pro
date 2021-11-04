<template>
  <div class="content">
    <div>
      <head-right-button @click="$refs.addReportRef.openDialog()" title="新增报告"></head-right-button>
    </div>
    <div>
      <el-table :data="materialInfo"
                ref="tableRef"
                align="center" height="430px"
                highlight-current-row
                :header-cell-style="{fontSize:'10px'}"
                :key="tableKey"
                row-key="keyid"
                :indent="8"
                :tree-props="{children: 'children',hasChildren: 'isShow'}" @expand-change="handleExpandChange">
        <el-table-column prop="reportsName" label="报告名称" align="left" header-align="center" fixed="left" width="100"></el-table-column>
        <el-table-column prop="reportsAttachFile" label="附件" align="center">
          <template slot-scope="scope">
            <download-button :value="scope.row.reportsAttachFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="needDesc" label="修改要求" align="center" width="150"></el-table-column>
        <el-table-column prop="editReportsAttachFile" label="委托方修改底稿" align="center" width="100">
          <template slot-scope="scope">
            <download-button :value="scope.row.editReportsAttachFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="editReportsSynthDraftFile" label="修改后底稿" align="center" width="80">
          <template slot-scope="scope">
            <download-button :value="scope.row.editReportsSynthDraftFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="approvedate" label="审核完成时间" align="center" width="100"></el-table-column>
        <el-table-column prop="isclientSatisfy" label="委托人是否认可报告" align="center" width="150">
          <template slot-scope="scope">
            <switch-button prop="isclientSatisfy" message-title="是否更改报告认可状态？" :data="scope.row" @change="networkUpData"></switch-button>
          </template>
        </el-table-column>
        <el-table-column prop="outPutdateTime" label="报告出具时间" align="center" width="100"></el-table-column>
        <el-table-column prop="reportsOutAttchFile" label="盖章扫描件" align="center" width="90">
          <template slot-scope="scope">
            <download-button :value="scope.row.reportsOutAttchFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="personName" label="咨询工程师执业章" align="center" width="130"></el-table-column>
        <el-table-column prop="projectFinishDataFile" label="项目完成的相关证明" align="center" width="150">
          <template slot-scope="scope">
            <download-button :value="scope.row.projectFinishDataFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="180" fixed="right">
          <template slot-scope="scope">
            <template v-if="scope.row.allstatuscode!=='7'" >
              <el-button type="text" size="mini" @click="$refs.reciveReportRef.openDialog(scope.row)">修改</el-button>
              <el-button type="text" size="mini" @click="$refs.perfectReportRef.openDialog(scope.row)">完善报告信息</el-button>
              <el-button type="text" size="mini" @click="$refs.adjustmentRef.openDialog(scope.row)">重新调整</el-button>
              <submit-button v-if="scope.row.allstatuscode==='0'" title="提交审核" @click="submitReport(scope.row)"></submit-button>
              <submit-button v-if="['2','5','6'].indexOf(scope.row.allstatuscode)!==-1"
                             title="办理盖章" @click="submitSeal(scope.row)"></submit-button>
            </template>
            <status-button code="088" :status="scope.row.allstatuscode"></status-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <add-report-dialog title="新增报告" width="30%" ref="addReportRef" @getFormData="networkAddData"></add-report-dialog>
      <recive-report-dialog title="修改报告" width="30%" ref="reciveReportRef" @getFormData="networkUpData"></recive-report-dialog>
      <adjustment-repot-dialog title="重新调整" width="30%" ref="adjustmentRef" @getFormData="networkUpAddData"></adjustment-repot-dialog>
      <perfect-report-dialog title="完善报告信息" width="30%" ref="perfectReportRef" @getFormData="networkUpData"></perfect-report-dialog>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import AddReportDialog from "../dialog/AddReportDialog.vue"
  import ReciveReportDialog from "../dialog/ReciveReportDialog.vue"
  import PerfectReportDialog from "../dialog/PerfectReportDialog.vue"
  import AdjustmentRepotDialog from "../dialog/AdjustmentRepotDialog.vue"
  import SubmitReportDialog from "../dialog/SubmitReportDialog.vue"
  import HeadRightButton from "../button/HeadRightButton.vue"
  //import StatusTag from "../../../../../../../components/StatusTag.vue"

  import {mapState, mapMutations, mapActions} from 'vuex'
  import {getReports,addReport,delReport,upReport} from '../../../../../../../api/workbench/webapi-projectConsult.js'

  export default {
    components: {
      AddReportDialog,
      PerfectReportDialog,
      ReciveReportDialog,
      AdjustmentRepotDialog,
      SubmitReportDialog,
      HeadRightButton
    },
    props: {},
    watch: {},
    computed:{
      ...mapState('workbench',{
        currentItem:'currentItem'
      }),

    },
    //数据节点
    data() {
      return {
        num: 1,
        tableKey:1,
        form: {},
        formRules: {},
        materialInfo: []
      }
    },
    //生命周期函数节点
    created() {
      this.networkGetDatas()
    },
    //自定义函数节点
    methods: {
      networkGetDatas(){
        let ref={
          projectKeyid:this.currentItem.keyid,
          pkeyid:'0000'
        }
        getReports(ref).then(item=>{
          this.treeTableDataFormat(item.data,'pro/ecreports/findwhere').then(item=>{
            this.materialInfo =item
          })
        })
      },
      networkAddData(formData){
        formData.projectKeyid=this.currentItem.keyid
        formData.pkeyid='0000'
        addReport(formData).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
      networkUpAddData(formData){
        formData.allstatusname='true'
        formData.allstatuscode='7'
        upReport(formData).then(()=>{
          let ref={
            projectKeyid:this.currentItem.keyid,
            reportsName:formData.reportsName,
            reportsAttachFile:formData.editReportsSynthDraftFile,
            pkeyid:formData.keyid
          }
          addReport(ref).then(item=>{
            if (item.code === 200) {
              this.$message.success('调整成功')
              this.networkGetDatas()
              //this.tableKey++
            }
          })
        })
      },
      networkDelData(formData){
        delReport(formData).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
      networkUpData(formData){
        upReport(formData).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
      //提交审核
     submitReport(formData) {
       this.$confirm("是否确定发起流程审批?","提示！",
        {confirmButtonText: "确定",cancelButtonText: "取消",type: "warning"}).then(async () => 
          {
          this.ddform('v_2020_ywgl_gczx_bgsh',{
                  c:{code:this.currentItem.contractCode,name:this.currentItem.contractName},
                  i:{code:this.currentItem.projectCode,name:this.currentItem.projectName},
                  signList:[{name:'报告名称',value:formData.reportsName}],
                  fileList:[{title:'报告',file:await this.getfile(formData.reportsAttachFile)}]
                }).then(flowId=>{
                  formData.allstatuscode='1'
                  this.networkUpData(formData)
                  this.ddflow(2,3,{
                    baseId:formData.keyid,
                    baseColumn:'allstatuscode',
                    baseUrl:'pro/ecreports',
                    flowId:flowId,
                    fType:'编制及出具报告'
                  })
                })

          }).catch(() => {this.$message({type: "info",message: "已取消发起流程！"});});
        

      },
      //办理盖章()
      submitSeal(data){

          this.$msgbox.prompt('v_2020_gxgl_tjgz', '盖章份数', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(async ({value}) => {
          this.ddform('v_2020_gxgl_tjgz', {
            fileList: [
              {title: '盖章附件', file:await this.getfile(data.reportsAttachFile)},
            ],
            muitList:[{name:'份数',value:value}]
          }).then(flowId=>{
            data.allstatuscode='4'
            this.networkUpData(data)
            this.ddflow(5,6,{
              baseId:data.keyid,
              baseUrl:'/pro/ecreports',
              baseColumn:'allstatuscode',
              flowId:flowId,
              fType:'编制及出具报告盖章'
            })
          })
        })
       
      },
      handleExpandChange(row, expanded) {
        if (row.children) {
          row.children.forEach(item=>{
            this.$refs.tableRef.toggleRowExpansion(item,true)
          })
        }
      },
    }
  }
</script>
<style lang='less' scoped>
  .b-main {
    height: 80%;
  }
</style>
