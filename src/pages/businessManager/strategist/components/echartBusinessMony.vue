<template>
    <div :id="id" class="orderAreamony">没有数据！！！
    </div>
</template>
<script>
import * as echarts from 'echarts';
import echartsTheme from "@c/echarts/theme/westeros.json";
export default {
    name:"lineChartmone",
    props:{
        showdata:{Type:Object,
                   default:function(){return {edata:{},etitle:"",money:false}}
                }
    },
    data(){
            return {
				id:"contractProanalysismony",
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
                    data: ["总产值(元)","总金额(元)","完成产值(元)","在建产值(元)"]
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
                        name: '总产值(元)',
                        type: 'line',
                        stack: '总产值(元)',
                        data: [
                         parseInt(lindata.edata.mon01.conoutputValueSum),
                         parseInt(lindata.edata.mon02.conoutputValueSum),
                         parseInt(lindata.edata.mon03.conoutputValueSum),
                         parseInt(lindata.edata.mon04.conoutputValueSum),
                         parseInt(lindata.edata.mon05.conoutputValueSum),
                         parseInt(lindata.edata.mon06.conoutputValueSum),
                         parseInt(lindata.edata.mon07.conoutputValueSum),
                         parseInt(lindata.edata.mon08.conoutputValueSum),
                         parseInt(lindata.edata.mon09.conoutputValueSum),
                         parseInt(lindata.edata.mon10.conoutputValueSum),
                         parseInt(lindata.edata.mon11.conoutputValueSum),
                         parseInt(lindata.edata.mon12.conoutputValueSum),
                         parseInt(lindata.edata.ThisYear.conoutputValueSum)
                         ],
                         label: {
                            show: true,
                            position: 'top'
                        }
                    },
                    {
                        name: '总金额(元)',
                        type: 'line',
                        stack: '总金额(元)',
                        data: [
                         parseInt(lindata.edata.mon01.contractSum),
                         parseInt(lindata.edata.mon02.contractSum),
                         parseInt(lindata.edata.mon03.contractSum),
                         parseInt(lindata.edata.mon04.contractSum),
                         parseInt(lindata.edata.mon05.contractSum),
                         parseInt(lindata.edata.mon06.contractSum),
                         parseInt(lindata.edata.mon07.contractSum),
                         parseInt(lindata.edata.mon08.contractSum),
                         parseInt(lindata.edata.mon09.contractSum),
                         parseInt(lindata.edata.mon10.contractSum),
                         parseInt(lindata.edata.mon11.contractSum),
                         parseInt(lindata.edata.mon12.contractSum),
                         parseInt(lindata.edata.ThisYear.contractSum)
                        ],
                        label: {
                            show: true,
                            position: 'bottom'
                        }
                    },
                    {
                        name: '完成产值(元)',
                        type: 'line',
                        stack: '完成产值(元)',
                        data: [
                         parseInt(lindata.edata.mon01.accumulateSum),
                         parseInt(lindata.edata.mon02.accumulateSum),
                         parseInt(lindata.edata.mon03.accumulateSum),
                         parseInt(lindata.edata.mon04.accumulateSum),
                         parseInt(lindata.edata.mon05.accumulateSum),
                         parseInt(lindata.edata.mon06.accumulateSum),
                         parseInt(lindata.edata.mon07.accumulateSum),
                         parseInt(lindata.edata.mon08.accumulateSum),
                         parseInt(lindata.edata.mon09.accumulateSum),
                         parseInt(lindata.edata.mon10.accumulateSum),
                         parseInt(lindata.edata.mon11.accumulateSum),
                         parseInt(lindata.edata.mon12.accumulateSum),
                         parseInt(lindata.edata.ThisYear.accumulateSum)
                         ],
                         label: {
                            show: true,
                            position: 'top'
                        }
                    },
                    {
                        name: '在建产值(元)',
                        type: 'line',
                        stack: '在建产值(元)',
                        data: [
                         parseInt(lindata.edata.mon01.cons),
                         parseInt(lindata.edata.mon02.cons),
                         parseInt(lindata.edata.mon03.cons),
                         parseInt(lindata.edata.mon04.cons),
                         parseInt(lindata.edata.mon05.cons),
                         parseInt(lindata.edata.mon06.cons),
                         parseInt(lindata.edata.mon07.cons),
                         parseInt(lindata.edata.mon08.cons),
                         parseInt(lindata.edata.mon09.cons),
                         parseInt(lindata.edata.mon10.cons),
                         parseInt(lindata.edata.mon11.cons),
                         parseInt(lindata.edata.mon12.cons),
                         parseInt(lindata.edata.ThisYear.cons)
                        ],
                        label: {
                            show: true,
                            position: 'bottom'
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
.orderAreamony{
    padding: 0px;
    height: 560px;
    width: 100%;
}
</style>

