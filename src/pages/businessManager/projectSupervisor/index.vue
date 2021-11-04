<template>
  <div>
    <table-list></table-list>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import TableList from "./components/TableList.vue";
import { mapActions } from "vuex";
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
    this.networkGetSelect(["projectStatus", "projectSupervisorMajorProject"]);
  },
  //自定义函数节点
  methods: {
    ...mapActions("loadType", {
      networkGetSelect: "networkGetSelect",
      networkGetCascader: "networkGetCascader"
    })
  }
};
</script>
<style lang="less" scoped></style>
