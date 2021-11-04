<template>
  <section class="data_section" ref="data_section">
    <el-row :gutter="20">
      <el-col>
        <table-list></table-list>
      </el-col>
    </el-row>
  </section>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TableList from "./components/TableList.vue";
import { createNamespacedHelpers } from "vuex";

const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} = createNamespacedHelpers("loadType");
export default {
  components: {
    TableList
  },
  props: {},
  watch: {},
  //数据节点
  data() {
    return {};
  },
  //生命周期函数节点
  created() {
    this.networkGetCusLoadData();
    this.networkGetOrgAndPost();
  },
  //自定义函数节点
  methods: {
    ...mapActions({
      networkGetCusLoadData: "networkGetCusLoadData",
      networkGetOrgAndPost: "networkGetOrgAndPost"
    })
  }
};
</script>
<style lang="less" scoped></style>
