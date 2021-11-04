<template>
  <div>
    <public-button
      classhd="hd" :plain="true" type="primary"
      name="XIU1GAI3GANG3WEI"
      title="修改"
      @click="$emit('click', 1, data)"
    ></public-button>
    <public-button
      classhd="hd" :plain="true" type="primary"
      name="SHAN1CHU2GANG3WEI"
      title="删除"
      @click="$emit('click', 2, data)"
    ></public-button>
  </div>
</template>

<script>
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
  methods: {}
};
</script>

<style scoped></style>
