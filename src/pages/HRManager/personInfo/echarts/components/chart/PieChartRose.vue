<template>
  <div ref="chartRef" style="width: 100%;height: 100%"></div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import graphic from 'echarts/lib/util/graphic.js'

  export default {
    components: {},
    props: {},
    watch: {},
    //数据节点
    data() {
      return {}
    },
    mounted() {
      this.loadChart();
    },
    beforeDestroy() {
      if (!this.myChart) {
        return
      }
      this.myChart.dispose();
      this.myChart = null;
    },
    //生命周期函数节点
    created() {
    },
    //自定义函数节点
    methods: {
      loadChart() {
        const _this = this
        this.$nextTick(() => {
          this.myChart = this.$echarts.init(this.$refs.chartRef);
          this.myChart.setOption(this.initOption());
        })
        window.addEventListener('resize', function () {
          //console.log(_this.myChart.resize())
        })
      },
      initOption() {

        let option = {
          color:['#006cff','#60cda0','#ed8884','#ff9f7f','#0096ff','#9fe6b8','#32c5e9','#1d9dff'],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            bottom:0,
            itemWidth:15,
            itemHeight:15,
            textStyle:{
              color:'rgba(225,225,225,.5)',
              fontSize:12
            }
          },

          series: [

            {
              name: '地区分布',
              type: 'pie',
              radius: ['10%', '70%'],
              center: ['50%', '50%'],
              roseType: 'radius',//面积模式 area，半径模式 radius
              //图形文字
              label:{
                fontSize:10,
              },
              labelLine:{
                length:6,
                length2:8,
              },
              data: [
                {value: 20, name: '云南'},
                {value: 26, name: '上海'},
                {value: 34, name: '北京'},
                {value: 27, name: '贵州'},
                {value: 38, name: '广西'},
                {value: 35, name: '上东'},
                {value: 30, name: '湖北'},
                {value: 49, name: '重庆'}
              ]
            }
          ]
        };


        return option
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
