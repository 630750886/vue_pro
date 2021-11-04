<template>
  <div class="body">
    <el-tabs v-model="activeName">
      <el-tab-pane name="1">
        <span slot="label">{{item.formtendername}}</span>
        <div class="tabs-body">
          <bidding-comparison v-if="item.formtenderkeyid==='402880fa750101f90175029c5d15000f'"></bidding-comparison>
          <quotation-letter v-if="item.formtenderkeyid==='402880fa750101f90175029c9dc30010'"></quotation-letter>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import BiddingComparison from './template/BiddingComparison.vue'
  import BaseInfo from './template/BaseInfo.vue'
  import QuotationLetter from './template/QuotationLetter.vue'
  import {mapState, mapActions} from 'vuex'
  export default {
    components: {
      BaseInfo,
      BiddingComparison,
      QuotationLetter,
    },
    props: {},
    watch: {
    },
    computed: {
      ...mapState('bidManager', {
        item: 'item'
      })
    },
    //数据节点
    data() {
      return {
        activeName: '1',
        temKey:1
      }
    },
  }
</script>
<style lang='less' scoped>
  .body {
    .tabs-body {
      .head-button {
        height: 50px;
        line-height: 50px;
        .el-button {
          margin-left: 20px;
        }
      }
      p {
        font-size: 16px;
        height: 50px;
        line-height: 50px;
      }
    }
  }
</style>
