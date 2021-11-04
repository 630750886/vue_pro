<template>
  <div ref="chartRef" style="width: 100%;height: 100%"></div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
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
          //(_this.myChart.resize())
        })
      },
      initOption() {
        let option = {
          color:['#00f2f1','#ed3f35'],
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['邮件营销', '联盟广告'],
            textStyle:{
              color:'#4c9bfd',
            },
            right:'10%'
          },
          grid: {
            top:'20%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            show:true,//显示边框
            borderColor:'#012f4a',//边框颜色
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisTick:{
              show:false//去除刻度
            },
            axisLabel:{
              color:'#4c9bfd'
            },
            axisLine:{
              show:false//去除轴线
            }
          },
          yAxis: {
            type: 'value',
            axisTick:{
              show:false//去除刻度
            },
            axisLabel:{
              color:'#4c9bfd'
            },
            axisLine:{
              show:false//去除轴线
            },
            splitLine:{
              lineStyle:{
                color:'#012f4a'//分割线颜色
              }
            }
          },
          series: [
            {
              name: '邮件营销',
              type: 'line',
              smooth:true,
              data: [120, 132, 101, 334, 242, 423, 645, 857,490, 230, 210, 324]
            },
            {
              name: '联盟广告',
              type: 'line',
              smooth:true,
              data: [220, 182,342, 123, 345, 730, 510, 301, 234, 90, 230, 210]
            },
          ]
        };
        return option
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
