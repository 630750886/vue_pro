<template>
  <div class="column">
    <el-tabs v-model="activeName" tab-position="left" style="height: 600px;">
      <template v-for="item in tabPaneList">
        <el-tab-pane :label="item.workItemName" :name="item.keyid" :key="item.workItemName">
          <template v-if="activeName===item.keyid">
            <component  v-if="item.component==='qualification-examination-table'"
                        :is="item.component" type-code="noticeandinvitation"></component>
            <component v-else-if="item.component==='publish-results-table'"
                       :is="item.component" type-code="publicity"></component>
            <component v-else :is="item.component"></component>
          </template>
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import QualificationExaminationTable from './table/QualificationExaminationTable.vue'
  import PublishResultsTable from './table/PublishResultsTable.vue'
  import OtherServices from './tabs/OtherServices.vue'
  import ProjectApplicationTag from './tabs/ProjectApplicationTag.vue'
  import ProjectFilingTag from './tabs/ProjectFilingTag.vue'
  import PrequalificationTag from './tabs/PrequalificationTag.vue'
  import BiddingFileTag from './tabs/BiddingFileTag.vue'
  import NoticeAndInvitationTag from './tabs/NoticeAndInvitationTag.vue'
  import WinBidNoticeTag from './tabs/WinBidNoticeTag.vue'
  import DemandNoticeTag from './tabs/DemandNoticeTag.vue'
  import SinglePublicityTag from './tabs/SinglePublicityTag.vue'
  import SingleNoticeTable from './table/SingleNoticeTable.vue'
  import {getServicePlan} from '../../../../../../api/workbench/webapi-projectConsult.js'
  import {mapState} from 'vuex'
  import FileAndObjectionTag from './tabs/childrenTabs/FileAndObjectionTag.vue'
  export default {
    components: {
      OtherServices,//其他服务
      ProjectApplicationTag,//项目报建
      ProjectFilingTag,//项目备案
      PrequalificationTag,//资格预审
      BiddingFileTag,//编制文件
      NoticeAndInvitationTag,//公告/邀请书编制发布、文件发售
      QualificationExaminationTable,//开标评标
      PublishResultsTable,//公示编制发布
      WinBidNoticeTag,//出具中标通知书
      DemandNoticeTag,//需求公示编制发布
      SinglePublicityTag,//单一来源公示编制发布、文件发售
      SingleNoticeTable,//单一来源公告编制发布
      FileAndObjectionTag,//发售文件
    },

    props: {},
    watch: {
      activeName(newValue){
        this.session.setItem('activeName_bStage',newValue)
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
        activeName: '1',
        tabPaneList:[],

      }
    },
    //生命周期函数节点
    created() {
      this.networkItemService()
    },
    //自定义函数节点
    methods: {
      networkItemService() {
        if (!this.$myfunction.isEmpty(this.currentItem.keyid)) {
          this.activeName =this.session.getItem('activeName_bStage')
          getServicePlan({projectKeyid: this.currentItem.keyid}).then(item => {
            console.log(this.currentItem)
            this.tabPaneList = item.data
            this.tabPaneList.sort((a,b)=>{
              let x = a.workitemorderbycode
              let y = b.workitemorderbycode
              //return ((x<y)?1:(x>y)?-1:0)
              return ((x<y)?-1:(x>y)?1:0)//小到大
            })
            if (this.$myfunction.isEmpty(this.session.getItem('activeName_bStage'))) {
              this.activeName= this.tabPaneList[0].keyid
            }

          })
        } else {
          this.tabPaneList = []
        }
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
