<template>
  <div class="body">
    <div class="button">
      <head-right-button title="新增询价与核价" @click="$refs.addRef.openDialog()"></head-right-button>
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
                @expand-change="handleExpandChange"
                :tree-props="{children: 'children',hasChildren: 'isShow'}">
        <el-table-column fixed prop="inquiryApprovalName" label="材料(设备)名称" align="center"></el-table-column>
        <el-table-column prop="inquiryApprovalFile" label="询价与核价表" align="center">
          <template slot-scope="scope">
            <download-button :value="scope.row.inquiryApprovalFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="auditdateTime" label="审核完成时间" align="center"></el-table-column>
        <el-table-column prop="isclientSatisfy" label="委托人是否认可" align="center" width="150">
          <template slot-scope="scope">
            <switch-button prop="isclientSatisfy" :data="scope.row" @change="networkUpData"></switch-button>
          </template>
        </el-table-column>
        <el-table-column prop="outPutdateTime" label="询价与核价表出具时间" align="center"></el-table-column>
        <el-table-column prop="inquiryApprovalOutAttchFile" label="盖章扫描件" align="center">
          <template slot-scope="scope">
            <download-button :value="scope.row.inquiryApprovalOutAttchFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="250px">
          <template slot-scope="scope">
            <template v-if="scope.row.allstatuscode!=='7'">
              <el-button type="text" size="mini" @click="$refs.updateRef.openDialog(scope.row)">修改</el-button>
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
      <add-dialog ref="addRef" title="新增询价与核价" @getFormData="networkAddData"></add-dialog>
      <perfect-dialog ref="perfectRef" title="完善信息" @getFormData="networkUpData"></perfect-dialog>
      <update-dialog ref="updateRef" title="修改询价与核价" @getFormData="networkUpData"></update-dialog>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import HeadRightButton from "../button/HeadRightButton.vue"

  import AddDialog from '../dialog/enquiryCheckMoney/AddDialog.vue'
  import PerfectDialog from '../dialog/enquiryCheckMoney/PerfectDialog.vue'
  import UpdateDialog from '../dialog/enquiryCheckMoney/UpdateDialog.vue'

  import {mapState} from 'vuex'
  import {getEnquiries,addEnquiries,delEnquiries,upEnquiries} from '../../../../../../../api/workbench/webapi-projectCost.js'

  export default {
    components: {
      HeadRightButton,

      AddDialog,
      PerfectDialog,
      UpdateDialog,

    },
    props: {},
    watch: {},
    computed:{
      ...mapState('workbench',{
        currentItem:'currentItem'
      })
    },
    //数据节点
    data() {
      return {
        value1: '',
        showLeftButton: false,
        dataList: []
      }
    },
    //生命周期函数节点
    created() {
      this.networkGetDatas()
    },
    //自定义函数节点
    methods: {
      networkGetDatas() {
        let ref = {
          projectKeyid: this.currentItem.keyid,
        }
        getEnquiries(ref).then(item => {
          this.dataList = item.data
        })
      },
      networkAddData(formData) {
        let ref = {
          projectKeyid: this.currentItem.keyid,
        }
        Object.assign(formData, ref)
        addEnquiries(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
      networkUpData(formData) {
        upEnquiries(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
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
                  {title: '审核附件', file:await this.getfile(data.inquiryApprovalFile)},
                ],
                muitList:[{name:'备注',value:''}]
              }).then(flowId=>{
                data.allstatuscode='1'
                this.networkUpData(data)
                this.ddflow(2,3,{
                  baseId:data.keyid,
                  baseUrl:'/pro/ccopinquiryapproval',
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
                      {title: '盖章附件', file:await this.getfile(data.inquiryApprovalFile)},
                    ],
                    muitList:[{name:'份数',value:value}]
                  }).then(flowId=>{
                    data.allstatuscode='4'
                    this.networkUpData(data)
                    this.ddflow(5,6,{
                      baseId:data.keyid,
                      baseUrl:'/pro/ccopinquiryapproval',
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
  .body {
    .button {
      .column {
        height: 45px;
        width: 50%;
        float: left;
      }
    }
  }
</style>
