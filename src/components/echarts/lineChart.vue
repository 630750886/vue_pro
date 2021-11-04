<template>
    <div :id="id" class="orderArea"></div>
</template>

<script>
	import echarts from 'echarts'
    import echartsTheme from "@c/echarts/theme/westeros.json";
    
    export default {
		name:"lineChart",
        data(){
            return {
				id:"lineChart",
                myChart:null,
            }
        },
        mounted(){
            this.loadChart();
        },
		beforeDestroy() {
			if (!this.myChart) {
				return
			}
			this.myChart.dispose();
			this.myChart = null;
        },
        methods: {
			loadChart(){
  				this.$nextTick(() => {
                    echarts.registerTheme('westeros', echartsTheme)
                    this.myChart = echarts.init(document.getElementById(this.id),'westeros');
                    this.myChart.setOption(this.initOption());
                })
			},
			initOption(){
				let data = {
					title: {
						text: '项目支出情况'
					},
					tooltip : {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: '#6a7985'
							}
						}
					},
					legend: {
						data:['招标','造价','监理','施工']
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis : [
						{
							type : 'category',
							boundaryGap : false,
							data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
						}
					],
					yAxis : [
						{
							type : 'value',
							axisLable:{
								formmater:'{value} (万元)'
							}

						}
					],
					series : [
						{
							name:'招标',
							type:'line',
							stack: '总量',
							areaStyle: {normal: {}},
							data:[120, 132, 101, 134, 90, 130, 100,220,120,130,450,200]
							
							
						},
						{
							name:'造价',
							type:'line',
							stack: '总量',
							areaStyle: {normal: {}},
							data:[220, 282, 191, 234, 290, 130, 110,182, 210, 134, 90, 230]
							
						},
						{
							name:'监理',
							type:'line',
							stack: '总量',
							areaStyle: {normal: {}},
							data:[150, 232, 201, 154, 190, 330, 110,132, 201, 134, 345,120]
							
						},
						{
							name:'施工',
							type:'line',
							stack: '总量',
							areaStyle: {normal: {}},
							data:[320, 332, 301, 334, 390, 330, 120,170, 282, 191, 234, 290]
							
						}
						// {
						// 	name:'储蓄',
						// 	type:'line',
						// 	stack: '总量',
						// 	label: {
						// 		normal: {
						// 			show: true,
						// 			position: 'top'
						// 		}
						// 	},
						// 	areaStyle: {normal: {}},
						// 	data:[820, 932, 901, 934, 1290, 1330, 1320]
						// }
					]
				}
				return data;
			},
		},
        watch: {
            // id:()=>{
            //     this.initOption()
            // }
        }
    }
</script>

<style lang="less">

</style>
