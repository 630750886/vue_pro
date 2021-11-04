<template>
  <div class="body">
    <div class="column">
      <div class="card-main">
        <div class="button">
          <public-button name="XIN1JIAN" icon="el-icon-plus" title="新建协议" @click="$refs.addRef.openDialog()"></public-button>
        </div>
        <el-table :key="tableKey"
                  :data="dataList"
                  style="width:100%"
                  height="480px"
                  highlight-current-row
                  :header-cell-style="{fontSize:'14px'}"
                  :indent="8"
                  row-key="keyid"
                  align="left"
                  border
                  :tree-props="{children: 'children',hasChildren: 'isShow'}"
                  @expand-change="handleExpandChange">
          <el-table-column prop="createddateTime" label="创建时间"  width="100px"><template slot-scope="scope">{{scope.row.createddateTime|datefmt('YYYY/MM/DD')}}</template></el-table-column>
          <el-table-column prop="studyoutfile" label="附件" width="60px">
            <template slot-scope="scope">
              <download-button :value="scope.row.studyoutfile"></download-button>
            </template>
          </el-table-column>
          <el-table-column prop="changedesc" label="修改要求"  width="300px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="approvedate" label="审核完成时间" width="110px" ></el-table-column>
          <el-table-column prop="concludesigndateTime" label="协议签订时间" width="110px" ></el-table-column>
          <el-table-column prop="completefinalfile" label="盖章扫描件" width="110px">
            <template slot-scope="scope">
              <download-button :value="scope.row.completefinalfile"></download-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="left">
            <template slot-scope="scope">
              <template v-if="scope.row.allstatuscode!=='7'">
                <public-button classhd="hd" :plain="true" type="primary" name="WAN2SHAN4XIN4XI" title="完善信息" @click="$refs.perfectRef.openDialog(scope.row)"></public-button>
                <public-button classhd="hd" :plain="true" type="primary" name="DIAO4ZHENG3SHEN3HE2GAI4ZHANG" title="重新调整" @click="$refs.upRef.openDialog(scope.row)"></public-button>
                <submit-button classhd="hd" :plain="true" type="primary" v-if="scope.row.allstatuscode==='0'&& btnListIndexOf('DIAO4ZHENG3SHEN3HE2GAI4ZHANG')"
                               title="提交审核" @click="submitReport(scope.row)"></submit-button>
                <submit-button classhd="hd" :plain="true" type="primary" v-if="['2','5','6'].indexOf(scope.row.allstatuscode)!==-1 && btnListIndexOf('DIAO4ZHENG3SHEN3HE2GAI4ZHANG')"
                               title="办理盖章" @click="submitSeal(scope.row)"></submit-button>
              </template>
              <status-button code="088" :status="scope.row.allstatuscode"></status-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <add-agreement-dialog ref="addRef" width="250px" @getFormData="networkAddData"></add-agreement-dialog>
    <perfect-agreement-dialog ref="perfectRef" width="400px" @getFormData="networkUpData"></perfect-agreement-dialog>
    <up-agreement-dialog ref="upRef" @getFormData="networkUpAddData"></up-agreement-dialog>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import AddAgreementDialog from './dialog/AddAgreementDialog.vue'
  import PerfectAgreementDialog from './dialog/PerfectAgreementDialog.vue'
  import UpAgreementDialog from './dialog/UpAgreementDialog.vue'
  import {
    getContractDetailsCard,
    delContractDetailsCard,
    upContractDetailsCard,
    addContractDetailsCard
  } from '../../../../../api/webapi-contract.js'
  import {mapState} from 'vuex'

  export default {
    components: {
      AddAgreementDialog,
      PerfectAgreementDialog,
      UpAgreementDialog
    },
    props: {},
    watch: {},
    computed: {
      ...mapState('businessContract', {
        contractInfo: 'contractInfo'
      })
    },
    //数据节点
    data() {
      return {
        tableKey: 1,
        form: {
          thirdParty: false,
        },
        dataList: []
      }
    },
    //生命周期函数节点
    created() {
      this.networkGetDataList()
    },
    //自定义函数节点
    methods: {
      load(tree, treeNode, resolve) {
        getContractDetailsCard({pkeyid: tree.keyid}).then(item => {
          resolve(item.data)
        })
      },
      flowVersions() {
        let vid = ''
        switch (this.contractInfo.contractTypeKeyId) {
          case '402880fa74c3492d0174d98785e3003d'://工程咨询
            vid = 'v_2020_htgl_yw_gczx_bzxysh'
            break
          case '402880fa74c3492d0174d98812c0003e'://造价咨询
            vid = 'v_2020_htgl_yw_zjzx_bzxysh'
            break
          case '402880fa74c3492d0174d988b0cb003f':
            vid = 'v_2020_htgl_yw_zbdl_bzxysh'
            break
          case '402880fa74c3492d0174d988f7670040':
            vid = 'v_2020_htgl_yw_gcjl_bzxysh'
            break
          case '402880fa74c3492d0174d98936d70041':
            vid = 'v_2020_htgl_yw_xmgl_bzxysh'
            break
          case '402880fa74c3492d0174d9897c370042':
            vid = 'v_2020_htgl_yw_qgc_bzxysh'
            break
          case '402880fa74c3492d0174d989b38e0043':
            vid = 'v_2020_htgl_yw_zhkj_bzxysh'
            break
          case '402880fa74c3492d0174d989e5de0044':
            vid = 'v_2020_htgl_yw_zhkj_bzxysh'
            break
        }
        return vid
      },
      networkGetDataList() {
        let ref = {
          contracttkeyid: this.contractInfo.keyid,
          studyoutTypename: '补充协议',
          pkeyid: '0000'
        }
        getContractDetailsCard(ref).then( item => {
           this.treeTableDataFormat(item.data,'agr/contractstudyout/findwhere').then(item=>{
             this.dataList =item
          })
        })
      },
      networkAddData(formData) {
        formData.contracttkeyid = this.contractInfo.keyid
        formData.studyoutTypename = '补充协议'
        formData.pkeyid = '0000'
        addContractDetailsCard(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDataList()
          }
        })
      },
      networkUpAddData(formData) {
        formData.allstatuscode = 7
        formData.allstatusname = 'true'
        this.networkUpData(this.$myfunction.copyData(formData))
        let ref = {
          keyid: '',
          pkeyid: formData.keyid,
          contracttkeyid: this.contractInfo.keyid,
          studyoutTypename: '补充协议',
          concludesigndateTime:formData.concludesigndateTime,
          studyoutfile: formData.manuscriptcomplete
        }
        addContractDetailsCard(ref).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDataList()

          }
        })
        this.tableKey++
      },
      networkUpData(formData) {
        upContractDetailsCard(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDataList()
          }
        })
      },
      //
      uploadCompletefinalfile(data) {
        upContractDetailsCard(data)
      },
      //提交审核
      submitReport(formData) {
        this.$confirm("是否确定发起流程审批?","提示!",
        {distinguishCancelAndClose: true,confirmButtonText: "确定",cancelButtonText: "取消",type: "warning"}).then(async () => 
        {
            this.ddform(this.flowVersions(), {
                c: {code: this.contractInfo.contractCode, name: this.contractInfo.contractName},
                fileList: [
                  {title: '合同附件', file: await this.getfile(formData.studyoutfile)},
                  {title: '补充协议附件', file: await this.getfile(formData.studyoutfile)},
                ]
              }).then(flowId => {
                  formData.allstatuscode = '1'
                  upContractDetailsCard(formData).then(item => {
                    if (item.code === 200) {
                      this.networkGetDataList()
                      this.ddflow(2, 3, {
                        baseId: formData.keyid,
                        baseColumn: 'allstatuscode',
                        baseUrl: 'agr/contractstudyout',
                        flowId: flowId,
                        fType: '补充协议'
                      })
                    }
                  })
                }).catch((error)=>{
                  this.$message.error(error);
                });
        }).catch((action) => {this.$message({type: "info",message: "已取消发起流程！"});});
      },
      //办理盖章()
      submitSeal(data) {
              this.$msgbox.prompt('', '盖章份数', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                }).then(async ({value}) => {
                  this.ddform('v_2020_gxgl_tjgz', {
                    fileList: [
                      {title: '盖章附件', file: await this.getfile(data.studyoutfile)},
                    ],
                    muitList: [{name: '份数', value: value}]
                  }).then(flowId => {
                      data.allstatuscode = '4'
                      this.networkUpData(data)
                      this.ddflow(5, 6, {
                        baseId: data.keyid,
                        baseUrl: '/agr/contractstudyout',
                        baseColumn: 'allstatuscode',
                        flowId: flowId,
                        fType: '补充协议'
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
    .column {
      padding: 0 0px;
      .button {
        height: 30px;
        line-height: 30px;
        margin-bottom: 10px;
        .el-button {
          float: right;
          margin-right: 10px;
        }
      }
      .card-main {
        table {
          tr {
            height: 25px;
            line-height: 25px;
            font-size: 14px;
          }
        }
        .main-head {
          padding: 5px;
        }
      }

    }
  }
  .cell {
    .el-table__indent {
      margin-left: 16px;
    }
  }
</style>
