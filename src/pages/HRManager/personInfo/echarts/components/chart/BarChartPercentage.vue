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
          //console.log(_this.myChart.resize())
        })
      },
      initOption() {
        const myColor = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', "#8B78F6", '#1F5880']
        let option = {
          grid: {
            top: '10%',
            left: '22%',
            bottom: '10%',
            //containLabel: true
          },
          xAxis: {
            show: false,
          },
          yAxis: [
            {
              type: 'category',
              inverse:true,
              data: [ '咨询工程师','造价工程师', '监理程工师','招标师', '一级建造师', '二级建造师' ],
              //不显示坐标轴
              axisLine: {
                show: false
              },
              //不显示刻度
              axisTick: {
                show: false
              },
              //文字颜色
              axisLabel: {
                color: '#fff'
              }
            },
            {
              type: 'category',
              inverse:true,
              data: [1,2,3,4,5,6],
              //不显示坐标轴
              axisLine: {
                show: false
              },
              //不显示刻度
              axisTick: {
                show: false
              },
              //文字颜色
              axisLabel: {
                color: '#fff'
              }
            }
          ],
          series: [
            {
              name: '条',
              type: 'bar',
              data: [70,34,60,78,69,84],
              yAxisIndex:0,
              //修改第一组柱子为圆角
              itemStyle: {
                barBorderRadius: 20,
                //修改柱子的颜色
                color: function (params) {
                  return myColor[params.dataIndex]
                }
              },
              //修改柱子之间的距离
              barCategoryGap: 50,
              //柱子的宽度
              barWidth: 10,
              //柱子内的文字
              label: {
                show: true,
                position: 'inside',
                //{c}会自动解析data里的数据
                formatter: '{c}%'
              }
            },
            {
              name: '框',
              type: 'bar',
              barCategoryGap: 50,
              barWidth: 15,
              data: [100,100,100,100,100,100],
              yAxisIndex:1,
              itemStyle: {
                color: 'none',
                borderColor: '#00c1de',
                borderWidth: 3,
                barBorderRadius: 15
              }
            }
          ]
        }
        return option
      }
    }
  }
</script>
<style lang='less' scoped>

</style>
