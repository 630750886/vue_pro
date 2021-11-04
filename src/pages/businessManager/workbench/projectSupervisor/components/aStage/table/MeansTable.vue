<template>
	<div class="column">
		<div class="btn">
			<head-right-button  @click="$refs.addMeansRef.openDialog()" title="新增资料" v-if="type == 1"></head-right-button>
		</div>
		<el-table :data="materialInfo" style="width: 100%" align="center" highlight-current-row :header-cell-style="{fontSize:'14px'}" > 
			<el-table-column prop="name" label="资料名称" align="center"></el-table-column>
			<el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
			<el-table-column prop="phone" label="附件" align="center">
				<template slot-scope="scope">
					<el-button type="text">下载</el-button>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="text" size="mini"v-if="scope.row.operation == 2">删除</el-button>
					<el-button type="text" size="mini"v-if="scope.row.operation == 1">附件上传</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="dialog">

			<add-means-dialog ref="addMeansRef" title="新增资料" width="40%"></add-means-dialog>
		</div>
	</div>

</template>
<script>
	// import __ from '__' // __是需要手动引入的文件
	import HeadRightButton from "../button/HeadRightButton.vue"
	import AddMeansDialog from '../dialog/AddMeansDialog.vue'


	export default {
		components: {
			HeadRightButton,
			AddMeansDialog,
		},
		props: {
			materialInfo:{
				type:Array,
				default:()=>[],
			},
			type:{
				type:String,
				default:'1',
			}
		},
		watch: {},
		//数据节点
		data() {
			return {
				
			}
		},
		//生命周期函数节点
		created() {
			//this.dataList = this.data;
		},
		//自定义函数节点
		methods: {
			submitForm() {

			},
			changePerson() {
				this.$refs.changeRef.openDialog();
			}
		}
	}
</script>
<style lang='less' scoped>
	.main {
		padding: 5px 20px;
	}
</style>
