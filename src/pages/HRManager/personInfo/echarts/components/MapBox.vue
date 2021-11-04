<template>
  <div class="map">
    <div class="map1"></div>
    <div class="map2"></div>
    <div class="chart">
     <china-chart></china-chart>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import ChinaChart from './chart/ChinaChart.vue'
  export default {
    components: {
      ChinaChart
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
  @import "../../../../../../public/js_css/rotateAnimation.css";
  .map {
    position: relative;
    height: 8rem;
    .map1{
      width: 6rem;
      height: 6rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      background: url("../../../../../../public/images/map-2.png");
      background-size: 100% 100%;
      opacity: 0.3;
    }
    .map2{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 6rem;
      height: 6rem;
      background: url("../../../../../../public/images/map-1.png");
      background-size: 100% 100%;
      opacity: 0.3;
      animation: rotate1 15s linear infinite;
    }
    .chart{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 7rem;
    }
  }
</style>
