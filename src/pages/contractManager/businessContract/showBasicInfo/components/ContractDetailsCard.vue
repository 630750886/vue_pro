<template>
  <div class="body">
    <div class="column">
      <div v-if="$myfunction.isEmpty(dataList)" class="button">
        <public-button
          name="XIN1JIAN"
          title="上传合同附件"
          @click="$refs.addRef.openDialog()"
        ></public-button>
      </div>
      <div class="card-main">
        <el-table
          :data="dataList"
          style="width:100%"
          height="480px"
          highlight-current-row
          :header-cell-style="{ fontSize: '14px' }"
          align="left"
          border
        >
          <el-table-column prop="studyoutfile" label="附件"  width="60px">
          <template slot-scope="scope">
              <download-button
                :value="scope.row.studyoutfile"
              ></download-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="changedesc"
            label="修改要求"
            width="400px"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="approvedate"
            label="审核完成时间"
            width="120px"
          ></el-table-column>
          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.allstatuscode !== '7'">
                <public-button
                  classhd="hd"
                  :plain="true" 
                  type="primary"
                  name="DIAO4ZHENG3SHEN3HE2GAI4ZHANG"
                  title="重新调整"
                  @click="$refs.upRef.openDialog(scope.row)"
                ></public-button>
                <submit-button
                 classhd="hd" :plain="true" type="primary"
                  v-if="
                    (scope.row.allstatuscode === '0'||scope.row.allstatuscode === '3')&&
                      btnListIndexOf('DIAO4ZHENG3SHEN3HE2GAI4ZHANG')
                  "
                  title="提交审核"
                  @click="submitReport(scope.row)"
                ></submit-button>
                <submit-button
                  classhd="hd" :plain="true" type="primary"
                  v-if="
                    (scope.row.allstatuscode==='2'||scope.row.allstatuscode==='5'||scope.row.allstatuscode==='6')&&
                      btnListIndexOf('DIAO4ZHENG3SHEN3HE2GAI4ZHANG')
                  "
                  title="办理盖章"
                  @click="submitSeal(scope.row)"
                ></submit-button>
              </template>
              <status-button
                code="088"
                :status="scope.row.allstatuscode"
              ></status-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <add-agreement-dialog
      ref="addRef"
      width="250px"
      @getFormData="networkAddData"
    ></add-agreement-dialog>
    <up-agreement-dialog
      ref="upRef"
      @getFormData="networkUpAddData"
    ></up-agreement-dialog>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import AddAgreementDialog from "./dialog/AddAgreementDialog.vue";
import UpAgreementDialog from "./dialog/UpAgreementDialog.vue";
import {
  upBusContract,
  getContractDetailsCard,
  delContractDetailsCard,
  upContractDetailsCard,
  addContractDetailsCard
} from "../../../../../api/webapi-contract.js";
import { mapState } from "vuex";

