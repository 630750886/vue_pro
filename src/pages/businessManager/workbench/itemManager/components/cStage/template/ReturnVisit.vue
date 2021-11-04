<template>
	<div>
		<!--<div>
			<head-button @click="headButtonClick"></head-button>
		</div>
		<div>
			<el-table :data="returnMaterials">
				<el-table-column label="资料名称" align="center" prop="payVisitDocName"></el-table-column>
				<el-table-column label="附件" align="center" prop="payVisitDocFile">
					<template slot-scope="scope">
						<el-button type="text" size="mini">下载</el-button>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="text" size="mini" @click="delData(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="dialog">
			<add-other-dialog title="新增资料" ref="addOpRef" width="30%" @getFormData="submitFormData"></add-other-dialog>
			<add-other-dialog title="新增资料" ref="addOtherRef" width="30%" @getFormData="submitFormData"></add-other-dialog>
		</div>-->
		<com-document is-add-means code="TYPE-159"></com-document>
	</div>
</template>
<script>
	// import __ from '__' // __是需要手动引入的文件
	import HeadButton from '../button/HeadButton.vue'
	import AddOtherDialog from '../dialog/AddOtherDialog.vue'
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		components: {
			HeadButton,
			AddOtherDialog,
		},
		props: {},
		watch: {},
		computed:{
				...mapState('workbench/cStage',{
          returnMaterials:'returnMaterials',
				})
		},
		//数据节点
		data() {
			return {
			}
		},
		//生命周期函数节点
		created() {},
		//自定义函数节点
		methods: {
				...mapActions('workbench/cStage',{
          networkAddReturnMaterial:'networkAddReturnMaterial',
          networkDelReturnMaterial:'networkDelReturnMaterial',
				}),
			submitFormData(formData) {
			  this.networkAddReturnMaterial(formData)
			},
      delData(data){
        this.$msgbox.confirm('是否删除资料？','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.networkDelReturnMaterial(data)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        })

			},
			headButtonClick(btn) {
				switch (btn) {
					case 1:
						this.$refs.addOpRef.openDialog({payVisitDocName:'评价意见函'});
						break;
					case 2:
						this.$refs.addOtherRef.openDialog();
						break;
				}
			}
		}
	}
</script>
<style lang='less' scoped>


</style>
