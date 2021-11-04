<template>
  <div class="main-box">
    <div class="column">
      <!--数字模块-->
      <no-box></no-box>
      <!--地图模块-->
      <map-box></map-box>
    </div>
    <div class="column">
      <div class="column2">
        <div class="panel">
          <h2>人员学历信息</h2>
          <div class="chart">
            <pie-chart-rose></pie-chart-rose>
          </div>
          <div class="panel-footer"></div>
        </div>
      </div>
      <div class="column2">
        <div class="panel">
          <h2>技术人员信息</h2>
          <div class="chart">
            <bar2-chart></bar2-chart>
          </div>
          <div class="panel-footer"></div>
        </div>
      </div>
      <div class="column2">
        <div class="panel">
          <h2>折线图-人员分类</h2>
          <div class="chart">
            <line2-chart></line2-chart>
          </div>
          <div class="panel-footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import NoBox from './NoBox.vue'
  import MapBox from './MapBox.vue'
  import BarChart from './chart/BarChartNumber.vue'
  import Bar2Chart from './chart/BarChartPercentage.vue'
  import LineChart from './chart/LineChartMonth.vue'
  import Line2Chart from './chart/LineChartDay.vue'
  import PieChart from './chart/PieChartHollow.vue'
  import PieChartRose from './chart/PieChartRose.vue'

  export default {
    components: {
      NoBox,
      MapBox,
      BarChart,
      Bar2Chart,
      LineChart,
      Line2Chart,
      PieChart,
      PieChartRose
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
  .main-box {
    display: flex;
    min-width: 1024px;
    max-width: 1780px;
    margin: 0 auto;
    padding: 0.135rem 0.135rem 0;
    background:url("../../../../../../public/images/ec-3.jpg") no-repeat top center;
    background-size: 100% 100%;
    .column {
      flex: 2;
      &:nth-child(1) {
        flex: 4;
        margin: 0 0.135rem 0.202rem;
      }
      &:nth-child(2) {
        position: relative;
        flex: 6;
        margin: 0 0.135rem 0.202rem;
        .column2 {
          flex: 2;
          .panel{
            position: relative;
            height: 4rem;
            border: 1px solid rgba(25,186,139,0.17);
            margin-bottom: 0.202rem;
            padding: 0.202rem;
            background: url("../../../../../../public/images/ec-3.jpg");
            background-size: 100% 100%;
            &::before{
              position: absolute;
              top: 0;
              left: 0;
              width: 10px;
              height: 10px;
              border-left:2px solid #02a6b5 ;
              border-top: 2px solid #02a6b5;
              content: "";
            }
            &::after{
              position: absolute;
              top: 0;
              right: 0;
              width: 10px;
              height: 10px;
              border-right:2px solid #02a6b5 ;
              border-top: 2px solid #02a6b5;
              content: "";
            }
            .panel-footer{
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              &::before{
                position: absolute;
                bottom: 0;
                left: 0;
                width: 10px;
                height: 10px;
                border-left:2px solid #02a6b5 ;
                border-bottom: 2px solid #02a6b5;
                content: "";
              }
              &::after{
                position: absolute;
                bottom: 0;
                right: 0;
                width: 10px;
                height: 10px;
                border-right:2px solid #02a6b5 ;
                border-bottom: 2px solid #02a6b5;
                content: "";
              }
            }
            h2{
              height: 0.6rem;
              color: #fff;
              text-align: center;
              font-size: 0.27rem;
              font-weight: 400;
            }
            .chart{
              height: 3.236rem;
              background: rgba(101, 132, 226, 0.1);
            }
          }
          &:nth-child(1) {
            width: 50%;
          }
          &:nth-child(2) {
            position: absolute;
            top: 0;
            right: 0;
            width: 50%;
          }
        }
      }

    }
  }
</style>
