<template>
  <div>
    <user-table></user-table>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
import UserTable from "./compontent/table/UserTable.vue";
export default {
  components: {
    UserTable
  },
  props: {},
  //生命周期函数节点
  created() {},
  mounted() {},
  watch: {},
  //数据节点
  data() {
    return {};
  },

  //自定义函数节点
  methods: {}
};
</script>
<style lang="less" scoped></style>