export default {
  components: {
    AddAgreementDialog,
    UpAgreementDialog
  },
  props: {},
  computed: {
    ...mapState("businessContract", {
      contractInfo: "contractInfo"
    })
  },
  watch: {},
  //数据节点
  data() {
    return {
      dataList: []
    };
  },
  //生命周期函数节点
  created() {
    this.networkGetDataList();
  },
  //自定义函数节点
  methods: {
    flowVersions() {
      let vid = "";
      switch (this.contractInfo.contractTypeKeyId) {
        case "402880fa74c3492d0174d98785e3003d": //工程咨询
          vid = "v_2020_htgl_yw_gczx_htsh";
          break;
        case "402880fa74c3492d0174d98812c0003e": //造价咨询
          vid = "v_2020_htgl_yw_zjzx_htsh";
          break;
        case "402880fa74c3492d0174d988b0cb003f":
          vid = "v_2020_htgl_yw_zbdl_htsh";
          break;
        case "402880fa74c3492d0174d988f7670040":
          vid = "v_2020_htgl_yw_gcjl_htsh";
          break;
        case "402880fa74c3492d0174d98936d70041":
          vid = "v_2020_htgl_yw_xmgl_htsh";
          break;
        case "402880fa74c3492d0174d9897c370042":
          vid = "v_2020_htgl_yw_qgc_htsh";
          break;
        case "402880fa74c3492d0174d989b38e0043":
          vid = "v_2020_htgl_yw_zhkj_htsh";
          break;
        case "402880fa74c3492d0174d989e5de0044":
          vid = "v_2020_htgl_yw_zhkj_htsh";
          break;
      }
      return vid;
    },
    networkGetDataList() {
      let ref = {
        contracttkeyid: this.contractInfo.keyid,
        studyoutTypename: "合同"
      };
      getContractDetailsCard(ref).then(item => {
        this.dataList = item.data;
      });
    },
    networkAddData(formData) {
      formData.contracttkeyid = this.contractInfo.keyid;
      formData.studyoutTypename = "合同";
      addContractDetailsCard(formData).then(item => {
        if (item.code === 200) {
          this.$message.success(item.message);
          this.networkGetDataList();
        }
      });
    },
    networkUpAddData(formData) {
      formData.allstatuscode = 7;
      upContractDetailsCard(formData).then(item => {
        if (item.code === 200) {
          this.$message.success(item.message);
          let ref = {
            keyid: "",
            pkeyid: formData.keyid,
            contracttkeyid: this.contractInfo.keyid,
            studyoutTypename: "合同",
            studyoutfile: formData.manuscriptcomplete
          };
          addContractDetailsCard(ref).then(item => {
            if (item.code === 200) {
              this.$message.success(item.message);
              this.networkGetDataList();
            }
          });
        }
      });
    },
    networkUpData(formData) {
      upContractDetailsCard(formData).then(item => {
        if (item.code === 200) {
          this.$message.success(item.message);
          this.networkGetDataList();
        }
      });
    },
    //上传盖章扫描件
    uploadCompletefinalfile(data) {
      upContractDetailsCard(data).then(item => {
        if (item.code === 200) {
          //如果上传的盖章烧苗件不是废弃数据的扫描件，则更新合同基本数据里的合同扫描件信息
          if (data.allstatuecode !== "7") {
            let contract = this.$myfunction.copyData(this.contractInfo);
            contract.contractallfile = data.completefinalfile;
            upBusContract(contract);
          }
        }
      });
    },
    //提交审核
    submitReport(formData) {
      this.$confirm("是否确定发起流程审批?","提示！",
        {confirmButtonText: "确定",cancelButtonText: "取消",type: "warning"}).then(async () => 
        {
            this.ddform(this.flowVersions(), {
              c: {
                code: this.contractInfo.contractCode,
                name: this.contractInfo.contractName
              },
              fileList: [
                { title: "合同附件", file: await this.getfile(formData.studyoutfile) }
              ]
            }).then(flowId => {
              formData.allstatuscode = "1";
              upContractDetailsCard(formData).then(item => {
                this.networkGetDataList();
                this.ddflow(2, 3, {
                  baseId: formData.keyid,
                  baseColumn: "allstatuscode",
                  baseUrl: "agr/contractstudyout",
                  flowId: flowId,
                  fType: "合同"
                });
                this.ddflow(1, "", {
                  baseId: this.contractInfo.keyid,
                  baseUrl: "/agr/busicontractbase",
                  baseColumn: "allstatuscode",
                  flowId: flowId,
                  fType: "更改合同状态"
                });
              });
            });
        }).catch(() => {this.$message({type: "info",message: "已取消发起流程！"});});
    },
    //办理盖章()
    submitSeal(data) {
            this.$msgbox
                .prompt("", "盖章份数", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消"
                })
                .then(async ({ value }) => {
                  this.ddform("v_2020_gxgl_tjgz", {
                    fileList: [
                      { title: "盖章附件", file: await this.getfile(data.studyoutfile) }
                    ],
                    muitList: [{ name: "份数", value: value }]
                  }).then(flowId => {
                    data.allstatuscode = "4";
                    this.networkUpData(data);
                    this.ddflow(5, 6, {
                      baseId: data.keyid,
                      baseUrl: "/agr/contractstudyout",
                      baseColumn: "allstatuscode",
                      flowId: flowId,
                      fType: "合同"
                    });
                  });
                });
    }
  }
};
</script>
<style lang="less" scoped>
.body {
  .column {
    padding: 0 5px;
    .button {
      height: 30px;
      line-height: 30px;
      margin-bottom: 10px;
      .el-button {
        margin-left: 10px;
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
        position: relative;
      }
    }
  }
}
</style>
