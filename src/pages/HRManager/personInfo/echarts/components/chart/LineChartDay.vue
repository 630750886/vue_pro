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
        const _this = this
        let option = {

          tooltip: {
            trigger: 'axis',

          },
          legend: {
            top: 0,
            data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
            textStyle: {
              color: 'rgba(255,255,255,.5)',
              fontSize: 12
            }
          },

          grid: {
            left: '10',
            top: '30',
            right: '10',
            bottom: '10',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '12', '13', '14', '15', '16', '17', '18'
                , '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
              //文本
              axisLabel: {
                textStyle: {
                  color: 'rgba(255,255,255,.6)',
                  fontSize: 12
                }
              },
              //轴线
              axisLine: {
                lineStyle: {
                  color: 'rgba(255,255,255,.2)',
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              //刻度
              axisTick: {
                show: false
              },
              //文本
              axisLabel: {
                textStyle: {
                  color: 'rgba(255,255,255,.6)',
                  fontSize: 12
                }
              },
              //轴线
              axisLine: {
                lineStyle: {
                  color: 'rgba(255,255,255,.2)',
                }
              },
              //分割线
              splitLine: {
                lineStyle: {
                  color: 'rgba(255,255,255,.1)'
                }
              }
            }
          ],
          series: [
            {
              name: '邮件营销',
              type: 'line',
              smooth: true,
              //填充颜色
              areaStyle: {
                normal: {
                  //渐变色
                  color: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      //渐变开始颜色
                      color: 'rgba(1,132,213,0.4)'
                    },
                    {
                      offset: 0.8,
                      //渐变结束颜色
                      color: 'rgba(1,132,213,0.1)'
                    }
                  ], false),
                  shadowColor: 'rgba(0,0,0,0.1)'
                },


              },
              //拐点
              symbol: 'circle',
              //拐点大小
              symbolSize: 5,
              //开始不显示
              showSymbol: false,
              itemStyle: {
                color: '#0184d5',
                borderColor: 'rgba(221,220,107,.1)',
                //拐点边框
                borderWidth: 12
              },
              data: [120, 132, 101, 134, 90, 230, 210, 243, 124, 267, 120, 132, 101, 134, 90,
                230, 101, 134, 90, 230, 210, 267, 120, 132, 101, 134, 134, 90, 230, 210, 243],
              //单独修改线的样式
              lineStyle: {
                color: '#0184d5',
                width: 3
              }
            },
            {
              name: '联盟广告',
              type: 'line',
              smooth: true,
              //填充颜色
              areaStyle: {
                normal: {
                  //渐变色
                  color: new graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      //渐变开始颜色
                      color: 'rgba(0,216,135,0.4)'
                    },
                    {
                      offset: 0.8,
                      //渐变结束颜色
                      color: 'rgba(0,216,135,0.1)'
                    }
                  ], false),
                  shadowColor: 'rgba(0,0,0,0.1)'
                },


              },
              //拐点
              symbol: 'circle',
              //拐点大小
              symbolSize: 5,
              //开始不显示
              showSymbol: false,
              itemStyle: {
                color: '#00d887',
                borderColor: 'rgba(221,220,107,.1)',
                //拐点边框
                borderWidth: 12
              },
              data: [220, 182, 191, 234, 290, 330, 310, 129, 230, 330, 191, 234, 290, 330, 310, 210, 129,
                230, 330, 191, 191, 234, 290, 330, 310, 191, 234, 290, 330, 310],
              //单独修改线的样式
              lineStyle: {
                color: '#00d887',
                width: 3
              }
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
