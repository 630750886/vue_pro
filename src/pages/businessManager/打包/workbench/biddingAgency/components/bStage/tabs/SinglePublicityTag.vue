<template>
	<div class="b-main">
		<single-publicity-table></single-publicity-table>
<!--		<el-tabs v-model="activeName" tab-position="top">-->
<!--			<el-tab-pane label="编制及发布单一来源公示" name="1">-->
<!--				<single-publicity-table></single-publicity-table>-->
<!--			</el-tab-pane>-->
<!--			<el-tab-pane label="文件发售" name="2">-->
<!--				<file-and-objection-tag code="TYPE-127" type-code="singlepublicity"></file-and-objection-tag>-->
<!--			</el-tab-pane>-->

<!--		</el-tabs>-->
	</div>
</template>
<script>
	// import __ from '__' // __是需要手动引入的文件
	import SinglePublicityTable from '../table/SinglePublicityTable.vue'
	import FileAndObjectionTag from './childrenTabs/FileAndObjectionTag.vue'


	export default {
		components: {
			SinglePublicityTable,
			FileAndObjectionTag,

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

