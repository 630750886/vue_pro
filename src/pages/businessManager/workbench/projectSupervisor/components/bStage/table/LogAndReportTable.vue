<template>
  <div class="b-main">
    <div class="page-head">
      <el-row>
        <el-col :span="3">
          <div style="height: 35px;line-height: 35px;font-size: 14px;margin-left: 5px">
            {{year+'年'+month+'月'}}
          </div>
        </el-col>
        <el-col :span="9">
          <div>
            监理月报：
            <upload-button v-model="monthlyReport.reportDataFile" @getValue="networkAddMonthlyReport"></upload-button>
            <download-button :value="monthlyReport.reportDataFile"></download-button>
          </div>
        </el-col>
        <el-col :span="12">
          <div v-if="isShow" style="font-size: 14px;margin-right: 5px;float: right">
            <el-button-group>
              <el-button size="mini" @click="reduceMonth">上一月</el-button>
              <el-button size="mini" @click="init">本月</el-button>
              <el-button size="mini" @click="increaseMonth">下一月</el-button>
            </el-button-group>
            <el-button style="margin-left: 10px" type="primary" size="mini" @click="$refs.establishRef.openDialog()">创建日志</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-table :data="dataList"
              highlight-current-row
              :default-sort="{prop:'day',order: 'ascending'}"
              max-height="400px"
              :header-cell-style="{fontSize:'14px'}"
              >
      <el-table-column prop="day" label="日期" align="center" width="120px">
        <template slot-scope="scope">
          <template v-if="scope.row.day+''===new Date().getDate()+''">
            <span>今天</span>
          </template>
          <template v-else>
            {{scope.row.day}}
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="dailyRecorddateTime" label="星期" align="center" width="100px">
        <template slot-scope="scope">
          <span style="font-size: 8px">{{getDay(scope.row.year+'/'+scope.row.month+'/'+scope.row.day)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="log" label="监理日志" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="$refs.addLogRef.openDialog(scope.row.dailyRecords)">
            <span v-if="scope.row.dailyRecords.allstatusname==='true'" style="color: #FFCF10">在线填写</span>
            <span v-else>在线填写</span>
          </el-button>
          <upload-button v-model="scope.row.dailyRecords.dailyRecordfile"
                         @getValue="networkUpSupervisorLog(scope.row.dailyRecords)"></upload-button>
          <download-button :value="scope.row.dailyRecords.dailyRecordfile"></download-button>
        </template>
      </el-table-column>
      <el-table-column prop="safetyLog" label="监理安全日志" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="$refs.addSafeLog.openDialog(scope.row.safeDailys)">
            <span v-if="scope.row.safeDailys.allstatusname==='true'" style="color: #FFCF10">在线填写</span>
            <span v-else>在线填写</span>
          </el-button>
          <upload-button v-model="scope.row.safeDailys.dailyRecordfile"
                         @getValue="networkUpSafeLog(scope.row.safeDailys)"></upload-button>
          <download-button :value="scope.row.safeDailys.dailyRecordfile"></download-button>
        </template>
      </el-table-column>
      <el-table-column prop="record" label="旁站记录" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="$refs.addInspectLog.openDialog(scope.row.sideStations)">
            <span v-if="scope.row.sideStations.allstatusname==='true'" style="color: #FFCF10">在线填写</span>
            <span v-else>在线填写</span>
          </el-button>
          <upload-button v-model="scope.row.sideStations.dailyRecordfile"
                         @getValue="networkUpInspectLog(scope.row.sideStations)"></upload-button>
          <download-button :value="scope.row.sideStations.dailyRecordfile"></download-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="dialog">
      <add-log-dialog title="监理日志" width="50%" ref="addLogRef" @getFormData="networkUpSupervisorLog"></add-log-dialog>
      <add-safe-log-dialog title="监理(安全)日志" width="50%" ref="addSafeLog" @getFormData="networkUpSafeLog"></add-safe-log-dialog>
      <add-inspect-dialog title="旁站日志" width="50%" ref="addInspectLog" @getFormData="networkUpInspectLog"></add-inspect-dialog>
      <establish-log-dialog title="创建日志记录" width="35%" ref="establishRef" @getFormData="networkAddData"></establish-log-dialog>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import AddLogDialog from '../dialog/AddLogDialog.vue'
  import AddSafeLogDialog from '../dialog/AddSafeLogDialog.vue'
  import AddInspectDialog from '../dialog/AddInspectDialog.vue'
  import EstablishLogDialog from '../dialog/EstablishLogDialog.vue'
  import {
    getLogs,
    addLogs,
    getMonthlyReport,
    addMonthlyReport,
    upMonthlyReport,
    addSupervisorLog,
    addSafeLog,
    addInspectLog,
    upSupervisorLog,
    upSafeLog,
    upInspectLog,
    getAscertainTime
  } from '../../../../../../../api/workbench/webapi-projectSupervisor.js'
  import {mapState} from 'vuex'

  export default {
    components: {
      AddLogDialog,
      AddSafeLogDialog,
      AddInspectDialog,
      EstablishLogDialog,
    },
    props: {},
    watch: {
      month(newValue,oldValue) {
        this.networkGetDataList()
      }
    },
    computed: {
      ...mapState('workbench', {
        currentItem: 'currentItem'
      })
    },
    //数据节点
    data() {
      return {
        isShowAddBtn:true,
        isShow:false,
        minYear:'',
        minMonth:'',
        maxYear:'',
        maxMonth:'',
        year: '',//年
        month: '',//月
        day: '',//日
        weekDay: ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        dataList: [],
        monthlyReport: {//月报
          keyid:'',
          reportDataFile: '',
        },
      }

    },
    //生命周期函数节点
    created() {
      this.init()
      this.networkGetData()
    },
    //自定义函数节点
    methods: {
      //初始化时间
      init() {
        getAscertainTime({ projectKeyid:this.currentItem.keyid,}).then(item=>{
          if (item.data[0]) {
            this.isShow=true
            this.minYear=new Date(item.data[0].buildBegindateTime).getFullYear()
            this.minMonth=new Date(item.data[0].buildBegindateTime).getMonth() + 1
            this.maxYear=new Date(item.data[0].buildEnddateTime).getFullYear()
            this.maxMonth=new Date(item.data[0].buildEnddateTime).getMonth() + 1
          }
        })
        this.year = new Date().getFullYear()
        this.month = new Date().getMonth() + 1
        this.day = new Date().getDate()
        this.networkGetDataList()
      },
      //获取星期几
      getDay(date) {
        return this.weekDay[new Date(date).getDay()]
      },
      //月数-1
      reduceMonth() {
        if (this.month === this.minMonth) {

        }else {
          this.month--
        }

        if (this.month === 0) {
          this.month = 12
          this.year--
        }
        if (this.year<this.minYear) {
          this.year=this.minYear
        }

      },
      //月数+1
      increaseMonth() {
        if (this.month === this.maxMonth) {

        }else {
          this.month++
        }
        if (this.month === 13) {
          this.month = 1
          this.year++
        }
        if (this.year>this.maxYear) {
          this.year=this.maxYear
        }

      },
      //获取当月全部信息
      networkGetDataList() {
        let ref = {
          projectKeyid: this.currentItem.keyid,
          year: this.year,
          month: this.month
        }
        getLogs(ref).then(item => {
          this.dataList = item.data
        })
        //获取月报
        getMonthlyReport(ref).then(item=>{
          this.monthlyReport=this.$options.data().monthlyReport
          if (item.data[0]) {
            this.monthlyReport=item.data[0]
          }
        })
      },
      //添加当天信息
      networkAddData(formData) {
        formData.projectKeyid= this.currentItem.keyid
        addLogs(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            this.isShowAddBtn=false
            this.init()
          }
        })
      },
      //获取今天信息
      networkGetData(){
        let date = new Date()
        let ref = {
          projectKeyid: this.currentItem.keyid,
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        }
        getLogs(ref).then(item=>{
          if (item.data[0]) {
            this.isShowAddBtn=false
          }else {
            this.isShowAddBtn=true
          }
        })
      },
      //获取月报
      networkAddMonthlyReport(file){
        let ref={
          projectKeyid: this.currentItem.keyid,
          keyid:this.monthlyReport.keyid,
          year:this.year,
          month:this.month,
          reportDataFile:file
        }
        addMonthlyReport(ref)
      },
      //更改监理日志
      networkUpSupervisorLog(formData){
        upSupervisorLog(formData).then(item=>{
          if (item.code === 200) {
            this.networkGetDataList()
          }
        })
      },
      //更改安全日志
      networkUpSafeLog(formData){
        upSafeLog(formData).then(item=>{
          if (item.code === 200) {
            this.networkGetDataList()
          }
        })
      },
      //更改旁站记录
      networkUpInspectLog(formData){
        upInspectLog(formData).then(item=>{
          if (item.code === 200) {
            this.networkGetDataList()
          }
        })
      }
    }
  }
</script>
<style lang='less' scoped>
  .b-main {
  }

  .item {
    margin-top: 10px;
    margin-right: 40px;
    font-size: 10px;
  }
</style>
