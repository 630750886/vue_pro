<template>
  <div>
    <el-button type="text" size="mini" @click="$emit('click', 1, data)"
      >修改</el-button
    >
    <el-button type="text" size="mini" @click="$emit('click', 2, data)"
      >删除</el-button
    >
    <el-button
      type="text"
      style="color: red"
      size="mini"
      icon="el-icon-setting"
      @click="$emit('click', 3, data)"
      >配置</el-button
    >
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    scope: { type: String, default: "" }
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
  methods: {}
};
</script>

<style scoped></style>
