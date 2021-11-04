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
        loadChart(data){
            echarts.registerTheme('westeros', echartsTheme)
            this.myChart = echarts.init(document.getElementById(this.id),'westeros');
            this.myChart.setOption(this.initOption(data));
        },
        initOption(lindata){
           let echart_data = {
                title: {
                    text: lindata.title,
                    textVerticalAlign:'left'
                },
                tooltip: {
                    trigger: 'axis'
                },
                color:["#0c22f8","#f8110c","#a607f9","#0a0afc","#04e067","#3efa04","#f5f806","#f66108"],
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    right: 1,
                    top: 50,
                    data: ['合同数量(个)', '合同金额(元)']
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
                        name: '合同数量(个)',
                        type: 'line',
                        stack: '总量',
                        data: [
                         parseInt(lindata.data.mon01.contractCount),
                         parseInt(lindata.data.mon02.contractCount),
                         parseInt(lindata.data.mon03.contractCount),
                         parseInt(lindata.data.mon04.contractCount),
                         parseInt(lindata.data.mon05.contractCount),
                         parseInt(lindata.data.mon06.contractCount),
                         parseInt(lindata.data.mon07.contractCount),
                         parseInt(lindata.data.mon08.contractCount),
                         parseInt(lindata.data.mon09.contractCount),
                         parseInt(lindata.data.mon10.contractCount),
                         parseInt(lindata.data.mon11.contractCount),
                         parseInt(lindata.data.mon12.contractCount),
                         parseInt(lindata.data.ThisYear.contractCount)
                        ],
                        label: {
                            show: true,
                            position: 'bottom'
                        },
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        }
                    },
                    {
                        name: '合同金额(元)',
                        type: 'line',
                        stack: '总金额',
                        data: [
                         parseInt(lindata.data.mon01.contractSum),
                         parseInt(lindata.data.mon02.contractSum),
                         parseInt(lindata.data.mon03.contractSum),
                         parseInt(lindata.data.mon04.contractSum),
                         parseInt(lindata.data.mon05.contractSum),
                         parseInt(lindata.data.mon06.contractSum),
                         parseInt(lindata.data.mon07.contractSum),
                         parseInt(lindata.data.mon08.contractSum),
                         parseInt(lindata.data.mon09.contractSum),
                         parseInt(lindata.data.mon10.contractSum),
                         parseInt(lindata.data.mon11.contractSum),
                         parseInt(lindata.data.mon12.contractSum),
                         parseInt(lindata.data.ThisYear.contractSum)
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
