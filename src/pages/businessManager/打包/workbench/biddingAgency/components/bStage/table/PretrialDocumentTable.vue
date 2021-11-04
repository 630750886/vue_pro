<!-- 编制及审核资格预审文件台账 -->
<template>
  <div>
    <div>
      <head-right-button @click="$refs.addFilefRef.openDialog()" title="新增文件"></head-right-button>
    </div>
    <div>
      <el-table :data="dataList"
                ref="tableRef"
                highlight-current-row
                :header-cell-style="{fontSize:'10px'}"
                :indent="8"
                row-key="keyid"
                @expand-change="handleExpandChange"
                :tree-props="{children: 'children',hasChildren: 'isShow'}" border>
        <el-table-column prop="createddateTime" label="创建时间" align="left" min-width="120px"><template slot-scope="scope">{{scope.row.createddateTime|datefmt('YYYY/MM/DD')}}</template></el-table-column>
        <el-table-column prop="attachFile" label="附件" align="center">
          <template slot-scope="scope">
            <download-button :value="scope.row.attachFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="needdesc" label="修改要求" align="center"></el-table-column>
        <el-table-column prop="needbasefile" label="委托方修改底稿" align="center">
          <template slot-scope="scope">
            <download-button :value="scope.row.needbasefile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="needafterfile" label="修改后底稿" align="center">
          <template slot-scope="scope">
            <download-button :value="scope.row.needafterfile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="approvedate" label="审核完成时间" align="center"></el-table-column>
        <el-table-column prop="needAttachFile" label="盖章扫描件" align="center">
          <template slot-scope="scope">
            <upload-button v-model="scope.row.needAttachFile" @getValue="networkUpData"></upload-button>
            <download-button :value="scope.row.needAttachFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="230" fixed="right">
          <template slot-scope="scope">
            <template v-if="scope.row.allstatuscode!=='7'">
              <el-button type="text" @click="$refs.updateFilefRef.openDialog(scope.row)">重新调整</el-button>
              <submit-button v-if="scope.row.allstatuscode==='0'" title="提交审核" @click="submitExamine(scope.row)"></submit-button>
              <submit-button v-if="['2','5','6'].indexOf(scope.row.allstatuscode)!==-1"
                             title="办理盖章" @click="submitSeal(scope.row)"></submit-button>
            </template>
            <status-button code="088" :status="scope.row.allstatuscode"></status-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <div class="dialog">
      <add-file-dialog title="新增文件" width="30%" ref="addFilefRef" @getFormData="networkAddData"></add-file-dialog>
      <update-file-dialog title="调整文件" width="30%" ref="updateFilefRef" @getFormData="networkAdjustmentData"></update-file-dialog>
      <upload-scanning-dialog title="上传盖章扫描件" width="30%" ref="uploadFilefRef" @getFormData="networkUpData"></upload-scanning-dialog>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import HeadRightButton from "../button/HeadRightButton.vue"
  import AddFileDialog from "../dialog/PretrialDocumentTable/AddFileDialog.vue"
  import UpdateFileDialog from "../dialog/PretrialDocumentTable/UpdateFileDialog.vue"
  import UploadScanningDialog from "../dialog/PretrialDocumentTable/UploadScanningDialog.vue"

  import {mapState} from 'vuex'
  import {getPretrial,addPretrial,upPretrial,delPretrial} from '../../../../../../../api/workbench/webapi-biddingAgency.js'

  export default {
    components: {
      HeadRightButton,
      AddFileDialog,
      UpdateFileDialog,
      UploadScanningDialog,
    },
    props: {
    },
    watch: {
      dataList(newValue) {
        let arr = newValue.filter(item => {
          return item.pkeyid !== ''
        })
        this.maxOrder = newValue.length - arr.length
      }
    },
    computed:{
      ...mapState('workbench',{
        currentItem:'currentItem'
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
      networkGetDataList() {
        let ref={
          projectKeyid:this.currentItem.keyid,
          publicityTypeKeyid:'pretrialdocument',
          pkeyid:'0000'
        }
        getPretrial(ref).then(item=>{
          this.treeTableDataFormat(item.data,'pro/taprequalification/findwhere').then(item=>{
            this.dataList =item
          })
        })
      },
      networkAddData(formData) {
        formData.pkeyid='0000'
        formData.projectKeyid=this.currentItem.keyid
        formData.ordernum=this.maxOrder+1
        formData.publicityTypeKeyid='pretrialdocument'
        addPretrial(formData).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDataList()
          }
        })
      },
      networkUpData(formData) {
        upPretrial(formData).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDataList()
          }
        })
      },
      networkDelData(formData) {
        delPretrial(formData).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDataList()
          }
        })
      },
      networkAdjustmentData(formData) {
        formData.allstatuscode='7'
        formData.allstatusname='true'
       upPretrial(formData).then(()=>{
         let ref={
           projectKeyid:this.currentItem.keyid,
           publicityTypeKeyid:'pretrialdocument',
           pkeyid:formData.keyid,
           attachFile:formData.needafterfile
         }
         addPretrial(ref).then(item=>{
           if (item.code === 200) {
             this.$message.success(item.message)
             this.networkGetDataList()
           }
         })
       })

      },
      submitExamine(data) {
this.$confirm("是否确定发起流程审批?","提示！",
        {confirmButtonText: "确定",cancelButtonText: "取消",type: "warning"}).then(async () => 
	{
	 this.ddform('v_2020_ywgl_zbdl_zgys', {
          c: {code: this.currentItem.contractCode, name: this.currentItem.contractName},
          i: {code: this.currentItem.projectCode, name: this.currentItem.projectName},
          fileList: [
            {title: '文件', file: await this.getfile(data.attachFile)},
          ],
          muitList:[{name:'备注',value:data.needdesc}]
        }).then(flowId=>{
          data.allstatuscode='1'
          this.networkUpData(data)
          this.ddflow(2,3,{
            baseId:data.keyid,
            baseUrl:'/pro/tademandpublicity',//''/pro/taprequalification',
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
              {title: '盖章附件', file:await this.getfile(data.attachFile)},
            ],
            muitList:[{name:'份数',value:value}]
          }).then(flowId=>{
            data.allstatuscode='4'
            this.networkUpData(data)
            this.ddflow(5,6,{
              baseId:data.keyid,
              baseUrl:'/pro/tademandpublicity',//''/pro/taprequalification',
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

</style>
