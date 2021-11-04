<template>
  <el-button 
  :class="classhd? 'btn_colorhd' : 'btn_color'"
  :type="type ? type : 'primary'"
  :icon="icon"
  :plain="plain"
  size="mini" 
  round 
  @click="$emit('click')"
  >{{title}}</el-button>
</template>
<script>
  //import __ from '__' // __是需要手动引入的文件
  export default {
    components: {},
    props: {
      icon: [String],
      type: [String],
      classhd:[String],
      plain:{type:Boolean,default:false},
      title:{
        type:String,
        default:'提交'
      }
    },
  }
</script>
<style lang='less' scoped>
  .btn_colorhd{
    margin: 3px 1px;
    padding: 3px 3px;
    color:rgb(16, 175, 248);
  }
</style>
