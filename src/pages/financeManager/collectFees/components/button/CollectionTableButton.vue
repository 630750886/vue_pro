<template>
  <div v-if="scope.category == 0">
    <public-button
      name="SHOU1RU4DENG1JI"
      title="修改"
      classhd="hd"
      plain
      type="primary"
      @click="$emit('click', 1, scope)"
    ></public-button>
    <public-button
      name="SHOU1RU4DENG1JI"
      title="删除"
      classhd="hd"
      plain
      type="primary"
      @click="$emit('click', 2, scope)"
    ></public-button>
    <public-button
      name="MING2XI4DENG1JI"
      title="明细登记"
      classhd="hd"
      plain
      type="primary"
      @click="$emit('click', 3, scope)"
    ></public-button>
    <public-button
      name="SHOU1RU4DENG1JI"
      title="退款登记"
      classhd="hd"
      plain
      type="primary"
      @click="$emit('click', 5, scope)"
    ></public-button>
  </div>
  <div v-else-if="scope.category == 1">
    <public-button
      name="YING1FU4DENG1JI"
      title="修改"
      classhd="hd"
      plain
      type="primary"
      @click="$emit('click', 1, scope)"
    ></public-button>
    <public-button
      name="YING1FU4DENG1JI"
      title="删除"
      classhd="hd"
      plain
      type="primary"
      @click="$emit('click', 2, scope)"
    ></public-button>
    <public-button
      name="MING2XI4DENG1JI"
      title="明细登记"
      classhd="hd"
      plain
      type="primary"
      @click="$emit('click', 3, scope)"
    ></public-button>
    <public-button
      name="YING1FU4DENG1JI"
      title="退款登记"
      classhd="hd"
      plain
      type="primary"
      @click="$emit('click', 5, scope)"
    ></public-button>
  </div>
</template>
<script>
// import __ from '__' // __是需要手动引入的文件
export default {
  props: {
    user: {
      type: String,
      default: "admin",
    },
    scope: "",
  },
  // 数据节点
  data() {
    return {
      currentUser: this.user,
      data: this.scope,
    };
  },
  // 生命周期函数节点
  created() {},
  // 自定义函数节点
  methods: {},
};
</script>
<style lang="less" scoped>
.el-tag {
  margin-left: 10px !important;
}
</style>
