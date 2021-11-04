<template>
  <div class="b-main">
    <com-document is-add-means button-title="新建" file-label="资料名称" code="TYPE-124"></com-document>
<!--    <el-tabs v-model="activeName" tab-position="top">-->
<!--      <el-tab-pane label="文件论证" name="1">-->
<!--        <document-proof-table type-code="prequalification"></document-proof-table>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="编制及审核资格预审文件" name="2">-->
<!--        <pretrial-document-table></pretrial-document-table>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="编制及发布资格预审公告" name="3">-->
<!--        <preliminary-notice-table type-code="prequalification"></preliminary-notice-table>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="发售文件及异议处理" name="4">-->
<!--        <file-and-objection-tag code="TYPE-125" type-code="prequalification"></file-and-objection-tag>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="开标评标" name="5">-->
<!--        <qualification-examination-table type-code="prequalification"></qualification-examination-table>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="发布结果通知及异议处理" name="6">-->
<!--        <publish-results-table type-code="prequalificationPublish"></publish-results-table>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="出具结果通知书" name="7">-->
<!--        <give-result-table></give-result-table>-->
<!--      </el-tab-pane>-->
<!--    </el-tabs>-->
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  // import DocumentProofTable from '../table/DocumentProofTable.vue'
  // import PretrialDocumentTable from '../table/PretrialDocumentTable.vue'
  // import PreliminaryNoticeTable from '../table/PreliminaryNoticeTable.vue'
  // import FileAndObjectionTag from './childrenTabs/FileAndObjectionTag.vue'
  // import QualificationExaminationTable from '../table/QualificationExaminationTable.vue'
  // import PublishResultsTable from '../table/PublishResultsTable.vue'
  // import GiveResultTable from '../table/GiveResultTable.vue'

  export default {
    components: {
      // DocumentProofTable,
      // PretrialDocumentTable,
      // PreliminaryNoticeTable,
      // FileAndObjectionTag,
      // QualificationExaminationTable,
      // PublishResultsTable,
      // GiveResultTable,
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

</style>

