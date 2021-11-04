<template>
    <span>{{title}}</span>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      title:''
    },
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
  span{
    color: #409EFF;
    margin-left: 10px;
    margin-right: 10px;
  }
</style>
