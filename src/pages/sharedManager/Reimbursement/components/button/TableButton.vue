<template>
  <div>
    <!-- <el-button type="text" @click="testdd">bbccss</el-button> -->
    <!-- <el-button type="text" @click="$emit('click',1,data)" v-show="scope.instanceid">下载附件</el-button> -->
    <el-button
      class="btn2"
      size="text"
      @click="$emit('click', 2, scope)"
      v-show="!scope.instanceId"
      >发起钉钉流程</el-button
    >
    <span style="color: #409EFF;margin-left: 10px" v-show="scope.instanceId">{{
      scope.flowstatus
    }}</span>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
export default {
  components: {},
  props: {
    scope: {}
  },
  watch: {
    scope() {
      this.data = this.scope;
    }
  },
  //数据节点
  data() {
    return {
      data: this.scope
    };
  },
  //生命周期函数节点
  created() {},
  //自定义函数节点
  methods: {
    testdd() {
      console.log(this.scope);
    }
  }
};
</script>
<style lang="less" scoped></style>
