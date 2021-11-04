<template>
  <div class="column">
    <div class="button">
      <head-right-button title="新增" @click="$refs.addInquiriesRef.openDialog()"></head-right-button>
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
        <el-table-column prop="inquiryWayName" label="质询形式" align="center"></el-table-column>
        <el-table-column prop="inquiryAttachFile" label="书面形式答复质询" align="center">
          <template slot-scope="scope">
            <download-button :value="scope.row.inquiryAttachFile"></download-button>
          </template>
        </el-table-column>
        <el-table-column prop="inquirydateTime" label="出庭或出场日期" align="center" width="150"></el-table-column>
        <el-table-column prop="inquiryPersonName" label="出庭人" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="250px">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="$refs.updateInquiriesRef.openDialog(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <inquiries-dialog ref="addInquiriesRef" title="新增质询" @getFormData="networkAddData"></inquiries-dialog>
      <inquiries-dialog ref="updateInquiriesRef" title="修改质询" @getFormData="networkUpData"></inquiries-dialog>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import HeadRightButton from "../../button/HeadRightButton.vue"
  //质询
  import InquiriesDialog from '../../dialog/inquiriesSupplementAppraisal/InquiriesDialog.vue'
  import {mapState} from  'vuex'
  import {getInquiry,addInquiry,upInquiry} from '../../../../../../../../api/workbench/webapi-projectCost.js'
  export default {
    components: {
      HeadRightButton,
      InquiriesDialog
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
        getInquiry(ref).then(item => {
          this.dataList = item.data
        })
      },
      networkAddData(formData) {
        let ref = {
          projectKeyid: this.currentItem.keyid,
        }
        Object.assign(formData, ref)
        addInquiry(formData).then(item => {
          if (item.code === 200) {
            this.$message.success(item.message)
            this.networkGetDatas()
          }
        })
      },
      networkUpData(formData) {
        upInquiry(formData).then(item => {
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
