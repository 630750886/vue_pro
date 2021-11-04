<template>
  <div>
    <!--
    <public-button
      name="XIANG4MU4DENG1JI4QING2KUANG"
      title="项目情况登记"
      classhd="hd" :plain="true" type="primary"
      @click="$emit('click', 1, data)"
    ></public-button>
    <public-button
      name="BAO4MING2DENG1JI"
      title="报名登记"
      classhd="hd" :plain="true" type="primary"
      @click="$emit('click', 2, data)"
    ></public-button>
    -->
    <public-button
      name="TOU2BIAO1QUE4DING"
      title="投标确定"
      classhd="hd" :plain="true" type="primary"
      @click="$emit('click', 3, data)"
    ></public-button>
    <!--指定负责人-->
    <public-button
      name="FEN1PEI"
      title="分配"
      classhd="hd" :plain="true" type="primary"
      @click="$emit('click', 5, data)"
    ></public-button>
     <public-button
      name="JIN4RU4GONG1ZUO"
      title="进入工作"
      classhd="hd" :plain="true" type="primary"
      @click="$emit('click', 4, data)"
    ></public-button>
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
    scope(newValue) {
      this.data = newValue;
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
<style lang="less" scoped>
span {
  color: #409eff;
  margin: 0 10px;
}
</style>
