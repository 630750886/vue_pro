<template>
	<div>
		<el-table :data="tableData" style="width: 100%" >
			<el-table-column type="expand" >
				<template slot-scope="props" v-if="props.row.more == true">
					<el-form label-position="left" inline class="demo-table-expand" >
						<template v-for="item in props.row.fileList">
							<el-form-item label="创建时间">
								<span>{{ item.createTime }}</span>
							</el-form-item>
							<el-form-item label="操作">
								<el-button type="text">附件上传</el-button>
								<el-button type="text">删除</el-button>
							</el-form-item>
						</template>
					</el-form>
				</template>
			</el-table-column>
			<el-table-column label="文件名称" prop="name"></el-table-column>
			<el-table-column label="创建时间" prop="fileList.createTime"></el-table-column>
			<el-table-column label="附件">
				<template slot-scope="scope" >
					<el-button type="text" v-if="scope.row.more == false">下载</el-button>
				</template>
			</el-table-column>
			<el-table-column label="操作" >
				<template slot-scope="scope">
					<el-button type="text" v-if="scope.row.more == false" @click="$refs.addRef.openDialog()">附件上传</el-button>
					<el-button type="text" v-if="scope.row.more == true" @click="$refs.addRef.openDialog()">新增</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="dialog">

			<add-by-company-dialog width="30%" ref="addRef"></add-by-company-dialog>
		</div>
	</div>

</template>



<script>
	import AddByCompanyDialog from '../dialog/AddByCompanyDialog.vue'
	export default {
		components:{
			AddByCompanyDialog,
		},

		data() {
			return {
				tableData: [
					{
						name:'项目监理机构人员构成表',
						fileList:{id:1,createTime:'2020/01/02'},
						more:false,//是否多文件
					},
					{
						name:'总监理工程师任命书',
						fileList:{id:2,createTime:'2020/01/02'},
						more:false,
					},{
						name:'总监理工程师工程质量终身责任承诺书',
						fileList:{id:3,createTime:'2020/01/02'},
						more:false,
					},{
						name:'总监理工程师代表授权书',
						fileList:{id:4,createTime:'2020/01/02'},
						more:false,
					},
					{
					name:'见证取样和见证送检人员备案书',
					more:true,
					fileList:[
						{id:10,createTime:'2020/01/02'},
						{id:10,createTime:'2020/01/02'},
					]
				},
				{
					name:'变更总监理工程师申请',
					more:true,
					fileList:[
						{id:10,createTime:'2020/01/02'},
						{id:10,createTime:'2020/01/02'},
					]
				},
				{
					name:'专业监理工程师变更通知书',
					more:true,
					fileList:[
						{id:10,createTime:'2020/01/02'},
						{id:10,createTime:'2020/01/02'},
					]
				},
				]
			}
		}
	}
</script>

<style>
	.demo-table-expand {
		font-size: 0;
	}

	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}

	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 50%;
	}
</style>
