<template>
  <div class="column">
    <div class="button">
      <head-right-button title="新增定案表" @click="$refs.addRef.openDialog()"></head-right-button>
    </div>
    <div class="table">
      <el-table ref="tableRef"
                :data="dataList"
                style="width: 100%"
                align="center"
                height="7rem"
                highlight-current-row
                :header-cell-style="{fontSize:'10px'}"
                row-key="keyid"
                :indent="8"
                
                @expand-change="handleExpandChange"
                :tree-props="{children: 'children',hasChildren: 'isShow'}">
        <el-table-column fixed prop="createddateTime" label="创建时间" align="left" min-width="120px"><template slot-scope="scope">{{scope.row.createddateTime|datefmt('YYYY/MM/DD')}}</template></el-table-column>
        <el-table-column prop="verdictAttachFile" label="附件" align="center">
          <template slot-scope="scope">
            <download-button :value="scope.row.verdictAttachFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="verdictSynthDraftFile" label="合成底稿" align="center">
          <template slot-scope="scope">
            <download-button :value="scope.row.verdictSynthDraftFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="needDesc" label="修改要求" align="center" width="150"></el-table-column>
        <el-table-column prop="updateddateTime" label="要求时间" align="center"></el-table-column>
        <el-table-column prop="editVerdictAttachFile" label="修改后定案表" align="center" >
          <template slot-scope="scope">
            <download-button :value="scope.row.editVerdictAttachFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="editVerdictSynthDraftFile" label="修改后合成底稿" align="center">
          <template slot-scope="scope">
            <download-button :value="scope.row.editVerdictSynthDraftFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="approvedate" label="审核完成时间" align="center"></el-table-column>
        <el-table-column prop="isclientSatisfy" label="委托人是否认可" align="center" width="150">
          <template slot-scope="scope">
            <switch-button prop="isclientSatisfy" :data="scope.row" @change="networkUpData"></switch-button>
          </template>
        </el-table-column>
        <el-table-column prop="outPutdateTime" label="定案表出具时间" align="center" ></el-table-column>
        <el-table-column prop="verdictOutAttchFile" label="盖章扫描件" align="center">
          <template slot-scope="scope">
            <download-button :value="scope.row.verdictOutAttchFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column label="定案表详情" align="center">
          <template slot-scope="scope">
            <el-popover trigger="click" placement="top">
              <p>送审金额(元)：{{scope.row.sendAuditSum}}</p>
              <p>审定金额(元)：{{scope.row.auditSignSum}}</p>
              <div slot="reference">
                <el-tag size="medium">详细</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="250px" fixed="right">
          <template slot-scope="scope">
            <template v-if="scope.row.allstatuscode!=='7'">
              <el-button type="text" size="mini" @click="$refs.adjustmentRef.openDialog(scope.row)">重新调整</el-button>
              <el-button type="text" size="mini" @click="$refs.perfectRef.openDialog(scope.row)">完善信息</el-button>
              <submit-button v-if="scope.row.allstatuscode==='0'" title="提交审核" @click="submitExamine(scope.row)"></submit-button>

              <submit-button v-if="['2','5','6'].indexOf(scope.row.allstatuscode)!==-1"
                             title="办理盖章" @click="submitSeal(scope.row)"></submit-button>
            </template>
            <status-button code="088" :status="scope.row.allstatuscode"></status-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <preparation-add-dialog ref="addRef" title="新增定案表" @getFormData="networkAddData"></preparation-add-dialog>
      <preparation-adjustment-dialog ref="adjustmentRef" title="重新调整" @getFormData="networkAdjustmentData"></preparation-adjustment-dialog>
      <preparation-perfect-dialog ref="perfectRef" title="完善信息" @getFormData="networkUpData"></preparation-perfect-dialog>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import HeadRightButton from "../../button/HeadRightButton.vue"
  import PreparationAddDialog  from '../../dialog/preparationReports/PreparationAddDialog.vue'
  import PreparationAdjustmentDialog  from '../../dialog/preparationReports/PreparationAdjustmentDialog.vue'
  import PreparationPerfectDialog  from '../../dialog/preparationReports/PreparationPerfectDialog.vue'
  import {mapState} from 'vuex'
  import {getPreparation,addPreparation,upPreparation} from '../../../../../../../../api/workbench/webapi-projectCost.js'
  import {getItemFiles, getItemFileList} from '../../../../../../../../api/workbench/webapi-fileManager.js'
  export default {
    components: {
      HeadRightButton,
      PreparationAddDialog,
      PreparationAdjustmentDialog,
      PreparationPerfectDialog,
    },
    props: {},
    //生命周期函数节点
    created() {
      this.networkGetDatas()
      this.getProjectAnalysisFile()
    },
    mounted() {
    },
    watch: {},
    computed:{
      ...mapState('workbench',{
        currentItem:'currentItem'
      })
    },
    //数据节点
    data() {
      return {
        dataList:[],
        projectAnalysisFile:'',
      }
    },

    //自定义函数节点
    methods: {
      //获取土建工程指标分析表
      getProjectAnalysisFile(){
        let ref = {
          projectKeyid: this.currentItem.keyid,
          resourcename: '土建工程指标分析表',
        }
        getItemFiles(ref).then(items => {
          let item = items.data[0]
          if (!this.$myfunction.isEmpty(item)) {
            let ref = {
              resourcekeyid: item.keyid,
              filename: '土建工程指标分析表',
            }
            getItemFileList(ref).then(files => {
              this.projectAnalysisFile = files.data[0].fileAttch
            })
          }
        })
      },
      networkGetDatas() {
        let ref = {
          projectKeyid: this.currentItem.keyid,
          typecodename:this.title?this.title+'/定案表':'定案表',
          pkeyid:'0000'
        }
        getPreparation(ref).then(item => {
          this.treeTableDataFormat(item.data,'pro/ccverdicts/findwhere').then(item=>{
            this.dataList =item
          })
        })
      },
      networkAddData(formData) {
        let ref = {
          projectKeyid: this.currentItem.keyid,
          typecodename:this.title?this.title+'/定案表':'定案表',
          pkeyid:'0000'
        }
        Object.assign(formData, ref)
        addPreparation(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
      networkUpData(formData) {
        upPreparation(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
      networkAdjustmentData(formData){
        formData.allstatuscode='7'
        formData.allstatusname='true'
        upPreparation(formData).then(()=>{
          let ref={
            projectKeyid: this.currentItem.keyid,
            typecodename:this.title?this.title+'/定案表':'定案表',
            pkeyid:formData.keyid,
            verdictAttachFile:formData.editVerdictAttachFile,
            verdictSynthDraftFile:formData.editVerdictSynthDraftFile,
          }
          addPreparation(ref).then(item => {
            if (item.code === 200) {
              this.$message.success('调整成功')
              this.networkGetDatas()
            }
          })
        })

      },
      submitExamine(data) {
        this.$confirm("是否确定发起流程审批?","提示！",
        {confirmButtonText: "确定",cancelButtonText: "取消",type: "warning"}).then(async () => 
          {
            this.ddform('v_2020_ywgl_gczj_bgsh', {
                  c: {code: this.currentItem.contractCode, name: this.currentItem.contractName},
                  i: {code: this.currentItem.projectCode, name: this.currentItem.projectName},
                  fileList: [
                    {title: '文件', file: await this.getfile(data.reportsAttachFile)},
                    {title: '合成底稿', file: await this.getfile(data.reportsSynthDraftFile)},
                    {title: '土建工程指标分析', file: await this.getfile(this.projectAnalysisFile)},
                  ],
                  muitList:[{name:'备注',value:data.needDesc}]
                }).then(flowId=>{
                  data.allstatuscode='1'
                  this.networkUpData(data)
                  this.ddflow(2,3,{
                    baseId:data.keyid,
                    baseUrl:'/pro/ccverdicts',
                    baseColumn:'allstatuscode',//allstatuecode
                    flowId:flowId,
                    fType:'定案表'
                  })
                })
          }).catch(() => {this.$message({type: "info",message: "已取消发起流程！"});});
        
      },
      submitSeal(data){
            this.$msgbox.prompt('', '盖章份数', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                }).then(async ({value}) => {
                  this.ddform('v_2020_gxgl_tjgz', {
                    fileList: [
                      {title: '盖章附件', file: await this.getfile(data.reportsAttachFile)},
                    ],
                    muitList:[{name:'份数',value:value}]
                  }).then(flowId=>{
                    data.allstatuscode='4'
                    this.networkUpData(data)
                    this.ddflow(5,6,{
                      baseId:data.keyid,
                      baseUrl:'/pro/ccverdicts',
                      baseColumn:'allstatuscode',
                      flowId:flowId,
                      fType:'定案表'
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

</style>
