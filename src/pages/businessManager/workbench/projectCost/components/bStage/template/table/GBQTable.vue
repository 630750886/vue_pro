<template>
  <div>
    <div class="button">
      <head-right-button :title="'新增'+title" @click="$refs.addRef.openDialog(title)"></head-right-button>
    </div>
    <el-table ref="tableRef"
              :data="dataList"
              style="width: 100%"
              align="center"
              highlight-current-row
              :header-cell-style="{fontSize:'10px'}"
              row-key="keyid"
              
              :indent="8"
              default-expand-all
              :tree-props="{children: 'children',hasChildren: 'isShow'}">
      <el-table-column fixed prop="mvName" :label="title+'名称'" align="left"></el-table-column>
      <el-table-column prop="createddateTime" label="创建时间" align="center"><template slot-scope="scope">{{scope.row.createddateTime|datefmt('YYYY/MM/DD')}}</template></el-table-column>
      <el-table-column prop="pGBQDraftFile" label="GBQ底稿" align="center">
        <template slot-scope="scope">
          <download-button :value="scope.row.pGBQDraftFile"></download-button>
        </template>
      </el-table-column>
      <el-table-column prop="electDraftFile" label="电子表格底稿" align="center">
        <template slot-scope="scope">
          <download-button :value="scope.row.electDraftFile"></download-button>
        </template>
      </el-table-column>
      <el-table-column prop="needDesc" label="修改要求" align="center"></el-table-column>
      <el-table-column prop="needdateTime" label="要求时间" align="center"></el-table-column>
      <el-table-column prop="edit_pGBQDraftFile" label="修改后GBQ底稿" align="center">
        <template slot-scope="scope">
          <download-button :value="scope.row.edit_pGBQDraftFile"></download-button>
        </template>
      </el-table-column>
      <el-table-column prop="edit_electDraftFile" label="修改后电子表格底稿" align="center">
        <template slot-scope="scope">
          <download-button :value="scope.row.edit_electDraftFile"></download-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="$refs.upRef.openDialog(scope.row)">修改</el-button>
          <el-button v-if="scope.row.allstatusname!='true'" type="text" size="mini" @click="$refs.adjustmentRef.openDialog(scope.row)">重新调整</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="dialog">
      <add-dialog :title="'新增'+title" ref="addRef" width="30%" @getFormData="networkAddData"></add-dialog>
      <up-dialog :title="'修改'+title" ref="upRef" width="30%" @getFormData="networkUpData"></up-dialog>
      <adjustment-dialog title="重新调整" ref="adjustmentRef" @getFormData="networkAdjustmentData"></adjustment-dialog>
    </div>
  </div>

</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import HeadRightButton from '../../button/HeadRightButton.vue'
  import AddDialog from '../../dialog/measureAndValuation/AddDialog.vue'
  import UpDialog from '../../dialog/measureAndValuation/UpdateDialog.vue'
  import AdjustmentDialog from '../../dialog/measureAndValuation/AdjustmentDialog.vue'
  import {mapState} from 'vuex'
  import {
    getMeasureOrValuation,
    addMeasureOrValuation,
    upMeasureOrValuation,
    delMeasureOrValuation
  } from '../../../../../../../../api/workbench/webapi-projectCost.js'

  export default {
    components: {
      HeadRightButton,
      AddDialog,
      UpDialog,
      AdjustmentDialog
    },
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    //生命周期函数节点
    created() {
      this.networkGetDatas()
    },
    mounted() {
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
        dataList: []
      }
    },

    //自定义函数节点
    methods: {
      networkGetDatas() {
        let ref = {
          projectKeyid: this.currentItem.keyid,
          prokectmvTypeName: this.title,
          pkeyid:'0000'
        }
        getMeasureOrValuation(ref).then(item => {
          this.treeTableDataFormat(item.data,'pro/ccmeasurementvaluation/findwhere').then(item=>{
            this.dataList =item
          })
        })
      },
      networkAddData(formData) {
        let ref = {
          projectKeyid: this.currentItem.keyid,
          prokectmvTypeName: this.title,
          pkeyid:'0000'
        }
        Object.assign(formData, ref)
        addMeasureOrValuation(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            console.log('qwe',item.data)
            this.networkGetDatas()
          }
        })
      },
      networkUpData(formData) {
        upMeasureOrValuation(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
      networkAdjustmentData(formData){
        formData.allstatusname='true'
        upMeasureOrValuation(formData).then(()=>{
          let ref={
            projectKeyid: this.currentItem.keyid,
            pkeyid:formData.keyid,
            prokectmvTypeName:formData.prokectmvTypeName,
            mvName:formData.mvName,
            pGBQDraftFile:formData.edit_pGBQDraftFile,
            electDraftFile:formData.edit_electDraftFile,
          }
          addMeasureOrValuation(ref).then(item => {
            if (item.code === 200) {
              this.$message.success('调整成功')
              this.networkGetDatas()
            }
          })
        })

      }
    }
  }
</script>
<style lang='less' scoped>

</style>
