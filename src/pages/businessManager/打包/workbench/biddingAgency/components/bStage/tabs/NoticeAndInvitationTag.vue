<template>
  <div class="b-main">
    <invitation-letter-table></invitation-letter-table>
<!--    <el-tabs v-model="activeName" tab-position="top">-->
<!--      <el-tab-pane label="编制及发布公告/邀请书" name="1">-->
<!--        <invitation-letter-table></invitation-letter-table>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="发售文件及异议处理" name="2">-->
<!--        <file-and-objection-tag code="TYPE-126" type-code="noticeandinvitation"></file-and-objection-tag>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="确定拦标价/预算价(万元)" name="3">-->
<!--        <sure-budget-table></sure-budget-table>-->
<!--      </el-tab-pane>-->
<!--    </el-tabs>-->


  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  // import FileAndObjectionTag from './childrenTabs/FileAndObjectionTag.vue'
  import InvitationLetterTable from '../table/InvitationLetterTable.vue'
  // import SureBudgetTable from '../table/SureBudgetTable.vue'


  export default {
    components: {
      // FileAndObjectionTag,
      InvitationLetterTable,
      // SureBudgetTable,

    },
    props: {},
    watch: {},
    //数据节点
    data() {
      return {
        activeName: '1',
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
  .b-main {
    height: 80%;
  }

</style>

