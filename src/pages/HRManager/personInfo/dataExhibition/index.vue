<template>
  <div>
    <head-box></head-box>
    <main-box></main-box>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import HeadBox from './components/HeadBox.vue'
  import MainBox from './components/MainBox.vue'
  export default {
    components: {
      HeadBox,
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

</style>
