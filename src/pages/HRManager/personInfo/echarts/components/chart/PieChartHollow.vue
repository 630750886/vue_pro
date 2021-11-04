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
          color:['#065aab','#066eab','#0682ab','#0696ab','#06a0ab'],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            bottom: '0%',
            itemWidth:15,
            itemHeight:15,
            //修改图例文字样式
            textStyle:{
              color:'rgba(225,225,225,.5)',
              fontSize:12,
            },
            //data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          series: [
            {
              name: '年龄分布',
              type: 'pie',
              //圆的半径 内圆，外圆
              radius: ['40%', '60%'],
              center:['50%','45%'],
              avoidLabelOverlap: false,
              //
              label: {
                //显示文字
                show: false,
                //显示位置
                //position: 'center'
              },
              //指示线
              labelLine: {
                show: false
              },
              data: [
                {value: 1, name: '20岁以下'},
                {value: 4, name: '20-29岁'},
                {value: 2, name: '30-39岁'},
                {value: 2, name: '40-49岁'},
                {value: 1, name: '50岁以上'}
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
