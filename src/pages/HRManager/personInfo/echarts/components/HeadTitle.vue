<template>
  <div>
    <div class="head">
      <h1>数据可视化-ECharts</h1>
      <div class="showTime"></div>
    </div>
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
      return {

      }
    },
    //生命周期函数节点
    created() {
      run('.showTime')
    },
    //自定义函数节点
    methods: {

    }
  }
</script>
<style lang='less' scoped>
  .head {
    position: relative;
    height: 1.25rem;
    background: url("../../../../../../public/images/ec-3.jpg");
    h1{
      font-size: 0.475rem;
      color: #ffffff;
      text-align: center;
      line-height: 1rem;
    }
    .showTime{
      position: absolute;
      right: 0.405rem;
      top: 0;
      line-height: 1.011rem;
      color: rgba(225,225,225,0.7);
      font-size: 0.27rem;
    }
  }
</style>
