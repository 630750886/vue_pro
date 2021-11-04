<template>
  <div class="body">
    <div class="head-button">
      <head-button ></head-button>
    </div>
    <div class="table">
      <invoice-table :data-list="dataList"></invoice-table>
    </div>
    <div class="dialog">

    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import HeadButton from './button/HeadButton.vue'
  import InvoiceTable from './table/InvoiceTable.vue'


  export default {
    components: {
      HeadButton,
      InvoiceTable,

    },
    props: {},
    watch: {},
    //数据节点
    data() {
      return {
        activeName: '1',
        activeName2: '1',
        dataList: [{}, {}],
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
  .head-button {
    height: 50px;
    line-height: 50px;
    padding: 0px 20px;
  }
  .table{
    margin: 0 7px;
  }
  /deep/ .el-table__fixed-right-patch {
    background-color: transparent;
  }
</style>
