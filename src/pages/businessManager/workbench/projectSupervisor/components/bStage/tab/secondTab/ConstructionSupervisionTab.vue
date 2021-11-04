<template>
	<div class="b-main">
		<el-tabs v-model="activeName" tab-position="left">
			<el-tab-pane label="确定时间" name="1">
				<sure-time-table></sure-time-table>
			</el-tab-pane>
			<el-tab-pane label="会议类工作" name="2">
				<meeting-table></meeting-table>
			</el-tab-pane>
			<el-tab-pane label="日志/旁站/月报" name="3">
				<log-and-report-table></log-and-report-table>
			</el-tab-pane>
			<el-tab-pane label="见证取样/送检" name="4">
				<witness-table></witness-table>
			</el-tab-pane>
			<el-tab-pane label="施工管理文件" name="5">
				<com-document code="TYPE-112"></com-document>
			</el-tab-pane>
			<el-tab-pane label="施工技术文件" name="6">
				<com-document code="TYPE-113"></com-document>
			</el-tab-pane>
			<el-tab-pane label="进度造价文件" name="7">
				<com-document code="TYPE-145"></com-document>
				<!--<speed-table></speed-table>-->
			</el-tab-pane>
			<el-tab-pane label="出厂质量证明文件及检测报告" name="8">
				<com-document code="TYPE-114"></com-document>
			</el-tab-pane>
			<el-tab-pane label="进场复试报告" name="9">
				<com-document code="TYPE-115"></com-document>
			</el-tab-pane>
			<el-tab-pane label="施工记录文件" name="10">
				<com-document code="TYPE-116"></com-document>
			</el-tab-pane>
			<el-tab-pane label="施工质量验收文件" name="11">
				<com-document code="TYPE-117"></com-document>
			</el-tab-pane>
			<el-tab-pane label="施工工程竣工文件" name="12">
				<com-document code="TYPE-118"></com-document>
			</el-tab-pane>
		</el-tabs>

	</div>
</template>
<script>
	// import __ from '__' // __是需要手动引入的文件

	import SureTimeTable from "../../table/SureTimeTable.vue"
	import MeetingTable from "../../table/MeetingTable.vue"
	import LogAndReportTable from "../../table/LogAndReportTable.vue"
	import WitnessTable from "../../table/WitnessTable.vue"
	import SpeedTable from "../../table/SpeedTable.vue"

	export default {
		components: {
			SureTimeTable,
			MeetingTable,
			LogAndReportTable,
			WitnessTable,
			SpeedTable,
		},
		props: {},
		watch: {},
		//数据节点
		data() {
			return {
				activeName: '1',
				form: {},
				formRule: {},
				tableData1: [
					{
						name:'工程概况表',
						fileList:{id:1,createTime:'2020/01/02'},
						more:false,//是否多文件
					},
					{
						name:'见证试验检测汇总表',
						fileList:{id:2,createTime:'2020/01/02'},
						more:false,
					},
					{
					name:'新增建设工程质量/安全事故调(勘)查记录',
					more:true,
					fileList:[
						{id:10,createTime:'2020/01/02'},
						{id:10,createTime:'2020/01/02'},
					]
				},
				{
					name:'新增建设工程质量/安全事故报告书',
					more:true,
					fileList:[
						{id:10,createTime:'2020/01/02'},
						{id:10,createTime:'2020/01/02'},
					]
				},
				],
				tableData2: [
					/* {
						name:'图纸会审记录',
						fileList:{id:1,createTime:'2020/01/02'},
						more:false,//是否多文件
					}, */
					{
					name:'图纸会审记录',
					more:true,
					fileList:[
						{id:10,createTime:'2020/01/02'},
						{id:10,createTime:'2020/01/02'},
					]
				},
				{
					name:'设计变更通知书',
					more:true,
					fileList:[
						{id:10,createTime:'2020/01/02'},
						{id:10,createTime:'2020/01/02'},
					]
				},
				{
					name:'工程洽谈记录（技术核定单）',
					more:true,
					fileList:[
						{id:10,createTime:'2020/01/02'},
						{id:10,createTime:'2020/01/02'},
					]
				},
				]
			}

		},
		//生命周期函数节点
		created() {},
		//自定义函数节点
		methods: {}
	}
</script>
<style lang='less' scoped>

</style>
