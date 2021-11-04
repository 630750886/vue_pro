<template>
	<div class="content">
		<el-tabs v-model="activeName" tab-position="top">
			<el-tab-pane label="拦标价或预算价" name="1">
				<sure-budget-table></sure-budget-table>
			</el-tab-pane>
			<el-tab-pane label="报名及保证金缴纳资料" name="2">
				<com-document code="TYPE-126"></com-document>
			</el-tab-pane>
			<el-tab-pane label="报名及保证金缴纳情况" name="3">
				<bond-table type-code="noticeandinvitation"></bond-table>
			</el-tab-pane>
			<el-tab-pane label="文件澄清及修改" name="4">
				<objection-table :typecode="typeCode"></objection-table>
			</el-tab-pane>
		</el-tabs>

	</div>
</template>
<script>
	// import __ from '__' // __是需要手动引入的文件
	import BondTable from "../../table/BondTable.vue"
	import ObjectionTable from "../../table/ObjectionTable.vue"
	import SureBudgetTable from '../../table/SureBudgetTable.vue'


	export default {
		components: {
			BondTable,
			ObjectionTable,
			SureBudgetTable
		},
    /**
		 * 由于file-and-objection-tag组件的重复使用，code区分不同调用者的"基本信息" 中的文件，
		 * type-code用于区分不同调用者的 "招标文件/投标保证金台账"，"招标文件异议处理"
     */
		props: {
			code:'',
			typeCode:[String]
		},
		watch: {},
		//数据节点
		data() {
			return {
				activeName:'1',

			}
		},
		//生命周期函数节点
		created() {

		},
		//自定义函数节点
		methods: {
			openDialog() {
				this.dialogVisible = true
			},
			dialogClose() {
				this.dialogVisible = false
			},
			submitForm() {
				this.$emit('getFormData', this.$myfunction.copyData(this.form))
				this.dialogClose()
			},
		}
	}
</script>
<style lang='less' scoped>
	.content {
		height: 630px;
		overflow-x: hidden;
		overflow-y: auto;

		.model {
			margin: 10px 2px;
		}
	}
</style>
