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
                   default:function(){return {data:{},title:""}}
                }
    },
    data(){
            return {
				id:"contractanalysis",
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
                title: {
                    text: val.etitle,
                    textVerticalAlign:'left'
                },
                tooltip: {
                    trigger: 'axis'
                },
                color:["#0c22f8","#f8110c","#09fb03"],
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    right: 1,
                    top: 25,
                    data: ['投标数量', '投标中数量','中标数量']
                },
                grid: {
                    left: '1%',
                    right: '12%',
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
                        name: '投标数量',
                        type: 'line',
                        data: [
                         parseInt(val.edata.mon01.tenderCount),
                         parseInt(val.edata.mon02.tenderCount),
                         parseInt(val.edata.mon03.tenderCount),
                         parseInt(val.edata.mon04.tenderCount),
                         parseInt(val.edata.mon05.tenderCount),
                         parseInt(val.edata.mon06.tenderCount),
                         parseInt(val.edata.mon07.tenderCount),
                         parseInt(val.edata.mon08.tenderCount),
                         parseInt(val.edata.mon09.tenderCount),
                         parseInt(val.edata.mon10.tenderCount),
                         parseInt(val.edata.mon11.tenderCount),
                         parseInt(val.edata.mon12.tenderCount),
                         parseInt(val.edata.ThisYear.tenderCount)
                        ],
                        label: {
                            show: true,
                            position: 'top'
                        },
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        }
                    },
                    {
                        name: '投标中数量',
                        type: 'line',
                        data: [
                         parseInt(val.edata.mon01.bidCount),
                         parseInt(val.edata.mon02.bidCount),
                         parseInt(val.edata.mon03.bidCount),
                         parseInt(val.edata.mon04.bidCount),
                         parseInt(val.edata.mon05.bidCount),
                         parseInt(val.edata.mon06.bidCount),
                         parseInt(val.edata.mon07.bidCount),
                         parseInt(val.edata.mon08.bidCount),
                         parseInt(val.edata.mon09.bidCount),
                         parseInt(val.edata.mon10.bidCount),
                         parseInt(val.edata.mon11.bidCount),
                         parseInt(val.edata.mon12.bidCount),
                         parseInt(val.edata.ThisYear.bidCount)
                         ],
                         label: {
                            show: true,
                            position: 'top'
                        }
                    },
                    {
                        name: '中标数量',
                        type: 'line',
                        data: [
                         parseInt(val.edata.mon01.hitCount),
                         parseInt(val.edata.mon02.hitCount),
                         parseInt(val.edata.mon03.hitCount),
                         parseInt(val.edata.mon04.hitCount),
                         parseInt(val.edata.mon05.hitCount),
                         parseInt(val.edata.mon06.hitCount),
                         parseInt(val.edata.mon07.hitCount),
                         parseInt(val.edata.mon08.hitCount),
                         parseInt(val.edata.mon09.hitCount),
                         parseInt(val.edata.mon10.hitCount),
                         parseInt(val.edata.mon11.hitCount),
                         parseInt(val.edata.mon12.hitCount),
                         parseInt(val.edata.ThisYear.hitCount)
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
.orderArea{
    padding: 0px;
    height: 560px;
    width: 100%;
}
</style>
