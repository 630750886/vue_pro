<template>
  <div class="content el-scrollbar">
    <div class="button" v-if="!openWorkPlan">
      <el-button class="button " type="primary" size="mini" @click="openWorkPlan=!openWorkPlan">新建工作计划</el-button>
    </div>
    <template v-if="openWorkPlan">
      <div class="button">
        <el-button class="button " type="text" size="mini" @click="openWorkPlan=!openWorkPlan">&lt;--返回</el-button>
      </div>
      <add-work-plan :is-reset="openWorkPlan" @getFormData="submitFormData"></add-work-plan>
    </template>
    <rea-divider></rea-divider>
    <template v-if="!openWorkPlan">
      <div>
        <h4>当前工作计划状态</h4>
        <el-form :model="form">
          <el-row>
            <el-col :span="12">
              <el-form-item label="计划开始时间">{{form.begindateTime}}</el-form-item>
              <el-form-item label="距离项目结束">
                <template v-if="parseInt(this.currentItem.projectStatusKeyId) >= 2">
                  项目已结束
                </template>
                <template v-else>
                  {{form.endItemDay}}
                </template>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="预估结束时间">{{$myfunction.addDayToDate(form.enddateTime,form.finalReportDays+1)}}</el-form-item>
              <el-form-item label="距离归档结束">
                <template v-if="parseInt(this.currentItem.projectStatusKeyId) === 5">
                  项目已归档
                </template>
                <template v-else-if="parseInt(this.currentItem.projectStatusKeyId) === 6">
                  项目已取消
                </template>
                <template v-else>
                  {{form.endFinalReportDay}}
                </template>

              </el-form-item>
            </el-col>
          </el-row>
          <template v-if="form.postponeServiceDays!==''">
            <rea-divider :title="'工作延期天数：'+form.postponeServiceDays+'天'" position="left"></rea-divider>
            <rea-textarea v-model="form.postponeServiceDesc" min-height="10"></rea-textarea>
          </template>
          <template v-if="form.postponeFinalReportDays!==''">
            <rea-divider :title="'归档延期天数：'+form.postponeFinalReportDays+'天'" position="left"></rea-divider>
            <rea-textarea v-model="form.postponeFinalReportDesc" min-height="10"></rea-textarea>
          </template>
        </el-form>
      </div>
      <rea-divider></rea-divider>
      <!-- 历史工作计划 -->
      <div>
        <h4>历史工作计划</h4>
        <el-table :data="historyWorkPlan"
                  style="width: 100%"
                  align="center"
                  height="430px"
                  highlight-current-row
                  :header-cell-style="{fontSize:'10px'}" border>
          <el-table-column type="index" label="计划编号" align="center"></el-table-column>
          <el-table-column prop="begindateTime" label="计划开始时间" align="center"></el-table-column>
          <el-table-column prop="enddateTime" label="计划结束时间" align="center"></el-table-column>
          <el-table-column prop="postponeServiceDays" label="工作延期天数" align="center"></el-table-column>
          <el-table-column prop="postponeServiceDesc" label="工作延期原因" align="center">
            <template slot-scope="scope">
              <show-info-button :value="scope.row.postponeServiceDesc"></show-info-button>
            </template>
          </el-table-column>
          <el-table-column prop="postponeFinalReportDays" label="归档延期天数" align="center"></el-table-column>
          <el-table-column prop="postponeFinalReportDesc" label="归档延期原因" align="center">
            <template slot-scope="scope">
              <show-info-button :value="scope.row.postponeFinalReportDesc"></show-info-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="showDataList(scope.row)">详细</el-button>
              <status-button code="138" :status="scope.row.allstatuscode"></status-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="dialog">
          <plan-info-dialog ref="planInfoRef" title="计划详细"></plan-info-dialog>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import PlanInfoDialog from "./component/EstablishWorkPlan/PlanInfoDialog.vue"
  import AddWorkPlan from "./component/EstablishWorkPlan/AddWorkPlan.vue"
  import attachDialog from "../../../../../../../components/flowControl/attachment.vue";
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

  export default {
    components: {
      PlanInfoDialog,
      AddWorkPlan,
      attachDialog
    },
    props: {},
    watch: {
      currWorkPlan(newValue) {
        if (!this.$myfunction.isEmpty(newValue)) {
          this.initForm(newValue)
        }
      },
      'form.endItemDay': function (newValue) {
        this.form.endItemDay = newValue
      },
      openWorkPlan(newValue) {
        if (!newValue) {
          this.networkGetCurrWorkPlan()
          this.networkGetHistoryWorkPlan()
        }
      }
    },
    computed: {
      ...mapState({
        currentUser: 'currentUser'
      }),
      ...mapState('workbench', {
        currentItem: 'currentItem'
      }),
      ...mapState('workbench/aStage', {
        currWorkPlan: 'currWorkPlan',
        historyWorkPlan: 'historyWorkPlan'
      }),
      endTime() {
        let currTime = new Date()
        if (this.form.endFinalReportDay <= 0) {
          return '已结束'
        } else if (this.form.endFinalReportDay > 0) {
          return this.$myfunction.addDayToDate(currTime, this.form.endFinalReportDay)
        } else {
          return ''
        }
      }
    },
    //数据节点
    data() {
      return {
        openWorkPlan: false,
        num: 2,
        form: {
          begindateTime: '',
          enddateTime: '',
          endItemDay: '',
          postponeServiceDays: '',
          postponeFinalReportDays: '',
          estimateEndDay: '',
          endFinalReportDay: '',
          postponeServiceDesc: '',
          postponeFinalReportDesc: '',
        },
        formRules: {},
        //当前生效的计划编号
        currPlanKeyid:'',
        //当前生效的计划对应的流程实例
        planFlowId:''
      }
    },
    //生命周期函数节点
    created() {
      this.networkGetCurrWorkPlan().then(item=>{
        this.initForm(item)
      })
      this.networkGetHistoryWorkPlan()

    },
    //自定义函数节点
    methods: {
      ...mapActions('workbench/aStage', {
        networkGetCurrWorkPlan: 'networkGetCurrWorkPlan',
        networkGetHistoryWorkPlan: 'networkGetHistoryWorkPlan',
        networkGetWorkPlanList: 'networkGetWorkPlanList',
        networkAddWorkPlan: 'networkAddWorkPlan',
      }),
      initForm(data) {
        let ref = {
          begindateTime: data.begindateTime,
          enddateTime: data.enddateTime,
          endItemDay: '',
          postponeServiceDays: data.postponeServiceDays,
          postponeFinalReportDays: data.postponeFinalReportDays,
          endFinalReportDay: '',
          postponeServiceDesc: data.postponeServiceDesc,
          postponeFinalReportDesc: data.postponeFinalReportDesc,
          finalReportDays:data.finalReportDays
        }
        this.form = ref
        //获取当前生效项目计划编号
        this.currPlanKeyid=this.currentItem.projectPlanKeyid
        //获取当前生效计划流程实例
        this.getDataFlow(this.currPlanKeyid,'组建工作计划').then(flowId=>{
          this.planFlowId=flowId
        })
        this.form.endItemDay = this.$myfunction.countdownTime(this.form.enddateTime)
        //计算距离归档剩余的天数，enddateTime：项目计划完成时间，finalReportDays：归档的天数，
        // +1是因为addDayToDate函数的原因，
        let endTime = this.$myfunction.addDayToDate(data.enddateTime, data.finalReportDays+1)
        this.form.endFinalReportDay = this.$myfunction.countdownTime(endTime)
      },
      //查看计划详细
      showDataList(data) {
        this.$refs.planInfoRef.openDialog(data)
        this.networkGetWorkPlanList(data.keyid)
      },
      //提交计划审核
      submitFormData(formData) {
        this.openWorkPlan = false
        this.$confirm("是否确定发起流程审批?","提示！",
        {confirmButtonText: "确定",cancelButtonText: "取消",type: "warning"}).then(async () => 
	{
	 if (!this.$myfunction.isEmpty(this.currPlanKeyid)) {
          //项目已经有了工作计划 发起的是调整工作计划流程
          let historyFileInfo=await this.getFlowFile(this.planFlowId)
          this.ddform('v_2020_ywgl_xmgl_tzgzjh', {
            c: {code: this.currentItem.contractCode, name: this.currentItem.contractName},
            i: {code: this.currentItem.projectCode, name: this.currentItem.projectName},
            fileList: [
              {title: '原计划表', file: historyFileInfo},
              {title: '调整工作计划表', file: await this.ddfile({titleMessage: '调整工作计划表'})},
            ]
          }).then(item => {
            this.networkAddWorkPlan(formData).then(ref => {
              //备案计划流程
              this.ddflow(1, 2, {
                baseId: ref.keyid,
                baseUrl: 'pro/cmworkplan',
                baseColumn: 'allstatuscode',
                flowId: item,
                fType: '组建工作计划'
              }).then(item => {
                if (item.code === 200) {
                  this.$message.success('流程备案成功')
                }
              })
              //当流程审核成功后需要更改当前计划
              this.ddflow(ref.keyid, '', {
                baseId: this.currentItem.keyid,
                baseUrl: 'pro/cmbaseproject',
                baseColumn: 'projectPlanKeyid',
                flowId: item,
                fType: '变更当前计划'
              })
              //当流程审核通过后作废上一个计划
              this.ddflow(3,'',{
                baseId: this.currentItem.projectPlanKeyid,
                baseUrl: 'pro/cmworkplan',
                baseColumn: 'allstatuscode',
                flowId: item,
                fType: '废除当前计划'
              })
            })
          })
        }else {
          //第一次发起流程 发起的是提交工作计划流程
          this.ddform('v_2020_ywgl_xmgl_tjgzjh', {
            c: {code: this.currentItem.contractCode, name: this.currentItem.contractName},
            i: {code: this.currentItem.projectCode, name: this.currentItem.projectName},
            fileList: [{title: '工作计划表', file: await this.ddfile({titleMessage: '工作计划表'})}]
          }).then(item => {
            this.networkAddWorkPlan(formData).then(ref => {
              //备案计划流程
              this.ddflow(1, 2, {
                baseId: ref.keyid,
                baseUrl: 'pro/cmworkplan',
                baseColumn: 'allstatuscode',
                flowId: item,
                fType: '组建工作计划'
              })
              //当流程审核成功后需要更改当前计划
              this.ddflow(ref.keyid, '', {
                baseId: this.currentItem.keyid,
                baseUrl: 'pro/cmbaseproject',
                baseColumn: 'projectPlanKeyid',
                flowId: item,
                fType: '变更当前计划'
              })
              //当流程审核通过后该项目状态改为进行中
              this.ddflow(1, '', {
                baseId: this.currentItem.keyid,
                baseUrl: 'pro/cmbaseproject',
                baseColumn: 'projectStatusKeyId',
                flowId: item,
                fType: '变更项目状态'
              })
            })
          })
        }
	}).catch(() => {this.$message({type: "info",message: "已取消发起流程！"});});
      },
    }
  }
</script>
<style lang='less' scoped>
  .content {
    height: 630px;
    overflow-x: hidden;
    overflow-y: auto;
    span {
      color: #585858;
    }
    .el-row {
      margin-left: 10px;
    }
    .column {
      margin-left: 20px;
      margin-top: 5px;
      table {
        td {
          height: 60px;
          line-height: 60px;
          &:nth-child(2n) {
            span {
              color: #585858;
              margin-left: 20px;
            }
            width: 380px;
            padding-right: 20px;
          }
        }
      }
    }
  }
</style>
