<template>
  <div class="body">
    <div class="button">
      <head-right-button title="新增勘验" @click="$refs.addRef.openDialog()"></head-right-button>
    </div>
    <div class="table">
      <el-table ref="tableRef"
                :data="dataList"
                style="width: 100%"
                align="center"
                height="7rem"
                
                highlight-current-row
                :header-cell-style="{fontSize:'10px'}">
        <el-table-column fixed prop="tripdateTime" label="勘验时间" align="center"></el-table-column>
        <el-table-column prop="workPersonName" label="踏勘人" align="center"></el-table-column>
        <el-table-column prop="tripDataFile" label="相关资料" align="center">
          <template slot-scope="scope">
            <download-button :value="scope.row.tripDataFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="tripImageFile" label="图片或影像资料" align="center">
          <template slot-scope="scope">
            <download-button :value="scope.row.tripImageFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="250px">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="$refs.updateRef.openDialog(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <add-dialog ref="addRef" width="30%" title="新增勘验" @getFormData="networkAddData"></add-dialog>
      <add-dialog ref="updateRef" width="30%" title="修改勘验" @getFormData="networkUpData"></add-dialog>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import HeadRightButton from "../button/HeadRightButton.vue"
  import AddDialog  from '../dialog/sceneInvestigation/AddDialog.vue'
  import {mapState} from 'vuex'
  import {getSiteSurveys,addSiteSurvey,delSiteSurvey,upSiteSurvey} from '../../../../../../../api/workbench/webapi-projectConsult.js'

  export default {
    components: {
      HeadRightButton,
      AddDialog,
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
        dataList:[]
      }
    },
    //生命周期函数节点
    created() {
      this.networkGetDatas()
    },
    //自定义函数节点
    methods: {
      networkGetDatas(){
        let ref={
          projectKeyid:this.currentItem.keyid,
          typecodename:'踏勘'
        }
        getSiteSurveys(ref).then(item=>{
          this.dataList= item.data
        })
      },
      networkAddData(formData){
        formData.projectKeyid=this.currentItem.keyid
        formData.typecodename='踏勘'
        addSiteSurvey(formData).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
      networkDelData(formData){
        delSiteSurvey(formData).then(item=>{
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
      networkUpData(formData){
        upSiteSurvey(formData).then(item=>{
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
