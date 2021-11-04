<template>

  <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" @close="dialogClose" :close-on-click-modal="false">
    <el-form :model="form" ref="formRef" :rules="formRules" label-width="140px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="计划开始时间:">{{form.begindateTime}}</el-form-item>
          <el-form-item label="计划服务天数:">{{form.planServiceDays}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="计划完成时间:">{{form.enddateTime}}</el-form-item>
          <el-form-item label="计划回访及归档天数:">{{form.finalReportDays}}</el-form-item>
        </el-col>
      </el-row>
      <rea-divider title="服务类容"></rea-divider>
      <el-table :data="workPlanList" stripe :show-header="false">
        <el-table-column min-width="75px" align="right">服务名称：</el-table-column>
        <el-table-column prop="workItemName" min-width="100px" align="left"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <template v-if="scope.row.isShowPlanServiceDays">
              <el-table-column min-width="75px" align="right">计划时间：</el-table-column>
              <el-table-column prop="planServiceDays" min-width="100px" align="left"></el-table-column>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="prop" min-width="75px" align="right">工作类容：</el-table-column>
        <el-table-column prop="workItemContext" min-width="100px" align="left"></el-table-column>
        <el-table-column align="right" width="100px">
          <template slot-scope="scope">

          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <div>
      <dialog-button :reset-btn="{show:false}" @cancelBtn="dialogClose" :cancelBtn="{show:false}" @okBtn="submitFormData"></dialog-button>
    </div>
  </el-dialog>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import {mapState} from 'vuex'

  export default {
    components: {
    },
    props: {
      title: '',
      width: {
        type: String,
        default: '50%'
      },
    },
    watch: {

    },
    computed:{
      ...mapState({
        projectConsultWorkbenchService: state => state.loadType.projectConsultWorkbenchService.list,
        workPlanList:state=>state.workbench.aStage.workPlanList
      })
    },
    //数据节点
    data() {
      return {
        dialogVisible: false,
        form: {
          serviceContent:[]
        },
        formRules: {},
        start: '2020/1/1',
        end: '2020/2/2',
        num1: 10,
        num2: 10,
        services: [{
          no: 1,
          name: '现场踏勤',
          connet: '完成踏勤'
        },
          {
            no: 2,
            name: '会商',
            connet: '完成踏勤'
          },
          {
            no: 3,
            name: '其他',
            connet: '完成踏勤'
          },
        ]
      }
    },
    //生命周期函数节点
    created() {

    },
    //自定义函数节点
    methods: {
      openDialog(data) {
        if (!this.$myfunction.isEmpty(data)) {
          this.form=this.$myfunction.copyData(data)
        }
        this.dialogVisible = true
      },
      dialogClose() {
        this.dialogVisible = false
        this.resetForm()
      },
      submitFormData() {
        this.$emit('getFormData', this.$myfunction.copyData(this.form))
        this.dialogClose()
      },
      resetForm() {
        this.$refs.formRef.resetFields()
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
