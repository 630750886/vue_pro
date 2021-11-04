<!-- 编制及审核资格预审文件台账 -->
<template>
  <div>
    <div>
      <head-right-button @click="$refs.addFilefRef.openDialog()" title="新建"></head-right-button>
    </div>
    <div>
      <el-table :data="dataList"
                ref="tableRef"
                highlight-current-row
                :header-cell-style="{fontSize:'10px'}"
                height="500px"
                :indent="8"
                row-key="keyid"
                :tree-props="{children: 'children',hasChildren: 'isShow'}" @expand-change="handleExpandChange"
                border
              >
<!--        <el-table-column prop="createddateTime" label="创建时间" align="left" min-width="130"><template slot-scope="scope">{{scope.row.createddateTime|datefmt('YYYY/MM/DD')}}</template></el-table-column>-->
        <el-table-column prop="preqcount" label="文件次数" align="center" width="100">
        </el-table-column>
        <el-table-column prop="attachFile" label="附件" align="center">
          <template slot-scope="scope">
            <download-button :value="scope.row.attachFile"></download-button>
          </template>
        </el-table-column>
<!--        <el-table-column prop="needdesc" label="修改要求" align="center"></el-table-column>-->
<!--        <el-table-column prop="needbasefile" label="委托方修改底稿" align="center">-->
<!--          <template slot-scope="scope">-->
<!--            <download-button :value="scope.row.needbasefile"></download-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column prop="needafterfile" label="修改后底稿" align="center">-->
<!--          <template slot-scope="scope">-->
<!--            <download-button :value="scope.row.needafterfile"></download-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column prop="approvedate" label="审核完成时间" align="center"></el-table-column>-->
        <el-table-column prop="resultAttachFile" label="盖章扫描件" align="center">
          <template slot-scope="scope">
<!--            <upload-button v-model="scope.row.resultAttachFile" @getValue="networkUpData(scope.row)"></upload-button>-->
            <download-button :value="scope.row.resultAttachFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="100">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" plain @click="delBiddingFile(scope.row)">删除</el-button>
<!--            <template v-if="scope.row.allstatuscode!=='7'">-->
<!--              <el-button type="primary" size="mini" plain @click="delBiddingFile(scope.row)">删除</el-button>-->
<!--              <el-button type="text" @click="$refs.updateFilefRef.openDialog(scope.row)">重新调整</el-button>-->
<!--              <submit-button v-if="scope.row.allstatuscode==='0'" title="提交审核" @click="submitExamine(scope.row)"></submit-button>-->
<!--              <submit-button v-if="['2','5','6'].indexOf(scope.row.allstatuscode)!==-1" title="办理盖章" @click="submitSeal(scope.row)"></submit-button>-->
<!--            </template>-->
<!--            <status-button code="088" :status="scope.row.allstatuscode"></status-button>-->
          </template>
        </el-table-column>

      </el-table>
    </div>
    <div class="dialog">
      <add-file-dialog title="新增文件" width="30%" ref="addFilefRef" @getFormData="networkAddData"></add-file-dialog>
