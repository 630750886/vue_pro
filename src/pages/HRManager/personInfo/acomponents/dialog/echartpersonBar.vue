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
                   default:function(){return {}}
                 }
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
                 color:["#fb0309","#43fb03","#fb0366","#acfb03","#fb03c4","#d503fb","#f8fb03","#8f03fb","#2603fb","#fb9b03","#0372fb","#03d5fb","#fb5503","#03fbb8","#fb5503","#03fb5a"],
                // color:["#0c22f8","#f8110c","#a607f9","#0a0afc","#04e067","#3efa04","#f5f806","#f66108"],
                title: {
                    text: val.etitle,
                    textVerticalAlign:'left'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                },
                grid: {
                    left: '1%',
                    right: '12%',
                    bottom: '25px',
                    containLabel: true
                },
                xAxis: {
                        type: 'category',
                        data: val.datalabel,
                        axisLabel: {//坐标轴刻度标签的相关设置。
                        margin: 8,
                        show: true,
                        interval: 'auto',
                        rotate: 0,
                        formatter : function(params){
                        var newParamsName = "";// 最终拼接成的字符串
                                    var paramsNameNumber = params.length;// 实际标签的个数
                                    var provideNumber = 6;// 每行能显示的字的个数
                                    var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
                                /**
                                 * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                                 */
                                // 条件等同于rowNumber>1
                                if (paramsNameNumber > provideNumber) {
                                    /** 循环每一行,p表示行 */
                                    for (var p = 0; p < rowNumber; p++) {
                                        var tempStr = "";// 表示每一次截取的字符串
                                        var start = p * provideNumber;// 开始截取的位置
                                        var end = start + provideNumber;// 结束截取的位置
                                        // 此处特殊处理最后一行的索引值
                                        if (p == rowNumber - 1) {
                                            // 最后一次不换行
                                            tempStr = params.substring(start, paramsNameNumber);
                                        } else {
                                            // 每一次拼接字符串并换行
                                            tempStr = params.substring(start, end) + "\n";
                                        }
                                        newParamsName += tempStr;// 最终拼成的字符串
                                    }

                                } else {
                                    // 将旧标签的值赋给新标签
                                    newParamsName = params;
                                }
                                //将最终的字符串返回
                                return newParamsName
                    }

                },
                },
                yAxis: {
                        type: 'value'
                    },
                series: [{
                        data:val.data,
                        type: 'bar',
                        showBackground: true,
                        barWidth:25,
                        barMinWidth:10,
                        barMaxWidth:40,
                        itemStyle: {
                            with:12,
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#83bff6'},
                                    {offset: 0.5, color: '#188df0'},
                                    {offset: 1, color: '#3efa04'}
                                ]
                            )
                        },
                        label: {
                            show: true,
                            position: 'top',
                            fontWeight:'bolder',
                            fontSize:20
                        },
                        emphasis: {
                            itemStyle: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#2378f7'},
                                        {offset: 0.7, color: '#2378f7'},
                                        {offset: 1, color: '#83bff6'}
                                    ]
                                )
                            }
                        },
                }]
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
