<template>
  <div class="column">
    <el-tabs v-model="activeName" tab-position="left" style="height: 500px;">
      <el-tab-pane label="项目完成申报" name="1">
        <declare v-if="activeName==='1'"></declare>
      </el-tab-pane>
      <el-tab-pane label="项目回访" name="2">
        <return-visit v-if="activeName==='2'"></return-visit>
      </el-tab-pane>
      <el-tab-pane label="资料归档" name="3">
        <filed-away v-if="activeName==='3'"></filed-away>
      </el-tab-pane>
      <!-- <el-tab-pane label="项目取消登记" name="4">
        <cancel-register></cancel-register>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  // import CancelRegister from './CancelRegister.vue'
  import Declare from './template/Declare.vue'
  import FiledAway from './template/FiledAway .vue'
  import ReturnVisit from './template/ReturnVisit.vue'
  export default {
    components: {
      // CancelRegister,
      Declare,
      FiledAway,
      ReturnVisit,
    },
    props: {},
    watch: {
      activeName(newValue){
        this.session.setItem('activeName_cStage',newValue)
      }
    },
    //数据节点
    data() {
      return {
        activeName:this.session.getItem('activeName_cStage')?this.session.getItem('activeName_cStage'):'1',
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
