<template>
  <div class="mini-body el-scrollbar">
    <div class="panel1">
      <div class="column">
        <el-tabs v-model="activeName" @tab-click="tabsHandleClick">
          <el-tab-pane name="1">
            <span slot="label">基本信息</span>
            <basic-info-card></basic-info-card>
          </el-tab-pane>
          <el-tab-pane name="2">
            <span slot="label">合同拟定及审批</span>
            <contract-details-card></contract-details-card>
          </el-tab-pane>
          <el-tab-pane name="3">
            <span slot="label">补充协议拟定及审批</span>
            <agreement-info-card></agreement-info-card>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
//import __ from '__' // __是需要手动引入的文件
import BasicInfoCard from "./BasicInfoCard.vue";
import AgreementInfoCard from "./AgreementInfoCard.vue";
import ContractDetailsCard from "./ContractDetailsCard.vue";

export default {
  components: {
    AgreementInfoCard,
    BasicInfoCard,
    ContractDetailsCard
  },
  props: {
    dataBase: Object
  },
  watch: {},
  //数据节点
  data() {
    return {
      show: true,
      activeName: "1"
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    submitForm(form) {
      this.$emit("function", "upForm", form);
    },
    tabsHandleClick() {}
  }
};
</script>
<style lang="less" scoped>
.mini-body {
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .panel1 {
    width: 100%;
    margin-top: 5px;
    .column {
      padding: 0 5px;
      span {
        font-size: 16px;
      }
    }
  }
}
</style>
