<template>
  <div class="column">
    <div class="button">
      <head-right-button title="新增核对" @click="$refs.addCheckRef.openDialog()"></head-right-button>
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
        <el-table-column prop="collator" label="核对人" align="center"></el-table-column>
        <el-table-column prop="collatNoticefile" label="邀请当事人参加造价核对工作通知函" align="center">
          <template slot-scope="scope">
            <download-button :value="scope.row.collatNoticefile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="collatDataFile" label="核对工作相关资料" align="center" >
          <template slot-scope="scope">
            <download-button :value="scope.row.collatDataFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="250px">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="$refs.updateCheckRef.openDialog(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <add-dialog ref="addCheckRef" title="新增核对" @getFormData="networkAddData"></add-dialog>
      <add-dialog ref="updateCheckRef" title="修改核对" @getFormData="networkUpData"></add-dialog>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import HeadRightButton from "../../button/HeadRightButton.vue"
  import AddDialog  from '../../dialog/checkOpinion/CheckAddDialog.vue'
  import {mapState} from 'vuex'
  import {getCheck,addCheck,upCheck,delCheck} from '../../../../../../../../api/workbench/webapi-projectCost.js'
  export default {
    components: {
      HeadRightButton,
      AddDialog
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
        getCheck(ref).then(item => {
          this.dataList = item.data
        })
      },
      networkAddData(formData) {
        let ref = {
          projectKeyid: this.currentItem.keyid,
        }
        Object.assign(formData, ref)
        addCheck(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
      networkUpData(formData) {
        upCheck(formData).then(item => {
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
