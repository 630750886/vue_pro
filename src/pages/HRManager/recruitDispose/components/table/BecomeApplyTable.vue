<template>
  <div class="body">
    <el-form :model="form" ref="formRef" :rules="formRules">
      <div class="apply-time-box">
        <div class="apply-time">
          <div>
            填表日期：
          </div>
          <div>
            <rea-datepicker v-model="form.fillTime" size="small"></rea-datepicker>
          </div>
        </div>
      </div>
      <div class="table-box">
        <table class="table">
          <tr>
            <td>申请人</td>
            <td colspan="2">
              <input type="text" v-model="form.applyPerson" readonly></input>
            </td>
            <td>性别</td>
            <td colspan="2">
              <com-truefalse v-model="form.gender" true-title="男" false-title="女"></com-truefalse>
            </td>
          </tr>
          <tr>
            <td>学历</td>
            <td colspan="2">
              <rea-select v-model="form.education" prop="listname" :data="allEducation.list"  size="small"></rea-select>
            </td>
            <td>试用组织</td>
            <td colspan="2">
              <input type="text" v-model="form.organize"></input>
            </td>
          </tr>
          <tr>
            <td>试用开始时间</td>
            <td>
              <rea-datepicker class="date-picker" v-model="form.startTime" size="small"></rea-datepicker>
            </td>
            <td>试用结束时间</td>
            <td>
              <rea-datepicker class="date-picker" v-model="form.endTime" size="small"></rea-datepicker>
            </td>
            <td>试用期薪酬</td>
            <td>
              <input type="text" v-model="form.money"></input>
            </td>
          </tr>
          <tr>
            <td>个人工作总结</td>
            <td colspan="5">
              <textarea type="text" v-model="form.workSummary"></textarea>
            </td>
          </tr>
          <tr>
            <td>部门经理意见</td>
            <td colspan="5">
              <textarea type="text" v-model="form.departmentManagerOpinion" readonly></textarea>
            </td>
          </tr>
          <tr>
            <td>分管副总意见</td>
            <td colspan="5">
              <textarea type="text" v-model="form.departmentVicePresidentOpinion" readonly></textarea>
            </td>
          </tr>
          <tr>
            <td>人力资源分管副总意见</td>
            <td colspan="5">
              <textarea type="text" v-model="form.hrVicePresidentOpinion" readonly></textarea>
            </td>
          </tr>
          <tr>
            <td>总经理意见(中层以上)</td>
            <td colspan="5">
              <textarea type="text" v-model="form.generalManagerOpinion" readonly></textarea>
            </td>
          </tr>
        </table>
      </div>
    </el-form>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  export default {
    components: {
    },
    props: {
      model: ''
    },
    model: {
      prop: 'model',
      event: 'getFormData'
    },
    watch: {
      model(newValue) {
        this.form = newValue
      }
    },
    mounted(){
      Object.assign(this.form,this.model)
    },
    computed:{
        ...mapState({
          allEducation: state=>state.loadType.education
        })
    },
    //数据节点
    data() {
      return {
        form: {
          fillTime: '',
          applyPerson: '',
          gender: '',
          education: '',
          organize: '',
          group: '',
          startTime: '',
          endTime: '',
          money: '',
          workSummary: '',
          departmentManagerOpinion: '',//所在部门意见
          departmentVicePresidentOpinion: '',//分管副总意见
          hrVicePresidentOpinion: '',//人力资源分管副总意见
          generalManagerOpinion: '',//总经理(中层以上)意见
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
        div {
          float: left;
        }
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
            height: 30px;
          }
          &:nth-child(4) {
            height: 250px;
          }
          &:nth-child(5) {
            height: 75px;
          }
          &:nth-child(6) {
            height: 75px;
          }
          &:nth-child(7) {
            height: 75px;
          }
          &:nth-child(8) {
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
              width: 100px;
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
