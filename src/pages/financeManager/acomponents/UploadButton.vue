<template>
    <el-button :class="type" size="mini" type="text" @click="$emit('click')"><i class="el-icon-upload"></i>{{title}}</el-button>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      title:{
        type:String,
        default: '附件上传'
      },
      type:{
        type:String,
        default:'primary'
      }
    },
    watch: {

    },
    mounted(){

    },
    //数据节点
    data() {
      return {

      }
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {}
  }
</script>
<style lang='less' scoped>
  .primary{
    color:#409EFF;
    i{
      font-size: 16px;
    }
  }
  .waring{
    color: #FFCF10;
    i{
      font-size: 16px;
    }
  }
</style>
