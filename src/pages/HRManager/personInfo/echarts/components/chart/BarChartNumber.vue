<template>
  <div ref="chartRef" style="width: 100%;height: 100%"></div>
</template>
<script>
  // import __ from '__' // __是需要手动引入的文件
  import {groupBy} from "../../../../../../utils/auth";
  import echartsTheme from "@c/echarts/theme/westeros.json";

  export default {
    components: {},
    props: {
      width: {
        type: Number,
        default: 0
      },
      height: {
        type: Number,
        default: 0
      },
    },
    watch: {},
    //数据节点
    data() {
      return {
        id: 'chart',
        myChart: null,
      }
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
        const _this=this
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
          color: ['#2f89cf'],
          //设置图标标题
          title: {
            text: ""
          },
          //图标的提示组件
          tooltip: {
            //触发方式
            trigger: 'axis',// axis| item
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          //图例组件
          /*legend: {

          },*/
          //工具箱组件，可以保存为图片
          /*toolbox: {
            feature: {
              saveAsImage: {}
            }
          },*/
          //网格配置
          grid: {
            left: '0%',
            top: '10px',
            right: '0%',
            bottom: '4%',
            //是否显示刻度标签
            containLabel: true
          },
          //设置x轴的相关配置
          xAxis: [
            {
              type: 'category',
              data: ['博士', '研究生', '本科', '大专', '中专', '高中', '初中', '其他'],
              axisTick: {
                alignWithLabel: true
              },
              //修改刻度标签
              axisLabel: {
                color: 'rgba(255,255,255,6)',
                fontSize: '12'
              },
              //不显示x轴的样式
              axisLine: {
                show: false
              },
              splitLine: {
                show: false
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              //修改刻度标签
              axisLabel: {
                color: 'rgba(255,255,255,6)',
                fontSize: 12
              },
              axisLine: {
                lineStyle: {
                  color: 'rgba(255,255,255,1)',
                  width: 2
                }
              },
              //y轴分割线的颜色
              splitLine: {
                outlineStyle: {
                  color: 'rgba(255,255,255,1)',
                }
              }
            }
          ],
          series: [
            {
              name: '数量',
              type: 'bar',
              barWidth: '35%',
              data: [100, 52, 200, 334, 390, 330, 220, 20],
              itemStyle: {
                //修改柱子为圆角
                barBorderRadius: 5
              }
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
