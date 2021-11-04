<template>
	<div >
		<el-tabs v-model="activeName" tab-position="left" style="height: 600px;">
			<template v-for="item in tabList">
				<el-tab-pane :label="item.listname" :name="item.key">
					<item-table :dataList="dataList"></item-table>
				</el-tab-pane>
			</template>
		</el-tabs>
		<template v-for="stage in dataList">
			<div class="main">
			<el-row>
				<el-col :span="3">
					<span style="font-weight: bold;">{{stage.stage}}工作情况：</span>
				</el-col>
				<el-col :span="21">
					<template v-for="item in stage.project">
						<div class="progressDiv">
							<el-row>
								<el-col :span="6">项目编号:{{item.projectNumber}}</el-col>
								<el-col :span="8">项目名称：{{item.projectName}}</el-col>
								<el-col :span="6">
									<el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
								</el-col>
								<el-col :span="4">
									<status-tag :data="{status:1,msg:'状态显示'}"></status-tag>
								</el-col>
							</el-row>


						</div>

					</template>
				</el-col>
			</el-row>
			</div>
		</template>

	</div>
</template>

<script>
	import ItemTable from './table/ItemTable.vue'
	export default {
		components:{
      ItemTable,
		},
		watch:{
      activeName(newValue){

			}
		},
		data() {
			return {
        activeName:'',
        dataList:[],
        tabList:[]
			}
		},
		created(){
		  this.getSelectByCode('015').then(item=>{
		    this.tabList=item.data.filter((ref,index)=>{
		      if (index === 0) {
		        this.activeName=ref.keyid
					}
		      return index<5
				})

			})
		},
		methods: {

		}
	}
</script>
<style>

	.main{
		margin: 10px 10px;
	}
	.progressDiv {
		margin-left: 10px;
		margin-bottom: 20px;
	}
</style>
