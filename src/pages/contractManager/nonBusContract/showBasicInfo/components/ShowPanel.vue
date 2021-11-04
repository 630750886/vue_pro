<template>
  <div class="mini-body el-scrollbar">
    <div class="panel1">
      <div class="column">
        <el-tabs v-model="activeName" @tab-click="tabsHandleClick">
          <el-tab-pane name="1">
            <span  slot="label">基本信息</span>
            <basic-info-card></basic-info-card>
          </el-tab-pane>
          <el-tab-pane name="2">
            <span  slot="label">合同拟定及审批</span>
            <contract-details-card></contract-details-card>
          </el-tab-pane>
          <el-tab-pane name="3">
            <span  slot="label">补充协议拟定及审批</span>
            <agreement-details-card></agreement-details-card>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>

</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import BasicInfoCard from './BasicInfoCard.vue'
  import AgreementDetailsCard from './AgreementDetailsCard.vue'
  import ContractDetailsCard from './ContractDetailsCard.vue'

  export default {
    components: {
      BasicInfoCard,
      AgreementDetailsCard,
      ContractDetailsCard
    },
    props: {
      dataBase:'',
    },
    watch: {},
    //数据节点
    data() {
      return {
        show: true,
        activeName:'1'
      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      submitUpForm(formData){
        this.$emit('function','upForm',formData)
      },
      tabsHandleClick(){

      }
    }
  }
</script>
<style lang='less' scoped>
  .mini-body {
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    .panel1 {
      margin-top: 5px;
      padding-right: 5px;
      overflow-x:hidden;
      .column {
        padding: 0 2px;
        span{
          font-size: 16px;
        }
      }
    }
  }

</style>
