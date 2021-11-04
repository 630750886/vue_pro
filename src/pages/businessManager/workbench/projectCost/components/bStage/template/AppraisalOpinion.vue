<template>
  <div class="body">
    <opinion-book-table :book-type="{id:'1',name:'鉴定'}"></opinion-book-table>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import OpinionBookTable from './table/OpinionBookTable.vue'
 export default {
    components: {
      OpinionBookTable
    },
    props: {},
    watch: {},
    computed:{

    },
    //数据节点
    data() {
      return {

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
