<template>
  <div class="body">
    <div class="table-box">
      <el-form :model="form" ref="formRef" :rules="formRules">
        <table class="table">
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colspan="2">员工姓名</td>
            <td colspan="2">
              <input type="text" v-model="form.personName"></input>
            </td>
            <td colspan="2">性别</td>
            <td colspan="2">
              <com-truefalse v-model="form.gender" false-title="女" true-title="男"></com-truefalse>
            </td>
            <td colspan="2">出生年月</td>
            <td colspan="2">
              <rea-datepicker class="date-picker" v-model="form.birthday" size="small"></rea-datepicker>
            </td>
          </tr>
          <tr>
            <td colspan="2">所在组织</td>
            <td colspan="2">
              <input type="text" v-model="form.oldOrganize"></input>
            </td>
            <td colspan="2">现岗位</td>
            <td colspan="2">
              <input type="text" v-model="form.oldPost"></input>
            </td>
            <td colspan="2">现工资级别档次</td>
            <td colspan="2">
              <input type="text" v-model="form.oldWagesLevel"></input>
            </td>
          </tr>
          <tr>
            <td colspan="2">拟调组织</td>
            <td colspan="2">
              <rea-cascader v-model="form.orgId"
                            prop="keyid"
                            label="label"
                            size="small"
                            :data="organizeList" checkStrictly></rea-cascader>
            </td>
            <td colspan="2">新岗位</td>
            <td colspan="2">
              <rea-select v-model="form.newPost"
                          :data="getPostList(form.orgId)"
                          size="small"
                          prop="posName"
                          label="posName"></rea-select>
            </td>
            <td colspan="2">拟工资级别档次</td>
            <td colspan="2">
              <input type="text" v-model="form.newWagesLevel"></input>
            </td>
          </tr>
          <tr>
            <td colspan="2">入司时间</td>
            <td colspan="2">
              <rea-datepicker class="date-picker" v-model="form.entryTime" size="small"></rea-datepicker>

            </td>
            <td colspan="2">文化程度</td>
            <td colspan="2">
              <input type="text" v-model="form.education"></input>
            </td>
            <td colspan="2">级差</td>
            <td colspan="2">
              <input type="text" v-model="form.levelDisparity"></input>
            </td>
          </tr>
          <tr>
            <td colspan="1">所在部门意见</td>
            <td colspan="12">
              <textarea type="text" v-model="form.departmentOpinion" :readonly="true"></textarea>
            </td>
          </tr>
          <tr>
            <td colspan="1">人力资源经理意见</td>
            <td colspan="12">
              <textarea type="text" v-model="form.hrVicePresidentOpinion" :readonly="true"></textarea>
            </td>
          </tr>
          <tr>
            <td colspan="1">分管副总意见</td>
            <td colspan="12">
              <textarea type="text" v-model="form.vicePresidentOpinion" :readonly="true"></textarea>
            </td>
          </tr>
          <tr>
            <td colspan="1">总经理意见</td>
            <td colspan="12">
              <textarea type="text" v-model="form.generalManagerOpinion" :readonly="true"></textarea>
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
    computed: {
      ...mapState({
        organizeList: 'organizeList',
        positionList: 'positionList'
      })
    },
    watch: {
      model(newValue){
        this.form=newValue
      },
      'form.orgId':function (newValue) {
        this.form.newPost=''
        let ref=this.positionList.find(item=>{
          if (item.orgId === newValue) {
            return item
          }
        })
        if (!this.$myfunction.isEmpty(ref)) {
          this.form.newOrganize=ref.orgName
        }
      }
    },
    mounted() {
      Object.assign(this.form,this.model)
    },
    //数据节点
    data() {
      return {
        form: {
          orgId:'',
          personName: '',
          gender: '',
          birthday: '',
          oldOrganize: '',
          oldPost: '',
          oldWagesLevel: '',
          newOrganize: '',
          newPost: '',
          newWagesLevel: '',
          entryTime: '',
          education: '',
          levelDisparity: '',

          departmentOpinion: '',//所在部门意见
          hrVicePresidentOpinion: '',//人力资源分管副总意见
          vicePresidentOpinion: '',//分管副总意见
          generalManagerOpinion: '',//总经理意见
        },
        formRules: {},
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      getPostList(value) {
        return this.positionList.filter(item => {
          if (item.orgId === value) return item
        })
      },
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
        width: 100%;
        tr {
          height: 30px;
          &:nth-child(1) {
            height: 0;
            td {
              height: 0;
              background: white;
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
          &:nth-child(7) {
            height: 120px;
            td {
              textarea {
                height: 120px;
              }
            }
          }
          &:nth-child(8) {
            height: 120px;
            td {
              textarea {
                height: 120px;
              }
            }
          }
          &:nth-child(9) {
            height: 120px;
            td {
              textarea {
                height: 120px;
              }
            }
          }
          td {
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
            &:nth-child(1) {
              width: 50px;
            }
            &:nth-child(2) {
              width: 50px;
            }
            &:nth-child(3) {
              width: 50px;
            }
            &:nth-child(4) {
              width: 50px;
            }
            &:nth-child(5) {
              width: 50px;
            }
            &:nth-child(6) {
              width: 50px;
            }
            &:nth-child(7) {
              width: 50px;
            }
            &:nth-child(8) {
              width: 50px;
            }
            &:nth-child(9) {
              width: 50px;
            }
            &:nth-child(10) {
              width: 50px;
            }
            &:nth-child(11) {
              width: 50px;
            }
            &:nth-child(12) {
              width: 50px;
            }
          }
        }
      }
    }

  }


</style>
