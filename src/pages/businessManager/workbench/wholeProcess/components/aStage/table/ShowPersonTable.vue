<template>
	<div class="main">
		<head-right-button title="新增" @click="addPerson"></head-right-button>
		<el-table ref="tableRef" :data="dataList" style="width: 100%" align="center"  highlight-current-row
	
		:header-cell-style="{fontSize:'12px'}">
			<el-table-column prop="time" label="添加时间" align="center"></el-table-column>
			<el-table-column prop="name" label="姓名" align="center"></el-table-column>
			<template v-if="showMajorNote">
				<el-table-column prop="name" label="专业备注" align="center"></el-table-column>
			</template>
			<template v-if="showOtherNote">
				<el-table-column prop="name" label="工作备注" align="center"></el-table-column>
			</template>
			<el-table-column  label="操作" align="center">
				<template slot-scope="scope">
					<el-button type="text" size="mini" @click="$refs.changeRef.openDialog()">变更人员</el-button>
					<el-button type="text" size="mini" @click="$refs.changeInfoRef.openDialog()">变更记录</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="dialog">
			<change-person-dialog  :showOtherNote="showOtherNote" :show-major-note="showMajorNote" title="新增人员" ref="addRef" width="30%"></change-person-dialog>
			<change-person-dialog  title="变更人员" ref="changeRef" width="30%"></change-person-dialog>
			<person-info-dialog  title="变更记录" ref="changeInfoRef" width="30%"></person-info-dialog>
		</div>
	</div>
</template>
<script>
	// import __ from '__' // __是需要手动引入的文件
	import HeadRightButton from "../button/HeadRightButton.vue"
	import ChangePersonDialog from "../dialog/ChangePersonDialog.vue"
	import PersonInfoDialog from "../dialog/PersonInfoDialog.vue"

	export default {
		components: {
			HeadRightButton,
			ChangePersonDialog,
			PersonInfoDialog
		},
		props: {
      showMajorNote:{
        type:Boolean,
				default:false
			}, 
			showOtherNote:{
        type:Boolean,
				default:false
			},
			data: {},
		},
		watch: {},
		//数据节点
		data() {
			return {
				form: {},
				formRules: {},
				dataList: [{time:'2020/1/2',name:'李四',status:'已通过'},],
			}
		},
		//生命周期函数节点
		created() {},
		//自定义函数节点
		methods: {
			submitForm() {

			},
			dialogClose() {

			},
			addPerson() {
				this.$refs.addRef.openDialog();
			},
		}
	}
</script>
<style lang='less' scoped>
	.main {
		padding: 5px 20px;
	}
</style>
