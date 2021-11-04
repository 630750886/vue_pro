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
              <el-form-item label="距离项目结束">{{form.endItemDay}}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="预估结束时间">{{endTime}}</el-form-item>
              <el-form-item label="距离归档结束">{{form.endFinalReportDay}}</el-form-item>
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
                
                  :header-cell-style="{fontSize:'10px'}">
          <el-table-column type="index" label="计划编号" align="center"></el-table-column>
          <el-table-column prop="begindateTime" label="计划开始时间" align="center"></el-table-column>
          <el-table-column prop="enddateTime" label="计划结束时间" align="center"></el-table-column>
          <el-table-column prop="postponeServiceDays" label="工作延期天数" align="center"></el-table-column>
          <el-table-column prop="postponeServiceDesc" label="工作延期原因" align="center"></el-table-column>
          <el-table-column prop="postponeFinalReportDays" label="归档延期天数" align="center"></el-table-column>
          <el-table-column prop="postponeFinalReportDesc" label="归档延期原因" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <status-button :title="scope.row.workplanstatusname"></status-button>
              <el-button type="text" size="mini" @click="showDataList(scope.row)">详细</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="dialog">
          <plan-info-dialog ref="planInfoRef" title="计划详细"></plan-info-dialog>
        </div>
      </div>
      <!--2020-11-09添加-->
      <attachDialog ref="attachRef" @submitAttach="startflow"></attachDialog>
    </template>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import PlanInfoDialog from "./component/EstablishWorkPlan/PlanInfoDialog.vue"
  import AddWorkPlan from "./component/EstablishWorkPlan/AddWorkPlan.vue"
  import attachDialog from "../../../../../../../components/flowControl/attachment.vue";
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import {startFlow} from "../../../../../../../api/webapi-flow.js";

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
          this.form.endItemDay = this.$myfunction.countdownTime(this.form.enddateTime)
          let endTime = this.$myfunction.addDayToDate(newValue.enddateTime, newValue.postponeFinalReportDays)
          this.form.endFinalReportDay = this.$myfunction.countdownTime(endTime)
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
      }
    },
    //生命周期函数节点
    created() {
      this.networkGetCurrWorkPlan()
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
          enddateTime: '',
          endItemDay: '',
          postponeServiceDays: data.postponeServiceDays,
          postponeFinalReportDays: data.postponeFinalReportDays,
          endFinalReportDay: '',
          postponeServiceDesc: data.postponeServiceDesc,
          postponeFinalReportDesc: data.postponeFinalReportDesc,
        }
        this.form = ref
      },
      showDataList(data) {
        this.$refs.planInfoRef.openDialog(data)
        this.networkGetWorkPlanList(data.keyid)
      },
      submitFormData(formData) {
        this.openWorkPlan = false;
        this.$confirm("是否确定发起流程审批?","提示！",
        {confirmButtonText: "确定",cancelButtonText: "取消",type: "warning"}).then(async () => 
          {
              this.ddform('v_2020_ywgl_gczx_tjgzjh', {
                  c: {code: this.currentItem.contractCode, name: this.currentItem.contractName},
                  i: {code: this.currentItem.projectCode, name: this.currentItem.projectName},
                  fileList: [{title: '工作作计划表', file: await this.ddfile({titleMessage: '工作作计划表'})}]
                }).then(item => {
                  this.networkAddWorkPlan(formData).then(ref => {
                    this.ddflow(2, 3, {
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
                  })
                })
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
