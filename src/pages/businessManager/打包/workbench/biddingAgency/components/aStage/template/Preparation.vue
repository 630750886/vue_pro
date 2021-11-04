<template>
	<div class="content el-scrollbar">
		<el-tabs v-model="activateName" tab-position="top" >
			<el-tab-pane label="登记委托联系人" name="1">
				<contact-person-table></contact-person-table>
			</el-tab-pane>
			<el-tab-pane label="收集资料" name="2">
				<com-document is-add-means code="TYPE-156"></com-document>
			</el-tab-pane>
			<el-tab-pane label="交易平台确定" name="3">
				<platform-sure-table></platform-sure-table>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
	// import __ from '__' // __是需要手动引入的文件
	import ContactPersonTable from './component/Preparation/table/ContactPersonTable.vue'
	import MeansTable from './component/Preparation/table/MeansTable.vue'
	import PlatformSureTable from './component/Preparation/table/PlatformSureTable.vue'
	export default {
		components: {

			ContactPersonTable,
			MeansTable,
			PlatformSureTable,

		},
		props: {},
		watch: {},
		//数据节点
		data() {
			return {
				activateName:'1',
				num: 1,
				form: {
					radio:'1',
					platform:'',
				},
				formRules: {},


			}
		},
		//生命周期函数节点
		created() {},
		//自定义函数节点
		methods: {}
	}
</script>
<style lang='less' scoped>
	.content {
		height: 630px;
		overflow-x: hidden;
		overflow-y: auto;

		.column {
			margin-top: 5px;

			.btn {
				height: 30px;
				background-color: white;

				.el-button {
					float: right;
					margin-right: 10px;
				}
			}

			.plan {
				flex: 2;
			}
		}
	}
</style>
