<template>
	<div class="b-main">

		<el-tabs v-model="activeName" tab-position="top">
			<el-tab-pane label="文件论证" name="1">
				<document-proof-table type-code="biddingfile"></document-proof-table>
			</el-tab-pane>
			<el-tab-pane label="编制文件" name="2">
				<bidding-and-procurement-table></bidding-and-procurement-table>
			</el-tab-pane>

		</el-tabs>
	</div>
</template>
<script>
	// import __ from '__' // __是需要手动引入的文件
	import DocumentProofTable from '../table/DocumentProofTable.vue'
	import BiddingAndProcurementTable from '../table/BiddingAndProcurementTable.vue'


	export default {
		components: {
			DocumentProofTable,
			BiddingAndProcurementTable,

		},
		props: {
		},
		watch: {},
		//数据节点
		data() {
			return {
				activeName:'1',
			}
		},
		//生命周期函数节点
		created() {},
		//自定义函数节点
		methods: {
		}
	}
</script>
<style lang='less' scoped>
	.b-main {
		height: 80%;
	}

</style>

