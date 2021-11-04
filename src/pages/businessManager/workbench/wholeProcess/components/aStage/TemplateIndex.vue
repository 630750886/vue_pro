<template>
  <div class="column">
    <el-tabs v-model="activeName" tab-position="left" style="height: 600px;">
      <el-tab-pane label="组建工作组" name="1">
        <establish-work-group></establish-work-group>
      </el-tab-pane>
      <el-tab-pane label="拟定工作计划" name="2">
        <establish-work-plan></establish-work-plan>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import EstablishWorkGroup from './template/EstablishWorkGroup.vue'
  import EstablishWorkPlan from './template/EstablishWorkPlan.vue'

  export default {
    components: {
      EstablishWorkGroup,
      EstablishWorkPlan,
    },
    props: {},
    watch: {},
    //数据节点
    data() {
      return {
        activeName:'1'
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {}
  }
</script>
<style lang='less' scoped>

</style>
