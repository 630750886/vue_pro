<template>
  <div :id="id" class="orderArea"></div>
</template>

<script>
import echarts from "echarts";
import echartsTheme from "@c/echarts/theme/westeros.json";

export default {
  name: "pieChart",
  data() {
    return {
      id: "ordertype",
      myChart: null
    };
  },
  props: ["type"],
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
        this.myChart.setOption(this.initOption(this.type));
      });
    },
    initOption(type) {
      let text, legend_data, series_data;
      if (type == "ordertype") {
        text = "项目比例情况";
        legend_data = ["招标", "造价", "监理", "施工"];
        series_data = [
          { value: 120, name: "招标" },
          { value: 80, name: "造价" },
          { value: 40, name: "监理" },
          { value: 16, name: "施工" }
        ];
      } else {
        text = "用户投资区域";
        legend_data = [
          "华东区",
          "华南区",
          "华中区",
          "华北区",
          "西南区",
          "东北区",
          "台港澳"
        ];
        series_data = [
          { value: 335, name: "华东区" },
          { value: 310, name: "华南区" },
          { value: 234, name: "华中区" },
          { value: 835, name: "华北区" },
          { value: 1548, name: "西南区" },
          { value: 335, name: "东北区" },
          { value: 454, name: "台港澳" }
        ];
      }
      let data = {
        title: {
          text: text,
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: legend_data
        },
        series: [
          {
            name: "项目情况",
            type: "pie",
            radius: "50%",
            center: ["50%", "60%"],
            data: series_data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      return data;
    }
  },
  watch: {
    type: v => {
      this.initOption(v);
    }
  }
};
</script>

<style lang="less"></style>
