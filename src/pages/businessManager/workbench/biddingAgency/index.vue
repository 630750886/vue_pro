<template>
  <div class="main">
    <el-tabs v-model="activeName">
<!--      <el-tab-pane label="前期阶段" name="advance">-->
<!--        <a-stage v-if="activeName==='advance'"></a-stage>-->
<!--      </el-tab-pane>-->
      <el-tab-pane label="准备阶段" name="advance">
        <a-stage v-if="activeName==='advance'"></a-stage>
      </el-tab-pane>
      <el-tab-pane label="实施阶段" name="second">
        <b-stage v-if="activeName==='second'"></b-stage>
      </el-tab-pane>
<!--      <el-tab-pane label="收尾阶段" name="third">-->
<!--        <c-stage v-if="activeName==='third'"></c-stage>-->
<!--      </el-tab-pane>-->
    </el-tabs>
  </div>
</template>
<script>
  //import　__from　'__'　//__是需要手动引入的文件
  import aStage from './components/aStage/TemplateIndex.vue'
  import bStage from './components/bStage/TemplateIndex.vue'
  import cStage from './components/cStage/TemplateIndex.vue'
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

  export default {
    components: {
      aStage,
      bStage,
      cStage,
    },
    props: {},
    watch: {
      activeName(newValue) {
        this.session.setItem('activeName_workbench_index',newValue)
        switch (newValue) {
          case 'advance':
            this.aStage=new Date().getTime()
            this.aStageGetCurrWorkPlan()
            this.aStageGetHistoryWorkPlan()
            this.aStageGetItemContacts()
            this.aStageGetMaterials()
            break
          case 'second':
            this.bStage=new Date().getTime()
            break
          case 'third':
            this.cStage=new Date().getTime()
            this.cStageGetCurrWorkPlan()
            this.cStageGetReturnMaterials()
            break
        }
      }
    },
    //数据节点
    data() {
      return {
        activeName: this.session.getItem('activeName_workbench_index')?this.session.getItem('activeName_workbench_index'):'advance',
      }
    },
    //生命周期函数节点
    created() {
      this.aStageGetCurrWorkPlan()
      this.aStageGetHistoryWorkPlan()
      this.aStageGetItemContacts()
      this.aStageGetMaterials()
    },
    //自定义函数节点
    methods: {
      ...mapActions('workbench/aStage', {
        aStageGetCurrWorkPlan: 'networkGetCurrWorkPlan',
        aStageGetHistoryWorkPlan: 'networkGetHistoryWorkPlan',
        aStageGetItemContacts: 'networkGetItemContacts',
        aStageGetMaterials: 'networkGetMaterials',
      }),
      ...mapActions('workbench/cStage', {
        cStageGetCurrWorkPlan: 'networkGetCurrWorkPlan',
        cStageGetReturnMaterials:'networkGetReturnMaterials'
      }),
    }
  }
</script>
<style lang='less' scoped>
  .main {
    padding: 5px 20px;
  }
</style>
