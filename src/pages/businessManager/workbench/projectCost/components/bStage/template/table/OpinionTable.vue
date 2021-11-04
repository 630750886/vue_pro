<template>
  <div class="column">
    <div class="button">
      <head-right-button title="新增征询意见" @click="$refs.addOpinionRef.openDialog()"></head-right-button>
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
        <el-table-column prop="probeDraftFile" label="征询意见稿" align="center">
          <template slot-scope="scope">
            <download-button :value="scope.row.probeDraftFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column label="征询意见函" align="center">
          <el-table-column prop="probeNoticeAFile" label="委托人征询意见函" align="center">
            <template slot-scope="scope">
              <download-button :value="scope.row.probeNoticeAFile"></download-button>
            </template>
          </el-table-column>
          <el-table-column prop="probeNoticeBFile" label="当事人1征询意见函" align="center">
            <template slot-scope="scope">
              <download-button :value="scope.row.probeNoticeBFile"></download-button>
            </template>
          </el-table-column>
          <el-table-column prop="probeNoticeCFile" label="当事人2征询意见函" align="center">
            <template slot-scope="scope">
              <download-button :value="scope.row.probeNoticeCFile"></download-button>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="回复函" align="center">
          <el-table-column prop="probeNoticeAReFile" label="委托人回复函" align="center">
            <template slot-scope="scope">
              <download-button :value="scope.row.probeNoticeAReFile"></download-button>
            </template>
          </el-table-column>
          <el-table-column prop="probeNoticeBReFile" label="当事人1回复函" align="center">
            <template slot-scope="scope">
              <download-button :value="scope.row.probeNoticeBReFile"></download-button>
            </template>
          </el-table-column>
          <el-table-column prop="probeNoticeCReFile" label="当事人2回复函" align="center">
            <template slot-scope="scope">
              <download-button :value="scope.row.probeNoticeCReFile"></download-button>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="操作" align="center" width="250px" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="$refs.upOpinionRef.openDialog(scope.row)">修改</el-button>
            <el-button type="text" size="mini" @click="$refs.perfectOpinionRef.openDialog(scope.row)">完善意见函及回复函</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <opinion-add-dialog ref="addOpinionRef" title="新增征询意见" @getFormData="networkAddData"></opinion-add-dialog>
      <opinion-add-dialog ref="upOpinionRef" title="修改征询意见" @getFormData="networkUpData"></opinion-add-dialog>
      <opinion-perfect-dialog ref="perfectOpinionRef" title="完善意见函及回复函" @getFormData="networkUpData"></opinion-perfect-dialog>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import HeadRightButton from "../../button/HeadRightButton.vue"
  import OpinionAddDialog  from '../../dialog/checkOpinion/OpinionAddDialog.vue'
  import OpinionPerfectDialog  from '../../dialog/checkOpinion/OpinionPerfectDialog.vue'
  import {mapState} from  'vuex'
  import {getOpinion,addOpinion,upOpinion} from '../../../../../../../../api/workbench/webapi-projectCost.js'
  export default {
    components: {
      HeadRightButton,
      OpinionAddDialog,
      OpinionPerfectDialog
    },
    props: {},
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
        dataList:[]
      }
    },

    //自定义函数节点
    methods: {
      networkGetDatas() {
        let ref = {
          projectKeyid: this.currentItem.keyid,
        }
        getOpinion(ref).then(item => {
          this.dataList = item.data
        })
      },
      networkAddData(formData) {
        let ref = {
          projectKeyid: this.currentItem.keyid,
        }
        Object.assign(formData, ref)
        addOpinion(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
      networkUpData(formData) {
        upOpinion(formData).then(item => {
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

</style>
