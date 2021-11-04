<template>
  <div :id="id" class="orderArea orderbarArea"></div>
</template>

<script>
import echarts from "echarts";
import echartsTheme from "@c/echarts/theme/westeros.json";
export default {
  name: "barChat",
  data() {
    return {
      id: "barChart",
      myChart: null
    };
  },
  mounted() {
    this.loadChart();
  },
  beforeDestroy() {
    if (!this.myChart) {
      return;
    }
    this.myChart.dispose();
    this.myChart = null;
  },
  methods: {
    loadChart() {
      this.$nextTick(() => {
        echarts.registerTheme("westeros", echartsTheme);
        this.myChart = echarts.init(
          document.getElementById(this.id),
          "westeros"
        );
        this.myChart.setOption(this.initOption());
      });
    },
    initOption() {
      let option = {
        title: {
          text: "项目立项情况表 单位（个）"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["招标", "造价", "监理", "施工"]
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ]
          }
        ],
        yAxis: [
          {
            type: "value"
            // axisLabel:{
            // 	formatter:'{value} (个)'
            // }
          }
        ],
        series: [
          {
            name: "招标",
            type: "bar",
            data: [2, 4, 7, 3, 5, 6, 5, 6, 8, 12, 6, 3],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            }
          },
          {
            name: "造价",
            type: "bar",
            data: [2, 5, 9, 6, 12, 10, 7, 8, 8, 8, 6, 4],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
                // {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
                // {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
              ]
            }
          },
          {
            name: "监理",
            type: "bar",
            data: [2, 1, 1, 9, 5, 2, 4, 0, 4, 0, 0, 0],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            }
          },
          {
            name: "施工",
            type: "bar",
            data: [1, 0, 0, 2, 0, 6, 1, 0, 3, 2, 0, 0],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            }
          }
        ]
      };
      return option;
    }
  },
  watch: {}
};
</script>

<style lang="less"></style>
