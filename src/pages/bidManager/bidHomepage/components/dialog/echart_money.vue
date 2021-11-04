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
				id:"contractanalysismoney",
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
                    data: ['已缴纳','已收回','应收回']
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
                        name: '已缴纳',
                        type: 'line',
                        data: [
                         parseInt(val.edata.mon01.payMoneyCount),
                         parseInt(val.edata.mon02.payMoneyCount),
                         parseInt(val.edata.mon03.payMoneyCount),
                         parseInt(val.edata.mon04.payMoneyCount),
                         parseInt(val.edata.mon05.payMoneyCount),
                         parseInt(val.edata.mon06.payMoneyCount),
                         parseInt(val.edata.mon07.payMoneyCount),
                         parseInt(val.edata.mon08.payMoneyCount),
                         parseInt(val.edata.mon09.payMoneyCount),
                         parseInt(val.edata.mon10.payMoneyCount),
                         parseInt(val.edata.mon11.payMoneyCount),
                         parseInt(val.edata.mon12.payMoneyCount),
                         parseInt(val.edata.ThisYear.payMoneyCount)
                         ],
                         label: {
                            show: true,
                            position: 'top'
                        }
                    },
                    {
                        name: '已收回',
                        type: 'line',
                        data: [
                         parseInt(val.edata.mon01.backMoneyCount),
                         parseInt(val.edata.mon02.backMoneyCount),
                         parseInt(val.edata.mon03.backMoneyCount),
                         parseInt(val.edata.mon04.backMoneyCount),
                         parseInt(val.edata.mon05.backMoneyCount),
                         parseInt(val.edata.mon06.backMoneyCount),
                         parseInt(val.edata.mon07.backMoneyCount),
                         parseInt(val.edata.mon08.backMoneyCount),
                         parseInt(val.edata.mon09.backMoneyCount),
                         parseInt(val.edata.mon10.backMoneyCount),
                         parseInt(val.edata.mon11.backMoneyCount),
                         parseInt(val.edata.mon12.backMoneyCount),
                         parseInt(val.edata.ThisYear.backMoneyCount)
                         ],
                         label: {
                            show: true,
                            position: 'bottom'
                        }
                    },
                    {
                        name: '应收回',
                        type: 'line',
                        data: [
                         parseInt(val.edata.mon01.receivable),
                         parseInt(val.edata.mon02.receivable),
                         parseInt(val.edata.mon03.receivable),
                         parseInt(val.edata.mon04.receivable),
                         parseInt(val.edata.mon05.receivable),
                         parseInt(val.edata.mon06.receivable),
                         parseInt(val.edata.mon07.receivable),
                         parseInt(val.edata.mon08.receivable),
                         parseInt(val.edata.mon09.receivable),
                         parseInt(val.edata.mon10.receivable),
                         parseInt(val.edata.mon11.receivable),
                         parseInt(val.edata.mon12.receivable),
                         parseInt(val.edata.ThisYear.receivable)
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
