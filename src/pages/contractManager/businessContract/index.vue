<template>
  <div class="data_section" ref="data_section">
    <table-list :tabs-name="busConType.list"></table-list>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TableList from "./components/TableList.vue";
import { createNamespacedHelpers } from "vuex";
const {mapState,mapActions} = createNamespacedHelpers("loadType");
export default {
  //数据组件
  components: {
    TableList
  },
  //合同类型 的数据库配置数据 storge 中的 loadtype 文件
  computed: {
    ...mapState({
      busConType: "busConType"
    })
  },
  //生命周期函数 中执行 合同类型数据加载
  created() {
    this.networkGetConLoadData();
  },
  //自定义函数节点
  methods: {
    //映射 vuex 中的数据网络请求- 合同类型
    ...mapActions({
      networkGetConLoadData: "networkGetConLoadData"
    })
  }
};
</script>
<style lang="less" scoped>
</style>
