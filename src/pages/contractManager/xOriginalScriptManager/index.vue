<template>
  <section class="data_section" ref="data_section">
        <div>
          <receive-table-list></receive-table-list>
        </div>
  </section>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import ReceiveTableList from './components/ReceiveTableList.vue'
  import {createNamespacedHelpers} from 'vuex'
  const {mapState, mapGetters, mapMutations, mapActions} = createNamespacedHelpers('originalScript')
  export default {
    components: {
      ReceiveTableList,
    },
    props: {},
    //数据节点
    data() {
      return {
        activeName:'1',
        pageShow: {
          pageInfo:{
            page: 1,
            limit: 30,
          },
          advancedQuery:{
            turnOverFileTypeKeyId:'0',
            turnOverFileTypeName:'合同'
          }
        },
      }
    },
    //生命周期函数节点
    created() {
      this.networkGetReceive(this.$myfunction.copyData(this.pageShow))
    },
    //自定义函数节点
    methods: {
        ...mapActions({
          networkGetReceive:'networkGetReceive'
        }),
    }
  }
</script>
<style lang='less' scoped>

</style>
