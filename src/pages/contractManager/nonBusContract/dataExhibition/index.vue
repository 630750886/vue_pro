<template>
  <section class="data_section" ref="data_section">
    <el-row :gutter="20">
      <el-col>
        <table-list
                :load-data="loadData"
                :page-total="total"
                :my-data="dataList"
                @function="submitForm"
        ></table-list>
      </el-col>
    </el-row>
  </section>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import TableList from './components/TableList.vue'
  export default {
    components: {
      TableList
    },
    props: {},
    watch: {},
    //数据节点
    data() {
      return {
        dataList:[],
        total:0,
        loadData:{}
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      submitForm(){}
    }
  }
</script>
<style lang='less' scoped>

</style>
