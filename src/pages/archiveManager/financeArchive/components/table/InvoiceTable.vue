<template>
	<!--发票管理台账-->
	<div class="body">
		<div class="table-head">
			<el-row>
				<el-col :span="2">
					<span>下载档案类型：</span>
				</el-col>
				<el-col :span="20">
					<el-checkbox-group v-model="checkList">
						<el-checkbox label="1">发票</el-checkbox>
					</el-checkbox-group>
				</el-col>
			</el-row>
		</div>
		<div class="table">
			<el-table :data="dataList" align="center" height="7.5rem" highlight-current-row :header-cell-style="{fontSize:'14px'}" border>
				<el-table-column label="申请时间" align="center"></el-table-column>
				<el-table-column label="申请组织" align="center"></el-table-column>
				<el-table-column label="申请人" align="center"></el-table-column>
				<el-table-column label="组织" align="center"></el-table-column>
				<el-table-column prop="type" label="类型" align="center"></el-table-column>
				<el-table-column label="开票类型" align="center"></el-table-column>
				<el-table-column label="付款单位名称" align="center"></el-table-column>
				<el-table-column label="开票金额(元)" align="center"></el-table-column>
				<el-table-column label="所属组织" align="center"></el-table-column>
				<el-table-column label="项目情况" align="center"></el-table-column>
				<el-table-column label="开票日期" align="center"></el-table-column>
				<el-table-column label="发票号" align="center"></el-table-column>
				<el-table-column label="回款情况" align="center"></el-table-column>
				<el-table-column label="回款总额" align="center"></el-table-column>
				<el-table-column label="应收账款" align="center"></el-table-column>
				<el-table-column label="操作" align="center" fixed="right" width="300px">
					<template slot-scope="scope">
						<table-button :scope="scope.row" @click="tableButtonClick"></table-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="dialog">
		</div>
	</div>
</template>
<script>
	// import __ from '__' // __是需要手动引入的文件
	import TableButton from '../button/TableButton.vue'
	export default {
		components: {
			TableButton,
		},
		props: {
			dataList: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		watch: {},
		//数据节点
		data() {
			return {
        checkList:[]
			}
		},
		//生命周期函数节点
		created() {},
		//自定义函数节点
		methods: {
			tableButtonClick(btn, data) {
				switch (btn) {
					case 1:
						this.$refs.updateRef.openDialog();
						break;
					case 2:
						this.$refs.invalidRef.openDialog();
						break;
					case 3:
						this.$refs.scannerRef.openDialog();
						break;
					case 4:
						this.$refs.invalidRef.openDialog();
						break;
					case 5:
						this.$refs.scannerRef.openDialog();
						break;
				}
			}
		}
	}
</script>
<style lang='less' scoped>
	.table-head{
		height: 30px;
		line-height: 30px;
		margin-bottom:0px;
		span{
			font-size: 16px;
		}
	}
</style>
