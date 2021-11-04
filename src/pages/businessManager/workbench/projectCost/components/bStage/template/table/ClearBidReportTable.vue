<template>
  <div class="column">
    <div class="button">
      <head-right-button title="新增清标报告" @click="$refs.addRef.openDialog()"></head-right-button>
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
                :tree-props="{children: 'children',hasChildren: 'isShow'}" @expand-change="handleExpandChange">
        <el-table-column fixed prop="createddateTime" label="创建时间" align="left" min-width="120px"><template slot-scope="scope">{{scope.row.createddateTime|datefmt('YYYY/MM/DD')}}</template></el-table-column>
        <el-table-column prop="probeBookFile" label="附件" align="center">
          <template slot-scope="scope">
            <download-button :value="scope.row.probeBookFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="needDesc" label="修改要求" align="center" width="150"></el-table-column>
        <el-table-column prop="updateddateTime" label="要求时间" align="center" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.pkeyid!==''">{{scope.row.updateddateTime}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="probeBookAttachFile" label="修改后清标报告" align="center">
          <template slot-scope="scope">
            <download-button :value="scope.row.probeBookAttachFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="approvedate" label="审核完成时间" align="center"></el-table-column>
        <el-table-column prop="isclientSatisfy" label="委托人是否认可" align="center" width="150">
          <template slot-scope="scope">
            <switch-button prop="isclientSatisfy" :data="scope.row" @change="networkUpData"></switch-button>
          </template>
        </el-table-column>
        <el-table-column prop="outPutdateTime" label="报告出具时间" align="center"></el-table-column>
        <el-table-column prop="probeBookOutAttchFile" label="盖章扫描件" align="center">
          <template slot-scope="scope">
            <download-button :value="scope.row.probeBookOutAttchFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="250px" fixed="right">
          <template slot-scope="scope">
            <template v-if="scope.row.allstatuscode!=='7'">
              <el-button type="text" size="mini" @click="$refs.adjustmentRef.openDialog(scope.row)">重新调整</el-button>
              <el-button type="text" size="mini" @click="$refs.perfectRef.openDialog(scope.row)">完善信息</el-button>
              <submit-button v-if="scope.row.allstatuscode==='0'" title="提交审核" @click="submitExamine(scope.row)"></submit-button>
              <submit-button v-if="['2','5','6'].indexOf(scope.row.allstatuscode)!==-1" title="办理盖章" @click="submitSeal(scope.row)"></submit-button>
            </template>
            <status-button code="088" :status="scope.row.allstatuscode"></status-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <clear-bid-add-dialog ref="addRef" title="新增补充鉴定" @getFormData="networkAddData"></clear-bid-add-dialog>
      <clear-bid-adjustment-dialog ref="adjustmentRef" title="重新调整" @getFormData="networkAdjustmentData"></clear-bid-adjustment-dialog>
      <clear-bid-perfect-dialog ref="perfectRef" title="完善鉴定书信息" @getFormData="networkAddData"></clear-bid-perfect-dialog>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import HeadRightButton from "../../button/HeadRightButton.vue"
  import ClearBidAddDialog from '../../dialog/ClearBid/ClearBidAddDialog.vue'
  import ClearBidAdjustmentDialog from '../../dialog/ClearBid/ClearBidAdjustmentDialog.vue'
  import ClearBidPerfectDialog from '../../dialog/ClearBid/ClearBidPerfectDialog.vue'
  import {mapState} from 'vuex'
  import {getAppraisalOpinion,addAppraisalOpinion,upAppraisalOpinion } from '../../../../../../../../api/workbench/webapi-projectCost.js'

  export default {
    components: {
      HeadRightButton,
      ClearBidAddDialog,
      ClearBidAdjustmentDialog,
      ClearBidPerfectDialog,
    },
    props: {},
    //生命周期函数节点
    created() {
      this.networkGetDatas()
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
        dataList:[]
      }
    },

    //自定义函数节点
    methods: {
      networkGetDatas() {
        let ref = {
          projectKeyid: this.currentItem.keyid,
          probeBookTypeCode:'clearbidreport',
          pkeyid:'0000'
        }
        getAppraisalOpinion(ref).then(item => {
          this.treeTableDataFormat(item.data,'pro/ccappprobebook/findwhere').then(item=>{
            this.dataList =item
          })
        })
      },
      networkAddData(formData) {
        let ref = {
          projectKeyid: this.currentItem.keyid,
          probeBookTypeCode:'clearbidreport',
          probeBookTypeName:'清标报告',
          pkeyid:'0000'
        }
        Object.assign(formData, ref)
        addAppraisalOpinion(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
      networkUpData(formData) {
        if (!this.$myfunction.isEmpty(formData.pkeyid)) {
          getAppraisalOpinion({keyid:formData.pkeyid}).then(item=>{
            let ref=item.data[0]
            ref.probeBookCode=formData.probeBookCode
            this.networkUpData(ref)
          })
        }
        upAppraisalOpinion(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
      networkAdjustmentData(formData){
        formData.allstatuscode='7'
        formData.allstatusname='true'
        upAppraisalOpinion(formData).then(()=>{
          let ref={
            projectKeyid: this.currentItem.keyid,
            probeBookTypeCode:'clearbidreport',
            probeBookTypeName:'清标报告',
            pkeyid:formData.keyid,
            probeBookFile:formData.probeBookAttachFile
          }
          addAppraisalOpinion(ref).then(item => {
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
          this.ddform('v_2020_ywgl_gczj_qt', {
          c: {code: this.currentItem.contractCode, name: this.currentItem.contractName},
          i: {code: this.currentItem.projectCode, name: this.currentItem.projectName},
          fileList: [
            {title: '审核附件', file:await this.getfile(data.probeBookFile)},
          ],
          muitList:[{name:'备注',value:data.needDesc}]
        }).then(flowId=>{
          data.allstatuscode='1'
          this.networkUpData(data)
          this.ddflow(2,3,{
            baseId:data.keyid,
            baseUrl:'/pro/ccappprobebook',
            baseColumn:'allstatuscode',//allstatuecode
            flowId:flowId,
            fType:'其他'
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
                      {title: '盖章附件', file:await this.getfile(data.reportsAttachFile)},
                    ],
                    muitList:[{name:'份数',value:value}]
                  }).then(flowId=>{
                    data.allstatuscode='4'
                    this.networkUpData(data)
                    this.ddflow(5,6,{
                      baseId:data.keyid,
                      baseUrl:'/pro/ccappprobebook',
                      baseColumn:'allstatuscode',
                      flowId:flowId,
                      fType:'其他'
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
