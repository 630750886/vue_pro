<template>
  <el-tabs>
    <el-tab-pane label="计价计量">
      <measure-and-valuation :title="title"></measure-and-valuation>
    </el-tab-pane>
    <el-tab-pane label="现场踏勘">
      <site-survey :title="title"></site-survey>
    </el-tab-pane>
    <el-tab-pane label="初步意见">
      <preliminary-views :title="title"></preliminary-views>
    </el-tab-pane>
    <el-tab-pane label="会商谈判">
      <consultation-negotiation :title="title"></consultation-negotiation>
    </el-tab-pane>
    <el-tab-pane label="编制及出具报告">
      <preparation-reports :title="title"></preparation-reports>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import MeasureAndValuation from './MeasureAndValuation.vue'
  import SiteSurvey from './SiteSurvey.vue'
  import PreliminaryViews from './PreliminaryViews.vue'
  import ConsultationNegotiation from './ConsultationNegotiation.vue'
  import PreparationReports from './PreparationReports.vue'
  export default {
    components: {
      MeasureAndValuation,
      SiteSurvey,
      PreliminaryViews,
      ConsultationNegotiation,
      PreparationReports,
    },
    props: {
      title:[String]
    },
    //生命周期函数节点
    created() {
    },
    mounted() {
    },
    watch: {},
    //数据节点
    data() {
      return {}
    },

    //自定义函数节点
    methods: {}
  }
</script>
<style lang='less' scoped>

</style>
