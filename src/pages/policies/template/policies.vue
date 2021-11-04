<template>
  <div class="data_section" ref="data_section">
    <table-list></table-list>
  </div>
</template>
<script>
//import __ from '__' // __是需要手动引入的文件
import TableList from "./components/TableList.vue";
import { createNamespacedHelpers } from "vuex";
const {mapActions} = createNamespacedHelpers("loadType");
export default {
  components: {
    TableList
  },
  //生命周期函数节点
  created() {
  },
  //自定义函数节点
  methods: {
  }
};
</script>
<style lang="less" scoped>
</style>