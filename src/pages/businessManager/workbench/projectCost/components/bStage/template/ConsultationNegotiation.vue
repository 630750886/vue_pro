<template>
  <div class="body">
    <div class="button">
      <head-right-button title="新增会商" @click="$refs.addRef.openDialog()"></head-right-button>
    </div>
    <div class="table">
      <el-table ref="tableRef"
                :data="dataList"
                style="width: 100%"
                align="center"
                height="7rem"
                
                highlight-current-row
                :header-cell-style="{fontSize:'10px'}">
        <el-table-column fixed prop="negotiationsdateTime" label="会商时间" align="center"></el-table-column>
        <el-table-column prop="negotiationsTitle" label="会商主题" align="center"></el-table-column>
        <el-table-column prop="negotiationsPersons" label="谈判人" align="center"></el-table-column>
        <el-table-column prop="negotiationsDataFile" label="相关资料" align="center">
          <template slot-scope="scope">
            <download-button :value="scope.row.negotiationsDataFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="negotiationsImageVideoFile" label="图片或影像记录" align="center">
          <template slot-scope="scope">
            <download-button :value="scope.row.negotiationsImageVideoFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="isdispute" label="是否产生争议" align="center" width="150">
          <template slot-scope="scope">
            <switch-button prop="isdispute" :data="scope.row" @change="networkUpData"></switch-button>
          </template>
        </el-table-column>
        <el-table-column prop="disputeKeyTitle" label="争议主要事项" align="center"></el-table-column>
        <el-table-column prop="negdisputeFile" label="相关附件" align="center" >
          <template slot-scope="scope">
            <download-button :value="scope.row.negdisputeFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="ischangeData" label="核对底稿后是否有调整" align="center">
          <template slot-scope="scope">
            {{scope.row.ischangeData?'是':'否'}}
          </template>
        </el-table-column>
        <el-table-column prop="negRecordFile" label="相关记录" align="center">
          <template slot-scope="scope">
            <download-button :value="scope.row.negRecordFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200px" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="$refs.updateRef.openDialog(scope.row)">修改</el-button>
            <el-button type="text" size="mini" @click="$refs.perfectRef.openDialog(scope.row)">完善争议信息</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <add-dialog ref="addRef" title="新增会商" @getFormData="networkAddData"></add-dialog>
      <add-dialog ref="updateRef" title="修改会商信息" @getFormData="networkUpData"></add-dialog>
      <perfect-dialog ref="perfectRef" title="完善争议信息" @getFormData="networkUpData"></perfect-dialog>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import HeadRightButton from "../button/HeadRightButton.vue"
  import AddDialog  from '../dialog/consultationNegotiation/AddDialog.vue'
  import PerfectDialog  from '../dialog/consultationNegotiation/PerfectDialog.vue'
  import {mapState} from 'vuex'
  import {
    getConsultationNegotiation,
    addConsultationNegotiation,
    upConsultationNegotiation,
  } from '../../../../../../../api/workbench/webapi-projectCost.js'
  export default {
    components: {
      HeadRightButton,
      AddDialog,
      PerfectDialog,
    },
    props: {
      title:[String]
    },
    watch: {},
    computed:{
      ...mapState('workbench',{
        currentItem:'currentItem'
      })
    },
    //数据节点
    data() {
      return {
        dataList:[]
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
          typecodename:this.title?this.title+'/会商':'会商'
        }
        getConsultationNegotiation(ref).then(item => {
          this.dataList = item.data
        })
      },
      networkAddData(formData) {
        let ref = {
          projectKeyid: this.currentItem.keyid,
          typecodename:this.title?this.title+'/会商':'会商'
        }
        Object.assign(formData, ref)
        addConsultationNegotiation(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
      networkUpData(formData) {
        upConsultationNegotiation(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
    }
  }
</script>
<style lang='less' scoped>
.body{
  .button{
    .column{
      height: 45px;
      width: 50%;
      float: left;
    }
  }
}
</style>
