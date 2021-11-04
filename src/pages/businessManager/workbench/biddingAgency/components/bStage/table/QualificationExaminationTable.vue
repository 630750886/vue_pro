<template>
  <div class="b-main">
    <div>
      <head-right-button @click="$refs.addRef.openDialog()" title="新建"></head-right-button>
    </div>
    <div>
      <el-table :data="dataList" style="width: 100%" align="center" height="430px" highlight-current-row
                :header-cell-style="{fontSize:'10px'}" border>
        <el-table-column prop="filesalename" label="分包/分标段名称" align="center" width="100"></el-table-column>
        <el-table-column prop="bidOpeningdateTime" label="开标日期" align="center" width="100"></el-table-column>
        <el-table-column label="专家构成" align="center" width="150">
          <template slot-scope="scope">
            <template v-if="scope.row.poolExpert!=='' && scope.row.ownerExpert!==''">
              {{scope.row.poolExpert}}+{{scope.row.ownerExpert}}(业主)={{scope.row.poolExpert+scope.row.ownerExpert}}(名)
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="getexpertFile" label="抽取专家的相关资料" align="center" width="170">
          <template slot-scope="scope">
            <download-button :value="scope.row.getexpertFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="ownerRepresentativeFile" label="业主代表专家的授权委托书" align="center" width="200">
          <template slot-scope="scope">
            <download-button :value="scope.row.ownerRepresentativeFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="inRepresentativeFile" label="进场交易授权委托书" align="center" width="150">
          <template slot-scope="scope">
            <download-button :value="scope.row.inRepresentativeFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="bidInInfoFile" label="投标文件递送情况记录表" align="center" width="200">
          <template slot-scope="scope">
            <download-button :value="scope.row.bidInInfoFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="expertSignFile" label="专家签到表" align="center" width="100">
          <template slot-scope="scope">
            <download-button :value="scope.row.expertSignFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="openBidRecordFile" label="开标记录表" align="center" width="100">
          <template slot-scope="scope">
            <download-button :value="scope.row.openBidRecordFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="ownerSignFile" label="主管部门,业主,来宾签到表" align="center" width="200">
          <template slot-scope="scope">
            <download-button :value="scope.row.ownerSignFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="expertExamFile" label="评标专家个人打分表及汇总" align="center" width="200">
          <template slot-scope="scope">
            <download-button :value="scope.row.expertExamFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="tenderfile" label="投标文件" align="center" width="100">
          <template slot-scope="scope">
            <com-popover :label-prop="filesTemplate" prop="value" :data="scope.row.tenderfile"></com-popover>
          </template>
        </el-table-column>
        <el-table-column prop="bidReportFile" label="评标报告" align="center" width="100">
          <template slot-scope="scope">
            <download-button :value="scope.row.bidReportFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="biddingFile" label="中标确认函" align="center" width="100">
          <template slot-scope="scope">
            <download-button :value="scope.row.biddingFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="150">
          <template slot-scope="scope">
<!--            <el-button type="text" size="mini" @click="$refs.updateRef.openDialog(scope.row)">修改</el-button>-->
            <el-button type="primary" plain size="mini" @click="$refs.perfectRef.openDialog(scope.row)">登记</el-button>
            <el-button type="primary" plain size="mini" @click="delQua(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="dialog">
<!--      title="新增开标评标"-->
      <add-evaluation-dialog :type-code="typeCode"  width="30%" ref="addRef"
                             @getFormData="networkAddData"></add-evaluation-dialog>
      <add-evaluation-dialog :type-code="typeCode" title="修改" width="30%" ref="updateRef"
                             @getFormData="networkUpData"></add-evaluation-dialog>
<!--       title="完善开标评标信息"-->
      <perfect-evaluation-dialog width="40%" ref="perfectRef"
                                 @getFormData="submitFormData" @removeData="networkDelTenderFileData"></perfect-evaluation-dialog>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import AddEvaluationDialog from "../dialog/QualificationExaminationTable/AddEvaluationDialog.vue"
  import PerfectEvaluationDialog from "../dialog/QualificationExaminationTable/PerfectEvaluationDialog.vue"
  import HeadRightButton from "../button/HeadRightButton.vue"
  import {mapState} from 'vuex'
  import {
    getQualificationExamination,
    addQualificationExamination,
    upQualificationExamination,
    addBiddingFile,
    delBiddingFile,
    delQualificationExamination
  } from '../../../../../../../api/workbench/webapi-biddingAgency.js'
  import {delPretrial} from "../../../../../../../api/workbench/webapi-biddingAgency";

  export default {
    components: {
      AddEvaluationDialog,
      PerfectEvaluationDialog,
      HeadRightButton,
    },
    props: {
      typeCode: [String],
    },
    watch: {},
    computed: {
      ...mapState('workbench', {
        currentItem: 'currentItem'
      })
    },
    //数据节点
    data() {
      return {
        dataList: [],
        filesTemplate: [
          {value: 'signUpName', label: '单位'},
          {value: 'tenderFile', label: '附件', type: 'file'}
        ],
      }
    },
    //生命周期函数节点
    created() {
      this.networkGetDataList()
    },
    //自定义函数节点
    methods: {
      delQua(data){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delQualificationExamination({keyid:data.keyid}).then(item => {
            if (item.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.networkGetDataList()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      networkGetDataList() {
        let ref = {
          projectKeyid: this.currentItem.keyid,
          typecode: this.typeCode
        }
        getQualificationExamination(ref).then(item => {
          this.dataList = item.data
        })
      },
      networkAddData(formData) {
        formData.projectKeyid = this.currentItem.keyid
        formData.typecode = this.typeCode
        addQualificationExamination(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDataList()
          }
        })
      },
      networkUpData(formData) {
        upQualificationExamination(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDataList()
          }
        })
      },
      submitFormData(formData) {
        upQualificationExamination(formData).then( item => {
          if (item.code === 200) {
            this.$message.success(item.message)
             formData.tenderfile.forEach(async ref => {
              if (!ref.keyid) {
                ref.openingEvaluationKeyid = formData.keyid
                addBiddingFile(ref).then(()=>{
                  this.networkGetDataList()
                })
              }
            })
          }
        })
      },
      networkDelTenderFileData(dataList){
        dataList.forEach(item=>{
          delBiddingFile(item).then(()=>{
            this.networkGetDataList()
          })
        })
      }
    }
  }
</script>
<style lang='less' scoped>
  .b-main {
    height: 80%;
  }
</style>
