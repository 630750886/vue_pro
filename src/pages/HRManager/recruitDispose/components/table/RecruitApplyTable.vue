<template>
  <div class="body">
    <div class="table-box">
      <el-form :model="form" ref="formRef" :rules="formRules">
        <table class="table">
          <tr>
            <td colspan="2">申请部门</td>
            <td colspan="3">
              <input type="text" v-model="form.applyDepartment" readonly></input>
            </td>
            <td colspan="2">招聘岗位</td>
            <td colspan="3">
              <rea-select v-model="form.recruitPost" :data="positionList" prop="posName" label="posName" :filter="{orgId:form.orgId}"></rea-select>
            </td>
          </tr>
          <tr>
            <td colspan="2">申请时间</td>
            <td colspan="3">
              <rea-datepicker v-model="form.applyTime" size="small"></rea-datepicker>
            </td>
            <td colspan="2">拟招聘人数</td>
            <td colspan="3">
              <input type="text" v-model="form.recruitNumber"></input>
            </td>
          </tr>
          <tr>
            <td colspan="2" rowspan="2">申请原因</td>
            <td colspan="8">
              <rea-checkbox-group v-model="form.applyTypes" :data="recruitType.list"></rea-checkbox-group>
            </td>
          </tr>
          <tr>
            <td colspan="8">
              <textarea type="text" v-model="form.applyReason"></textarea>
            </td>
          </tr>

          <tr>
            <td colspan="2">招聘紧急程度</td>
            <td colspan="8">
              <rea-checkbox-group v-model="form.urgency" :data="recruitDegree.list"></rea-checkbox-group>
            </td>
          </tr>
          <tr>
            <td colspan="2">岗位职责</td>
            <td colspan="8">
              <textarea type="text" v-model="form.postDuty"></textarea>
            </td>
          </tr>
          <tr>
            <td colspan="2" rowspan="4">任职要求</td>
            <td colspan="1">教育水平</td>
            <td colspan="3">
              <rea-select v-model="form.education" prop="listname" :data="education.list" size="small"></rea-select>
            </td>
            <td colspan="1">工作年限</td>
            <td colspan="3">
              <input type="text" v-model="form.workYears"></input>
            </td>
          </tr>
          <tr>
            <td colspan="1">专业要求</td>
            <td colspan="3">
              <input type="text" v-model="form.majorReason"></input>
            </td>
            <td colspan="1">性别要求</td>
            <td colspan="3">
              <com-truefalse v-model="form.genderReason" size="mini" true-title="男" false-title="女"></com-truefalse>
            </td>
          </tr>
          <tr>
            <td colspan="1">年龄要求</td>
            <td colspan="3">
              <input type="text" v-model="form.ageReason"></input>
            </td>
            <td colspan="1">特定工作经历</td>
            <td colspan="3">
              <input type="text" v-model="form.experience"></input>
            </td>
          </tr>
          <tr>
            <td colspan="1">其他要求</td>
            <td colspan="7">
              <textarea type="text" v-model="form.otherReason"></textarea>
            </td>
          </tr>

          <tr>
            <td colspan="2">部门经理意见</td>
            <td colspan="8">
              <textarea type="text" v-model="form.departmentManagerOpinion" :readonly="true"></textarea>
            </td>
          </tr>
          <tr>
            <td colspan="2">部门分管副总意见</td>
            <td colspan="8">
              <textarea type="text" v-model="form.departmentVicePresidentOpinion" :readonly="true"></textarea>
            </td>
          </tr>
          <tr>
            <td colspan="2">人力资源分管副总批示</td>
            <td colspan="8">
              <textarea type="text" v-model="form.hrVicePresidentOpinion" :readonly="true"></textarea>
            </td>
          </tr>
        </table>
      </el-form>
    </div>

  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  export default {
    components: {
    },
    props: {
      model: {type:String}
    },
    model: {
      prop: 'model',
      event: 'getFormData'
    },
    watch: {
      model(newValue) {
        this.form = newValue
      },
    },
    mounted() {
      Object.assign(this.form,this.model)
    },
    computed: {
      ...mapState({
        recruitType: state=>state.loadType.recruitType,
        recruitDegree: state=>state.loadType.recruitDegree,
        positionList: state=>state.loadType.positionList,
        education: state=>state.loadType.education,
      })
    },
    //数据节点
    data() {
      return {
        form: {
          orgId:'',
          applyDepartment: '',
          recruitPost: '',
          applyTime: '',
          recruitNumber: '',
          applyTypes: [],
          applyReason: '',
          urgency: [],//
          postDuty: '',
          education: '',
          workYears: '',
          majorReason: '',
          genderReason: '',
          ageReason: '',
          experience: '',
          otherReason: '',
          departmentManagerOpinion: '',//部门经理意见
          departmentVicePresidentOpinion: '',//部门分管副总意见
          hrVicePresidentOpinion: ''//人力资源分管副总意见
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
        this.$emit('getFormData', this.$myfunction.copyData(this.form))
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
        width: 100%;
        tr {
          height: 30px;
          &:nth-child(4) {
            height: 80px;
            td {
              textarea {
                height: 80px;
              }
            }
          }
          &:nth-child(5) {
            height: 120px;
            td {
              &:nth-child(2) {
                text-align: left;
              }
            }
          }
          &:nth-child(6) {
            height: 120px;
            td {
              textarea {
                height: 120px;
              }
            }
          }
          &:nth-child(10) {
            height: 120px;
            td {
              textarea {
                height: 120px;
              }
            }
          }
          &:nth-child(11) {
            height: 120px;
            td {
              textarea {
                height: 120px;
              }
            }
          }
          &:nth-child(12) {
            height: 120px;
            td {
              textarea {
                height: 120px;
              }
            }
          }
          &:nth-child(13) {
            height: 120px;
            td {
              textarea {
                height: 120px;
              }
            }
          }
          td {
            width: 100px;
            text-align: center;
            background: rgba(200, 200, 200, 0.3);
            input {
              height: 30px;
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
          }
        }
      }
    }

  }


</style>
