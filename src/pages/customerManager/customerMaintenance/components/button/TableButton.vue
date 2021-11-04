<template>
  <div>
    <public-button
      name="HUI2FANG3QING2KUANG"
      title="回访情况"
      classhd="hd" :plain="true" type="primary"
      @click="$emit('click', 1, scope)"
    ></public-button>
    <public-button
      name="HUI2FANG3CHU3LI"
      title="回访处理"
      classhd="hd" :plain="true" type="primary"
      @click="$emit('click', 2, scope)"
    ></public-button>
    <status-button code="134" :status="scope.allstatuscode"></status-button>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
export default {
  components: {},
  props: {
    scope: {}
  },
  watch: {},
  //数据节点
  data() {
    return {};
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {}
};
</script>
<style lang="less" scoped>
span {
  color: #409eff;
  margin-left: 10px;
}
</style>
