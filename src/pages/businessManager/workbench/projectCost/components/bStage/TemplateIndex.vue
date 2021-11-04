<template>
  <div class="column">
    <el-tabs v-model="activeName" tab-position="left" style="height: 450px">
      <template v-for="item in tabPaneList"><!--workItemName-->
        <el-tab-pane :label="item.name?item.name:item.workItemName" :name="item.keyid" :key="item.keyid">
          <template v-if="activeName===item.keyid">
            <component v-if="item.component==='PublicTemplate'" :is="item.component" :title="item.workItemName"></component>
            <component v-else :is="item.component"></component>
          </template>
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import MeasureAndValuation from './template/MeasureAndValuation.vue'
  import SiteSurvey from './template/SiteSurvey.vue'
  import PreliminaryViews from './template/PreliminaryViews.vue'
  import ConsultationNegotiation from './template/ConsultationNegotiation.vue'
  import PreparationReports from './template/PreparationReports.vue'
  import SceneInvestigation from './template/SceneInvestigation.vue'
  import CheckOpinion from './template/CheckOpinion.vue'
  import AppraisalOpinion from './template/AppraisalOpinion.vue'
  import InquiriesSupplementAppraisal from './template/InquiriesSupplementAppraisal.vue'
  import ClearBid from './template/ClearBid.vue'
  import UsedItemMoneyPlan from './template/UsedItemMoneyPlan.vue'
  import ProjectMeterContractMoney from './template/ProjectMeterContractMoney.vue'
  import EnquiryCheckMoney from './template/EnquiryCheckMoney.vue'
  import ProjectChangeCheck from './template/ProjectChangeCheck.vue'
  import ProjectVisaCheck from './template/ProjectVisaCheck.vue'
  import ProjectClaimCheck from './template/ProjectClaimCheck.vue'
  import ProjectCostDynamicManager from './template/ProjectCostDynamicManager.vue'
  import OtherServices from './template/OtherServices.vue'
  import PublicTemplate from './template/PublicTemplate.vue'

  import {mapState} from 'vuex'
  import {getServicePlan} from '../../../../../../api/workbench/webapi-projectCost.js'
  export default {
    components: {
      MeasureAndValuation,
      SiteSurvey,
      PreliminaryViews,
      ConsultationNegotiation,
      PreparationReports,
      SceneInvestigation,
      CheckOpinion,
      AppraisalOpinion,
      InquiriesSupplementAppraisal,
      ClearBid,
      UsedItemMoneyPlan,
      ProjectMeterContractMoney,
      EnquiryCheckMoney,
      ProjectChangeCheck,
      ProjectVisaCheck,
      ProjectClaimCheck,
      ProjectCostDynamicManager,
      OtherServices,
      PublicTemplate
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
        activeName:'',
        tabPaneList:[
          {keyid:'402880fa751bcd4c01751bdebfeb000f',name:'计量计价',component:'MeasureAndValuation'},
          {keyid:'402880fa751bcd4c01751bdeeb520010',name:'现场踏勘',component:'SiteSurvey'},
          {keyid:'402880fa751bcd4c01751bdf15e10011',name:'初步意见',component:'PreliminaryViews'},
          {keyid:'402880fa751bcd4c01751bdf36c20012',name:'会商谈判',component:'ConsultationNegotiation'},
          {keyid:'402880fa751bcd4c01751bdf89fa0013',name:'编制及出具报告',component:'PreparationReports'},
          {keyid:'402880fa751bcd4c01751be0bbdd0015',name:'现场勤验',component:'SceneInvestigation'},
          {keyid:'402880fa751bcd4c01751be0f4ea0016',name:'鉴定核对及出具征询意见稿',component:'CheckOpinion'},
          {keyid:'402880fa751bcd4c01751be1211d0017',name:'出具鉴定意见书',component:'AppraisalOpinion'},
          {keyid:'402880fa751bcd4c01751be13db30018',name:'质询及补充鉴定',component:'InquiriesSupplementAppraisal'},
          {keyid:'402880fa751bcd4c01751bf119440023',name:'清标',component:'ClearBid'},
          {keyid:'402880fa751bcd4c01751bf1ce6e0024',name:'编制项目资金使用计划',component:'UsedItemMoneyPlan'},
          {keyid:'402880fa751bcd4c01751bf2121c0025',name:'工程计量与合同价款审核',component:'ProjectMeterContractMoney'},
          {keyid:'402880fa751bcd4c01751bf23c4a0026',name:'询价与核价',component:'EnquiryCheckMoney'},
          {keyid:'402880fa751bcd4c01751bf27bda0027',name:'工程变更审核',component:'ProjectChangeCheck'},
          {keyid:'402880fa751bcd4c01751bf29d720028',name:'工程签证审核',component:'ProjectVisaCheck'},
          {keyid:'402880fa751bcd4c01751bf2bfc20029',name:'工程索赔审核',component:'ProjectClaimCheck'},
          {keyid:'402880fa751bcd4c01751bf2f977002a',name:'工程造价动态管理',component:'ProjectCostDynamicManager'},
        ]
      }
    },
    //生命周期函数节点
    created() {
      this.networkItemService()
    },
    //自定义函数节点
    methods: {
      networkItemService(){
        if (this.currentItem.keyid !== '') {
          this.activeName =this.session.getItem('activeName_bStage')
          this.tabPaneList=[]
          getServicePlan({projectKeyid:this.currentItem.keyid}).then(item=>{
            this.tabPaneList=item.data.sort((a,b)=>{
              let x = a.workitemorderbycode
              let y = b.workitemorderbycode
              //return ((x<y)?1:(x>y)?-1:0)
              return ((x<y)?-1:(x>y)?1:0)//小到大
            })
            if (this.$myfunction.isEmpty(this.session.getItem('activeName_bStage'))) {
              this.activeName= this.tabPaneList[0].keyid
            }

          })
        }else {
          this.tabPaneList=[]
        }
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
