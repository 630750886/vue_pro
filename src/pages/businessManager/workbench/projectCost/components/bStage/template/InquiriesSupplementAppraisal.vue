<template>
  <div class="body">
    <el-tabs>
      <el-tab-pane>
        <span slot="label">质询</span>
        <inquiry-table></inquiry-table>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">补充鉴定意见相关资料收集</span>
        <com-document is-add-means code="TYPE-160"></com-document>
        <!--<means-table :mean-type="{id:'inquiries',name:'补充鉴定意见相关资料'}"></means-table>-->
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">补充鉴定书</span>
        <opinion-book-table :book-type="{id:'2',name:'补充鉴定'}"></opinion-book-table>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
  import InquiryTable from './table/InquiryTable.vue'
  import MeansTable from './table/MeansTable.vue'
  import OpinionBookTable from './table/OpinionBookTable.vue'
  export default {
    components: {
      OpinionBookTable,
      MeansTable,
      InquiryTable

    },
    props: {},
    watch: {},
    //数据节点
    data() {
      return {

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
  .body {
    .button {
      .column {
        height: 45px;
        width: 50%;
        float: left;
      }
    }
  }
</style>
