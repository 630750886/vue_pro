<template>
  <div class="body">
    <div class="button">
      <head-right-button title="新增变更" @click="$refs.addRef.openDialog()"></head-right-button>
    </div>
    <div class="table">
      <el-table ref="tableRef"
                :data="dataList"
                style="width: 100%"
                align="center"
                height="7rem"
                
                highlight-current-row
                :header-cell-style="{fontSize:'10px'}">
        <el-table-column fixed prop="createddateTime" label="创建时间" align="center"><template slot-scope="scope">{{scope.row.createddateTime|datefmt('YYYY/MM/DD')}}</template></el-table-column>
        <el-table-column prop="changeWorkFile" label="变更审核材料" align="center">
          <template slot-scope="scope">
            <upload-button v-model="scope.row.changeWorkFile" @getValue="networkUpData"></upload-button>
            <download-button :value="scope.row.changeWorkFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="changeWorkAttchFile" label="变更审核材料扫描件" align="center">
          <template slot-scope="scope">
            <upload-button v-model="scope.row.changeWorkAttchFile" @getValue="networkUpData"></upload-button>
            <download-button :value="scope.row.changeWorkAttchFile"></download-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <add-dialog ref="addRef" title="新增变更材料" width="30%" @getFormData="networkAddData"></add-dialog>
      <add-dialog ref="updateRef" title="修改变更材料" width="30%" @getFormData="networkUpData"></add-dialog>
      <scan-file-dialog ref="scanRef" title="扫描件上传" width="30%" @getFormData="networkUpData"></scan-file-dialog>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import HeadRightButton from "../button/HeadRightButton.vue"

  import AddDialog from '../dialog/projectChangeCheck/AddDialog.vue'
  import ScanFileDialog from '../dialog/projectChangeCheck/ScanFileDialog.vue'
  import {mapState} from 'vuex'
  import {getProject,addProject,upProject} from '../../../../../../../api/workbench/webapi-projectCost.js'

  export default {
    components: {
      HeadRightButton,

      AddDialog,
      ScanFileDialog,
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
          typecode:'chanagecheck'
        }
        getProject(ref).then(item => {
          this.dataList = item.data
        })
      },
      networkAddData(formData) {
        let ref = {
          projectKeyid: this.currentItem.keyid,
          typecode:'chanagecheck'
        }
        Object.assign(formData, ref)
        addProject(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
      networkUpData(formData) {
        upProject(formData).then(item => {
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
                {title: '审核附件', file: await this.getfile(data.changeWorkFile)},
              ],
              muitList:[{name:'备注',value:data.needdesc}]
            }).then(flowId=>{
              data.allstatuscode='1'
              this.networkUpData(data)
              this.ddflow(2,3,{
                baseId:data.keyid,
                baseUrl:'/pro/ccopchangework',
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
              {title: '盖章附件', file:await this.getfile(data.changeWorkFile)},
            ],
            muitList:[{name:'份数',value:value}]
          }).then(flowId=>{
            data.allstatuscode='4'
            this.networkUpData(data)
            this.ddflow(5,6,{
              baseId:data.keyid,
              baseUrl:'/pro/ccopchangework',
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