<!--      <update-file-dialog title="重新调整" width="30%" ref="updateFilefRef"-->
<!--                          @getFormData="networkAdjustmentData"></update-file-dialog>-->
<!--      <upload-scanning-dialog title="上传盖章扫描件" width="30%" ref="uploadFilefRef"-->
<!--                              @getFormData="networkUpData"></upload-scanning-dialog>-->
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import HeadRightButton from "../button/HeadRightButton.vue"
  import AddFileDialog from "../dialog/BiddingAndProcurementTable/AddFileDialog.vue"
  // import UpdateFileDialog from "../dialog/BiddingAndProcurementTable/UpdateFileDialog.vue"
  // import UploadScanningDialog from "../dialog/BiddingAndProcurementTable/UploadScanningDialog.vue"
  import {mapState} from 'vuex'
  import {
    getTAPrequalification,
    addTAPrequalification,
    upTAPrequalification,
    delTAPrequalification
  } from '../../../../../../../api/workbench/webapi-biddingAgency.js'
  import {delPretrial} from "../../../../../../../api/workbench/webapi-biddingAgency";


  export default {
    components: {
      HeadRightButton,
      AddFileDialog,
      // UpdateFileDialog,
      // UploadScanningDialog,
    },
    props: {
      title: '',
      width: '',
      labelWidth: {
        type: String,
        default: '130px'
      },

    },
    watch: {
      dataList(newValue) {
        let arr = newValue.filter(item => {
          return item.pkeyid !== ''
        })
        this.maxOrder = newValue.length - arr.length
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
        dataList: [],
        maxOrder: 0,
      }
    },
    //生命周期函数节点
    created() {
      this.networkGetDataList()
    },
    //自定义函数节点
    methods: {
      delBiddingFile(data){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delTAPrequalification({keyid:data.keyid}).then(item => {
            if (item.code === 200) {
              this.networkGetDataList()
            }
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
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
          pkeyid:'0000'
        }
        getTAPrequalification(ref).then(item => {
          this.treeTableDataFormat(item.data,'pro/taprequalification/findwhere').then(item=>{
            this.dataList =item
            console.log(this.dataList);
          })
        })
      },
      networkAddData(formData) {
        formData.projectKeyid = this.currentItem.keyid
        formData.ordernum = this.maxOrder + 1
        formData.pkeyid='0000'
        addTAPrequalification(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDataList()
          }
        })
      },
      // networkUpData(formData) {
      //   upTAPrequalification(formData).then(item => {
      //     if (item.code === 200) {
      //       this.$message.success(item.message)
      //       this.networkGetDataList()
      //     }
      //   })
      // },
      networkDelData(formData) {
        delTAPrequalification(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDataList()
          }
        })
      },
      networkAdjustmentData(formData) {
        formData.allstatuscode='7'
        formData.allstatusname='true'
        upTAPrequalification(formData).then(()=>{
          let ref={
            projectKeyid: this.currentItem.keyid,
            pkeyid:formData.keyid,
            attachFile:formData.needafterfile
          }
          addTAPrequalification(ref).then(item => {
            if (item.code === 200) {
              this.$message.success(item.message)
              this.networkGetDataList()
            }
          })
        })

      },
  //     submitExamine(data) {
  //
  //       this.$confirm("是否确定发起流程审批?","提示！",
  //       {confirmButtonText: "确定",cancelButtonText: "取消",type: "warning"}).then(async () =>
	// {
	//  this.ddform('v_2020_ywgl_zbdl_zgys', {
  //         c: {code: this.currentItem.contractCode, name: this.currentItem.contractName},
  //         i: {code: this.currentItem.projectCode, name: this.currentItem.projectName},
  //         fileList: [
  //           {title: '文件', file: await this.getfile(data.attachFile)},
  //         ],
  //         muitList: [{name: '备注', value: data.needdesc}]
  //       }).then(flowId => {
  //         data.allstatuscode = '1'
  //         this.networkUpData(data)
  //         this.ddflow(2, 3, {
  //           baseId: data.keyid,
  //           baseUrl: '/pro/taprequalification',
  //           baseColumn: 'allstatuscode',//allstatuecode
  //           flowId: flowId,
  //           fType: '其他'
  //         })
  //       })
  //
	// }).catch(() => {this.$message({type: "info",message: "已取消发起流程！"});});
  //
  //      },
  //     submitSeal(data) {
	//         this.$msgbox.prompt('', '盖章份数', {
  //         confirmButtonText: '确定',
  //         cancelButtonText: '取消',
  //       }).then(async ({value}) => {
  //         this.ddform('v_2020_gxgl_tjgz', {
  //           fileList: [
  //             {title: '盖章附件', file: await this.getfile(data.attachFile)},
  //           ],
  //           muitList: [{name: '份数', value: value}]
  //         }).then(flowId => {
  //           data.allstatuscode = '4'
  //           this.networkUpData(data)
  //           this.ddflow(5, 6, {
  //             baseId: data.keyid,
  //             baseUrl: '/pro/taprequalification',
  //             baseColumn: 'allstatuscode',
  //             flowId: flowId,
  //             fType: '其他'
  //           })
  //         })
  //       })
  //     },
      handleExpandChange(row, expanded) {
        if (row.children) {
          row.children.forEach(item=>{
            this.$refs.tableRef.toggleRowExpansion(item,true)
          })
        }
      },
    },

  }
</script>
<style lang='less' scoped>

</style>
