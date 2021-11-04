<template>
  <div class="body">
    <el-tabs>
      <el-tab-pane>
        <span slot="label">文件收集</span>
        <div class="column">
          <!--<div style="float: left">
            <span>上传工程建设项目相关报价分析表：</span>
            <upload-button  v-if="!showLeftButton" @click="showLeftButton=true"></upload-button>
            <template v-if="showLeftButton">
              <el-button type="text">下载</el-button>
              <upload-button title="重新上传" type="waring" @click="showLeftButton=true"></upload-button>
            </template>
          </div>
          <means-table :meanType="{id:'clearbid',name:'清标文件'}"></means-table>-->
          <com-document is-add-means code="TYPE-161"></com-document>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">清标报告</span>
        <clear-bid-report-table></clear-bid-report-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import MeansTable from './table/MeansTable.vue'
  import ClearBidReportTable from './table/ClearBidReportTable.vue'
  export default {
    components: {
      MeansTable,
      ClearBidReportTable
    },
    props: {},
    watch: {},
    //数据节点
    data() {
      return {
        value1: '',
        showLeftButton: false,
        dataList: []
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
