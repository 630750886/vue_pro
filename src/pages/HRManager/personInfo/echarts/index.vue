<template>
  <div id="body">
    <head-title></head-title>
    <main-box></main-box>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import HeadTitle from './components/HeadTitle.vue'
  import MainBox from './components/MainBox.vue'
  export default {
    components: {
      HeadTitle,
      MainBox
    },
    props: {},
    watch: {},
    //数据节点
    data() {
      return {}
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {}
  }
</script>
<style lang='less' scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing:border-box;
  }
  #body{
    width: 100%;
    height: 100%;
    line-height: 1.15;
  }

</style>
