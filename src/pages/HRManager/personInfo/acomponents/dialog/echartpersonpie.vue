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
                   default:function(){
                       return {}}
                 }
    },
    data(){
            return {
				id:"contractanalysispie",
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
               color:["#fb0309","#4dc0e4","#389a38","#43fb03","#2e81d7","#fb0366","#acfb03","#fb03c4","#d503fb","#f8fb03","#8f03fb","#2603fb","#fb9b03","#0372fb","#03d5fb","#fb5503","#03fbb8","#fb5503","#03fb5a"],
                //color:["#0c22f8","#f8110c","#a607f9","#0a0afc","#04e067","#3efa04","#f5f806","#f66108"],
                title: {
                        text: val.etitle,
                        left: 'left'
                    },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                },
                series: [
                    {
                        name: val.title,
                        type: 'pie',
                        radius: '60%',
                        label: {
                            formatter: ' {b|{b}：}{c}  {per|{d}%} ',
                            backgroundColor: '#F6F8FC',
                            borderColor: '#8C8D8E',
                            borderWidth: 1,
                            borderRadius: 4,
                            rich: {
                                a: {
                                    color: '#6E7079',
                                    lineHeight: 22,
                                    align: 'center'
                                },
                                hr: {
                                    borderColor: '#8C8D8E',
                                    width: '100%',
                                    borderWidth: 1,
                                    height: 0
                                },
                                b: {
                                    color: '#4C5058',
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    lineHeight: 33
                                },
                                per: {
                                    color: '#fff',
                                    backgroundColor: '#4C5058',
                                    padding: [3, 4],
                                    borderRadius: 4
                                }
                            }
                        },
                        data: val.piedata,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
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
