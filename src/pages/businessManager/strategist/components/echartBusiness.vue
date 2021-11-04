<template>
    <div :id="id" class="orderArea">没有数据！！！
    </div>
</template>
<script>
import * as echarts from 'echarts';
import echartsTheme from "@c/echarts/theme/westeros.json";
export default {
    name:"lineChart",
    props:{
        showdata:{Type:Object,
                   default:function(){return {edata:{},etitle:"",money:false}}
                }
    },
    data(){
            return {
				id:"contractProanalysis",
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
             console.log(val);
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
        loadChart(data){
            echarts.registerTheme('westeros', echartsTheme)
            this.myChart = echarts.init(document.getElementById(this.id),'westeros');
            this.myChart.setOption(this.initOption(data));
        },
        initOption(lindata){
           let echart_data = {
                title: {
                    text: lindata.etitle,
                    textVerticalAlign:'left'
                },
                tooltip: {
                    trigger: 'axis'
                },
                color:["#0c22f8","#f8110c","#a607f9","#10e2f5","#04e067","#3efa04","#f5f806","#f66108"],
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    right: 1,
                    top: 25,
                    data: ["项目总量", "在建项目","完成项目","归档项目","备案项目"]
                },
                grid: {
                    left: '1%',
                    right: '14%',
                    bottom: '25px',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: true,
                    bottom: '15px',
                    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月','全年'],
                    axisLabel : {//坐标轴刻度标签的相关设置。
                        interval:0,
                        margin: 25,
                        color: '#020202'
                       //rotate:"45"
                    }
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '项目总量',
                        type: 'line',
                        stack: '项目总量',
                        data: [
                         parseInt(lindata.edata.mon01.accumulate),
                         parseInt(lindata.edata.mon02.accumulate),
                         parseInt(lindata.edata.mon03.accumulate),
                         parseInt(lindata.edata.mon04.accumulate),
                         parseInt(lindata.edata.mon05.accumulate),
                         parseInt(lindata.edata.mon06.accumulate),
                         parseInt(lindata.edata.mon07.accumulate),
                         parseInt(lindata.edata.mon08.accumulate),
                         parseInt(lindata.edata.mon09.accumulate),
                         parseInt(lindata.edata.mon10.accumulate),
                         parseInt(lindata.edata.mon11.accumulate),
                         parseInt(lindata.edata.mon12.accumulate),
                         parseInt(lindata.edata.ThisYear.accumulate)
                        ],
                        label: {
                            show: true,
                            position: 'top'
                        }
                    },
                    {
                        name: '在建项目',
                        type: 'line',
                        stack: '在建项目',
                        data: [
                         parseInt(lindata.edata.mon01.construction),
                         parseInt(lindata.edata.mon02.construction),
                         parseInt(lindata.edata.mon03.construction),
                         parseInt(lindata.edata.mon04.construction),
                         parseInt(lindata.edata.mon05.construction),
                         parseInt(lindata.edata.mon06.construction),
                         parseInt(lindata.edata.mon07.construction),
                         parseInt(lindata.edata.mon08.construction),
                         parseInt(lindata.edata.mon09.construction),
                         parseInt(lindata.edata.mon10.construction),
                         parseInt(lindata.edata.mon11.construction),
                         parseInt(lindata.edata.mon12.construction),
                         parseInt(lindata.edata.ThisYear.construction)
                         ],
                         label: {
                            show: true,
                            position: 'bottom'
                        }
                    },
                    {
                        name: '完成项目',
                        type: 'line',
                        stack: '完成项目',
                        data: [
                         parseInt(lindata.edata.mon01.contractCount),
                         parseInt(lindata.edata.mon02.contractCount),
                         parseInt(lindata.edata.mon03.contractCount),
                         parseInt(lindata.edata.mon04.contractCount),
                         parseInt(lindata.edata.mon05.contractCount),
                         parseInt(lindata.edata.mon06.contractCount),
                         parseInt(lindata.edata.mon07.contractCount),
                         parseInt(lindata.edata.mon08.contractCount),
                         parseInt(lindata.edata.mon09.contractCount),
                         parseInt(lindata.edata.mon10.contractCount),
                         parseInt(lindata.edata.mon11.contractCount),
                         parseInt(lindata.edata.mon12.contractCount),
                         parseInt(lindata.edata.ThisYear.contractCount)
                        ],
                        label: {
                            show: true,
                            position: 'top'
                        }
                    },
                    {
                        name: '归档项目',
                        type: 'line',
                        stack: '归档项目',
                        data: [
                         parseInt(lindata.edata.mon01.archive),
                         parseInt(lindata.edata.mon02.archive),
                         parseInt(lindata.edata.mon03.archive),
                         parseInt(lindata.edata.mon04.archive),
                         parseInt(lindata.edata.mon05.archive),
                         parseInt(lindata.edata.mon06.archive),
                         parseInt(lindata.edata.mon07.archive),
                         parseInt(lindata.edata.mon08.archive),
                         parseInt(lindata.edata.mon09.archive),
                         parseInt(lindata.edata.mon10.archive),
                         parseInt(lindata.edata.mon11.archive),
                         parseInt(lindata.edata.mon12.archive),
                         parseInt(lindata.edata.ThisYear.archive)
                         ],
                         label: {
                            show: true,
                            position: 'bottom'
                        }
                    },
                    {
                        name: '备案项目',
                        type: 'line',
                        stack: '备案项目',
                        data: [
                         parseInt(lindata.edata.mon01.record),
                         parseInt(lindata.edata.mon02.record),
                         parseInt(lindata.edata.mon03.record),
                         parseInt(lindata.edata.mon04.record),
                         parseInt(lindata.edata.mon05.record),
                         parseInt(lindata.edata.mon06.record),
                         parseInt(lindata.edata.mon07.record),
                         parseInt(lindata.edata.mon08.record),
                         parseInt(lindata.edata.mon09.record),
                         parseInt(lindata.edata.mon10.record),
                         parseInt(lindata.edata.mon11.record),
                         parseInt(lindata.edata.mon12.record),
                         parseInt(lindata.edata.ThisYear.record)
                        ],
                        label: {
                            show: true,
                            position: 'top'
                        }
                    }
                ]
            };
            return echart_data;
        }
    }
}
</script>
<style lang="less" scoped>
.orderArea{
    padding: 0px;
    height: 560px;
    width: 100%;
}
</style>

