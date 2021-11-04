<template>
  <div class="head-box">
    <h1>数据展示</h1>
    <div class="show-time"></div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import run from '../../../../../../public/js_css/showTime.js'
  export default {
    components: {},
    props: {},
    watch: {},
    //数据节点
    data() {
      return {}
    },
    //生命周期函数节点
    created() {
      run('.show-time')
    },
    //自定义函数节点
    methods: {}
  }
</script>
<style lang='less' scoped>
.head-box{
  position: relative;
  height: 70px;
  background: url("../../../../../../public/images/ec-3.jpg");
  h1{
    font-size: 24px;
    color: #ffffff;
    text-align: center;
    line-height: 70px;
  }
  .show-time{
    position: absolute;
    right: 20px;
    top:0;
    line-height: 70px;
    color: rgba(225,225,225,0.7);
    font-size: 14px;
  }
}
</style>
