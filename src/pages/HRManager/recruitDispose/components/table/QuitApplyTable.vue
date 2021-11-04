<template>
  <div class="body">
    <div class="apply-time-box">
      <div class="apply-time">
        填表日期：
        <rea-datepicker class="date-picker" v-model="form.fillTime" size="small"></rea-datepicker>
      </div>
    </div>
    <div class="table-box">
      <el-form :model="form" ref="formRef" :rules="formRules">
        <table class="table">
          <tr>
            <td>姓名</td>
            <td>
              <input type="text" v-model="form.applyPerson"></input>
            </td>
            <td>性别</td>
            <td>
              <com-truefalse v-model="form.gender" true-title="男" false-title="女" size="mini"></com-truefalse>
            </td>
            <td>公司任职工龄</td>
            <td>
              <input type="text" v-model="form.workYears"></input>
            </td>
          </tr>
          <tr>
            <td>部门</td>
            <td>
              <input type="text" v-model="form.department"></input>
            </td>
            <td>职务</td>
            <td>
              <input type="text" v-model="form.postName"></input>
            </td>
            <td>申请离职日期</td>
            <td>
              <rea-datepicker class="date-picker" v-model="form.applyQuitTime" size="small"></rea-datepicker>
            </td>
          </tr>
          <tr>
            <td>离职类型</td>
            <td colspan="5">
              <rea-checkbox-group v-model="form.quitTypes" prop="listname" :data="quitType.list"></rea-checkbox-group>
            </td>
          </tr>
          <tr>
            <td>离职原因</td>
            <td colspan="5">
              <rea-checkbox-group v-model="form.quitReason" prop="listname" :data="quitReason.list"></rea-checkbox-group>
            </td>
          </tr>
          <tr>
            <td>上班截至日期</td>
            <td colspan="2">
              <rea-datepicker class="date-picker" v-model="form.workEndTime" size="small"></rea-datepicker>
            </td>
            <td>核准离职日期</td>
            <td colspan="2">
              <rea-datepicker class="date-picker" v-model="form.quitTime" size="small"></rea-datepicker>
            </td>
          </tr>
          <tr>
            <td>离职面谈</td>
            <td colspan="5">
              <textarea type="text" v-model="form.quitInterview" readonly></textarea>
            </td>
          </tr>
          <tr>
            <td colspan="6">部门审批</td>
          </tr>
          <tr>
            <td colspan="6">
              <textarea type="text" v-model="form.departmentOpinion" readonly></textarea>
            </td>
          </tr>
          <tr>
            <td colspan="6">人事审批</td>
          </tr>
          <tr>
            <td colspan="6">
              <textarea type="text" v-model="form.hrOpinion" readonly></textarea>
            </td>
          </tr>
          <tr>
            <td colspan="6">分管副总审批</td>
          </tr>
          <tr>
            <td colspan="6">
              <textarea type="text" v-model="form.vicePresidentOpinion" readonly></textarea>
            </td>
          </tr>
          <tr>
            <td colspan="6">总经理审批</td>
          </tr>
          <tr>
            <td colspan="6">
              <textarea type="text" v-model="form.generalManagerOpinion" readonly></textarea>
            </td>
          </tr>
        </table>
      </el-form>
    </div>

  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapGetters, mapMutations, mapActions} = createNamespacedHelpers('loadType')
  export default {
    components: {},
    props: {
      model: ''
    },
    model: {
      prop: 'model',
      event: 'getFormData'
    },
    watch: {
      model(newValue){
        this.form=newValue
      },
    },
    computed: {
      ...mapState({
        quitType:'quitType',
        quitReason:'quitReason'
      })
    },
    mounted(){
      Object.assign(this.form,this.model)
    },
    //数据节点
    data() {
      return {
        form: {
          fillTime: '',
          applyPerson: '',
          gender: '',
          workYears: '',
          department: '',
          postName: '',
          applyQuitTime: '',
          quitTypes: [],
          quitReason: [],
          workEndTime: '',
          quitTime: '',
          quitInterview: '',
          departmentOpinion: '',//部门审批
          hrOpinion: '',//人事审批
          vicePresidentOpinion: '',//分管副总审批
          generalManagerOpinion: '',//总经理审批
        },
        formRules: {},
      }
    },
    //生命周期函数节点
    created() {

    },
    //自定义函数节点
    methods: {
      resetForm() {
        this.form = this.$options.data().form
      },
      getFormData() {
        this.$refs.formRef.validate(valid => {
          if (!valid) return
          this.$emit('getFormData', this.$myfunction.copyData(this.form))
        })
      }
    }
  }
</script>
<style lang='less' scoped>
  .body {
    .apply-time-box {
      position: relative;
      height: 50px;
      line-height: 50px;
      .apply-time {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
    .table-box {
      .table {
        border: 1px rgba(200, 200, 200, 1) solid;
        width: 750px;
        height: 700px;
        tr {
          &:nth-child(1) {
            height: 30px;
          }
          &:nth-child(2) {
            height: 30px;
          }
          &:nth-child(3) {
            height: 50px;
          }
          &:nth-child(4) {
            height: 60px;
          }
          &:nth-child(5) {
            height: 30px;
          }
          &:nth-child(6) {
            height: 75px;
          }
          &:nth-child(7) {
            height: 30px;
          }
          &:nth-child(8) {
            height: 75px;
          }
          &:nth-child(9) {
            height: 30px;
          }
          &:nth-child(10) {
            height: 75px;
          }
          &:nth-child(11) {
            height: 30px;
          }
          &:nth-child(12) {
            height: 75px;
          }
          &:nth-child(13) {
            height: 30px;
          }
          &:nth-child(14) {
            height: 75px;
          }
          td {
            text-align: center;
            background: rgba(200, 200, 200, 0.3);
            input {
              height: 100%;
              width: 100%;
              text-align: center;
            }
            .date-picker {
              width: 100%;
            }
            textarea {
              height: 100%;
              width: 100%;
            }
            &:nth-child(1) {
              width: 100px;
            }
            &:nth-child(2) {
              width: 160px;
            }
            &:nth-child(3) {
              width: 80px;
            }
            &:nth-child(4) {
              width: 160px;
            }
            &:nth-child(5) {
              width: 100px;
            }
            &:nth-child(6) {
              width: 160px;
            }
          }
        }
      }
    }

  }


</style>
