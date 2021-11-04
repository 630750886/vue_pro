<template>
  <div class="b-main">
    <el-tabs v-model="activeName" tab-position="top" style="height: 600px;">
      <el-tab-pane label="监理报告及监理通知单" name="1">
        <com-document code="TYPE-109"></com-document>
      </el-tab-pane>
      <el-tab-pane label="审查施工单位相关文件" name="2">
        <el-tabs tab-position="top">
          <el-tab-pane label="施工单位审查">
            <examination-company-table type-code="construction"></examination-company-table>
          </el-tab-pane>
          <el-tab-pane label="分包单位审查">
            <com-document is-add-means code="TYPE-144" file-label="单位名称"></com-document>
            <!--<com-document code="construction"
                          is-add-means :is-init="false"
                          button-title="新增分包单位资格报审表" file-label="单位名称"></com-document>-->
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="开工/停工/复工" name="3">
        <el-tabs tab-position="top">
          <el-tab-pane label="开工/暂停/复工令">
            <com-document code="TYPE-110"></com-document>
          </el-tab-pane>
          <el-tab-pane label="开工/复工报审表">
            <com-document code="TYPE-111"></com-document>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="施工过程监理及工作汇总" name="4">
        <construction-supervision-tab></construction-supervision-tab>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import ExaminationCompanyTable from '../table/ExaminationCompanyTable.vue'
  import ConstructionSupervisionTab from './secondTab/ConstructionSupervisionTab.vue'
  export default {
    components: {
      ExaminationCompanyTable,
      ConstructionSupervisionTab,
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
    methods: {

    }
  }
</script>
<style lang='less' scoped>
  .b-main {
    height: 80%;
  }
</style>
