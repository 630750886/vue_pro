<template>
  <el-button type="text" :size="size" @click="$emit('click')">{{title}}</el-button>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      title:'',
      size:{
        type:String,
        default:'mini'
      }
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

</style>
