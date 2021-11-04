<template>
  <div class="body">
    <show-template></show-template>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import ShowTemplate from './components/ShowTemplate.vue';
  
  export default {
    components: {
      ShowTemplate
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
