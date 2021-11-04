<template>
    <div :id="id"  class="customer_map">没有数据！！！
    </div>
</template>
<script>
import * as echarts from 'echarts';
import echartsTheme from "@c/echarts/theme/westeros.json";
//import '@/assets/map/js/province/guizhou.js'
import '@/assets/map/js/china.js'

export default {
    name:"mapChart",
    props:{
        showdata:{Type:Object,default:function(){return {}}},
        width: {type: String,default: "100%"},
        height: {type: String,default: "285px"}
    },
    data(){
            return {
				id:"contractanalysisbar",
                myChart:null,
            }
        },
    mounted(){
        this.loadChart(this.showdata);
        },
    watch:{
        showdata:{
             handler(val, oldVal){
             this.loadChart(val);
         },
         deep:true //true 深度监听
        }
    },
	beforeDestroy() {
			if (!this.myChart) {
				return
			}
			this.myChart.dispose();
			this.myChart = null;
        },
    methods: {
        loadChart(val){
            echarts.registerTheme('westeros', echartsTheme)
            this.myChart = echarts.init(document.getElementById(this.id),'westeros');
            this.myChart.setOption(this.initOption(val));
        },
        initOption(val){
           let echart_data = {
           //backgroundColor: "#faf5f3",
           tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>{c} (个)'
          },// 鼠标移到图里面的浮动提示框
          toolbox: {
              show: true,
              orient: 'vertical',
              left: 'right',
              top: 'top',
              feature: {
                  dataView: {readOnly: false},
                  restore: {},
                  saveAsImage: {}
              }
          },
          dataRange: {
            show: true,
            min: 0,
            max: 160,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            color: ['#0378fb', '#7db8fb', '#cee2f9'],
            bottom:10
          },
          geo: { // 这个是重点配置区
            map: 'china', // 表示中国地图
            roam: true,
            label: {
              normal: {
                show: true, // 是否显示对应地名
                textStyle: {
                  color: 'rgba(0,0,0,0.4)'
                }
              }
            },
            zoom:1,
            itemStyle: {
              normal: {
                borderColor: 'rgba(0, 0, 0, 0.2)'
              },
              emphasis: {
                areaColor: null,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          series: [{
              type: 'scatter',
              coordinateSystem: 'geo' // 对应上方配置
            },
            {
              name: '服务项目数', // 浮动框的标题
              type: 'map',
              geoIndex: 0,
              label: {show: true},
              data: [{
                "name": "新疆",
                "value": 6
              }, {
                "name": "黑龙江",
                "value": 4
              }, {
                "name": "四川",
                "value": 36
              },{
                "name": "重庆",
                "value": 50
              },{
                "name": "广东",
                "value": 20
              },{
                "name": "江苏",
                "value": 15
              },{
                "name": "西藏",
                "value": 11
              },{
                "name": "贵州",
                "value": 145
              },
              ]
            }
          ]
        }
        return echart_data;
        },
    }
}
</script>
<style lang="less" scoped>
.customer_map{
    padding: 0px;
    height: 520px;
    width: 100%;
}
</style>
