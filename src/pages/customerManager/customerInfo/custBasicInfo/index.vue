<template>
  <div class="main-box ">
    <div class="column">
      <el-tabs v-model="activeName">
        <el-tab-pane name="1">
          <span slot="label">基本信息</span>
          <basic-info></basic-info>
        </el-tab-pane>
        <el-tab-pane name="2" v-if="false">
          <span slot="label">业务信息</span>
          <business-info></business-info>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import BasicInfo from './components/BasicInfo.vue'
  import BusinessInfo from './components/BusinessInfo.vue'
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapGetters, mapMutations, mapActions} = createNamespacedHelpers('customerInfo')
  export default {
    components: {
      BasicInfo,
      BusinessInfo
    },
    props: {},
    watch: {
      activeName(newValue) {
        switch (newValue) {
          case '1':
            this.networkGetContacts('pre')
            break
          case '2':
            this.networkGetContacts('nxt')
            break
        }
      }
    },
    computed: {},
    //数据节点
    data() {
      return {
        activeName: '1',
      }
    },
    mounted() {

    },
    destroy() {
    },
    //生命周期函数节点
    created() {
      this.networkGetCustomerByKeyId()
      this.networkGetContacts('pre')
    },
    //自定义函数节点
    methods: {
      ...mapActions({
        networkGetCustomerByKeyId: 'networkGetCustomerByKeyId',
        networkGetContacts: 'networkGetContacts'
      })
    }
  }
</script>
<style lang='less' scoped>
  .main-box {
    .column {
      flex: 3;
      padding: 0 10px;
      span {
        font-size: 16px;
      }
      &:nth-child(1) {
        flex: 1;
      }
      &:nth-child(2) {
        flex: 8;
      }
      &:nth-child(3) {
        flex: 1;
      }
    }
    .panel {
      display: flex;
      height: 540px;
      overflow-y: auto;
      margin-top: 20px;

    }
  }

</style>
