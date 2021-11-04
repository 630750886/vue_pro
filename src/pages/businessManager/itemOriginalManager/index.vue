<template>
  <section class="data_section" ref="data_section">
    <el-tabs v-model="activeName">
      <el-tab-pane name="1">
        <span slot="label">我的移交</span>
        <div>
          <transfer-table-list></transfer-table-list>
        </div>
      </el-tab-pane>
      <el-tab-pane name="2">
        <span slot="label">我的接收</span>
        <div>
          <receive-table-list></receive-table-list>
        </div>

      </el-tab-pane>
    </el-tabs>
  </section>

</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import ReceiveTableList from './components/ReceiveTableList.vue'
  import TransferTableList from './components/TransferTableList.vue'
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapGetters, mapMutations, mapActions} = createNamespacedHelpers('originalScript')
  export default {
    components: {
      ReceiveTableList,
      TransferTableList
    },
    props: {},
    watch: {
      activeName(newValue){
        switch (newValue) {
          case '1':
            this.networkGetTransfer(this.$myfunction.copyData(this.pageShow))
            break
          case '2':
            this.networkGetReceive(this.$myfunction.copyData(this.pageShow))
            break
        }
      }
    },
    computed:{

    },
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
            turnOverFileTypeKeyId:'1',
            turnOverFileTypeName:'项目'
          }
        },
      }
    },
    //生命周期函数节点
    created() {
      this.networkGetTransfer(this.$myfunction.copyData(this.pageShow))
    },
    //自定义函数节点
    methods: {
      ...mapActions({
        networkGetTransfer:'networkGetTransfer',
        networkGetReceive:'networkGetReceive'
      }),
    }
  }
</script>
<style lang='less' scoped>

</style>
