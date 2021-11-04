<template>
	<div class="b-main">
		<el-tabs v-model="activeName" tab-position="top" style="height: 600px;">
			<el-tab-pane label="监理报告及监理通知单" name="1">
				<com-document code="TYPE-119"></com-document>
			</el-tab-pane>
			<el-tab-pane label="确定保修服务时间" name="2">
				<warranty-time-table></warranty-time-table>
			</el-tab-pane>

		</el-tabs>

	</div>
</template>
<script>
	// import __ from '__' // __是需要手动引入的文件
	import WarrantyTimeTable from '../table/WarrantyTimeTable.vue'


	export default {
		components: {
			WarrantyTimeTable
		},
		props: {},
		watch: {},

    //数据节点
    data() {
      return {
        activeName: '1',
      }
    },
    //生命周期函数节点
    created() {

    },
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
