<template>
  <div class="data_section" ref="data_section">
    <table-list ref="tableRef"></table-list>
  </div>
</template>
<script>
//import __ from '__' // __是需要手动引入的文件
import TableList from "./components/TableList.vue";
import { createNamespacedHelpers } from "vuex";

const {
  mapActions
} = createNamespacedHelpers("loadType");
export default {
  components: {
    TableList
  },
  //生命周期函数节点
  created() {
    console.log("testmoment");
    console.log(this.mymoment([2007, 0, 29]).fromNow());
    this.networkGetCusLoadData();
    this.networkGetRegion();
  },
  //自定义函数节点
  methods: {
    ...mapActions({
      networkGetCusLoadData: "networkGetCusLoadData",
      networkGetRegion: "networkGetRegion"
    })
  }
};
</script>
<style lang="less" scoped>
</style>
